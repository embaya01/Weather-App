let weather ={
    "apiKey": "a30200975e50c1dc60872e7786077378",
    "query" : "https://api.openweathermap.org/data/2.5/",
    fetchWeather: function(city, unit = "imperial"){
        fetch(this.query + "weather?q="
            +  city 
            + "&units="+ unit 
            +"&appid=" + this.apiKey)
            .then((response)=>response.json())
            .then((data)=> this.displayWeather(data));
    },
    displayWeather: function(data){
        //console.log(data);
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        const {lon, lat} = data.coord;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".desc").innerText = description;
        document.querySelector(".temp .value").innerText = temp;
        document.querySelector(".hum span").innerText = humidity;
        document.querySelector(".wind .speed").innerText = speed;
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+name+"')";
        document.querySelector(".loading").style.visibility = "visible";
        this.updateMap(lat,lon);
        this.fetchForecast(lat,lon);
    },
    search: function(){
        city = document.querySelector(".search-bar").value;
        this.fetchWeather(city);
        document.querySelector(".search-bar").value = "";
    },
    updateMap: function (lat, long) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: long },
        zoom: 8,
        });
    },
      fetchForecast: function (lat, long) {
    fetch(this.query + "onecall?"
        + "lat= " + lat
        + "lon=" + long
        + "exclude=hourly,minutely"  
        + "&units="+ unit 
        +"&appid=" + this.apiKey)
        .then((response)=>response.json())
        .then((data)=> this.displayForecast(data));
    },
    displayForecast: function (data) {
        
    }

};
let currentCity, curlat = 10.7275, curlong = 25.5089;
document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPos, posFail);
        
    }else{
        weather.fetchWeather("Washington");
    }
  });
  function getPos (position) {
    curlat = position.coords.latitude;
    curlong=position.coords.longitude
    getCurrentCity(curlat,curlong);
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: curlat, lng: curlong },
        zoom: 8,
        });
    }
  function posFail(err) {
        let errors = {
            1: 'No Permission',
            2: "Unable to determine",
            3: "Took too long"
        }
        alert(errors[err["code"]]);
    }

    function getCurrentCity(lat, long) {
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat,long);
        geocoder.geocode(
            {'latLng': latlng},
            function(results, status){
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var add = results[0].formatted_address;
                        var value = add.split(",");
                        count = value.length;
                        currentCity = value[count-1];
                        console.log(results[0]);
                        weather.fetchWeather(currentCity);
                    }else  {
                        alert("address not found");
                    }
                }else {
                    console.log("Geocoder failed due to: " + status);
                }
            }
        )
      }
document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

    function test() {
        var date = new Date(1639759043);
        var curDate = new Date();
        curDate = Date.now()
        console.log(date.toString());
        console.log(curDate.prototype.toDateString());
      }


