const axios = require('axios');
const Earthquake = require('./models/earthquakeSchema');
// Natral disaster trigger
// Every x minutes call API to see if there has been an earthquake. If an earthquake of x magnitude, capture to earthquake DB.

// List of earthquake objects
var parsedEarthquakeData = [];

// Recursive function with time delay
function getEarthquakeData() {
    console.log('Pulling earthquake data "getEarthquakeData" /earthquake.js')

    // Declare varibles for radius, latitude and longitude.
    // ///// FUTURE Google geolocation for lat/long /////
    // ///// FUTURE radius selection under settings /////
    const radius = '100' // radius in km
    const latitude = "37.773972"
    const longitude = "-122.431297"

    // EXAMPLE Search lat/long, radius 100km, order by time:
    // https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=37.773972&longitude=-122.431297&maxradiuskm=100&orderby=time

    // API url to earthquake.usgs.gov
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}&orderby=time`

    // axios call to API
    axios.get(url)
        .then((data) => {
            // Earthquake constructor
            function Earthquake(id, time, place, url, mag) {
                this.id = id;
                this.time = time;
                this.place = place;
                this.url = url;
                this.mag = mag;
                //parsedEarthquakeData.push(this); 
                this.pushToTheList = () => parsedEarthquakeData.push(this);
                this.pushToTheList();
            }
            //  
            data = data.data.features

            // Loop through each response i to parse time, place, url, mag, store in temp array
            const respLength = data.length
            for (let i = 0; i < respLength; i++) {
                // Declare var response to store earthquakes data from data[i].properties and .id
                const response = data[i].properties
                const id = data[i].id
                // ES6 destructuring to parse out; time, place, url, mag
                const { time, place, url, mag } = response;
                // Using Earthquake constructor push to parsedEarthquakeData
                new Earthquake(id, time, place, url, mag)
            }; 

            compareEarthquakeData()
        })
        .catch((err) => console.log("API call error - " + err));

    // setTimeout(() => getEarthquakeData(), 300000)//300000 = 5 minutes
};

getEarthquakeData();


var earthquakeCount = 0;

function compareEarthquakeData() { // TEST partialy working

// Pull all DB earthquake data to local array. Compare that array to API parsedEarthquakeData

    // Get earthquake count
    Earthquake.countDocuments({}, function (err, count) {
        earthquakeCount = count;
    }).then(() => {
        // if earthquakeCount === 0 log no data. Else loop through each then Earthquake.create
        if (earthquakeCount === 0) {
            console.log("no earthquake data")
            // Add data to Earthquake DB CREATE FUNCTION
                parsedEarthquakeData.forEach(element => {
console.log("Adding ID: " + element.id + " to db.earthquake")     
                    // ES6 destructuring to parse out; time, place, url, mag
                    const { id, time, place, url, mag } = element;

                    Earthquake.create({
                            id: id,
                            time : time,
                            place : place,
                            url : url,
                            mag : mag
                    })
                })
        } else {
//             // compare to Earthquake DB
            console.log("Woohoo! Found earthquake data.")
//             // Check Earthquake DB against parsedEarthquakeData by id add to DB if not present
//             let earthquakeDB = []
//             // Pull Earthquake DB data place in array
//             Earthquake.find({}, function (err, res){
//                 res.forEach(element => {
//                     earthquakeDB.push(element)
//                 });

//             let earthquakeDifferences = [];

//             // Loop through each earthquakeDB.id and compare with parsedEarthquakeData.id
//             for (var i = 0; i < earthquakeCount; i++) {
//                 let quakeid = earthquakeDB[i].id
// console.log("forLoop " + i)

//                 parsedEarthquakeData.forEach(element => {
//                     let parsedid = element.id
//                     // compare quakeid to parsdid
//                     // console.log(parsedid)
                    
//                     // Compared Earthquake ID if no match add to Earthquake DB
//                     function compareEarthquakeID() {
//                         if (quakeid !== parsedid) {
// console.log("NO MATCH adding incident to earthquakeDB: " + element)
//                             // Add to Earthquake DB using parsedid
//                             // Earthquake.create({
                                
//                             // })
//                         }
//                     }
//                     compareEarthquakeID()
//                 });
                
//                 // // if id does not match add to Earthquake DB and trigger SMS admin                
//             }
//             })
        }
    }).catch((err) => console.log("compareEarthquakeData error: " + err));
};