console.log("\n usersSchema.js started \n");

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', userSchema);