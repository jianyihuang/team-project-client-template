//import express module
var express = require('express');
//import JSON body parser
var bodyParser = require('body-parser');
//import database functions
var database = require('./database');
var PostUpdateSchema = require('./schemas/postupdate.json');
var MessageSchema = require('./schemas/message.json');
var UserProfileSchema = require('./schemas/userprofile.json');
var ConfigSchema = require('./schemas/config.json')
var scheduleSchema = require('./schemas/scheduleSchema.json');
var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var validate = require('express-jsonschema').validate;
var app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
//pull static contends from build
app.use(express.static('../client/build'));

var categoryMap = {
  "Computer Science":1,
  "Math":2,
  "Music":3,
  "History":4,
  "Physics":5,
  "English":6,
  "Pet Related":7,
  "Home Improvement":8,
  "Travel":9,
  "Yard":10,
  "Plumer":11,
  "Car Pool":12
 }
/**
* Get the user ID from a token. Returns -1 (an invalid ID)
* if it fails.
*/
  // var token ="eyJpZCI6MX0=";
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
    return id;
    } else {
    // Not a number. Return -1, an invalid ID.
    return -1;
    }
  } catch (e) {
// Return an invalid ID.
return -1;
}
}

/**
 * Given a feed item ID, returns a FeedItem object with references resolved.
 * Internal to the server, since it's synchronous.
 */
function getFeedItemSync(feedItemId) {
  var feedItem = readDocument('feedItems', feedItemId);
  // Resolve 'like' counter.
  feedItem.likeCounter =
    feedItem.likeCounter.map((id) => readDocument('users', id));
    // Assuming a StatusUpdate. If we had other types of
    // FeedItems in the DB, we would
    // need to check the type and have logic for each type.
    feedItem.contents.author =
      readDocument('users', feedItem.contents.author);
    feedItem.tag = readDocument("servicetags",feedItem.tag);
    return feedItem;
}

function getFeedData(user,type) {
  console.log("Get called");
  // Get the User object with the id "user".
  var userData = readDocument('users', user);
  // Get the Feed object for the user.
  var feedData;
  if(type === 1) {
     feedData = readDocument('academicfeeds', userData.Academic_feed);
  }else {
     feedData = readDocument('servicefeeds', userData.Service_feed);
  }
  // Map the Feed's FeedItem references to actual FeedItem objects.
  // Note: While map takes a callback function as an argument, it is
  // synchronous, not asynchronous. It calls the callback immediately.
  feedData.list_of_feeditems = feedData.list_of_feeditems.map(getFeedItemSync);
  return feedData;
}

