const clockDiv = document.querySelector(".js-clock");
const dateDiv = document.querySelector(".js-date");
const dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function getTime() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const week = date.getDay();
	const sec = date.getSeconds();
	const min = date.getMinutes();
	const hour = date.getHours();
	clockDiv.innerHTML = `${hour >= 10 ? `${hour}` : `0${hour}`}:${
		min >= 10 ? `${min}` : `0${min}`
	}:${sec >= 10 ? `${sec}` : `0${sec}`}`;
	dateDiv.innerHTML = `${year}-${
		month >= 10 ? `${month}` : `0${month}`
	}-${day} ${dayList[week]}`;
}

function init() {
	getTime();
	setInterval(getTime, 1000);
}

init();
