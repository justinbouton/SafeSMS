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
    const latitude = "37.773972"
    const longitude = "-122.431297"

    // API call to earthquake.usgs.gov
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}&orderby=time`


    fetch(url)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {

        // List of objects.
        var parsedEarthquakeData = [];

        // Earthquake constructor.
        function Earthquake(time, place, url, mag) {
            this.time = time;
            this.place = place;	
            this.url = url;
            this.mag = mag;
            //parsedEarthquakeData.push(this); // This works
            this.pushToTheList = function() { 
                parsedEarthquakeData.push(this);
            }
            this.pushToTheList(); // And so does this.
        }

        // Loop through each response i to parse time, place, url, mag, store in temp array
        const respLength = data.features.length
        for (let i = 0; i < respLength; i++) {    
            // Declare var response to store earthquakes array from data.features 
            const response = data.features[i].properties

            // ES6 destructuring to parse out; time, place, url, mag
            const { time, place, url, mag } = response;

            // push attributes to parsedEarthquakeData
            new Earthquake(time, place, url, mag)

        // check arrray against exisiting array in earthquakes db
        // Admin notified, earthquake threshold met, mass SMS sent
        };  console.log("parsedEarthquakeData: ");
            console.log(parsedEarthquakeData);
    })
    .catch((err) => console.log("API call error") + err);
    
    // Search lat/long, radius 100km, order by time:
    // https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=37.773972&longitude=-122.431297&maxradiuskm=100&orderby=time
    
    // setTimeout(() => getEarthquakeData(), 300000)//300000 = 5 minutes
};

getEarthquakeData();



// Date/time in ms.
// Function to convert date/time


// Step 3

// SMS send receive