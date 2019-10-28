console.log("\n safeSMS_controller.js started \n");

const express = require('express');
const router = express.Router();
const User = require("../config/connection");
const Users = User 

router.get("/", function (req, res) {
        console.log("Redirect to status page")
        res.redirect("status");
        // connection
});


router.get("/status", function (req, res) {
    console.log("Render home page");
    // Query: In our database, go to the animals collection, then "find" everything
    Users.find({ }, function(err, found) {
        var data = found
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
            //   res.json(found);
        }
        
    });
});

router.get("/alerts", function (req, res) {
    console.log("Render alert page")
    res.render("alerts");
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