const COORDS = "coords";
const API_KEY = "a820d062b0ab108d4d6e79dfafe915b4";

const weatherMinMax = document.querySelector(".js-weather-minmax");
const weatherNow = document.querySelector(".js-weather-now");
const weatherIcon = document.querySelector(".js-weatherIcon");
const weatherDecription = document.querySelector(".js-weather-description");

function getWeather(lat, lon) {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=KR`
	)
		.then(function (response) {
			return response.json();
		})
		.then(function (json) {
			const { temp, temp_max, temp_min } = json.main;
			const { description, icon } = json.weather[0];
			weatherIcon.src = `http://openweathermap.org/img/wn/${icon}.png`;
			weatherNow.innerText += `${Math.floor(temp)}°`;
			weatherMinMax.innerText += `최고: ${temp_max}° 최저: ${temp_min}°`;
			weatherDecription.innerText = description;
		});
}

function saveCoords(coordsObj) {
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
	console.log(position);
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude,
	};
	saveCoords(coordsObj);
	getWeather(latitude, longitude);
}

function handleGeoError() {
	weatherDecription.innerText = "위치 정보를 허용해야 날씨가 보입니다.";
}

function askForcoords() {
	navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
	const loadedCords = localStorage.getItem(COORDS);
	if (loadedCords === null) {
		askForcoords();
	} else {
		const parseCoords = JSON.parse(loadedCords);
		console.log(parseCoords);
		getWeather(parseCoords.latitude, parseCoords.longitude);
	}
}

function init() {
	loadCoords();
}

init();
