console.log("app.js connected");

// Step 1

// TEST USER ARRAY
users = [
    {
        first: "Justin",
        last: "Bouton",
        phone: ""
    },
    {
        first: "Joseph",
        last: "Andrew",
        phone: ""
    },
    {
        first: "Michael",
        last: "Triolo",
        phone: ""
    },
    {
        first: "Janice",
        last: "Bouton",
        phone: ""
    },
    {
        first: "Daniel",
        last: "Bouton",
        phone: ""
    },
    {
        first: "Nicole",
        last: "Davis",
        phone: ""
    },
    {
        first: "Matthew",
        last: "Bouton",
        phone: ""
    },
    {
        first: "David",
        last: "Bouton",
        phone: ""
    },
    {
        first: "Caleb",
        last: "Bouton",
        phone: ""
    }
]

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
    // fetch call to API
    // search radius in km
    const radius = '100'
    // url for API call
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=37.773972&longitude=-122.431297&maxradiuskm=${radius}&orderby=time`

    const response = fetch(url);
console.log((response));

    // Search lat/long, radius 100km, order by time:
    // https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=37.773972&longitude=-122.431297&maxradiuskm=100&orderby=time
    // setTimeout(() => getEarthquakeData(), 300000)//300000 = 5 minutes
};

getEarthquakeData();



// Date/time in ms.
// Function to convert date/time

// Parse out response objects; time, place, url, mag
// RESPONSE IN JSON:
// {
//     "type": "Feature",
//     "properties": {
//         "mag": 1.35,
//         "place": "1km WNW of Pleasant Hill, CA",
//         "time": 1571206815020,
//         "updated": 1571212684169,
//         "tz": -480,
//         "url": "https://earthquake.usgs.gov/earthquakes/eventpage/nc73292715",
//         "detail": "https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=nc73292715&format=geojson",
//         "felt": null,
//         "cdi": null,
//         "mmi": null,
//         "alert": null,
//         "status": "automatic",
//         "tsunami": 0,
//         "sig": 28,
//         "net": "nc",
//         "code": "73292715",
//         "ids": ",nc73292715,",
//         "sources": ",nc,",
//         "types": ",geoserve,nearby-cities,origin,phase-data,scitech-link,",
//         "nst": 20,
//         "dmin": 0.07382,
//         "rms": 0.05,
//         "gap": 78,
//         "magType": "md",
//         "type": "earthquake",
//         "title": "M 1.4 - 1km WNW of Pleasant Hill, CA"
//     },


// Step 3

// SMS send receive