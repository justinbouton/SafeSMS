const User = require('../db/usersSchema'); // WORKING!
const Earthquake = require('../db/earthquakeSchema'); // Test
const users = require('../db/users'); // WORKING!
var connection;

//Set up mongoose connection
var mongoose = require('mongoose');
var dbName = "safesms";
var mongoDB = `mongodb://localhost:27017/${dbName}`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

/////////// WARNING THIS WILL DROP THE CURRENT DATABASE ///////////
// db.dropDatabase();

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log(`\nConnected to database: ${dbName} \n`));


// WORKING
// Each user in users array add to User db with User.create.
// Convert to onClick function for when users are entered manually or csv is uploaded.
// const userArrLength = users.length  
// for (var i = 0; i < userArrLength; i++) {

//   const firstName = users[i].firstName 
//   const lastName = users[i].lastName 
//   const email = users[i].email 
//   const phone = users[i].phone

// User.create({ firstName, lastName, email, phone }, function (err, user) {
//     if (err) return handleError(err);
//     // saved!
//     console.log("\n\nUser created: \n\n" + user);
//   });
// };




// User.Find by lastName  // WORKING
var nameBouton = "Bouton";

function findUser(name) {
    User.find({ "lastName": name }, 'firstName lastName', function (err, user) {
        if (err) return handleError(err);
            // 'user' contains the list of user that match the criteria.
            console.log(`\nFound user: \n\n${user}`);
    })
};

// findUser(nameBouton) // WORKING

// Export for ./orm.js temp directly to safeSMS_controller
module.exports = User;