var testURL = "https://api.openbrewerydb.org/v1/breweries";


//https://www.google.com/maps/embed/v1/directions?key=AIzaSyCB3lXQUe3SeV0zKPvqYYzjp89i2YaNETA&origin=START_ADDRESS&destination=END_ADDRESS

fetch (testURL)
.then(function (response){

return response.json();

})
.then (function (data){

console.log(data);

})

//LIST OF "BOILERPLATE" API Calls from OpenBreweryDB 
var breweryURL = "https://api.openbrewerydb.org/v1/breweries";
var byCityURL = "https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=10";
var byTypeURL = "https://api.openbrewerydb.org/v1/breweries?by_type=micro&per_page=10";

// fetch (breweryURL)
// .then(function (response){

// return response.json();

// })
// .then (function (data){

// console.log(data);

// })

// fetch (byTypeURL)
// .then(function (response){

// return response.json();

// })
// .then (function (data){
// // vv this is the basic format to access data out vv 
// console.log(data[0].address_1);

// })


function searchByCity(cityString){
    //Take a string from somewhere and feed it into the city search API Call...
    var byCityURL = "https://api.openbrewerydb.org/v1/breweries?by_city="+cityString+"&per_page=10";
    

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
        console.log("CITY: " +data[i].city);
        console.log("LATITUDE: " +data[i].latitude);
        latitudeArray.push(data[i].latitude);
        console.log("LONGITUDE: " +data[i].longitude);
        longitudeArray.push(data[i].longitude);
        console.log("");
        console.log("----------------");
        pullCoordinates(latitudeArray, longitudeArray);
    
    }
    
    })
    
}

function pullCoordinates(latitudeArray, longitudeArray){
    for (j=0; j<latitudeArray.length; j++){
        console.log("===== THIS IS FROM pullCoordinates Function! =====");
        console.log(latitudeArray[j]);
        console.log(longitudeArray[j]);
        console.log("===============================================");
    }

}

searchByCity("San Diego"); 