//uses HTML 5 geoLocation application
//You need to have https for this to work

var longitude;
var latitude;
var city,country;
var temperature;
var windspeed;
var weatherDescription,weatherIcon;
var currentUnitIsC = false;
var baseUrlWeatherIcon = "http://openweathermap.org/img/w/";
var baseUrlWeather = "http://api.openweathermap.org/data/2.5/weather?";
var key = "88bd6e0e1c1efea6c5c703f9421d06bc";

function getLocation(){
  $.getJSON('http://freegeoip.net/json/?callback=?', function(data) {
    latitude = data.latitude;
    longitude = data.longitude;
    console.log(latitude+":"+longitude);
    getWeatherDetails();
  });
}

function getWeatherDetails(){
  var weatherURL = baseUrlWeather+"lat="+latitude+"&"+"lon="+longitude+"&appid="+key;
  console.log("weather get url is "+weatherURL);
  $.getJSON(
  weatherURL,
  function(data) {

    // Success! Do stuff with data.
    //extract params and update view
    city = data.name;
    country = data.sys.country;
    windspeed = data.wind.speed;
    temperature = (data.main.temp-273.15)*(9/5)+32;
    weatherDescription = data.weather[0].description;
    weatherIcon = baseUrlWeatherIcon+data.weather[0].icon+".png";
    updateViews();
  }
);
}

function updateViews(){
  var t;
  if(currentUnitIsC){
    t = Math.floor((temperature-32)*5/9)+" C";
  }else{
    t = Math.floor(temperature)+" F";
  }
  $("#cityName").text("Currently "+t+" in "+city+","+country);
  $("#weatherDescription").text(weatherDescription);
  console.log(weatherIcon)
  $("#weatherImg").attr("src",weatherIcon);
  $("#windDescription").text("Wind Speed is "+windspeed+" knots");
}

//set this up on document ready
//add click listeners
$(document).ready(function(){
  //get location
  //hit open weather using this location
  //get the data and display

  getLocation();
  $("#changeTempUnit").on("click",function(){
    console.log("button clicked");
    var t;
    if(currentUnitIsC){
      currentUnitIsC = false;
      t = Math.floor(temperature)+" F";
    }else{
      currentUnitIsC = true;
      t = Math.floor((temperature-32)*5/9)+" C";
    }
    $("#cityName").text("Currently "+t+" in "+city+","+country);
  });
});
