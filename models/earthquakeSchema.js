// console.log("\n earthquakeSchema.js started");

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const earthquakeSchema = new Schema({
    id: String,
    time: String,
    place: String,
    url: String,
    mag: Number
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Earthquake', earthquakeSchema);