import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Properly configure+send an XMLHttpRequest with error handling,
 * authorization token, and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  // xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  // The below comment tells ESLint that FacebookError is a global.
  // Otherwise, ESLint would complain about it! (See what happens in Atom if
  // you remove the comment...)
  /* global FacebookError */
  // Response received from server. It could be a failure, though!
  xhr.addEventListener('load', function() {
    var statusCode = xhr.status;
    var statusText = xhr.statusText;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      // The server may have included some response text with details concerning // the error.
      var responseText = xhr.responseText;
      console.log('Could not ' + verb + " " + resource + ": Received " +
                  statusCode + " " + statusText + ": " + responseText);
      }
    });
    // Time out the request if it takes longer than 10,000
    // milliseconds (10 seconds)
    xhr.timeout = 10000;
    // Network failure: Could not connect to server.
    xhr.addEventListener('error', function() {
      console.log('Could not ' + verb + " " + resource +
      ": Could not connect to the server.");
    });

    // Network failure: request took too long to complete.
    xhr.addEventListener('timeout', function() {
      console.log('Could not ' + verb + " " + resource +
                ": Request timed out.");
    });

    switch (typeof(body)) {
      case 'undefined':
        // No body to send.
        console.log("body is undefined");
        xhr.send();
        break;
      case 'string':
        // Tell the server we are sending text.
        console.log("body is a string");
        xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        xhr.send(body);
        break;
      case 'object':
        // Tell the server we are sending JSON.
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        // Convert body into a JSON string.
        xhr.send(JSON.stringify(body));
        break;
      default:
        throw new Error('Unknown body type: ' + typeof(body));
    }
  }