function postStatusUpdate(user,tag,contents,imgUrl,request,type) {
  var time = new Date().getTime();
  var newPost = {
    "view_count": 0,
    "likeCounter": [],
    // Taggs are by course_id
    "tag": categoryMap[tag],
    "list_of_comments":[],
    "contents": {
      "author": user,
      "timestamp": time,
      "request": request,
      "contents": contents,
      "imgUrl":imgUrl
    }
  }
  console.log(contents);
  console.log(newPost);
  newPost = addDocument('feedItems',newPost);
  var userData = readDocument('users', user);
  var feedData;
  if(type === 1) {
     feedData = readDocument('academicfeeds', userData.Academic_feed);
     feedData.list_of_feeditems.unshift(newPost._id);
     writeDocument('academicfeeds', feedData);
  }else {
     feedData = readDocument('servicefeeds', userData.Service_feed);
     feedData.list_of_feeditems.unshift(newPost._id);
     writeDocument('servicefeeds', feedData);
  }
  return newPost;
}
/**
 * Get the feed data for a particular user.
 1 is academic feed
 2 is Service feed
*/
app.get('/user/:userid/feed/:feedtype', function(req, res) {
  var userid =  parseInt(req.params.userid,10);
  var feedType = parseInt(req.params.feedtype,10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(fromUser === userid){
    // Send response.
    res.status(201);
    res.send(getFeedData(userid,feedType));
  }
  else{
    // 401: Unauthorized request.
    res.status(401).end();
  }
});

// Post a feed
app.post('/feeditem/:feeditemtype',validate({body:PostUpdateSchema}),function(req,res) {
  console.log("Get post feeditem");
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var body = req.body;
  if(body.author === fromUser) {
    var feedItemType = parseInt(req.params.feeditemtype,10);
    var newPost = postStatusUpdate(body.author,body.category,body.contents,body.imgUrl,body.request,feedItemType);
    res.status(201);
    res.set('Location','/feeditem/'+newPost._id);
    res.send(newPost);
  }else {
    res.status(401).end();
  }
});

//Rest database.
app.post('/resetdb',function(req,res) {
  console.log("Resetting database");
  // This is a debug route, so don't do any Validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

// Increase view count
// authorization is done in get feed data
app.put('/feeditem/:feeditemid',function(req,res) {
  var feedItemId = parseInt(req.params.feeditemid,10);
  var feedItem = readDocument("feedItems",feedItemId);
  feedItem.view_count = feedItem.view_count+1;
  writeDocument("feedItems",feedItem);
  res.status(201);
  res.send(JSON.stringify(feedItem.view_count));
});

// Like a feed
app.put('/feeditem/:feeditemid/likelist/:userid',function(req,res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var feedItemId = parseInt(req.params.feeditemid);
  var userId = parseInt(req.params.userid);
  console.log(feedItemId);
  if(fromUser === userId) {
    var feedItem = readDocument('feedItems', feedItemId);
      // Normally, we would check if the user already
    // liked this comment. But we will not do that
    // in this mock server. ('push' modifies the array
    // by adding userId to the end)
    feedItem.likeCounter.push(userId);
    writeDocument('feedItems', feedItem);
    // Return a resolved version of the likeCounter
    res.status(201);
    res.send(feedItem.likeCounter.map((userId) =>
                          readDocument('users', userId)));
  }else {
    res.status(401).end();
  }
});

// Unlike a feed
app.delete('/feeditem/:feeditemid/likelist/:userid',function(req,res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var feedItemId = parseInt(req.params.feeditemid,10);
  var userId = parseInt(req.params.userid,10);
  if(fromUser === userId) {
    var feedItem = readDocument('feedItems', feedItemId);
    console.log(feedItem);
    var userIndex = feedItem.likeCounter.indexOf(userId);
    // -1 means the user is *not* in the likeCounter,
    // so we can simply avoid updating
    // anything if that is the case: the user already
    // doesn't like the item.
    if (userIndex !== -1) {
      // 'splice' removes items from an array. This
      // removes 1 element starting from userIndex.
      feedItem.likeCounter.splice(userIndex, 1);
      writeDocument('feedItems', feedItem);
    }
    res.status(201);
    // Return a resolved version of the likeCounter
    res.send(feedItem.likeCounter.map((userId) =>
                          readDocument('users', userId)));
  }else {
    res.status(401).end();
  }
});

// Search for feed item
app.post('/search', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userData = readDocument('users', fromUser);
  if (typeof(req.body) === 'string') {
    var query = req.body.trim().toLowerCase();
    var feedData = readDocument('academicfeeds', userData.Academic_feed).list_of_feeditems;
    console.log("query: "+query);
    console.log("feedData: "+feedData);
  res.send(feedData.filter((feedItemId) => {
    var feedItem = readDocument('feedItems',feedItemId);
    return feedItem.contents.contents.toLowerCase().indexOf(query)!==-1;
  }).map(getFeedItemSync));
}
else{
res.status(400).end();
}
});

// Delete a feed
// If the user is the author of that feed remove it from feedItem otherwise just
// remove the reference
app.delete('/user/:userid/feed/:feedtype/:feeditemid',function(req,res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid,10);
  var feedItemId = parseInt(req.params.feeditemid,10);
  var feedItem = readDocument('feedItems', feedItemId);
  var type = parseInt(req.params.feedtype,10);
  if(fromUser === userId) {
    var user = readDocument('users', userId);
    var feedData;
    var feedItemIndex;
    if(type === 1) {
       feedData = readDocument('academicfeeds', user.Academic_feed);
       feedItemIndex = feedData.list_of_feeditems.indexOf(feedItemId);
       if (feedItemIndex !== -1) {
         // 'splice' removes items from an array. This
         // removes 1 element starting from userIndex.
         feedData.list_of_feeditems.splice(feedItemIndex, 1);
       }
       writeDocument('academicfeeds', feedData);
       if(fromUser === feedItem.contents.author) {
         database.deleteDocument('feedItems',feedItemId);
       }
    }else {
       feedData = readDocument('servicefeeds', user.Service_feed);
       feedItemIndex = feedData.list_of_feeditems.indexOf(feedItemId);
       if (feedItemIndex !== -1) {
         // 'splice' removes items from an array. This
         // removes 1 element starting from userIndex.
         feedData.list_of_feeditems.splice(feedItemIndex, 1);
       }
       writeDocument('servicefeeds', feedData);
       if(fromUser === feedItem.contents.author) {
         database.deleteDocument('feedItems',feedItemId);
       }
    }
    res.status(201);
    res.send(feedData);
  } else {
    res.status(401).end();
  }
});

/**
  Begin Message Page.
**/

// Get the user's short profile.
function getShortProfile(userId) {
  var user = readDocument('users', userId);
  var profile = {
    user_id: userId,
    username: user.username,
    firstName: user.first_name,
    lastName: user.last_name,
    profilepic: user.profilepic
  };
  return profile;
}

// Handle getParticipantProfiles
app.get('/messagebox/:box_msg_id/participantlist', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var box_msg_id = parseInt(req.params.box_msg_id, 10);
  var messageBox = readDocument('messageboxes', box_msg_id);
  var participantList = messageBox.list_of_users;
  // The requesting user is in the participant list, which should be allowed.
  if (participantList.indexOf(fromUser) !== -1) {
    var participantProfiles = participantList.map(function(user_id) {
      return getShortProfile(user_id);
    });
    res.send(participantProfiles);
  }
  else {
    res.status(401).end();
  }
});

