var apiKeyMaps = require('./../.env').apiKeyMaps;
var apiKeyWeather = require('./../.env').apiKeyWeather;
var Retrieve = require('./../js/retrieve.js').retrieveModule;
var Weather = require('./../js/process.js').weatherModule;
var GameLogic = require('./../js/gameLogic.js').gameLogicModule;

var ourRetriever = new Retrieve();
var ourWeather = new Weather();
var ourGame = new GameLogic();

var displayHumidity = function(city, humidityData) {
  $('.showWeather').text("The humidity in " + city + " is " + humidityData + "%");
};

var displayTemp = function(city, tempData) {
  var tempKelvin = tempData;
  var tempCelsius = ourWeather.kelvinToCelsius(tempKelvin);
  var tempFahrenheit = ourWeather.celsiusToFahrenheit(tempCelsius);
  var selectedTemp = 1;
  if ($("#temp-selector").val() === "celsius"){
    selectedTemp = tempCelsius;
  } else if ($("#temp-selector").val() === "fahrenheit") {
    selectedTemp = tempFahrenheit;
  } else {
    selectedTemp = tempKelvin;
  }
  $('.showWeather').text("The temperature in " + city + " is " + selectedTemp + " degrees " + $("#temp-selector").val());
};

var displayElevation = function(elevation) {
  $(".elevation").text("the elevation is " + elevation);
};

$(document).ready(function() {
  $("form#getElevation").submit(function() {
    event.preventDefault();
    console.log("button is working");
    var longitude = $('#longitude').val();
    var latitude = $('#latitude').val();
    ourRetriever.getElevation(latitude, longitude, displayElevation);
  });

  $('#weatherLocation').click(function() {
    var city = $('#location').val();
    ourRetriever.getHumidity(city, displayHumidity);
  });

  $('#weatherTemp').click(function() {
    var city = $('#location').val();
    ourRetriever.getTemperature(city, displayTemp);
    // $('#location').val("");
  });

  $('#get-city').click(function() {
    var returnedCity = ourGame.getNextCity();
    console.log(returnedCity);
    $("#cities-output").text(returnedCity);

  });

});
