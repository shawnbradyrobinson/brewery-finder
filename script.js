// === GOOGLE MAPS API STUFF === 
var mapsBaseURL = "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCB3lXQUe3SeV0zKPvqYYzjp89i2YaNETA&origin=START_ADDRESS&destination=END_ADDRESS";

// === NAVIGATOR GEOLOCATION STUFF === 
// info for geolocation stuff found here: https://www.freecodecamp.org/news/how-to-get-user-location-with-javascript-geolocation-api/#:~:text=How%20to%20Get%20User%20Location,consent%20to%20share%20their%20location.&text=Click%20Allow%2C%20and%20open%20up%20the%20developer%20console 
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API/Using_the_Geolocation_API#examples


var userLatitude = localStorage.getItem("USER_LAT");
var userLongitude = localStorage.getItem("USER_LONG"); 
var userLongitude; 
const successCallback = (position) => {
   var lat = position.coords.latitude;
   var long = position.coords.longitude; 
   console.log(lat);
   console.log(long);
   //On a successful callback of the user's location data, set our local storage items to that data. 
   userLatitude = localStorage.setItem("USER_LAT", lat);
   userLongitude = localStorage.setItem("USER_LONG", long);
  };
  
  const errorCallback = (error) => {
    console.log(error);
  };
  
 navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

console.log("TESTING USER LATITUDE: " +userLatitude);
console.log("TESTING USER LONGITUDE: " +userLongitude);



// === GLOBAL VARIABLES TO HANDLE EMBEDDED MAPS === 
var googleMap = document.createElement("iframe");
var mapAlreadyMade = false; 


// === DOM OBJECTS === 
//search field 
var defaultSearch = document.querySelector("#default-search");
//search button 
var searchButton = document.querySelector("#search-button");
//This is the container that holds the embedded map when it is generated
var mapView = document.querySelector("#map-view");
//This is the container that holds the brew cards when they are generated
var cardContainer = document.querySelector("#card-container");
//DOM Objects for map and nav hiding prior to a search happening 
var mapCont = document.querySelector(".map-cont");
var navMapView = document.querySelector(".navmap1");
var bottomNavMap = document.querySelector(".navmap2");

// === SEARCH BUTTON EVENT LISTENER === 
searchButton.addEventListener("click", function (event){
event.preventDefault();
console.log("button works!");
console.log("SEARCH VALUE: " +defaultSearch.value);
processSearch(defaultSearch.value);

});

//function to process the search query and channel it to the correct output...
function processSearch(searchQuery){
    // ==== PROCESSING BREW TYPE SEARCHES === 
    //declares a variable that will hold the specific brew type, for searching purposes 
    var brewType; 
    //if the search was any of the following, then the user is doing a "type search"...so we'll run makeTypeGoogleMap()
    if (searchQuery === "micro" || searchQuery === "nano" || searchQuery === "regional" || searchQuery === "brewpub" || searchQuery === "large" || searchQuery === "contract" || searchQuery === "proprietor"){
        brewType = searchQuery;
        console.log("We are inside the if statement and brewType equals " +brewType);
        makeTypeGoogleMap(brewType);
        return; 
    }    
   
    // === PROCESSING CITY SEARCHES ===
    searchByCity(searchQuery); 
    makeCityGoogleMap(searchQuery);
    searchByCity(searchQuery); //This is called twice because it solved a glitch the program was having -Shawn 
    

    console.log("----------------");
    console.log("Process Search() searchQuery= " +searchQuery);
    console.log("----------------");
    return searchQuery; 
}