// Handle getMessageBoxServer.
app.get('/messagebox/:box_msg_id', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var box_msg_id = parseInt(req.params.box_msg_id, 10);
  var messageBox = readDocument('messageboxes', box_msg_id);
  if(messageBox.list_of_users.indexOf(fromUser) !== -1) {
    res.send(messageBox);
  }
  else {
    res.status(401).end();
  }
});

// Handle sendMessageServer from client.
app.post('/messagebox/:box_msg_id/send/:user_id', validate({body: MessageSchema}), function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  // Get the current time.
  var time = new Date().getTime();
  var user_id = parseInt(req.params.user_id, 10);
  var box_msg_id = parseInt(req.params.box_msg_id, 10);
  var messageBox = readDocument('messageboxes', box_msg_id);
  var content = req.body.content;
  // Check if the user is already in the conversation.
  if(messageBox.list_of_users.indexOf(fromUser) !== -1
    && user_id === fromUser) {
        // Push the message into the conversation box.
        messageBox.list_of_messages_by_users_in_box.push({
          'user_id': user_id,
          'timestamp': time,
          'content': content
        });
        writeDocument('messageboxes', messageBox);
        res.send(messageBox);
  }
  else {
    res.status(401).end();
  }
});

// Handle getRecentMessageBoxes from client.
app.get('/users/:userid/recentmsgboxes/:numberofboxes', function(req, res) {
  var userInToken = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid, 10);
  var numberOfBoxes = parseInt(req.params.numberofboxes, 10);
  if(userInToken === userId){
    // Read the user from the database.
    var user = readDocument('users', userId);
    // Get the last numberOfBoxes in the messageboxes.
    var reversedMsgBoxes = user.messageboxes;
    var recentBoxIds = reversedMsgBoxes.reverse().slice(0, numberOfBoxes);
    res.send(recentBoxIds);
  }
  else {
    res.status(401).end();
  }
});

