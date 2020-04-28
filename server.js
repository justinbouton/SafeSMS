// console.log("\n \n server.js started \n");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require("./controllers/safesmsController.js");
const exphbs = require("express-handlebars")
const earthquake = require("./earthquake");
var morgan = require('morgan');
var passport = require('passport');
var cors = require('cors');

// Initialize CORS 
app.use(cors());

// Initialize passport 
app.use(passport.initialize());

// const bodyParser = require("body-parse");
// const session = require("express-session");
// const env = require("dotenv").load();

// Set handlebars
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Moment handlebars helper
const moment = require("moment");
moment().format();

// Handlebars helper dateTime converter 
const hbs = require("handlebars");
hbs.registerHelper("convert", function (dateTime) {
    // CUSTOM DATE/TIME FORMAT see https://momentjs.com/docs/
    const milliseconds = moment.unix(dateTime / 1000).format("ddd, MMM DD, YYYY LT");
    return(milliseconds)
})

//Serve public folder
app.use(express.static("public"));

// safesms_controller.js // 
app.use(routes);

// // Server and port
app.listen(PORT, () => {
    console.log("\n     Server listening on http://localhost:" + PORT);
    console.log("\n     CRTL C to stop server", "\n");
});