var APPID = "4c306385a00f77be8b029ef5d0e6d126";
var temp;
var loc;
var icon;
var hum;
var wind;
var wDir;


function updateByZip(zip){
	var url = "http://api.openweathermap.org/data/2.5/weather?" +
	"zip=" + zip +
	"&APPID=" + APPID;
sendRequest(url)
}	

function updateByGeo(lat, lon) {
     var url = "http://api.openweathermap.org/data/2.5/weather?" +   
     "lat=" + lat +
     "&lon=" + lon +
     "&APPID=" + APPID;
     sendRequest(url);
}	 

function sendRequest(url) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
	if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
	  var data = JSON.parse(xmlhttp.responseText);
	  var weather = {};
	  weather.icon = data.weather[0].id;
	  weather.hum =  data.main.humidity;
	  weather.wind = data.wind.speed;
	  weather.wDir = convertWind (data.wind.deg);
	  weather.loc = data.name;
	  weather.temp = convertCelsius (data.main.temp);
	  update(weather); 
	  }
	};
    xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function convertWind (degrees){
	var range = 360/8;
	var low = 360 - range/2;
	var high = (low + range) % 360;
    var directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]; 
    for ( i in directions ) {
		
		if (degrees >= low && degrees < high)
		    return directions [i];
	low = (low + range) % 360;
	high = (high + range) % 360;
	}		
}

function convertCelsius(k){
	       return Math.round (k - 273.15);
           }


function update(weather){
	wind.innerHTML = weather.wind;
	wDir.innerHTML = weather.wDir;
	temp.innerHTML = weather.temp;
	loc.innerHTML = weather.loc;
	hum.innerHTML = weather.hum;
	icon.src = "imgs/codes/" + weather.icon + ".png";
	
}

function showLocation (position){
	     updateByGeo (position.coords.latitude, position.coords.longitude);
}

window.onload = function () {
 temp = document.getElementById("temperature");
 loc = document.getElementById("location"); 
 icon = document.getElementById("icon");
 hum = document.getElementById("humidity");
 wind = document.getElementById("wind");
 wDir = document.getElementById("direction");

 if (navigator.geolocation){
	 navigator.geolocation.getCurrentPosition(showLocation);
    }else {
	var zip = window.prompt ("We could not disover your location, please enter your ZIP code");
	updateByZip(zip);
 }
} ;
