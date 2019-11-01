console.log("\n safesms_controller.js started \n");


const express = require('express');
const router = express.Router();

// REMOVE AFTER TEST
// Connection required to access db.
const connection = require("../config/connection"); // DB

// TODO verify user login

// API route controller
const userController = require('../controllers/api/userController');
const earthquakeController = require('../controllers/api/earthquakeController');
const messagingController = require('../controllers/api/messagingController');


router.get("/", function (req, res) {
    console.log("Redirect to status page")
    res.redirect("status");
});


router.get("/status", userController.getUsers);
router.get("/alerts", earthquakeController.getEarthquakes);
// router.get("/messaging", messagingController.getMessages);

router.get("/messaging", function (req, res) {
    console.log("Render Messaging page")
    // Messages.find({ }, function(err, earthquakes) {
    //     var data = messages
    //     // Log any errors if the server encounters one
    //     if (err) {
    //       console.log(err);
    //     }
    //     // Otherwise, send the result of this query to the browser
    //     else {
    //         console.log("Reading from messaging DB")
    //     // Once the DB query completes
    //         res.render("alerts", {
    //             data
    //         });
              res.render("messaging");
        // } 
    // });
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