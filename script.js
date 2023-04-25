var testURL = "https://api.openbrewerydb.org/v1/breweries";

fetch (testURL)
.then(function (response){

return response.json();

})
.then (function (data){

console.log(data);

})