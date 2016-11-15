import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "exSer";

// Put your mock objects here, as in Workshop 4
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
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedule": 1,
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },
    "2":{
      "_id":2,
      "first_name": "Karen",
      "last_name":"Zheung",
      "profilepic": 'img/pug.jpg',
      "username": "Thien",
      "password": "123abc",
      "email": "kzheung@umass.edu",
      "favorite_quote": "Anything I say.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedule": 1,
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },
    "3":{
      "_id":3,
      "first_name": "Karen",
      "last_name":"Zheung",
      "profilepic": 'img/cat.jpeg',
      "username": "Tim",
      "password": "123abc",
      "email": "kzheung@umass.edu",
      "favorite_quote": "Anything I say.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedule": 1,
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },
    "4":{
      "_id":4,
      "first_name": "Jucong",
      "last_name":"Zheung",
      "profilepic": 'img/pug.jpg',
      "username": "Jucong",
      "password": "123abc",
      "email": "kzheung@umass.edu",
      "favorite_quote": "Anything I say.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedule": 1,
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },
    "5":{
      "_id":5,
      "first_name": "Xin",
      "last_name":"Zheung",
      "profilepic": 'img/cat.jpeg',
      "username": "Xin",
      "password": "123abc",
      "email": "kzheung@umass.edu",
      "favorite_quote": "Anything I say.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedule": 1,
      "messageboxes":[1],
      "Academic_savedlists": 1,
      "Service_savedlists": 1
    },
    "6":{
      "_id":6,
      "first_name": "JianYi",
      "last_name":"Zheung",
      "profilepic": 'img/pug.jpg',
      "username": "JianYi",
      "password": "123abc",
      "email": "kzheung@umass.edu",
      "favorite_quote": "Anything I say.",
      "areas_of_interest":["Art", "Astronomy", "Technology"],
      "classes_taken":[1, 2, 3],
      "education_level": "Junior",
      //start of references
      "Academic_feed": 1,
      "Service_feed": 1,
      "schedule": 1,
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
    "_id": 1,
    "list_of_tasks":[1, 2]
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
        ]
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
        "contents": "sending hugs your way"
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
        "contents": "呵呵呵呵呵呵呵呵呵呵"
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
      "list_of_feeditems":[1]
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
      "type_of_service": "Landscaping"
    },
    "2":{
      "_id": 2,
      "type_of_service": "Home Improvement"
    }
  },


  "likelists":{
    "1":{
      "_id": 1,
      "list_of_users":[1, 2]
    }
  }

};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}