/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function getFeedData(user,type, cb) {
  sendXHR('GET','/user/1/feed/'+type,undefined,(xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function postStatusUpdate(user, contents,type, cb) {
  sendXHR('POST','/feeditem/'+type,{
    "author": user,
    "request": contents.title,
    "contents": contents.value,
    "imgUrl":contents.imgUrl
  },(xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function deleteFeed(userId,feedItemId,type,cb) {
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
  }else {
     feedData = readDocument('servicefeeds', user.Service_feed);
     feedItemIndex = feedData.list_of_feeditems.indexOf(feedItemId);
     if (feedItemIndex !== -1) {
       // 'splice' removes items from an array. This
       // removes 1 element starting from userIndex.
       feedData.list_of_feeditems.splice(feedItemIndex, 1);
       writeDocument('servicefeeds', feedData);
     }
     writeDocument('servicefeeds', feedData);
  }
  emulateServerReturn(feedData, cb);
}


export function likeFeedItem(feedItemId, userId, cb) {
  var feedItem = readDocument('feedItems', feedItemId);
    // Normally, we would check if the user already
  // liked this comment. But we will not do that
  // in this mock server. ('push' modifies the array
  // by adding userId to the end)
  feedItem.likeCounter.push(userId);
  writeDocument('feedItems', feedItem);
  // Return a resolved version of the likeCounter
  emulateServerReturn(feedItem.likeCounter.map((userId) =>
                        readDocument('users', userId)), cb);
}

export function unlikeFeedItem(feedItemId, userId, cb) {
  var feedItem = readDocument('feedItems', feedItemId);
  // Find the array index that contains the user's ID.
  // (We didn't *resolve* the FeedItem object, so
  // it is just an array of user IDs)
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
  // Return a resolved version of the likeCounter
  emulateServerReturn(feedItem.likeCounter.map((userId) =>
                        readDocument('users', userId)), cb);
}

export function increaseViewCount(feedItemId,cb) {
  // var feedItem = readDocument("feedItems",feedItemId);
  // feedItem.view_count = feedItem.view_count+1;
  // writeDocument("feedItems",feedItem);
  // emulateServerReturn(feedItem.view_count,cb);
  emulateServerReturn(0,cb);

}


// Get user's setting.
export function getUserSetting(userId, cb) {
  var user = readDocument('users', userId);
  var setting = {
    username: user.username,
    email: user.email,
    password: user.password
  };
  emulateServerReturn(setting, cb);
}

// Update user's setting.
export function updateUserSetting(newSetting, cb) {
  var user = readDocument('users', newSetting.user_id);
  user.username = newSetting.username;
  user.email = newSetting.email;
  user.password = newSetting.password;
  writeDocument('users', user);
  emulateServerReturn(user, cb);
}

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


// Get all information about the user.
export function getUserData(userId, cb) {
  var user = readDocument('users', userId);
  emulateServerReturn(user, cb);
}

export function getClassData(classId){
  var course = readDocument('classes', classId);
  var courseInfo ={
    class_id: classId,
    course_id: course.course_id,
    course_title: course.course_title
  };
  return courseInfo;
}
// Save new user profile information.
export function saveUserData(newUserProfile, cb) {
  var user = readDocument('users', newUserProfile.user_id);
  user.first_name = newUserProfile.first_name,
  user.last_name = newUserProfile.last_name,
  user.profilepic = newUserProfile.profilepic,
  user.favorite_quote = newUserProfile.favorite_quote,
  user.areas_of_interest = newUserProfile.areas_of_interest,
  user.classes_taken = newUserProfile.classes_taken,
  user.education_level = newUserProfile.education_level,
  user.academic_institution = newUserProfile.academic_institution,
  writeDocument('users', user);
  emulateServerReturn(user, cb);
}


//------------------------ Schedule Part
function getScheduleItem(scheduleId) {
	var schedules = readDocument('schedules', scheduleId);
	var scheduleData = {
    //console.log(indexSchedule);
     index: scheduleId,
     _id: schedules._id,
     completed: schedules.completed,
     contents: {
      // ID of the user that the appointment is with
      party : schedules.contents.party,
      date : schedules.contents.date,
      timestamp_start: schedules.contents.timestamp_start,
      timestamp_end: schedules.contents.timestamp_end,
      serviceContents: schedules.contents.serviceContents
    }
	};
	return scheduleData;
}


function getScheduleItemSync(scheduleItem) {
//  console.log(scheduleItem);
  scheduleItem._id = readDocument('users',scheduleItem._id);
  var userData = readDocument('users', scheduleItem.contents.party);
  scheduleItem.contents.party = userData.first_name;
    return scheduleItem;
}

export function getScheduleData(userId,cb) {
    // Get the User object with the id "user".
    var userData = readDocument('users', userId);
    var scheduleData = userData.schedules.map(function(scheduleId){
      return getScheduleItem(scheduleId);
    });
    scheduleData = scheduleData.map(getScheduleItemSync)
    emulateServerReturn(scheduleData, cb);
}

export function deleteSchedule(userId,scheduleId,cb) {
  var user = readDocument('users', userId);
  var scheduleData = user.schedules;
  var scheduleIndex = scheduleData.indexOf(scheduleId);
     //feedData = readDocument('academicfeeds', user.Academic_feed);
     // 'splice' removes items from an array.
     //This removes 1 element starting from userIndex.
     if (scheduleIndex !== -1) {
      scheduleData.splice(scheduleIndex, 1);
     }
  writeDocument('users', user);
  emulateServerReturn(scheduleData, cb);
}

// Get a list of user's short profiles.
export function getParticipantProfiles(box_msg_id, cb) {
	var messageBox = readDocument('messageboxes', box_msg_id);
	var participantList = messageBox.list_of_users;
	var participantProfiles = participantList.map(function(user_id) {
		return getShortProfile(user_id);
	});
	emulateServerReturn(participantProfiles, cb);
}

// Get the message box by its id.
export function getMessageBoxServer(box_msg_id, cb) {
	emulateServerReturn(readDocument('messageboxes', box_msg_id), cb);
}

// Client send message to the message box.
export function sendMessageServer(box_msg_id, user_id, content, cb) {
	// Get the current time.
	var time = new Date().getTime();
	var messageBox = readDocument('messageboxes', box_msg_id);
	// Check if the user is already in the conversation.
	if(messageBox.list_of_users.indexOf(user_id) !== -1) {
        // Push the message into the conversation box.
        messageBox.list_of_messages_by_users_in_box.push({
          'user_id': user_id,
          'timestamp': time,
          'content': content
        });
        writeDocument('messageboxes', messageBox);
	}
        // Return the udpated version of messageBox.
        emulateServerReturn(messageBox, cb);
}

// Get numberOfBoxes recent message boxes participated by the user.
export function getRecentMessageBoxes(userId, numberOfBoxes, cb) {
  // Read the user from the database.
  var user = readDocument('users', userId);
  // Get the last numberOfBoxes in the messageboxes.
  var reversedMsgBoxes = user.messageboxes;
  var recentBoxIds = reversedMsgBoxes.reverse().slice(0, numberOfBoxes);
  // Return the list with the callback.
  emulateServerReturn(recentBoxIds, cb);
}

// Create a new message box.
export function createMessageBox(userId, cb) {
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
  emulateServerReturn(messageBox, cb);
}

// Add a user into a message box.
export function joinMessageBox(box_msg_id, userId, cb) {
  console.log(box_msg_id + ' ' + userId);
  var messageBox = readDocument('messageboxes', box_msg_id);
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
  // Return the message box.
  emulateServerReturn(messageBox, cb);
}

export function resetDatabase() {
  sendXHR('POST',"/restdb",undefined,()=>{

  });
}
