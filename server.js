console.log("\n \n server.js started \n");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
// const bodyParser = require("body-parse");
// const session = require("express-session");
// const passport = require("passport");
// const env = require("dotenv").load();


// Set handlebars
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const exphbs = require("express-handlebars")

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Serve public folder
app.use(express.static("public"));
const routes = require("./controllers/safeSMS_controller.js");


// safeSMS_controller // 
app.use(routes);








// const router = express.Router();

// router.get("/", function (req, res) {
//     console.log("Redirect to status page")
//     res.redirect("status");
// });

// router.get("/status", function (req, res) {
// console.log("Render home page");
// // Query: In our database, go to the animals collection, then "find" everything
// db.users.find({}, function(err, found) {
//     // Log any errors if the server encounters one
//     if (err) {
//       console.log(err);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//         console.log(found);
//       res.json(found);
//     }
//   });
// // res.render("index");
// });

// router.get("/alerts", function (req, res) {
// console.log("Render alert page")
// res.render("alerts");
// });

// // Server and port
app.listen(PORT, () => {
    console.log("\n     Server listening on http://localhost:" + PORT);
    console.log("\n     CRTL C to stop server", "\n");
});




// const mongoose = require('mongoose');
// const express = require('express');
// var cors = require('cors');
// const bodyParser = require('body-parser');
// const logger = require('morgan');
// const Data = require('./data');

// const API_PORT = 3001;
// const app = express();
// app.use(cors());
// const router = express.Router();

// // this is our MongoDB database
// const dbRoute =
//   'mongodb://<your-db-username-here>:<your-db-password-here>@ds249583.mlab.com:49583/fullstack_app';

// // connects our back end code with the database
// mongoose.connect(dbRoute, { useNewUrlParser: true });

// let db = mongoose.connection;

// db.once('open', () => console.log('connected to the database'));

// // checks if connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // (optional) only made for logging and
// // bodyParser, parses the request body to be a readable json format
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(logger('dev'));

// // this is our get method
// // this method fetches all available data in our database
// router.get('/getData', (req, res) => {
//   Data.find((err, data) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true, data: data });
//   });
// });

// // this is our update method
// // this method overwrites existing data in our database
// router.post('/updateData', (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, (err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // this is our delete method
// // this method removes existing data in our database
// router.delete('/deleteData', (req, res) => {
//   const { id } = req.body;
//   Data.findByIdAndRemove(id, (err) => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// // this is our create methid
// // this method adds new data in our database
// router.post('/putData', (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: 'INVALID INPUTS',
//     });
//   }
//   data.message = message;
//   data.id = id;
//   data.save((err) => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// // append /api for our http requests
// app.use('/api', router);