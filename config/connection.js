console.log("\n connection.js started \n");


// MongoDB database
const mongoose = require("mongoose")
const dbName = "safesms";
const dbRoute = `mongodb://localhost:27017/${dbName}`;
var connection;

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
var db = mongoose.connection;
db.once('open', () => console.log(`Connected to "${dbName}" database`, "\n"));
// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export for ./orm.js temp directly to safeSMS_controller
module.exports = connection;