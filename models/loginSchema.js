//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

const loginSchema = new Schema({
    created: { type: Date, default: Date.now },
    // isAdmin: Boolean, // May not need
    // TODO companyId: String, // Pull from companySchema id // May not need
    email: { type: String, required: true },
    password: { type: String, required: true }
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Login', loginSchema);