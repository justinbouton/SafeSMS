console.log("\n safeSMS_controller.js started \n");


const express = require('express');
const router = express.Router();
// Connection required to access db.
const connection = require("../config/connection"); 
const User = require('../db/usersSchema'); // WORKING!
const Earthquake = require('../db/earthquakeSchema'); // Test


router.get("/", function (req, res) {
        console.log("Redirect to status page")
        res.redirect("status");
        // connection
});


router.get("/status", function (req, res) {
    console.log("Render Status 'home' page");
    // Query: In our database, go to the animals collection, then "find" everything
    User.find({ }, function(err, users) {
        var data = users
        // Log any errors if the server encounters one
        if (err) {
          console.log(err);
        }
        // Otherwise, send the result of this query to the browser
        else {
            console.log("Reading from users DB")
        // Once the DB query completes
            res.render("index", {
                data
            });
            //   res.json(users);
        }
        
    });
});

router.get("/alerts", function (req, res) {
    console.log("Render Alerts page")
    Earthquake.find({ }, function(err, earthquakes) {
        var data = earthquakes
        // Log any errors if the server encounters one
        if (err) {
          console.log(err);
        }
        // Otherwise, send the result of this query to the browser
        else {
            console.log("Reading from alert DB")
        // Once the DB query completes
            res.render("alerts", {
                data
            });
            //   res.json(earthquakes);
        } 
    });
});

// router.get("/status", function (req, res) {
//     burger.selectAll(function (data) {
//         var hbsObject = {
//             burgers: data
//         };
//         console.log(hbsObject);
//         res.render("index", hbsObject);
//     });
// });

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