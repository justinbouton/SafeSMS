// console.log("\n messagingSchema.js started \n");

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const messagingSchema = new Schema({
    created_at: { type: Date, default: Date.now },
    user: String,
    message_body: String,
    message_status:{type: Boolean, default: false}
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Messages', messagingSchema);