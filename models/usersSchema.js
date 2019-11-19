// console.log("\n usersSchema.js started");

//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const userSchema = new Schema({
    isAdmin: {type: Boolean, default: Date.now},// Cannot sign up unless true. If admin true and password exist redirect
    created: Date,
    modified: {type: Date, default: Date.now}, // TODO change to updated
    hash: { type: String, required: true },
    companyId: String, // Pull from companySchema id
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', userSchema);