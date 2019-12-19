//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    created: { type: Date, default: Date.now },
    earthquakeId: String,
    noteBody: String
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('Notes', noteSchema);