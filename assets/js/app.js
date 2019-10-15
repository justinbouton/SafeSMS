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




// Step 3

// SMS send receive