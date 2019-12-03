// make axios call to GET earthquake info

console.log("earthquake.js started");
const axios = require('axios');


// Natral disaster trigger
// Every x minutes call API to see if there has been an earthquake. If an earthquake of x magnitude, capture to earthquake DB.

// List of earthquake objects
var parsedEarthquakeData = [];

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

    // axios call to API
    axios.get(url)
    // .then((data) => console.log(data)); // WORKING with data 
    .then((data) => {
        // console.log(data)
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
        data = data.data.features
        console.log((data.length))

        // Loop through each response i to parse time, place, url, mag, store in temp array
        const respLength = data.length
        for (let i = 0; i < respLength; i++) {    
            // Declare var response to store earthquakes data from data[i].properties and .id
            const response = data[i].properties
            const id = data[i].id
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
    // $('.alert-content').append( 
    //     $(` 
    //         <a target="_blank" href="${url}">
    //             <div earthquake-data="${id}" class="p-5 bd-highlight m-auto">
    //                 <img src="assets/images/redLight.png" alt="status" height="15px">  
    //                 <span class='place'>${dateTime}</span>
    //                 <span class='magnitude'>${mag}</span> 
    //                 <span class='place'>${place}</span>
    //             </div>
    //         </a>
    //     `)
    // ); 


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

getEarthquakeData();



// { type: 'Feature',
//           properties:
//            { mag: 0.86,
//              place: '7km WSW of Daly City, CA',
//              time: 1572991041980,
//              updated: 1573008542030,
//              tz: -480,
//              url:
//               'https://earthquake.usgs.gov/earthquakes/eventpage/nc73301110',
//              detail:
//               'https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=nc73301110&format=geojson',
//              felt: null,
//              cdi: null,
//              mmi: null,
//              alert: null,
//              status: 'reviewed',
//              tsunami: 0,
//              sig: 11,
//              net: 'nc',
//              code: '73301110',
//              ids: ',nc73301110,',
//              sources: ',nc,',
//              types: ',geoserve,nearby-cities,origin,phase-data,scitech-link,',
//              nst: 11,
//              dmin: 0.04351,
//              rms: 0.02,
//              gap: 115,
//              magType: 'md',
//              type: 'earthquake',
//              title: 'M 0.9 - 7km WSW of Daly City, CA' },
//           geometry:
//            { type: 'Point', coordinates: [ -122.5351667, 37.6635, 10.14 ] },
//           id: 'nc73301110' },
//         ... 20 more items ],
//      bbox:
//       [ -122.9698333, 37.1118333, -0.38, -121.5353333, 38.604, 21.81 ] } }