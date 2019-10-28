console.log("app.js started");
const users = require('../../../db/users.js'); // WON'T WORK, client side. 

// Pull user and earthquake data from MongoDB safesms
// TEST USER ARRAY
// users = [
//     {
//         first: "Justin",
//         last: "Bouton",
//         phone: ""
//     },
//     {
//         first: "Joseph",
//         last: "Andrews",
//         phone: ""
//     },
//     {
//         first: "Michael",
//         last: "Triolo",
//         phone: ""
//     },
//     {
//         first: "Janice",
//         last: "Bouton",
//         phone: ""
//     },
//     {
//         first: "Daniel",
//         last: "Bouton",
//         phone: ""
//     },
//     {
//         first: "Nicole",
//         last: "Davis",
//         phone: ""
//     },
//     {
//         first: "Matthew",
//         last: "Bouton",
//         phone: ""
//     },
//     {
//         first: "David",
//         last: "Bouton",
//         phone: ""
//     },
//     {
//         first: "Caleb",
//         last: "Bouton",
//         phone: ""
//     }
// ]

// TEST EARTHQUAKE DATA
earthquake = [
    {
        "mag": 1.35,
        "place": "1km WNW of Pleasant Hill, CA",
        "time": 1571206815020,
        "url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc73292715",
        "id": "nc73292715"
    },
    {
        "mag": 1.11,
        "place": "1km SW of Pleasant Hill, CA",
        "time": 1571193421370,
        "url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc73292605",
        "id": "nc73292605"
    },
    {
        "mag": 3.38,
        "place": "0km ESE of Pleasant Hill, CA",
        "time": 1571191918530,
        "url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc73292585",
        "id": "nc73292585"
    },
    {
        "mag": 1.77,
        "place": "1km NW of Pleasant Hill, CA",
        "time": 1571152194360,
        "url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc73292260",
        "id": "nc73292260"
    },
    {
        "mag": 1.22,
        "place": "4km NE of Fremont, CA",
        "time": 1571141927400,
        "url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc73292215",
        "id": "nc73292215"
    }
];

// Dynamically create content forEach user.
let numberOfUsers = users.length;

for (var i = 0; i < numberOfUsers; i++) {
    // Select main-content area append userInfo
    $('.main-content').append( 
        $(` 
            <a href="#">
                <div class="p-5 bd-highlight m-auto">
                    <img src="assets/images/redLight.png" alt="status" height="15px">  
                    <span class='firstName'>${users[i].first}</span> 
                    <span class='lastName'>${users[i].last}</span>
                </div>
            </a>
        `)
    ); 
};



// Step 2

// Natral disaster trigger
// Every five minutes call API to see if there has been an earthquake. If an earthquake of x magnitude capture that data to be displayed under earthquake history.

// Recursive function with time delay
function getEarthquakeData() {
    console.log('getEarthquakeData')
    
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

    // fetch call to API
    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {

        // List of earthquake objects
        var parsedEarthquakeData = [];

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

        // Loop through each response i to parse time, place, url, mag, store in temp array
        const respLength = data.features.length
        for (let i = 0; i < respLength; i++) {    
            // Declare var response to store earthquakes data from data.features[i].properties and .id
            const response = data.features[i].properties
            const id = data.features[i].id

            // ES6 destructuring to parse out; time, place, url, mag
            const { time, place, url, mag } = response;

            // Convert ms to date/time.
            const dateTime = new Date(time); 

            // Push attributes to parsedEarthquakeData
            new Earthquake(id, dateTime, place, url, mag)

            // Check parsedEarthquakeData array against exisiting array in earthquakes db
            // If parsedEarthquakeData doesn't exit in earthquake db add to earthquake db.
            // Trigger sendAlert function to notify admin of the recent earthquake. Ask if the admin would like to notice all users. setTimeout to five minutes then automatically send the notice

            // if(JSON.stringify(parsedEarthquakeData)==JSON.stringify(earthquake.db)) {
            //     console.log("True"); 
            // } else {
            //     console.log("False"); 
            // }


// TEST: display data for alerts
    // Select main-content area append earthquake data
    $('.alert-content').append( 
        $(` 
            <a target="_blank" href="${url}">
                <div earthquake-data="${id}" class="p-5 bd-highlight m-auto">
                    <img src="assets/images/redLight.png" alt="status" height="15px">  
                    <span class='place'>${dateTime}</span>
                    <span class='magnitude'>${mag}</span> 
                    <span class='place'>${place}</span>
                </div>
            </a>
        `)
    ); 


            // If earthquake exists in db or time now in ms > five mins from time of call) {
                //do nothing
            // } else {
                // push to earthquake db
            // }


        // Admin notified, earthquake threshold met, mass SMS sent
        };  
        console.log("parsedEarthquakeData: ");
        console.log(parsedEarthquakeData);
    })
    .catch((err) => console.log("API call error - " + err));
    
    // setTimeout(() => getEarthquakeData(), 300000)//300000 = 5 minutes
};

// WORKING GET EARTHQUAKE DATA 
getEarthquakeData();


// Step 3

// SMS send receive