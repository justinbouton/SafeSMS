//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const loginSchema = new Schema({
    created: { type: Date, default: Date.now },
    // isAdmin: Boolean, 
    // TODO companyId: String, // Pull from companySchema id
    email: String,
    password: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Login', loginSchema);