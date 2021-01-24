const taskForm = document.querySelector(".taskForm");
const taskInput = document.querySelector(".taskInput");
const pList = document.querySelector(".pList");
const fList = document.querySelector(".fList");

let pStorageList = [];
let fStorageList = [];

const LSP = "PENDING";
const LSF = "FINISHED";

function changeTask(e, flag) {
	const selList = e.target.parentNode;
	const li = document.createElement("li");
	const span = document.createElement("span");
	const delBtn = document.createElement("button");
	const actionBtn = document.createElement("button");

	delBtn.innerText = "❌";

	if (flag === LSP) {
		const filtList = pStorageList.filter((e) => {
			return parseInt(e.id, 10) === parseInt(selList.id, 10);
		});

		delBtn.addEventListener("click", (e) => {
			delTask(e, LSF);
		});

		actionBtn.addEventListener("click", (e) => {
			changeTask(e, LSF);
		});

		fStorageList = [...fStorageList, ...filtList];
		const { text, id } = filtList[0];
		span.innerText = text;

		li.id = id;
		li.appendChild(span);
		li.appendChild(delBtn);
		li.appendChild(actionBtn);
		actionBtn.innerText = "😫";
		fList.appendChild(li);
		if (fStorageList.length !== 0) {
			saveTask(JSON.stringify(fStorageList), LSF);
		}
	} else {
		const filtList = fStorageList.filter((e) => {
			return parseInt(e.id, 10) === parseInt(selList.id, 10);
		});

		delBtn.addEventListener("click", (e) => {
			delTask(e, LSP);
		});

		actionBtn.addEventListener("click", (e) => {
			changeTask(e, LSP);
		});

		pStorageList = [...pStorageList, ...filtList];
		const { text, id } = filtList[0];
		span.innerText = text;

		li.id = id;
		li.appendChild(span);
		li.appendChild(delBtn);
		li.appendChild(actionBtn);
		actionBtn.innerText = "😀";
		pList.appendChild(li);
		if (pStorageList.length !== 0) {
			saveTask(JSON.stringify(pStorageList), LSP);
		}
	}
	delTask(e, flag);
}

function delTask(e, flag) {
	const li = e.target.parentNode;
	const selList = li.parentElement;

	selList.removeChild(li);
	if (flag === LSP) {
		const filtList = pStorageList.filter((e) => {
			return parseInt(e.id, 10) !== parseInt(li.id, 10);
		});
		pStorageList = filtList;
		saveTask(JSON.stringify(pStorageList), flag);
	} else {
		const filtList = fStorageList.filter((e) => {
			return parseInt(e.id, 10) !== parseInt(li.id, 10);
		});
		fStorageList = filtList;
		saveTask(JSON.stringify(fStorageList), flag);
	}
}

function addTask(input, flag) {
	const taskId =
		new Date().getTime() +
		(flag === LSP ? pStorageList.length : fStorageList.length);
	const li = document.createElement("li");
	const span = document.createElement("span");
	const delBtn = document.createElement("button");
	const actionBtn = document.createElement("button");

	span.innerText = input;
	delBtn.innerText = "❌";
	delBtn.addEventListener("click", (e) => {
		delTask(e, flag);
	});

	actionBtn.addEventListener("click", (e) => {
		changeTask(e, flag);
	});

	li.id = taskId;
	li.appendChild(span);
	li.appendChild(delBtn);
	li.appendChild(actionBtn);

	const taskObj = {
		text: input,
		id: taskId,
	};
	if (flag === LSP) {
		pStorageList.push(taskObj);
		actionBtn.innerText = "😀";
		pList.appendChild(li);
		saveTask(JSON.stringify(pStorageList), flag);
	} else {
		fStorageList.push(taskObj);
		actionBtn.innerText = "😫";
		fList.appendChild(li);
		console.log(fStorageList);
		saveTask(JSON.stringify(fStorageList), flag);
	}
}

function saveTask(inputList, flag) {
	localStorage.setItem(flag, inputList);
}

function loadTask() {
	const LSpList = localStorage.getItem(LSP);
	const LSFList = localStorage.getItem(LSF);
	if (LSpList !== null) {
		const parsedLSp = JSON.parse(LSpList);
		parsedLSp.forEach((e) => {
			addTask(e.text, LSP);
		});
	}
	if (LSFList !== null) {
		const parsedLSf = JSON.parse(LSFList);
		parsedLSf.forEach((e) => {
			addTask(e.text, LSF);
		});
	}
}

function handleSubmit(e) {
	e.preventDefault();
	const inputValue = taskInput.value;
	addTask(inputValue, LSP);
	taskInput.value = "";
}

function init() {
	taskForm.addEventListener("submit", handleSubmit);
	loadTask();
}

init();
