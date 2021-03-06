var connection;

//Mongoose connection
const config = require('./config');
const mongoose = require('mongoose');
const dbName = config.connectionString;
// var dbName = "safesms"; // changed mongoose.connect(mongoDb to ||
// var mongoDB = `mongodb://localhost:27017/${dbName}`;
mongoose.connect(process.env.MONGODB_URI || dbName, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }); 
var db = mongoose.connection; 

/////////// WARNING THIS WILL DROP THE CURRENT DATABASE ///////////
// db.dropDatabase();

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log(`\nConnected to DB ${dbName} \n`));
// db.once('open', () => console.log(`\nConnected to database: ${dbName} \n`));



// WORKING uncomment to load static notes and quake data.

// const Earthquake = require('../models/earthquakeSchema');
// const earthquake = require('../db/earthquakeData')
// const Notes = require('../models/noteSchema');
// const note = require('../db/noteData')
// const earthquakeArrLength = earthquake.length  

// for (var i = 0; i < earthquakeArrLength; i++) {

//   const id = earthquake[i].id 
//   const time = earthquake[i].time 
//   const place = earthquake[i].place 
//   const url = earthquake[i].url
//   const mag = earthquake[i].mag
//   const earthquakeId = earthquake[i].id
//   const noteBody = note[i].noteBody

//   console.log(earthquakeId)
//   console.log(noteBody)

//     Earthquake.create({ id, time, place, url, mag }, function (err, earthquake) {
//         if (err) return handleError(err);
//         // saved!
//         console.log("\n\nEntry to Earthquake DB: \n\n" + earthquake);
//     });
//     Notes.create({ earthquakeId, noteBody }), function (err, note) {
//         if (err) return handleError(err);
//         // saved!
//     console.log("\n\nEntry to Notes DB: \n\n" + note);
//     }
// };



// // WORKING uncomment to load static megissaging data.

// const Messaging = require('../models/messagingSchema'); // Test
// const messaging = require('../db/messagingData')
// const messagingArrLength = messaging.length  

// for (var i = 0; i < messagingArrLength; i++) {

//   const created = messaging[i].created 
//   const userId = messaging[i].userId 
//   const messageBody = messaging[i].messageBody
//   const messageAdmin = messaging[i].messageAdmin


// Messaging.create({ created, userId, messageBody, messageAdmin }, function (err, messaging) {
//     if (err) console.log(err);
//     // saved!
//     console.log("\n\nMessage entry to Messaging DB: \n\n" + messaging);
//   });
// };


// // TODO test uncomment to load static user data.

// const User = require('../models/usersSchema'); 
// const users = require('../db/usersData');
// const userArrLength = users.length  
// for (var i = 0; i < userArrLength; i++) {

//   const isAdmin = users[i].isAdmin 
//   const created = users[i].created 
//   const hash = users[i].hash 
//   const companyId = users[i].companyId 
//   const updated = users[i].updated 
//   const firstName = users[i].firstName 
//   const lastName = users[i].lastName 
//   const email = users[i].email 
//   const phone = users[i].phone

// User.create({ isAdmin, created, hash, companyId, updated, firstName, lastName, email, phone }, function (err, user) {
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