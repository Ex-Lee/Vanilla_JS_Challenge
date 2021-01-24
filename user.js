const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const text = form.querySelector("label");

function loadUser() {
	const userName = localStorage.getItem("Name");
	if (userName !== null) {
		input.classList.add("invisible");
		text.classList.remove("invisible");
		text.innerText = `Hello! ${userName}`;
	}
}

function saveUser(str) {
	if (str !== "" || str !== null) {
		localStorage.setItem("Name", str);
		loadUser();
	}
}

function init() {
	loadUser();
}

function handleSubmit(e) {
	e.preventDefault();
	const currentValue = input.value;
	console.log(input.value);
	saveUser(currentValue);
}
init();

form.addEventListener("submit", handleSubmit);
