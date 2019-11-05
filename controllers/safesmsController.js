console.log("\n safesmsController.js started");


const express = require('express');
const router = express.Router();

// Connection required to access db.
const connection = require("../config/connection"); // DB

// TODO verify user login

// API route controller
const userController = require('./api/userController');
const earthquakeController = require('./api/earthquakeController');
const messagingController = require('./api/messagingController');


router.get("/", function (req, res) {
    console.log("Redirect to home page")
    res.redirect("users");
});


router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.get("/alerts", earthquakeController.getEarthquakes);
// router.get("/messaging", messagingController.getMessages);

router.get("/users/edit", earthquakeController.getEarthquakes);


router.get("/messaging", function (req, res) {
    console.log("Render Messaging page")
    res.render("messaging");
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