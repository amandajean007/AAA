const searchEl = document.querySelector("#searchBtn");
var recipeEl = document.querySelector("#recipeContainer");
var foodInput = document.querySelector("#food-list");
var formEl = document.querySelector("#food-form");
var fridge = document.querySelector("#userFridge");
var allergies = document.querySelector("#allergies");
var searchBtn = document.querySelector("#searchBtn");
var items = [];
var allergyChoices = [];

// Will pull the food items from the fridge
function renderItems() {
  fridge.innerHTML = ""; 
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    console.log(item);
    var ul = document.createElement("ul");
    ul.textContent = item;
    ul.setAttribute("data-index", i);
    var button = document.createElement("button");
    button.textContent = "Remove";
    ul.appendChild(button);
    fridge.appendChild(ul);
  }
}
// Get stored items from local storage
function init() {
  var storedItems = JSON.parse(localStorage.getItem("items"));
  if (storedItems !== null) {
    items = storedItems;
  }
  renderItems();
}
//stores item 
function storeItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

//creates variable 
var saveAndPush = function(event) {
  event.preventDefault();
  var itemText = foodInput.value.trim(); 
  if (itemText === "") {
    return;
  }
  items.push(itemText);
  foodInput.value = "";
  storeItems();
  renderItems();
};

// when you click this button, 
fridge.addEventListener("click", function(event) {
  var element = event.target;
  // checks if element is a button
  if (element.matches("button") === true) {
    // get data index value and remove from the list
    var index = element.parentElement.getAttribute("data-index");
    items.splice(index, 1);
    storeItems();
    renderItems();
  }
});


// Gets recipe based on userInput 
var getFoodApi = function(randomVar) {
    var storedItems = JSON.parse(localStorage.getItem("items"));
  var foodAPI = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + storedItems + '&app_id=0bef8d90&app_key=3aa6e2558540ee0b95bb5b427b5c3a98' + allergyChoices
  //  per_page=5
  fetch(foodAPI) 
    .then(response => response.json()) 
    .then(data => {
      console.log(data)
      displayFood(data, randomVar);
    })
  }

var displayFood = function(recipe, searchedRecipe) {
  // to have blank area? 
  recipeEl.textContent = '';
  // displayRecipe.textContent = searchedRecipe;

  //
  var recipe0 = document.querySelector('#recipeName0');
  recipe0.textContent = recipe.hits[0].recipe.label; //finds name 
  recipeEl.appendChild(recipe0);
}

formEl.addEventListener("submit", saveAndPush)
searchBtn.addEventListener("click", getFoodApi);
init();

