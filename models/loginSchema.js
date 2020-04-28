//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const loginSchema = new Schema({
    lastLogin: { type: Date, default: Date.now },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Login', loginSchema);