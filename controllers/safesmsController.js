// console.log("\n safesmsController.js started");


const express = require('express');
const router = express.Router();

// Connection required to access db.
const connection = require("../config/connection"); // DB

// API route controller
const loginController = require('./api/loginController');
const userController = require('./api/userController');
const earthquakeController = require('./api/earthquakeController');
const messagingController = require('./api/messagingController');


router.get("/", function (req, res) {
    console.log("Redirect to home page")
    res.redirect("users");
});

// Login controller
// TODO User cannot sign up unless isAdmin: true. If true and password exist redirect to login. If true and no password allow sign up. 
// TODO sign up 
// router.get("/signup", loginController.signUp);
// TODO verify user login
// router.get("/login", loginController.login);
router.get("/login", function (req, res) {
    res.render("login")
}); // TEST mock up page

// Users controller
router.get("/users", userController.getUsers);
router.post("/users/newUser", userController.createUser);
router.get("/users/:id", userController.getUserById);

// Messaging controller
router.post("/users/newMessage", messagingController.createMessage);

router.get("/alerts", earthquakeController.getEarthquakes);
// router.get("/messaging", messagingController.getMessages);


router.get("/messaging", function (req, res) {
    console.log("Render Messaging page");
    // res.render("messaging");
    res.render("error404");
});

router.get("/err404", function (req, res) {
    console.log("error 404");
    res.render("error404");
});

// router.post("/burgers/create", function (req, res) {
//     burger.insertOne(req.body.burger_name, function(data) {
//         console.log("burg_controller data: " + data);

//         res.redirect("/");
//     });
// });

// router.put("/burgers/:id", function(req, res) { 
//     var id = req.params.id;

//     burger.updateOne(id, function(result) {
//     console.log(result);
    
//     res.sendStatus(200)
//     });
// });

// Export to 
module.exports = router;