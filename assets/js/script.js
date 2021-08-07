var recipeEl = document.querySelector("#recipeContainer");
var foodInput = document.querySelector("#food-list");
var formEl = document.querySelector("#food-form");
var fridge = document.querySelector("#userFridge");
var allergies = document.querySelector("#allergies");
var searchBtn = document.querySelector("#searchBtn");
var items = [];
var allergyChoices = [];
var storedItems = JSON.parse(localStorage.getItem("items"));
var recipeImage = document.querySelector("#recipeImg");

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









searchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  // creates a variable to take the city input and add it to the API request
  

  // Stores the API call in a variable
  var queryUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + storedItems + '&app_id=0bef8d90&app_key=3aa6e2558540ee0b95bb5b427b5c3a98';


  function show(data) {
    var recipeName0 = document.querySelector("#recipeName0");
    recipeName0.textContent = data.hits[0].recipe.label;
    recipeName0.classList = "card-title";
    recipeEl.append(recipeName0);

    var foodImage = data.hits[0].recipe.image;
    var foodImage = recipeImage.setAttribute ("src", data.hits[0].recipe.image);
    recipeImage.classList = "card-image";
    recipeEl.append(foodImage);

    var recipeLink = document.querySelector("#recipeLink");
    recipeLink.href = data.hits[0].recipe.url;
    recipeEl.append(recipeLink);



  };
  // fetch API call
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
        show(data);
    });

  if (recipeName0 === "") {
    return;
  }
  
  storeItems();
  renderItems();
});

















// Gets recipe based on userInput 
/*var getFoodApi = function(randomVar) {
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
*/
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
/*searchBtn.addEventListener("click", getFoodApi);*/
init();