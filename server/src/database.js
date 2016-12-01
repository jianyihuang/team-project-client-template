// Your startup's initial mock objects go here
var initialData = {
  "users":{
    "1":{
      "_id":1,
      "first_name": "Karen",
      "last_name":"Zheung",
      "profilepic": 'img/cat.jpeg',
      "username": "Karen",
      "password": "123abc",
      "email": "kzheung@umass.edu",
      "favorite_quote": "Anything I say.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      "academic_institution": "Umass Amherst",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedules": [1,2,3,4,5,6,7],
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },

    "2":{
      "_id":2,
      "first_name": "Thien",
      "last_name":"Dinh",
      "profilepic": 'img/kiwi.jpg',
      "username": "Thien",
      "password": "Thien'sPassword",
      "email": "tddinh@umass.edu",
      "favorite_quote": "You become what you think about.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      "academic_institution": "Umass Amherst",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedules": [1],
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },

    "3":{
      "_id":3,
      "first_name": "Timothy",
      "last_name":"Addai",
      "profilepic": 'img/cat.jpeg',
      "username": "Tim",
      "password": "Timtimpass",
      "email": "taddai@umass.edu",
      "favorite_quote": "I have a dream.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      "academic_institution": "Umass Amherst",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedules": [1],
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },

    "4":{
      "_id":4,
      "first_name": "Jucong",
      "last_name":"He",
      "profilepic": 'img/pug.jpg',
      "username": "Jucong",
      "password": "123abc",
      "email": "juconghe@umass.edu",
      "favorite_quote": "CSS Expert has nothing to say.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      "academic_institution": "Umass Amherst",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedules": [1],
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },

    "5":{
      "_id":5,
      "first_name": "Xin",
      "last_name":"Liu",
      "profilepic": 'img/cat.jpeg',
      "username": "Xin",
      "password": "XinPass",
      "email": "xliu0@umass.edu",
      "favorite_quote": "Scheduling like a boss.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      "academic_institution": "Umass Amherst",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedules": [1],
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },

    "6":{
      "_id":6,
      "first_name": "Jianyi",
      "last_name":"Huang",
      "profilepic": 'img/pug.jpg',
      "username": "JianYi",
      "password": "HuangJianyi!@#",
      "email": "jianyihuang@umass.edu",
      "favorite_quote": "You only live once.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      "academic_institution": "Umass Amherst",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedules": [1],
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
      }
    },

  "tasks":{
    "1":{
    "_id": 1,
    "completed": false,
    "contents": {
      //ID of the user that the appointment is with
      "party" : 3,
      "date" : "10/6/2016",
      "timestamp_start": "8:00 am",
      "timestamp_end": "12:00 pm",
      "contents": "MATH411"
    }
  },
    "2":{
      "_id": 2,
      "completed": false,
      "contents": {
        // ID of the user that the appointment is with
        "party" : 2,
        "date" : "10/6/2016",
        "timestamp_start": "8:00 am",
        "timestamp_end": "12:00 pm",
        "contents": "CS 250"
      }
    }
  },

  "schedules":{
    "1":{
      "index":1,
      "_id": 1,
      "completed": "COMPLETED",
      "contents": {
        // ID of the user that the appointment is with
        "party" : 2,
        "date" : "10/6/2016",
        "timestamp_start": "8:00 am",
        "timestamp_end": "12:00 pm",
        "serviceContents": "CS 250"
      }
    },
    "2":{
      "index":2,
      "_id": 1,
      "completed": "COMPLETED",
      "contents": {
        // ID of the user that the appointment is with
        "party" : 3,
        "date" : "10/6/2016",
        "timestamp_start": "8:00 am",
        "timestamp_end": "12:00 pm",
        "serviceContents": "CS 250"
      }
    },
    "3":{
      "index":3,
      "_id": 1,
      "completed": "COMPLETED",
      "contents": {
        // ID of the user that the appointment is with
        "party" : 1,
        "date" : "10/6/2016",
        "timestamp_start": "8:00 am",
        "timestamp_end": "12:00 pm",
        "serviceContents": "CS 311"
      }
    },
    "4":{
      "index":4,
      "_id": 2,
      "completed": "COMPLETED",
      "contents": {
        // ID of the user that the appointment is with
        "party" : 2,
        "date" : "10/6/2016",
        "timestamp_start": "8:00 am",
        "timestamp_end": "12:00 pm",
        "serviceContents": "CS 121"
      }
    },
    "5":{
      "index":5,
      "_id": 2,
      "completed": "COMPLETED",
      "contents": {
        // ID of the user that the appointment is with
        "party" : 2,
        "date" : "10/6/2016",
        "timestamp_start": "8:00 am",
        "timestamp_end": "12:00 pm",
        "serviceContents": "CS 121"
      }
    },
    "6":{
      "index":6,
      "_id": 6,
      "completed": "COMPLETED",
      "contents": {
        // ID of the user that the appointment is with
        "party" : 2,
        "date" : "10/6/2016",
        "timestamp_start": "8:00 am",
        "timestamp_end": "12:00 pm",
        "serviceContents": "CS 121"
      }
    },
    "7":{
      "index":7,
      "_id": 1,
      "completed": "COMPLETED",
      "contents": {
        // ID of the user that the appointment is with
        "party" : 2,
        "date" : "10/6/2016",
        "timestamp_start": "8:00 am",
        "timestamp_end": "12:00 pm",
        "serviceContents": "CS 121"
      }
    }
  },

  "messageboxes":{
    "1":{
      "_id": 1,
      "list_of_users":[6, 3, 5, 4, 1, 2],
      "list_of_messages_by_users_in_box":[
          {
          user_id: 6, timestamp: 1479148390962, content: 'the current homepage we have wont count as a page. It would make sense that after the user logs in they are directed to the academic or academic subject page but someone is doing those pages already'
          },
          {
          user_id: 3, timestamp: 1479148390962, content: 'is the academic page the one with the grids. I know but I gotta study for interview,so im trynna get basic in then improve upon it'
          },
          {
          user_id: 5, timestamp: 1479148390962, content: 'how are you guys doing I am considering adding some material design concept in UI'
          },
          {
          user_id: 4, timestamp: 1479148390962, content: 'good job, Jucong. You may create a writeup document for the team if you want.'
          },
          {
          user_id: 5, timestamp: 1479148390962, content: 'I only have time after 5 tmr'
          },
          {
          user_id: 4, timestamp: 1479148390962, content: 'ok ok ok guys, it\'s fine. We\'ll figure this out.'
          },
          {
          user_id: 5, timestamp: 1479148390962, content: 'If possible, can you guys all implement the floating effect ? It\'s very straight forward'
          },
          {
          user_id: 1, timestamp: 1479148390962, content: 'I changed the config if you are satisfied with that I will add the css'
          },
          {
          user_id: 2, timestamp: 1479148390962, content: 'I thought someone else is doing that one. I can do that too.'
          }
        ],
        "creation_timestamp": 1479148390962
    }
  },

  "classes":{
    "1":{
      "_id": 1,
      "course_id": "CS311",
      "course_title": "Introduction to Algorithms"
    },
    "2":{
      "_id": 2,
      "course_id": "CS250",
      "course_title": "Introduction to Computation"
    },
    "3":{
      "_id": 3,
      "course_id": "MATH132",
      "course_title": "Calculus 2"
    }
  },

  "Academic_savedlists":{
    "1":{
      "_id": 1,
      "list_of_feeditems":[1]
    }
  },

  "Service_savedlists":{
    "1":{
      "_id": 1,
      "list_of_posts":[1]
    }
  },

  "feedItems":{
    "1":{
      "_id": 1,
      // references post item for content
      "view_count": 25,
      "likeCounter": [1],
      // Taggs are by course_id
      "tag": 1,
      "list_of_comments":[1],
      "contents": {
        "author": 1,
        "timestamp": 1453668480000,
        "request": "Oh god! CS311 homework is too hard! PlZZZ help",
        "contents": "sending hugs your way",
        "imgUrl":"img/question_img.jpeg"
      }
    },
    "2":{
      "_id": 2,
      // references post item for content
      "view_count": 2,
      "likeCounter": [1],
      // Taggs are by course_id
      "tag": 1,
      "list_of_comments":[1],
      "contents": {
        "author": 1,
        "timestamp": 1453668480000,
        "request": "Oh god! Chinese homework is too hard! PlZZZ help",
        "contents": "呵呵呵呵呵呵呵呵呵呵",
        "imgUrl":"img/history.jpg"
      }
    },
    "3":{
      "_id": 3,
      // references post item for content
      "view_count": 0,
      "likeCounter": [1],
      // Taggs are by course_id
      "tag": 1,
      "list_of_comments":[1],
      "contents": {
        "author": 1,
        "timestamp": 1453668480000,
        "request": "Oh god! My toilet was stucked! PlZZZ help",
        "contents": "呵呵呵呵呵呵呵呵呵呵",
        "imgUrl":"img/toilet_stuck.jpg"
      }
    }
  },

  "comments":{
    "1":{
      "_id": 1,
      "author": 1,
      "timestamp": 1453668480000,
      "contents": "I can help!",
      "like_count": [2]
    }
  },

  "servicefeeds":{
    // service feed for user 1, Karen
    "1":{
      "_id": 1,
      // references to the ids of the post(s) in feed 1
      "list_of_feeditems":[3]
    }
  },

  "academicfeeds":{
    // academic feed for karen
    "1":{
      "_id": 1,
      "list_of_feeditems":[1,2]
    }
  },

  "servicetags":{
    "1":{
      "_id": 1,
      "type_of_service": "Computer Science"
    },
    "2":{
      "_id": 2,
      "type_of_service": "Math"
    },
    "3":{
      "_id": 3,
      "type_of_service": "Music"
    },
    "4":{
      "_id": 4,
      "type_of_service": "History"
    },
    "5":{
      "_id": 5,
      "type_of_service": "Physics"
    },
    "6":{
      "_id": 6,
      "type_of_service": "English"
    },
    "7":{
      "_id": 7,
      "type_of_service": "Pet Related"
    },
    "8":{
      "_id": 8,
      "type_of_service": "Home Improvement"
    },
    "9":{
      "_id": 9,
      "type_of_service": "Travel"
    },
    "10":{
      "_id": 10,
      "type_of_service": "Yard"
    },
    "11":{
      "_id": 11,
      "type_of_service": "Plumer"
    },
    "12":{
      "_id": 12,
      "type_of_service": "Car Pool"
    }
  },


  "likelists":{
    "1":{
      "_id": 1,
      "list_of_users":[1, 2]
    }
  }

};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), { encoding: 'utf8' });
    updated = false;
  }
}, 200);