// === SEARCH BY CITY FUNCTION === 
function searchByCity(cityString){
    //Take a string from somewhere and feed it into the city search API Call...
    var byCityURL = "https://api.openbrewerydb.org/v1/breweries?by_city="+cityString+"&per_page=30";
    
    fetch (byCityURL)
    .then(function (response){
    
    return response.json();
    
    })
    .then (function (data){
    

    var latitudeArray = [];
    var longitudeArray = [];
    for (i=0; i<data.length; i++){
        console.log(data);
        console.log("--------------");
        console.log("BREWERY NAME: " +data[i].name);
        console.log("ADDRESS: " +data[i].address_1); 
        console.log("CITY + STATE: " +data[i].city+ ", " +data[i].state);
        console.log("LATITUDE: " +data[i].latitude);
        latitudeArray.push(data[i].latitude);
        console.log("LONGITUDE: " +data[i].longitude);
        longitudeArray.push(data[i].longitude);
        console.log("");
        console.log("----------------");
        console.log("===== SHUFFLE DATA ======");
        shuffle(data);
        console.log("BREWERY NAME: " +data[i].name);
        console.log("ADDRESS: " +data[i].address_1); 
        console.log("CITY + STATE: " +data[i].city+ ", " +data[i].state);
        console.log("LATITUDE: " +data[i].latitude);
        latitudeArray.push(data[i].latitude);
        console.log("LONGITUDE: " +data[i].longitude);

        //creating dynamic Brewery Cards based on the city. Every card gets a unique ID so it can then be accessed later to have separate card buttons run separate functions 
        var brewBoxes = "";
        for (z=0; z < 5; z++){
            brewBoxes += `<div id="brewery-card-${z}" class="max-w-xs p-2 m-2 bg-white border-4 border text-center border-gray-200  rounded-lg shadow dark:bg-gray-800 dark:border-gray-200">
            <a href="#">
            <h5 id="brewery-name-1" class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">${data[z].name}</h5>
            <img src="./images/BrewFinderLogo.svg" class="h-8 mr-3 m-2 inline-flex justify-center" alt="BrewFinder Logo" />
            </a>
            <br>
            <span id="brewery-type-1" class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">${data[z].brewery_type}</span>
            <p  id="brewery-location-info-1"class="my-3 font-normal text-gray-500 dark:text-gray-400">Address: ${data[z].address_1}</p>
            <a id="brewery-website-link-1" href="${data[z].website_url}" class="inline-flex items-center text-blue-600 hover:underline">
                Checkout their website
                <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
            </a>
            <button id="brewery-directions-${z}" type="button" class="text-white m-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Get Directions
            <svg aria-hidden="true" class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        </div>` 
            } 
    cardContainer.innerHTML = brewBoxes;
        }
        //DOM Objects for the "Get Directions" buttons
        var directionButton1 = document.querySelector("#brewery-directions-0");
        var directionButton2 = document.querySelector("#brewery-directions-1");
        var directionButton3 = document.querySelector("#brewery-directions-2");
        var directionButton4 = document.querySelector("#brewery-directions-3");
        var directionButton5 = document.querySelector("#brewery-directions-4");

        //every button calls in the getDirections() function, passing in the appropriate address data from the card 
        directionButton1.addEventListener("click", function(){
            getDirections(localStorage.getItem("USER_LAT"), localStorage.getItem("USER_LONG"), ""+data[0].address_1+","+","+data[0].city+","+data[0].state);



        })

        directionButton2.addEventListener("click", function(){
            getDirections(localStorage.getItem("USER_LAT"), localStorage.getItem("USER_LONG"), ""+data[1].address_1+","+","+data[1].city+","+data[1].state);



        })

        directionButton3.addEventListener("click", function(){
            getDirections(localStorage.getItem("USER_LAT"), localStorage.getItem("USER_LONG"), ""+data[2].address_1+","+","+data[2].city+","+data[2].state);



        })

        directionButton4.addEventListener("click", function(){
            getDirections(localStorage.getItem("USER_LAT"), localStorage.getItem("USER_LONG"), ""+data[3].address_1+","+","+data[3].city+","+data[3].state);



        })

        directionButton5.addEventListener("click", function(){
            getDirections(localStorage.getItem("USER_LAT"), localStorage.getItem("USER_LONG"), ""+data[4].address_1+","+","+data[4].city+","+data[4].state);



        })
    })

}
// === SEARCH BY TYPE FUNCTION === 
function searchByType(typeString){
    console.log(typeString);
    breweryTypes = ["micro", "nano", "regional", "brewpub", "large", "planning", "bar", "contract", "proprietor", "closed"];


    if (typeString !== "micro" && typeString !== "nano" && typeString !== "regional" && typeString !== "brewpub" && typeString !== "large" && typeString !== "planning" && typeString !== "bar" && typeString !== "contract" && typeString !== "proprietor" && typeString !== "closed"){
        console.log("That wasn't a type!");
        return; 
    }
    
    var byTypeURL = "https://api.openbrewerydb.org/v1/breweries?by_type=" +typeString+ "&per_page=10";


    fetch (byTypeURL)
    . then (function (response){
       return response.json();
    })
    .then (function (data){
        var latitudeArray = [];
        var longitudeArray = [];
        for (k=0; k < data.length; k++){
            console.log(data);
            console.log("=====================");
            console.log("BREWERY NAME: " +data[k].name);
            console.log("ADDRESS: " +data[k].address_1);
            console.log("BREWERY TYPE: " +data[k].brewery_type);
            console.log("CITY + STATE: " +data[k].city+ ", " +data[k].state);
            console.log("LATITUDE: " +data[k].latitude);
            console.log("LONGITUDE: " +data[k].longitude);
            console.log("=====================");


        } 
    
    })


}

 
//functions that creates an iframe dynamically and appends it to the correct region on screen 
//how to create an embedded Google Map based on a brewery type search query 
function makeTypeGoogleMap(brewType){
    // var googleMap = document.createElement("iframe");
    googleMap.setAttribute("width", "100%");
    googleMap.setAttribute("height", "100%");
    googleMap.setAttribute("frameborder", "0");
    googleMap.setAttribute("style", "border:0");
    googleMap.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    googleMap.setAttribute("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyCB3lXQUe3SeV0zKPvqYYzjp89i2YaNETA&q=" +brewType+ "breweries in USA");
    mapView.append(googleMap);
}
//how to create an embedded Google Map based on a city search query 
function makeCityGoogleMap(searchQuery){
    // var googleMap = document.createElement("iframe");
    googleMap.setAttribute("width", "100%");
    googleMap.setAttribute("height", "100%");
    googleMap.setAttribute("frameborder", "0");
    googleMap.setAttribute("style", "border:0");
    googleMap.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    googleMap.setAttribute("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyCB3lXQUe3SeV0zKPvqYYzjp89i2YaNETA&q=breweries in" +searchQuery);
    mapView.append(googleMap);
}

