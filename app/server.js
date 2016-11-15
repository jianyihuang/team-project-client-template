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
      "contents": contents.value
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

function joinMessageBox(box_msg_id, userId, cb) {
	var messageBox = readDocument('messageboxes', box_msg_id);
	messageBox.list_of_Users.push(userId);
	emulateServerReturn(messageBox, cb);
}

// Get the user's short profile.
function getShortProfile(userId) {
	var user = readDocument('users', userId);
	var profile = {
		user_id: userId,
		username: user.username,
		profilepic: user.profilepic
	};
	return profile;
}

// Get a list of user's short profiles.
export function getParticipantProfiles(box_msg_id, cb) {
	var messageBox = readDocument('messageboxes', box_msg_id);
	var participantList = messageBox.list_of_users;
	var participantProfiles = participantList.map(function(user_id, i) {
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
