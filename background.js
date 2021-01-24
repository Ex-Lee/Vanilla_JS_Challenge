const IMG_NUMBER = 4;
const body = document.querySelector("body");

function genRandom() {
	return Math.ceil(Math.random() * IMG_NUMBER);
}

function printImage(number) {
	const img = new Image();
	img.src = `./image/${number}.jpg`;
	img.classList.add("bgImg");
	body.appendChild(img);
}

function init() {
	const randomNum = genRandom();
	printImage(randomNum);
}

init();