function makeNameGoogleMap(searchQuery){
    // var googleMap = document.createElement("iframe");
    googleMap.setAttribute("width", "100%");
    googleMap.setAttribute("height", "100%");
    googleMap.setAttribute("frameborder", "0");
    googleMap.setAttribute("style", "border:0");
    googleMap.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    googleMap.setAttribute("src", "https://www.google.com/maps/embed/v1/search?key=AIzaSyCB3lXQUe3SeV0zKPvqYYzjp89i2YaNETA&q=" +searchQuery+ "brewery");
    mapView.append(googleMap);
}


// Hamburger Menu Toggle
function toggleMenu() {
    var menu = document.getElementById('navbar-default');
    if (menu.classList.contains('hidden')){
        menu.classList.remove("hidden");
    } else {
        menu.classList.add('hidden');
    }
}

    
function getDirections(userLatitude, userLongitude, endLocation){
  //makes a Google Map that switches from "?search" to "?directions" with the brewery info clicked on 
    //   var googleMap = document.createElement("iframe");
      console.log("FROM GET DIRECTIONS ----------");
      console.log(JSON.parse(userLatitude));
      console.log(userLongitude);
      googleMap.setAttribute("width", "100%");
      googleMap.setAttribute("height", "100%");
      googleMap.setAttribute("frameborder", "0");
      googleMap.setAttribute("style", "border:0");
      googleMap.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      googleMap.setAttribute("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCB3lXQUe3SeV0zKPvqYYzjp89i2YaNETA&origin="+userLatitude+","+userLongitude+"&destination="+endLocation);
      mapView.append(googleMap);
  
  }

//Hides the map container + map view anchors unless search button is clicked
mapCont.style.display = "none";
navMapView.style.display = "none";
bottomNavMap.style.display = "none";

function showMapStuff() {
    mapCont.style.display = "";
    navMapView.style.display = "";
    bottomNavMap.style.display = "";
}  

searchButton.onclick = ()=> {
    showMapStuff();
}

//Array shuffle function 
//Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }