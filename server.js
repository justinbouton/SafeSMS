// console.log("\n \n server.js started \n");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const routes = require("./controllers/safesmsController.js");
const exphbs = require("express-handlebars")

// const bodyParser = require("body-parse");
// const session = require("express-session");
// const passport = require("passport");
// const env = require("dotenv").load();


// Set handlebars
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Serve public folder
app.use(express.static("public"));

// safesms_controller.js // 
app.use(routes);

// // Server and port
app.listen(PORT, () => {
    console.log("\n     Server listening on http://localhost:" + PORT);
    console.log("\n     CRTL C to stop server", "\n");
});


// TEST get earthquake data server side
const earthquake = require("./earthquake");

// getEarthquakeData() 
