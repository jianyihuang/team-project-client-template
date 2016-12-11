//import express module
var express = require('express');
//import JSON body parser
var bodyParser = require('body-parser');
//import database functions
var database = require('./database');
var mongo_express = require('mongo-express/lib/middleware');
var ResetDatabase = require('./resetdatabase');
var mongo_express_config = require('mongo-express/config.default.js');
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
var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/exser';
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
// listening on port 3000
// Implement your server in this file.
// We should be able to run your server with node src/server.js

MongoClient.connect(url,function(err,db) {
  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(express.static('../client/build'));
  app.use('/mongo_express', mongo_express(mongo_express_config));

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
      if (typeof id === 'string') {
      return id;
      } else {
      // Not a number. Return -1, an invalid ID.
      return "";
      }
    } catch (e) {
      // Return an invalid ID.
      return "";
    }
  }

  function getFeedItem(feedItemId,callback) {
    db.collection('feedItems').findOne({_id:feedItemId},function(err,feedItem){
      if (err) {
        return callback(err);
      } else if (feedItem === null){
        return callback(null,null);
      }

      var userList = [feedItem.contents.author];
      userList = userList.concat(feedItem.likeCounter);
      resolveUserObjects(userList,function(err,userMap) {
        if (err) {
          callback(err);
        } else {
          feedItem.likeCounter = feedItem.likeCounter.map((id) => userMap[id]);
          feedItem.contents.author = userMap[feedItem.contents.author];
          callback(null,feedItem);
        }
      });
    });
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
    // Update recent msg box.
    // Read the user from the database.
    // var user = readDocument('users', fromUser);
    // // Get the last numberOfBoxes in the messageboxes.
    // var index_of_requested_box = user.messageboxes.indexOf(box_msg_id);
    // if(index_of_requested_box !== -1) {
    //   var sliced_out = user.messageboxes.slice(index_of_requested_box, index_of_requested_box + 1);
    //   user.messageboxes.push(sliced_out);
    //   writeDocument('users', user);
    // }
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
    }
  });

  function getFeedData(user,type,callback) {
    console.log("Get called");
    db.collection('users').findOne({_id: user},function(err,userData) {
      // console.log(userData);
      if (err) {
        return callback(err);
      } else if(userData === null) {
        return callback(null,null);
      }

      if (type === 1) {
        db.collection('academicfeeds').findOne({_id:userData.Academic_feed},
        function (err,feedData) {
          if (err) {
            return callback(err)
          } else if (feedData === null){
            return callback(null,null);
          }
          processNextFeedItem(0,feedData.list_of_feeditems,[],function(err,resolvedContents) {
            if (err) {
              callback(err);
            } else {
              feedData.list_of_feeditems = resolvedContents;
              // console.log(feedData);
              callback(null,feedData);
            }
          });
        });
       } else {
        db.collection('servicefeeds').findOne({_id:userData.Service_feed},
        function (err,feedData) {
          console.log("Service_feed");
          if (err) {
            return callback(err)
          } else if (feedData === null){
            return callback(null,null);
          }
          processNextFeedItem(0,feedData.list_of_feeditems,[],function(err,resolvedContents) {
            if (err) {
              callback(err);
            } else {
              feedData.list_of_feeditems = resolvedContents;
              // console.log(feedData);
              callback(null,feedData);
            }
          });
        });
       }
     });
    }

    function processNextFeedItem(i,feedItems,resolvedContents,callback) {
      // Asynchronously resolve a feed item.
      getFeedItem(feedItems[i], function(err, feedItem) {
        if (err) {
          // Pass an error to the callback.
          callback(err);
        } else {
          // Success!
          // console.log(feedItem);
          resolvedContents.push(feedItem);
          if (resolvedContents.length === feedItems.length) {
            // I am the final feed item; all others are resolved.
            // Pass the resolved feed document back to the callback.
            callback(null,resolvedContents);
          } else {
            // Process the next feed item.
            processNextFeedItem(i + 1,feedItems,resolvedContents,callback);
          }
        }
      });
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
* Resolves a list of user objects. Returns an object that maps user IDs to
* user objects.
*/
function resolveUserObjects(userList, callback) {
  // Special case: userList is empty.
  // It would be invalid to query the database with a logical OR
  // query with an empty array.
  if (userList.length === 0) {
    callback(null, {});
  } else {
    // Build up a MongoDB "OR" query to resolve all of the user objects
    // in the userList.
    var query = {
      $or: userList.map((id) => { return {_id: id } })
    };
    // Resolve 'like' counter
    db.collection('users').find(query).toArray(function(err, users) {
      if (err) {
        return callback(err);
      }
      // Build a map from ID to user object.
      // (so userMap["4"] will give the user with ID 4)
      var userMap = {};
      users.forEach((user) => {
        userMap[user._id] = user;
      });
      callback(null, userMap);
    });
  }
}
  /**
   * Get the feed data for a particular user.
   1 is academic feed
   2 is Service feed
  */
  app.get('/user/:userid/feed/:feedtype', function(req, res) {
    var userid =  req.params.userid;
    var feedType = parseInt(req.params.feedtype,10);
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if(fromUser === userid){
      // Send response.
      getFeedData(new ObjectID(userid),feedType,function(err,feedData) {
        // console.log(feedData);
        if (err) {
          res.status(500).send("Database error: "+err);
        } else if (feedData === null) {
          res.status(400).send("Could not look up feed for user " + userid);
        } else {
          res.status(201);
          res.send(feedData);
        }
      })
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
    ResetDatabase(db, function() {
          res.send();
    });
  });

  // Increase view count
  // authorization is done in get feed data
  app.put('/feeditem/:feeditemid',function(req,res) {
    var feedItemId = new ObjectID(req.params.feeditemid);
    db.collection('feedItems').updateOne({_id:feedItemId},
    {$inc:{view_count:1}},function(err) {
      if (err) {
        res.status(500).send("Database error: "+err);
      } else {
        db.collection('feedItems').findOne({_id:feedItemId},function(err,feedItem) {
          if (err) {
            res.status(500).send("Database error: "+err);
          } else {
            res.status(201).send(JSON.stringify(feedItem.view_count));
          }
        });
      }});
    });

  // Like a feed
  app.put('/feeditem/:feeditemid/likelist/:userid',function(req,res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var feedItemId = new ObjectID(req.params.feeditemid);
    var userId = req.params.userid;
    if(fromUser === userId) {
      db.collection('feedItems').updateOne({_id:feedItemId},
        {$push:{likeCounter:{$each:[new ObjectID(userId)],$position:0}}},function(err) {
          if (err) {
            res.status(500).send("Database error: "+err);
          } else {
            getFeedItem(feedItemId,function(err,feedItem) {
              if (err) {
                res.status(500).send("Database error: "+err);
              } else {
                console.log(feedItem.likeCounter);
                res.status(201).send(feedItem.likeCounter);
              }
            })
          }
        });
      }else {
        res.status(401).end();
      }
    });

  // Unlike a feed
  app.delete('/feeditem/:feeditemid/likelist/:userid',function(req,res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var feedItemId = new ObjectID(req.params.feeditemid);
    var userId = req.params.userid;
    if(fromUser === userId) {
      db.collection('feedItems').updateOne({_id:feedItemId},
        {$pull:{likeCounter:new ObjectID(userId)}},function(err) {
          if (err) {
            res.status(500).send("Database error: "+err);
          } else {
            getFeedItem(feedItemId,function(err,feedItem) {
              if (err) {
                res.status(500).send("Database error: "+err);
              } else {
                console.log(feedItem.likeCounter);
                  res.status(201).send(feedItem.likeCounter);
              }
            });
          }});
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
     return feedItem.contents.contents.toLowerCase().indexOf(query)!==-1 ||feedItem.contents.request.toLowerCase().indexOf(query)!==-1;
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
    userData.schedules.push(newPost._id);
    writeDocument('users', userData);
    //writeDocument('academicfeeds', feedData);
    return newPost;
  }

  function getScheduleItem(scheduleId) {
    var schedules = readDocument('schedules', scheduleId);
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
      res.send(scheduleData);
    } else {
      res.status(401).end();
    }
  });

  app.post('/schedule',validate({body:scheduleSchema}),function(req,res) {
    console.log("Get post scheduleItem");
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var body = req.body;
    console.log('Server receives POST schedule :: ' + JSON.stringify(body));
    //console.log(fromUser);
  //  console.log(body.author);
    var user = readDocument('users', fromUser);
    console.log((body.author) == (user.first_name));
    if((body.author) === (user.first_name)) {
      var newPost = addScheule(fromUser,body.author,body.time,body.subscriber,body.date,body.serviceContents);
      res.status(201);
      res.send(newPost);
    }else {
      res.status(401).end();
    }
  });

  app.delete('/schedule/:userid/:scheduleid',function(req,res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var scheduleId = parseInt(req.params.scheduleid);
    var userId = parseInt(req.params.userid);
    //var userId = parseInt(req.params.userid,10);
    var user = readDocument('users',fromUser);
    if(fromUser === userId) {
      var scheduleItem = readDocument('schedules', scheduleId);
      console.log(scheduleItem);
      var scheduleIndex = user.schedules.indexOf(scheduleId);
      // -1 means the user is *not* in the likeCounter,
      // so we can simply avoid updating
      // anything if that is the case: the user already
      // doesn't like the item.
      if (scheduleIndex !== -1) {
        // 'splice' removes items from an array. This
        // removes 1 element starting from userIndex.
        user.schedules.splice(scheduleIndex, 1);
        writeDocument('users', user);
      }
      res.status(201).end();
    }else {
      res.status(401).end();
    }
  });

  //display user profile for particular user
  app.get('/user/:userid/profile', function(req, res) {
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    if(fromUser === userid) {
      // send response
      db.collection('users').findOne({_id:new ObjectID(userid)},function(err,userData) {
        if (err) {
          res.status(500).send("Database error: "+err);
        } else if (userData === null){
          res.status(400).send("Could not find User: "+userid);
        } else {
          // console.log(userData);
          res.status(201);
          res.send(userData);
        }
      });
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

  app.get('/comment/:commentid/:userid',function(req,res){
    var userid = req.params.userid;
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var commentId = new ObjectID(req.params.commentid);
    if(fromUser === userid) {
      db.collection('comments').findOne({_id:commentId},
        function(err,comment) {
          if (err) {
            res.status(500).send("Database error: "+err);
          } else if (comment === null) {
            res.status(400).send("Could not found comment: "+commentId);
          } else {
            db.collection('users').findOne({_id: new ObjectID(comment.author)},function(err,user) {
              if (err) {
                res.status(500).send("Database error: "+err);
              } else if(user === null){
                res.status(400).send("Could not found user: "+comment.author);
              } else {
                comment.author = user
                res.status(201);
                res.send(comment);
              }
            });
          }
        });
      } else {
       res.status(401).end();
     }
   });

  app.post('/feed/:feeditemid/comment/:userid',function(req,res){
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var userId = req.params.userid;
    var feedItemId = req.params.feeditemid;
    var content = req.body;
    console.log(fromUser);
    if(fromUser === userId) {
      var time = new Date().getTime();
      var newComment = {
        "author":userId,
        "timestamp":time,
        "contents":content
      }
      db.collection('comments').insertOne(newComment,function(err,result) {
        if (err) {
          res.status(500).send("Database error: "+err);
        } else {
          newComment._id = result.insertedId;
          db.collection('feedItems').updateOne({_id:new ObjectID(feedItemId)},
          {$push:{list_of_comments:{$each:[newComment._id],$position:0}}},
          function(err) {
            if (err) {
              console.log("Error!!!");
              res.status(500).send("Database error: "+err);
            } else {
              db.collection('feedItems').findOne({_id:new ObjectID(feedItemId)},
              function(err,feedItem) {
                if (err) {
                  res.status(500).send("Database error: "+err);
                } else if (feedItem === null) {
                  res.status(400).send("Could not find feed item: "+feedItemId);
                } else {
                  res.status(201).send(feedItem.list_of_comments);
                }
              })
            }
          });
        }
      });
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

  app.listen(3000,function() {
    console.log('Example app listening on port 3000');
  });
});
