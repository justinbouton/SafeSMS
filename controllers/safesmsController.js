const express = require('express');
const router = express.Router();

// Passport and JWT
const jwt = require('jsonwebtoken');
var passport = require('passport');
require('../config/passport')(passport);


// Connection required to access db.
const connection = require("../config/connection"); // DB

// API route controller
// const loginController = require('./api/loginController');
const userController = require('./api/userController');
const earthquakeController = require('./api/earthquakeController');
const messagingController = require('./api/messagingController');
const noteController = require('./api/noteController');
const User = require('../models/usersSchema');



router.get("/", function (req, res) {
    console.log("Redirect to home page")
    res.redirect("users");
});
  
// Create a router for login or sign-in.
router.post('/login', function(req, res) {
User.findOne({
    username: req.body.username
}, function(err, user) {
    if (err) throw err;

    if (!user) {
    res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
    // check if password matches
    user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
        // if user is found and password is right create a token
        var token = jwt.sign(user, config.secret);
        // return the information including token as JSON
        res.json({success: true, token: 'JWT ' + token});
        } else {
        res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
    });
    }
});
});
  
//   // Create a router to add a new book that only accessible to an authorized user.
//   router.post('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//       console.log(req.body);
//       var newBook = new Book({
//         isbn: req.body.isbn,
//         title: req.body.title,
//         author: req.body.author,
//         publisher: req.body.publisher
//       });
  
//       newBook.save(function(err) {
//         if (err) {
//           return res.json({success: false, msg: 'Save book failed.'});
//         }
//         res.json({success: true, msg: 'Successful created new book.'});
//       });
//     } else {
//       return res.status(403).send({success: false, msg: 'Unauthorized.'});
//     }
//   });
  
//   // Create a router for getting a list of books that accessible for an authorized user.
//   router.get('/book', passport.authenticate('jwt', { session: false}), function(req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//       Book.find(function (err, books) {
//         if (err) return next(err);
//         res.json(books);
//       });
//     } else {
//       return res.status(403).send({success: false, msg: 'Unauthorized.'});
//     }
//   });
  
  // Create a function for parse authorization token from request headers.
  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };


// // Login controller
// // TODO User cannot sign up unless isAdmin: true. If true and password exist redirect to login. If true and no password allow sign up. 

// router.get("/signup", loginController.signUp);
// Signup GET route
router.get("/signUp", function (req, res) {
    res.render("signUp")
}); 
// Signup POST route
router.post('/signup', userController.createAdmin);


// // TODO setup/verify user login
// // router.get("/login", loginController.login); // TODO convert to loginController
// router.get("/login", function (req, res) {
//     res.render("login")
// });

// Users controller
router.get("/users", userController.getUsers);
router.post("/users/newUser", userController.createUser);
// router.post("/users/newAdmin", userController.createUser);
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