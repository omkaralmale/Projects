const APIk = "b2e582cfd1b4aa5602d5973fbdc7d9fa";
const APIurl = "https://api.openweathermap.org/data/2.5/weather?q=";
const City = document.querySelector("#search");
const Btn = document.querySelector(".search button");
let img = document.querySelector(".weather img");
async function checkWeather(Location) {
  const response = await fetch(APIurl + Location + `&appid=${APIk}`);
  var data = await response.json();
  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".temp").innerHTML =
    Math.floor(data.main.temp - 273.15) + "°C";
  if (data.weather[0].main == "Clouds") {
    img.src = "images/clouds.png";
  }
  if (data.weather[0].main == "Clear") {
    img.src = "images/clear.png";
  }
  if (data.weather[0].main == "Rain") {
    img.src = "images/rain.png";
  }
  if (data.weather[0].main == "Snow") {
    img.src = "images/snow.png";
  }
  if (data.weather[0].main == "Mist") {
    img.src = "images/mist.png";
  }
  if (data.weather[0].main == "Drizzle") {
    img.src = "images/drizzle.png";
  }
  if (data.weather[0].main == "Cloudy") {
    img.src = "images/cloudy.png";
  }
  if (data.weather[0].main == "Cloudy-Day") {
    img.src = "images/cloudy-day.png";
  }
}
Btn.addEventListener("click", () => {
  checkWeather(City.value);
  console.log(City.value);
});
