const express = require('express');
const router = express.Router();

// Connection required to access db.
const connection = require("../config/connection"); // DB

// API route controller
// const loginController = require('./api/loginController');
const userController = require('./api/userController');
const earthquakeController = require('./api/earthquakeController');
const messagingController = require('./api/messagingController');
const noteController = require('./api/noteController');


router.get("/", function (req, res) {
    console.log("Redirect to home page")
    res.redirect("users");
});

// Login controller
// TODO User cannot sign up unless isAdmin: true. If true and password exist redirect to login. If true and no password allow sign up. 
// TODO sign up 
// router.get("/signup", loginController.signUp);
router.get("/signUp", function (req, res) {
    res.render("signUp")
}); // WORKING mock up page
router.post("/signUp/newUser", userController.createUser); // TODO


// TODO setup/verify user login
// router.get("/login", loginController.login); // TODO convert to loginController
router.get("/login", function (req, res) {
    res.render("login")
});

// Users controller
router.get("/users", userController.getUsers);
router.post("/users/newUser", userController.createUser);
router.get("/users/:id", userController.getUserById);

// Messaging
router.post("/users/newMessage", messagingController.createMessage);
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

// earthquake controller
router.get("/alerts", earthquakeController.getEarthquakes);

// note controller
// router.get("/notes/", noteController.getNotes);
router.post("/notes/newNote", noteController.createNote);
router.get("/notes/:id", noteController.getNoteById);
// router.get("/notes/:id", noteController.getNoteById);
// router.post("/notes/newNote", noteController.createNote);


// router.post("/alerts", earthquakeController.createEarthquakes);

// Export to 
module.exports = router;