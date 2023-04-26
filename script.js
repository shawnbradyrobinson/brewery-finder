var testURL = "https://api.openbrewerydb.org/v1/breweries";


//https://www.google.com/maps/embed/v1/directions?key=AIzaSyCB3lXQUe3SeV0zKPvqYYzjp89i2YaNETA&origin=START_ADDRESS&destination=END_ADDRESS

fetch (testURL)
.then(function (response){

return response.json();

})
.then (function (data){

console.log(data);

})

https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&parameters