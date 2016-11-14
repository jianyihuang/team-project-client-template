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
    feedItem.tag = readDocument("servicetags",feedItemId);
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

export function postRequest(user,location,contents,cb){

var time = new Date().getTime();

var newRequest ={
"likeCounter":[],
"contents":{
"author":user,
"postDate":time,
"location":location,
"contents":contents
}
};
//add to db
newRequest = addDocument('feedItem',newRequest);
var userData = readDocument('users',user);
var feedData = readDocument('feeds',userData.feed);
feedData.contents.unshift(newRequest._id);

writeDocument('feeds',feedData);

emulateServerReturn(newRequest,cb);
}
