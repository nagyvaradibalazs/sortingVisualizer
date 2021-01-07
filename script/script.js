//variables and constants
const algorithmSelector = document.getElementsByClassName("algorithm-selector-bubble")[0];
const arraySizeText = document.getElementById("size-text");
const slider = document.getElementsByClassName("slider")[0];
const container = document.querySelector(".container")
var arraySize = 55;
var algorithmType;
var array = [];
var elements = [];
var tempArray = [];
var delay;
var animationRunning = false;

//initialize
window.onload = function() {
	//updating the difficulty
	slider.oninput = function() {
		if(!animationRunning) {
			delay = 233 - arraySize * 2.23;
		}
		arraySize = this.value;
		arraySizeText.innerHTML = arraySize;
	}
	//initialize algortihm type
	changeAlgorithmType("quickSort");
	newArray();
}

//change the current algorithm type
function changeAlgorithmType(s) {
	if(animationRunning) {
		alert("Sorting algorithm is running!");
		return;
	}

	algorithmType = s;

	//update selector
	const active = document.getElementById(s);
	const coords = active.getBoundingClientRect();
	const directions = {
		height: coords.height,
		width: coords.width,
		top: coords.top,
		left: coords.left
	};

	algorithmSelector.style.setProperty("left", `${directions.left}px`);
	algorithmSelector.style.setProperty("width", `${directions.width}px`);
	algorithmSelector.style.setProperty("height", `${directions.height}px`);
	algorithmSelector.style.setProperty("top", `${directions.top}px`);
}

//creates new array
function newArray() {
	if(animationRunning) {
		alert("Sorting algorithm is running!");
		return;
	}

	delay = 233 - arraySize * 2.23;
	reset();
	let width = 800 / arraySize - 1;
	//assign random values to array
	for(let i = 0; i < arraySize; i++) {
		let temp = Math.floor(Math.random() * (400 - 50) + 50);
		array.push(temp);
		tempArray.push(0);
		//create html element
		container.innerHTML += `<div id="element${i}" class="array-element" style="width: ${width}px; height: ${temp}px; transform: translateX(${window.innerWidth / 2 - 175 + i * (width + 1)}px); transition: all ${delay / 1000} ease;"></div>`;
	}
	elements = document.querySelectorAll(".array-element");
}

//resets array and html elements
function reset() {
	container.innerHTML = "";
	elements = [];
	array = [];
}

//run the sort function with the picked algorithm
function runSort() {
	if(!animationRunning) {
		animationRunning = true;
		eval(algorithmType + "()");
	}
}

//swap two elements in the array with animation
function swap(a, b) {
	return new Promise(resolve => {
		//swap array elements
		let temp = array[a];
		array[a] = array[b];
		array[b] = temp;

		//update the corresponding heights
		const e1 = window.getComputedStyle(elements[a]);
		const e2 = window.getComputedStyle(elements[b]);
		const x1 = e1.getPropertyValue("height");
		const x2 = e2.getPropertyValue("height");

		elements[a].style.height = x2;
		elements[b].style.height = x1;

		//wait for the transition
		window.requestAnimationFrame(function() {
			setTimeout(() => {
				resolve();
			}, delay);
		});
	});
}

//bubble sort
async function bubbleSort() {
	for(let i = 0; i < elements.length - 1; i++) {
		for(let j = 0; j < elements.length - 1 - i; j++) {
			//update current colors
			elements[j].style.setProperty("background", "orange");
			elements[j + 1].style.setProperty("background", "orange");

			await new Promise(resolve =>
				setTimeout(() => {
					resolve();
				}, delay / 3)
			);

			if(array[j] > array[j + 1]) {
				await swap(j, j + 1);
			}
			// colors back
			elements[j].style.setProperty("background", "tomato");
			elements[j + 1].style.setProperty("background", "tomato");
		}
		elements[elements.length - 1 - i].style.setProperty("background", "green");
	}
	elements[0].style.setProperty("background", "green");
	animationRunning = false;
}

//cocktail sort
async function cocktailSort() {
	let swapped = true;
	let start = 0;
	let end = elements.length - 1;

	while(swapped) {
		swapped = false;
		for(let j = start; j < end; j++) {
			//update current colors
			elements[j].style.setProperty("background", "orange");
			elements[j + 1].style.setProperty("background", "orange");

			await new Promise(resolve =>
				setTimeout(() => {
					resolve();
				}, delay / 3)
			);

			if(array[j] > array[j + 1]) {
				await swap(j, j + 1);
				swapped = true;
			}
			// colors back
			elements[j].style.setProperty("background", "tomato");
			elements[j + 1].style.setProperty("background", "tomato");
		}
		elements[end].style.setProperty("background", "green");
		if(!swapped)
			break;

		swapped = false;
		end--;

		for(let j = end - 1; j >= start; j--) {
			//update current colors
			elements[j].style.setProperty("background", "orange");
			elements[j + 1].style.setProperty("background", "orange");

			await new Promise(resolve =>
				setTimeout(() => {
					resolve();
				}, delay / 3)
			);

			if(array[j] > array[j + 1]) {
				await swap(j, j + 1);
				swapped = true;
			}
			// colors back
			elements[j].style.setProperty("background", "tomato");
			elements[j + 1].style.setProperty("background", "tomato");
		}
		elements[start].style.setProperty("background", "green");
		start++;
	}
	for(let i = 0; i < elements.length; i++) {elements[i].style.setProperty("background", "green");}
	animationRunning = false;
}

