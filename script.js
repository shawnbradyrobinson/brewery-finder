//LIST OF "BOILERPLATE" API Calls from OpenBreweryDB 
var breweryURL = "https://api.openbrewerydb.org/v1/breweries";
var byCityURL = "https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=10";
var byTypeURL = "https://api.openbrewerydb.org/v1/breweries?by_type=micro&per_page=10";

fetch (breweryURL)
.then(function (response){

return response.json();

})
.then (function (data){

console.log(data);

})

fetch (byCityURL)
.then(function (response){

return response.json();

})
.then (function (data){

for (i=0; i<data.length; i++){
    console.log(data);
    console.log("--------------");
    console.log("BREWERY NAME: " +data[i].name);
    console.log("ADDRESS: " +data[i].address_1); 
    console.log("CITY: " +data[i].city);
    console.log("LATITUDE: " +data[i].latitude);
    console.log("LONGITUDE: " +data[i].longitude);
    console.log("");
    console.log("----------------");

}

})

fetch (byTypeURL)
.then(function (response){

return response.json();

})
.then (function (data){
// vv this is the basic format to access data out vv 
console.log(data[0].address_1);

})