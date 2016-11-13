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
      "username": "Misohappi",
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
  "messages":{
    "1":{
      "_id": 1,
      //id of user that sent this message
      "sender": 2,
      "time_stamp": "3:24 pm",
      "content": "how are you guys doing I am considering adding some material design concept in UI"
    }
  },
  "messageboxes":{
    "1":{
      "_id":[],
      "list_of_users":[],
      "list_of_messages_by_users_in_box":[
      "1":{
        "user_id":[],
        "time_stamp":[],
        "content":[]
      }]
    }
  },
  "feeds":{
    "1":{
      "_id":[],
      "list_of_feeditems":[],
      //start of embedding
      "academicfeeds":{
        "_id":[],
        "list_of_feeditems":[]
      },
      "servicefeeds":{
        "_id":[],
        "list_of_feeditems":[]
      }
    }
  },

  "academicfeeds":{
    // academic feed for karen
    "1":{
      "_id": 1,
      "list_of_feeditems":[1]
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
      "course_id": "Calculus 2"
    }
  },
  "Academic_savedlists":{
    "1":{
      "_id": 1,
      "list_of_feeditems":[1],
    }
  },

  "Service_savedlists":{
    "1":{
      "_id": 1,
      "list_of_posts":[1],
    }
  },

  "feeditems":{
    "1":{
      "_id": 1,
      // references post item for content
      "content":[1],
      "timestamp": "",
      "view_count": 25,
      // Taggs are by course_id
      "tag":[1]
    }
  },
  "servicefeeds":{
    // service feed for user 1, Karen
    "1":{
      "_id": 1,
      // references to the ids of the post(s) in feed 1
      "list_of_posts":[1]
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
  "comments":{
    "1":{
      "_id": 1,
      "author": 1,
      "timestamp": 1453668480000,
      "contents": "I can help!",
      "like_count": [2]
    }
  },
  "likelists":{
    "1":{
      "_id": 1,
      "list_of_users":[1, 2],
    }
  },
  "posts":{
  "1":{
    "_id": 1,
    // reference to servicetags
    "service_type": [1],
    //
    "like_list" 1,
    // refers to user id
    "like_count": [1, 2],
    "list_of_comments":[1],
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

/**
 * Reset database button.
 */
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}

ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);
