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



// // WORKING uncomment to load static quake data.

// const Earthquake = require('../db/earthquakeSchema'); // Test
// const earthquake = require('../db/earthquake')
// const userArrLength = earthquake.length  

// for (var i = 0; i < userArrLength; i++) {

//   const id = earthquake[i].id 
//   const time = earthquake[i].time 
//   const place = earthquake[i].place 
//   const url = earthquake[i].url
//   const mag = earthquake[i].mag

// Earthquake.create({ id, time, place, url, mag }, function (err, earthquake) {
//     if (err) return handleError(err);
//     // saved!
//     console.log("\n\nUser entry to Earthquake DB: \n\n" + earthquake);
//   });
// };



// // WORKING uncomment to load static user data.

// const Users = require('../db/earthquakeSchema'); // Test
// const users = require('../db/users');
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
// var nameBouton = "Bouton";

// function findUser(name) {
//     User.find({ "lastName": name }, 'firstName lastName', function (err, user) {
//         if (err) return handleError(err);
//             // 'user' contains the list of user that match the criteria.
//             console.log(`\nFound user: \n\n${user}`);
//     })
// };

// findUser(nameBouton) // WORKING

// Export to safeSMS_controller
module.exports = connection;