# SafeSMS is a natural disaster SMS based check-in app to verify the safety of team(s) post disaster. 

## How it works:
When an earthquake of X magnitude occurs it triggers an automated SMS to a list of people. When a person responds their status light turns green signifying they are ok. People can reply directly to the SMS. Messaging is available to the admin via text or the Status page by clicking on the individual. The admin is notified via SMS on all triggered events and all SMS responses.

## SafeSMS was build with Node, Express, Handlebars, MongoDB/Mongoose, HTML, and Bootstrap.

To run the app please clone the repo to your local machine.From CLI navigate to the SafeSMS folder, run npm i to install dependancies. Don't forget to start your MongoDB from CLI, using command mongod. In another CLI window run the app with node or nodemon server.js. From you web browser navigate to localhost:8080. Please remember to seed your DB or your pages will be blank. There are example User and Earthquake arrays. 