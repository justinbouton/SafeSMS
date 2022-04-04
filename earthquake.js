const axios = require('axios');
const Earthquake = require('./models/earthquakeSchema');


// Every "x" minutes call API to see if there has been an earthquake. If an earthquake occured of "y" magnitude, capture to array. If any of the earthquakes from the array are "z" minutes old, push to earthquake DB, alert admin.

// API call for data
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
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}&orderby=time&limit=7`

    // axios call to API to gather then parse earthquake data
    axios.get(url)
        .then((data) => {

            // Parse data
            data = data.data.features

            // For each earthquake alert pull the element id, time, place, url, mag
            data.forEach(element => {
                let { id } = element
                let { time, place, url, mag } = element.properties

                // Wrap the attributes
                let attributes = new function() {
                    this.id = id;
                    this.time = time;
                    this.place = place;
                    this.url = url;
                    this.mag = mag;
                  };
                  // Push alert attributes to parsedEarthquakeData
                  parsedEarthquakeData.push(attributes)
            });

            // console.log(parsedEarthquakeData)
            
            // Compare the API data to the DB
            compareEarthquakeData();

        })
        .catch((err) => console.log("API call error - " + err));

    // setTimeout(() => getEarthquakeData(), 300000)//300000 = 5 minutes
};




function compareEarthquakeData() { // Working

var earthquakeCount = 0;

// Pull all DB earthquake data to local array. Compare that array to API parsedEarthquakeData

    // Check to see if any earthquakes exits in DB
    Earthquake.countDocuments({}, function (err, count) {
        earthquakeCount = count;
    }).then(() => {
        // if earthquakeCount === 0 log no data. Else Earthquake.create
        if (earthquakeCount === 0) {
            console.log("no earthquake data")
            console.log("")
            // Store earthquake data to DB.
            storeEarthquakeData(parsedEarthquakeData)
        } else {

            console.log("The world is shakin! Received earthquake data.")

            // Check earthquakeDB against API response parsedEarthquakeData. Compare id if already in earthquakeDB pop off that id else push to earthquakeDifferences.
            let earthquakeDB = [];

            // Pull Earthquake DB data place in array
            Earthquake.find({}, function (err, res){
                res.forEach(element => {
                    earthquakeDB.push(element)
                // console.log(element)
            });


            // console.log("earthquakeDB")
            // console.log(earthquakeDB)
            // console.log("parsedEarthquakeData")
            // console.log(parsedEarthquakeData)
            var props = ['id', 'time', 'place', 'url', 'mag'];

            var result = parsedEarthquakeData.filter(function(o1){
                // filter out (!) items in earthquakeDB
                return !earthquakeDB.some(function(o2){
                    return o1.id === o2.id; // assumes unique id
                });
            }).map(function(o){
                // use reduce to make objects with only the required properties
                // and map to apply this to the filtered array as a whole
                return props.reduce(function(newo, name){
                    newo[name] = o[name];
                    return newo;
                }, {});
            });
            
            // console.log(result)
            storeEarthquakeData(result)
            });

        }
    }).catch((err) => console.log("compareEarthquakeData error: " + err));
};

// Store earthquake data to database
function storeEarthquakeData(arr) {
    // Add data to Earthquake DB 
    arr.forEach(element => {
console.log("Adding ID: " + element.id + " to db.earthquake")     
        // ES6 destructuring to parse out; id, time, place, url, mag
        const { id, time, place, url, mag } = element;

        Earthquake.create({
                id: id,
                time : time,
                place : place,
                url : url,
                mag : mag
        })
    })
};

// // getEarthquakeData -> compareEarthquakeData -> storeEarthquakeData
getEarthquakeData();