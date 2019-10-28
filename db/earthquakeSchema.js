console.log("\n earthquakeSchema.js started \n");

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const earthquakeSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Earthquake', earthquakeSchema);