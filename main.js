let inputValue = document.querySelector(".inputValue");
let btn = document.querySelector(".btn");
let myKey = "at_q18r1QrX1cyJGrjAPIi1sntN5kJT0";
let country = document.querySelector(".location");
let ipAdres = document.querySelector(".ip-address");
let timezone = document.querySelector(".timezone");
let isp = document.querySelector(".isp");

// when page is loading
function succesCallback(position) {
  const lati = position.coords.latitude;
  const lngi = position.coords.longitude;

  document.addEventListener("DOMContentLoaded", buildMap(lati, lngi));
}
function errorCallback() {
  alert("Did not find your location...");
}
navigator.geolocation.getCurrentPosition(succesCallback, errorCallback);

// submit form
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let valOfInput = inputValue.value;
  getIpAddress(valOfInput);

  valOfInput.innerHTML = "";
});

// get ip address
async function getIpAddress(valOfInput) {
  if (valOfInput === undefined && valOfInput === "" && valOfInput === null) {
    var url = `https://geo.ipify.org/api/v2/country?apiKey=${myKey}`;
  } else {
    var url = `https://geo.ipify.org/api/v2/country,city?apiKey=${myKey}&ipAddress=${valOfInput}`;
  }

  let datas = await fetch(url);
  let datasJson = await datas.json();
  country.innerHTML = `${datasJson.location.city}, ${datasJson.location.country}`;
  ipAdres.innerHTML = `${datasJson.ip}`;
  timezone.innerHTML = `${datasJson.location.timezone}`;
  isp.innerHTML = `${datasJson.isp}`;

  buildMap(datasJson.location.lat, datasJson.location.lng);
}

// build map leaflet.js
function buildMap(lat, lng) {
  document.getElementById("weathermap").innerHTML =
    "<div id='map' style='width: 100%; height: 100%;'></div>";

  let map = L.map("map").setView([lat, lng], 12);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const marker = L.marker([lat, lng]).addTo(map);
}
