console.log("\n usersSchema.js started \n");

var usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
});

var Users = mongoose.model('users', usersSchema)