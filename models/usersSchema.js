// console.log("\n'usersSchema.js started'");

//Require Mongoose and bcrypt
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;

const userSchema = new Schema({
    isAdmin: {type: Boolean, default: false},// Cannot sign up unless true. If admin true and password exist redirect
    created: Date,
    modified: {type: Date, default: Date.now}, // TODO change to updated
    // password: { type: String, required: true }, // commented out to load seed data, need to add passwords in usersData.js
    
    // companyId: String, // Pull from companySchema id
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: { type: Number, unique: true }
});


// Bcrypt
// uzserSchema.pre('save', function (next) {
// console.log("\n\nuserSchema save hit!")
//     var user = this;

//     if (this.isModified('password') || this.isNew) {
//         bcrypt.genSalt(saltRounds, function (err, salt) {
//             if (err) {
//                 return next(err);
//             }
//             bcrypt.hash(user.password, salt, function (err, hash) {

//                 if (err) {
//                     return next(err);
//                 }
//                 user.password = hash;

//                 next();
//             });
//         });
//         console.log("Salted Caramel")
//     } else {
//         return next();
//     }
// });

// userSchema.methods.comparePassword = function (passw, cb) {
//     bcrypt.compare(passw, this.password, function (err, isMatch) {
//     console.log(`passw ${passw}`)

//         if (err) {
//             return cb(err);
//         }
//         cb(null, isMatch);
//     });
// };

// Export function to create User model class
module.exports = mongoose.model('User', userSchema);