import {readDocument, writeDocument, addDocument} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
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

export function getFeedData(user,type, cb) {
    // Get the User object with the id "user".
    var userData = readDocument('users', user);
    // Get the Feed object for the user.
    // 1 is academic feed
    // 2 is Service feed
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
    // Return FeedData with resolved references.
    // emulateServerReturn will emulate an asynchronous server operation, which
    // invokes (calls) the "cb" function some time in the future.
    emulateServerReturn(feedData, cb);
}

export function postStatusUpdate(user, contents,type, cb) {
  var time = new Date().getTime();
  var newPost = {
    "view_count": 0,
    "likeCounter": [],
    // Taggs are by course_id
    "tag": 1,
    "list_of_comments":[],
    "contents": {
      "author": user,
      "timestamp": time,
      "request": contents.title,
      "contents": contents.value,
      "imgUrl":contents.imgUrl
    }
  }
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
  writeDocument('feedItems', newPost);
  emulateServerReturn(feedData, cb);
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
  var feedItem = readDocument("feedItems",feedItemId);
  feedItem.view_count = feedItem.view_count+1;
  writeDocument("feedItems",feedItem);
  emulateServerReturn(feedItem.view_count,cb);
}

// Create a new message box.
function createMessageBox(userId, cb) {
	// Get the current time.
	var time = new Date().getTime();
	// Create a message box.
	var messageBox = {
		'creation_timestamp': time,
		'list_of_users': [],
		'list_of_messages_by_users_in_box': []
	}
	messageBox = addDocument('messageboxes', messageBox);
	emulateServerReturn(messageBox, cb);
}

// Add a user into a message box.
function joinMessageBox(box_msg_id, userId, cb) {
	var messageBox = readDocument('messageboxes', box_msg_id);
	messageBox.list_of_Users.push(userId);
	emulateServerReturn(messageBox, cb);
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
     _id: scheduleId,
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

<<<<<<< HEAD
<<<<<<< HEAD
function getClassItemSync(classItem) {
  classItem._id = readDocument('classes', classItem._id);
  classItem.course_title = readDocument('classes', classItem.course_title);
    return classItem;
}

function getClass(classId) {
  var classItem = readDocument('classes', classId);
  var classData = {
    _id: classId,
    course_id: classItem.course_id,
    course_title: classItem.course_title
  };
  return classData;
}

export function getUserClasses(userId, cb) {
  var userData = readDocument('users', userId);
  var classTaken = userData.classes_taken.map(function(classId) {
    return getClass(classId);
  });
  classTaken = classTaken.map(getClassItemSync)
  emulateServerReturn(classTaken, cb);
=======
export function deleteFeed(userId,feedItemId,type,cb) {
=======
export function deleteSchedule(userId,feedItemId,type,cb) {
>>>>>>> 94f4a53df1d068b17eab9526ffe5b5341331b3e8
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
  }
  emulateServerReturn(feedData, cb);
}
//-------------------------------------------------



>>>>>>> 4e48fdb21531a3938183e196ceb56f28900c281f

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
	if(messageBox.list_of_users.indexOf(user_id) === -1) {
		messageBox.list_of_users.push(user_id);
	}
	// Push the message into the conversation box.
	messageBox.list_of_messages_by_users_in_box.push({
		'user_id': user_id,
		'timestamp': time,
		'content': content
	});
	// Update in the database.
	writeDocument('messageboxes', messageBox);
	// Return the udpated version of messageBox.
	emulateServerReturn(messageBox, cb);
}
