// User schema for Mongoose
const mongoose = require("mongoose")

var usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
});

var Users = mongoose.model('user', usersSchema)

// export to connection.js

// let earthquakeSchema = new mongoose.Schema({
//     url: Mixed,
//     dateTime: Date,
//     magnititude: mag,
//     place: place
// });