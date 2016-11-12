import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = "exSer";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users":{
    "1":{
      "_id":1,
      "first_name":[],
      "last_name":[],
      "username":[],
      "password":[],
      "email":[],
      "favorite_quote":[],
      "areas_of_interest":[],
      "classes_taken":[],
      "education_level":[],
      //start of references
      "feed":[],
      "comments":[],
      "likeLists":[],
      "tasks":[],
      "messages":[],
      "messageboxes":[],
      //start of embedded
      "schedules":{
        "_id":[],
        "list_of_tasks":[]
      },
      "savedlists":{
        "_id":[],
        "list_of_feeditems":[]
      }
    }
  },
  "tasks":{
    "1":{
    "_id":[],
    "timestamp_start":[],
    "timestamp_end":[],
    "content":[],
    //start of references
    "schedules":[]
    }
  },
  "schedules":{
    "1":{
    "_id":[],
    "list_of_tasks":[]
    }
  },
  "messages":{
    "1":{
      "_id":[],
      "time_stamp":[],
      "content":[],
      //start of embedded
      "messageboxes":{
        "_id":[],
        "list_of_users":[],
        "list_of_messages_by_users_in_box":[]
      }
    }
  },
  "messageboxes":{
    "1":{
      "_id":[],
      "list_of_users":[],
      "list_of_messages_by_users_in_box":[]
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
    "1":{
      "_id":[],
      "list_of_feeditems":[],
      // start of references
      "classes":[],
      "feeditems":[]
    }
  },
  "classes":{
    "1":{
      "_id":[],
      "course_id":[],
      "course_title":[]
    }
  },
  "savedlists":{
    "1":{
      "_id":[],
      "list_of_feeditems":[],
      //start of references
      "feeditems":[]
    }

  },
  "feeditems":{
    "1":{
      "_id":[],
      "content":[],
      "timestamp":[],
      "view_count":[],
      "tag":[]
    }
  },
  "servicefeeds":{
    "1":{
      "_id":[],
      "list_of_feeditems":[],
      //stat of reference
      "servicetags":[],
      "feeditems":[]
    }
  },
  "servicetags":{
    "1":{
      "_id":[],
      "type_of_service":[]
    }
  },
  "comments":{
    "1":{
      "_id":[],
      "timestamp":[],
      //start of embedding
      "posts":{
        "_id":[],
        "post_types":[],
        "like_list":[],
        "like_count":[],
        "like_of_comments":[]
      }
    }
  },
  "likelists":{
    "1":{
      "_id":[],
      "list_of_users":[],
      //start of embedded
      "posts":{
        "1":{
          "_id":[],
          "post_types":[],
          "like_list":[],
          "like_count":[],
          "like_of_comments":[]
        }
      }
    }
  },
  "posts":{
  "1":{
    "_id":[],
    "post_types":[],
    "like_list":[],
    "like_count":[],
    "like_of_comments":[],
    //start of embedding
    "feeditems":{
      "1":{
        "_id":[],
        "content":[],
        "timestamp":[],
        "view_count":[],
        "tag":[]
      }
      }
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