//selection sort
async function selectionSort() {
	for(let i = 0; i < elements.length - 1; i++) {
		let minIndex = i;
		for(let j = i + 1; j < elements.length; j++) {
			//update current colors
			elements[j].style.setProperty("background", "orange");

			await new Promise(resolve =>
				setTimeout(() => {
					resolve();
				}, delay / 3)
			);

			if(array[j] < array[minIndex]) {
				minIndex = j;
			}
			// colors back
			elements[j].style.setProperty("background", "tomato");
		}
		await swap(i, minIndex);
		elements[i].style.setProperty("background", "green");
	}
	elements[elements.length - 1].style.setProperty("background", "green");
	animationRunning = false;
}

//copy function
function copy(index, value) {
	return new Promise(resolve => {
		//swap array elements
		array[index] = value;

		//update the corresponding height
		elements[index].style.height = `${value}px`;

		//wait for the transition
		window.requestAnimationFrame(function() {
			setTimeout(() => {
				resolve();
			}, delay);
		});
	});
}

//insertion sort
async function insertionSort() {
	let j, k;
	for(let i = 1; i < elements.length; i++) {
		//update current colors
		elements[i].style.setProperty("background", "green");

		k = array[i];
		j = i - 1;

		while(j >= 0 && array[j] > k) {

			//update current colors
			elements[j + 1].style.setProperty("background", "green");
			elements[j].style.setProperty("background", "orange");

			await new Promise(resolve =>
				setTimeout(() => {
					resolve();
				}, delay / 3)
			);

			await copy(j + 1, array[j]);
			j--;
		}
		// colors back
		elements[i].style.setProperty("background", "tomato");
		await copy(j + 1, k);
	}
	for(let i = 0; i < elements.length; i++) {elements[i].style.setProperty("background", "green");}
	animationRunning = false;
}

//merge sort
async function mergeSort() {
	let start, w, end, i, j, m, temp;
	let n = elements.length;

	for(let k = 1; k < n; k *= 2) {
		for(let left = 0; left + k < n; left += k*2) {
			start = left + k;
			end = start + k;
			if(end > n)
				end = n;
			m = left;
			i = left;
			j = start;
			while(i < start && j < end) {

				elements[i].style.setProperty("background", "orange");
				elements[j].style.setProperty("background", "orange");

				await new Promise(resolve =>
					setTimeout(() => {
						resolve();
					}, delay / 3)
				);

				if(array[i] <= array[j]) {
					elements[i].style.setProperty("background", "tomato");
					tempArray[m] = array[i];
					i++;
				}
				else {
					elements[j].style.setProperty("background", "tomato");
					tempArray[m] = array[j];
					j++;
				}
				m++;
			}
			while(i < start) {
				tempArray[m] = array[i];
				i++;
				m++;
			}
			while(j < end) {
				tempArray[m] = array[j];
				j++;
				m++;
			}

			for(m = left; m < end; m++) {
				await copy(m, tempArray[m]);
			}
		}
	}
	for(let i = 0; i < elements.length; i++) {elements[i].style.setProperty("background", "green");}
	animationRunning = false;
}

//quick sort
function quickSort() {
	quickSortHelper(0, elements.length - 1);
	//for(let i = 0; i < elements.length; i++) {elements[i].style.setProperty("background", "green");}
	animationRunning = false;
}

//helper function for recursive calls
async function quickSortHelper(l, r) {
	if(l < r) {
		let p = await partition(l, r);
		await quickSortHelper(l, p - 1);
		await quickSortHelper(p + 1, r);
	}
	elements[l].style.setProperty("background", "green");
}

//partition
async function partition(l, r) {
	let temp = array[r];
	let i = l - 1;

	for(let j = l; j < r; j++) {
		//update current color
		elements[j].style.setProperty("background", "orange");
		await new Promise(resolve =>
			setTimeout(() => {
				resolve();
			}, delay / 3)
		);

		if(array[j] <= temp) {
			i++;
			await swap(i, j);
		}

		//colors back
		elements[j].style.setProperty("background", "tomato");
	}
	await swap(i + 1, r);
	elements[i + 1].style.setProperty("background", "green");
	return i + 1;
}