// console.log("\n usersSchema.js started");

//Require Mongoose and bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define a schema
var Schema = mongoose.Schema;

const userSchema = new Schema({
    isAdmin: {type: Boolean, default: false},// Cannot sign up unless true. If admin true and password exist redirect
    created: Date,
    modified: {type: Date, default: Date.now}, // TODO change to updated
    password: { type: String, required: true },
    // companyId: String, // Pull from companySchema id
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
});

// TEST bcrypt
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

userSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.local.password)
};


//Export function to create "SomeModel" model class
module.exports = mongoose.model('User', userSchema);