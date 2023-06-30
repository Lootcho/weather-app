const temp = document.querySelector(".temperature");
const hum = document.querySelector(".hum");
const wind = document.querySelector(".vent");
const country = document.querySelector(".ville");

const apiKey = "1e96c91420db10c888cf4a591c8525d7";
const apiUrl = "https://api.openweathermap.org/data/2.5/";


function meteo() {
  //recuperer la ville
  fetch("http://127.0.0.1:5500/conf.json")
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      const city = data[0].ville;

      //avoir la météo
      fetch(`${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          country.textContent = data.name;
          temp.textContent = Math.round(data.main.temp) + "°C";
          hum.textContent = "humidite" + " " + Math.round(data.main.humidity) + "%";
          wind.textContent = "vent" + " " + data.wind.speed + " " + "km/h";

          //recuperer les icons
          const iconCode = data.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
          document.querySelector(".icon").src = iconUrl;
        });
    });
}

meteo();

setInterval(function () {
  meteo();
},3600000);