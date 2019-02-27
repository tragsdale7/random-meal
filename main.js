// get dom elements
let dom = {
	startBtn: document.querySelector('.showcase-btn'),
	name: document.querySelector('.recipe__name'),
	category: document.querySelector('.recipe__category'),
	ingredients: document.querySelector('.recipe__ingredients'),
	instructions: document.querySelector('.recipe__instructions'),
	img: document.querySelector('.recipe__img')
};

// event listeners
document.querySelector('.recipe__btn').addEventListener('click', sendAPIRequest);

//send API request
function sendAPIRequest() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'https://www.themealdb.com/api/json/v1/1/random.php', true);

	xhr.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			let meal = JSON.parse(xhr.responseText).meals[0];
			console.log(meal);
			displayMeal(meal);
		}
	}
	xhr.send();
}
sendAPIRequest();

// update UI
function displayMeal(meal) {
	dom.name.textContent = meal.strMeal;
	dom.category.textContent = meal.strCategory;
	dom.instructions.textContent = meal.strInstructions;
	dom.img.src = meal.strMealThumb;
	displayIngredients(meal);
}

function displayIngredients(meal) {
	let ingredientNames = getIngredientComponents(meal, 'strIngredient');
	let ingredientMeasures = getIngredientComponents(meal, 'strMeasure');

	// reset the ingredients list
	deleteIngredientNodes();

	// add ingredients to UI
	for (let i = 0; i < ingredientNames.length; i++) {
		let li = document.createElement('li');
		li.classList.add('recipe__ingredients-item')

		li.textContent = `${ingredientMeasures[i]} ${ingredientNames[i]}`;

		dom.ingredients.appendChild(li)
	}
}

function deleteIngredientNodes() {
	// loop through child nodes of ingredients list and delete them
	while(dom.ingredients.firstChild) {
		dom.ingredients.removeChild(dom.ingredients.firstChild);
	}
}

// get unknown number of ingredients and their measures
function getIngredientComponents(meal, component) {
	return Object.entries(meal).filter(key => key[0].includes(component) && key[1]).map(el => el[1]);
}