// Handle createMessageBox from client.
app.put('/messagebox/create/:user_id', function(req, res) {
  var userInToken = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.user_id, 10);
  if (userInToken === userId){
    // Get the current time.
    var time = new Date().getTime();
    // Create a message box.
    var messageBox = {
      'list_of_users': [],
      'list_of_messages_by_users_in_box': [],
      'creation_timestamp': time
    }
    messageBox.list_of_users.push(userId);
    messageBox = addDocument('messageboxes', messageBox);
    var user = readDocument('users', userId);
    // Add the creator into the list of users.
    user.messageboxes.push(messageBox._id);
    // Update users in database.
    writeDocument('users', user);
    res.send(messageBox);
  }
  else {
    res.status(401).end();
  }

});

// Handle joinMessageBox from client.
app.put('/messagebox/:box_msg_id/add/:user_id', function(req, res) {
  var userInToken = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.user_id, 10);
  var box_msg_id = parseInt(req.params.box_msg_id,10);
  var messageBox = readDocument('messageboxes', box_msg_id);
  if (messageBox.list_of_users.indexOf(userInToken) !== -1) {
    // When the invited user is not already in the list of participants, we add him or her in.
    if (messageBox.list_of_users.indexOf(userId) === -1) {
      // Add the user into the list.
      messageBox.list_of_users.push(userId);
      // Update messageBox.
      writeDocument('messageboxes', messageBox);
      var user = readDocument('users', userId);
      user.messageboxes.push(box_msg_id);
      // Update user.
      writeDocument('users', user);
    }
    res.send(messageBox);
  }
  else {
    res.status(401).end();
  }
});

//schedule part ------------

function addScheule(userId,user, time, subscriber,date,serviceContents) {
  var newPost = {
    "completed": "COMPLETED",
    "contents": {
      "author": user,
      "time": time,
      "subscriber": subscriber,
      "date": date,
      "serviceContents":serviceContents
    }
  }
  console.log(newPost);
  newPost = addDocument('schedules',newPost);
  var userData = readDocument('users', userId);
  userData.schedules.unshift(newPost._id);
  //writeDocument('academicfeeds', feedData);
  return newPost;
}

//------------------------ Schedule Part
function getScheduleItem(scheduleId) {
  var schedules = readDocument('schedules', scheduleId);
  console.log('Read a single schedule from database: ' + JSON.stringify(schedules));
  var scheduleData = {
    //console.log(indexSchedule);
     _id: scheduleId,
     completed: schedules.completed,
     contents: {
      // ID of the user that the appointment is with
      author:schedules.contents.author,
      subscriber : schedules.contents.subscriber,
      date : schedules.contents.date,
      time:schedules.contents.time,
      serviceContents: schedules.contents.serviceContents
    }
  };
  console.log('Server tries to get a single Schedule: ' + JSON.stringify(scheduleData));
  return scheduleData;
}

app.get('/schedule/:userid', function(req, res) {
  var userId = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(fromUser === userId) {
    // send response
    // Get the User object with the id "user".
    var userData = readDocument('users', userId);
    var scheduleData = userData.schedules.map(function(scheduleId){
      return getScheduleItem(scheduleId);
    });
    console.log('Server reads data for Schedule :: ' + JSON.stringify(scheduleData));
    res.send(scheduleData);
  } else {
    res.status(401).end();
  }
});

app.post('/schedule',validate({body:scheduleSchema}),function(req,res) {
  console.log("Get post scheduleItem");
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var body = req.body;
  //console.log(fromUser);
//  console.log(body.author);
  var user = readDocument('users', fromUser);
  console.log((body.author) == (user.first_name));
  if((body.author) === (user.first_name)) {
    var newPost = addScheule(fromUser,body.author,body.time,body.subscriber,body.date,body.serviceContents);
    res.status(201);
    res.set('Location','/schedule/'+newPost._id);
    res.send(newPost);
  }else {
    res.status(401).end();
  }
});

// user profile part
// get user profile data
function getUserData(user, type) {
  console.log("Get called");
  var userData = readDocument("users", user);
  return userData;
}

