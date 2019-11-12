// console.log("\n messagingSchema.js started \n");

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const messagingSchema = new Schema({
    created: { type: Date, default: Date.now },
    userId: String,
    messageId: String,
    messageBody: String,
    messageAdmin:{type: Boolean, default: false}
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Messages', messagingSchema);