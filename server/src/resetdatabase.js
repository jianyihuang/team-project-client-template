// Processes the next collection in the collections array.
// If we have finished processing all of the collections,
// it triggers the callback.
function processNextCollection() {
  if (i < collections.length) {
    var collection = collections[i];
    i++;
    // Use myself as a callback.
    resetCollection(db, collection, processNextCollection);
  } else {
    cb();
  }
}

// Start processing the first collection!
processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
// Called directly, via 'node src/resetdatabase.js'.
// Connect to the database, and reset it!
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/' + databaseName;
MongoClient.connect(url, function(err, db) {
  if (err) {
    throw new Error("Could not connect to database: " + err);
  } else {
    console.log("Resetting database...");
    resetDatabase(db, function() {
      console.log("Database reset!");
      // Close the database connection so NodeJS closes.
      db.close();
    });
  }
});
} else {
// require()'d.  Export the function.
module.exports = resetDatabase;
}
