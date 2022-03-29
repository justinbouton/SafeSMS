## SafeSMS is a location based natural disaster, SMS check-in app to verify the safety of team(s) post disaster. 

### Technologies: Node, Express, Handlebars, Handbars Helper Moment, MongoDB/Mongoose, Bcrypt, Passport, Passport-JWT, Morgan, Axios, HTML, and Bootstrap.

### How it works:
When an earthquake of desired "X" magnitude occurs it triggers an automated SMS to the list of users. The Users reply status light changes from red to green upon SMS receipt of "Yes or Y" from the user signifying they are safe. Users can reply directly to the SMS with a brief message. Messaging is available to the admin via SMS or the Users page by clicking on the individual. The admin is notified via SMS of all triggered events and all SMS responses.

### Setup:
To run the app clone the repo to your local machine. From CLI navigate to the SafeSMS directory, run npm i to install dependancies. Run mongod to start MongoDB, if you don't have a DB directory setup you can append "--dbpath=/Your_DB_Path_Here". 

In another CLI window of the SafeSMS directory, run the app with node or nodemon server.js.From your web browser navigate to localhost:8080. Please remember to seed your DB or your pages will be blank. 
There are example Users, Messages, and Earthquake data under db usersData.js and earthquakeData.js.
To load seed data uncomment lines for Users, Messages, or Earthquakes in /config/connection.js 