//display user profile for particular user
app.get('/user/:userid/profile', function(req, res) {
  var userid = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(fromUser === userid) {
    // send response
    res.status(201);
    res.send(getUserData(userid));
  } else {
    res.status(401).end();
  }
});



//update profile
app.put('/user/:userid/profile', validate({body: UserProfileSchema}), function(req,res) {
  var user_id = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userData = req.body;
  if(fromUser === user_id) {
      //update user info here

      var user = readDocument('users', user_id);
      user.academic_institution = req.body.academic_institution;
      user.education_level = req.body.education_level;
      user.favorite_quote = req.body.favorite_quote;

      writeDocument('users', user);
      res.status(201);
      res.send(user);

  } else {
    res.status(401).end();
  }
});



app.put('/config/:userid', validate({body: ConfigSchema}), function(req,res) {
  var userid = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userData = req.body;
  if(fromUser === userid) {
      var user = readDocument('users', userid);
      user.username = userData.username;
      user.password = userData.password;
      user.email = userData.email;
      writeDocument('users', user);
      res.status(201);
      res.send(user);

  } else {
    res.status(401).end();
  }
});

app.get('/config/:userid', function(req, res) {
  var userid = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  if(fromUser === userid) {
    res.status(201);
    var userData = readDocument("users", userid);
    res.send(userData);
  } else {
    res.status(401).end();
  }
});
app.post('/feed/:feeditemid/comment/:userid',function(req,res){
  console.log("Comment function called");
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid, 10);
  var feedItemId = parseInt(req.params.feeditemid,10);
  var content = req.body;
  if(fromUser === userId) {
    var time = new Date().getTime();
    var feedData = readDocument("feedItems",feedItemId);
    var newComment = {
      "author":userId,
      "timestamp":time,
      "contents":content
    }
    addDocument("comments",newComment);
    console.log("Comments before is "+feedData.list_of_comments);
    feedData.list_of_comments.unshift(newComment._id);
    writeDocument("feedItems",feedData);
    res.status(201);
    console.log("Comments after is "+feedData.list_of_comments);
    res.send(feedData.list_of_comments);
  } else {
    res.status(401).end();
  }
});

app.get('/comment/:commentid/:userid',function(req,res){
  console.log("Comment function called");
  var userid = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var commentId = parseInt(req.params.commentid,10);
  if(fromUser === userid) {
    var comment = readDocument("comments",commentId);
    comment.author = readDocument("users",comment.author);
    res.status(201);
    res.send(comment);
  } else {
    res.status(401).end();
  }
});

app.post('/feed/:feeditemid/comment/:userid',function(req,res){
  console.log("Comment function called");
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userId = parseInt(req.params.userid, 10);
  var feedItemId = parseInt(req.params.feeditemid,10);
  var content = req.body;
  if(fromUser === userId) {
    var time = new Date().getTime();
    var feedData = readDocument("feedItems",feedItemId);
    var newComment = {
      "author":userId,
      "timestamp":time,
      "contents":content
    }
    addDocument("comments",newComment);
    feedData.list_of_comments.unshift(newComment._id);
    writeDocument("feedItems",feedData);
    console.log(readDocument("feedItems",feedItemId));
    res.status(201);
    res.send();
  } else {
    res.status(401).end();
  }
});

app.get('/comment/:commentid/:userid',function(req,res){
  console.log("Comment function called");
  var userid = parseInt(req.params.userid, 10);
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var commentId = parseInt(req.params.commentid,10);
  if(fromUser === userid) {
    var comment = readDocument("comments",commentId);
    comment.author = readDocument("users",comment.author);
    res.status(201);
    res.send(comment);
  } else {
    res.status(401).end();
  }
});


/**
 * Translate JSON Schema Validation failures into error 400s.
*/
app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    console.log(JSON.stringify(err));
    // Set a bad request http response status
    res.status(400).end();
  } else {
    // It's some other sort of error; pass it to next error middleware handler
    next(err); }
});

// listening on port 3000
app.listen(3000,function() {
  console.log('Example app listening on port 3000');
});
// Implement your server in this file.
// We should be able to run your server with node src/server.js
