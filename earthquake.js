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

                // Admin notified, earthquake threshold met, mass SMS sent
            }; 

            compareEarthquakeData()
            // console.log("parsedEarthquakeData: ");
            // console.log(parsedEarthquakeData);
        })
        .catch((err) => console.log("API call error - " + err));

    // setTimeout(() => getEarthquakeData(), 300000)//300000 = 5 minutes
};

getEarthquakeData();



var earthquakeCount = 0;

function compareEarthquakeData() { // TEST partialy working

// TODO pull all earthquake data to global array. Compare that array to parsedEarthquakeData

    // Get earthquake count
    Earthquake.countDocuments({}, function (err, count) {
        earthquakeCount = count;
    }).then(() => {
        // if earthquakeCount === 0 log no data. Else loop through each then Earthquake.create
        if (earthquakeCount === 0) {
            console.log("no earthquake data")
        } else {
            // compare to Earthquake DB
            console.log("Woohoo! Found earthquake data.")
        }
    }).catch((err) => console.log("compareEarthquakeData error: " + err));
};