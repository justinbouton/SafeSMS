// console.log("\n messagingSchema.js started \n");

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const messagingSchema = new Schema({
    messageAdmin:{type: Boolean, default: false},
    created: { type: Date, default: Date.now },
    userId: String,
    messageBody: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Messages', messagingSchema);