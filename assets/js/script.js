const searchEl = document.querySelector("#searchBtn");
var recipeEl = document.querySelector("#recipe-area");
var foodInput = document.querySelector("#food-list");
var formEl = document.querySelector("#food-form");
var fridge = document.querySelector("#userFridge");
var allergies = document.querySelector("#allergies");
var items = [];
var allergyChoices = [];
var searchBtn = document.querySelector("#searchBtn")
var dairyFree = document.querySelector('input[id="dairyFree"]');
var glutenFree = document.querySelector('input[id="glutenFree"]');
var wheatFree = document.querySelector('input[id="wheatFree"]');
var eggFree = document.querySelector('input[id="eggFree"]');
var peanutFree = document.querySelector('input[id="peanutFree"]');

// Will pull the food items from the fridge
function renderItems() {
  // Pulling from innerHTML to DOM including length for loop
  fridge.innerHTML = ""; 
// Takes in user input and makes it into an element and creates the list item and the complete button and pushes onto dom
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    console.log(item);
    // creates list item and pushes to the dom
    var ul = document.createElement("ul");
    ul.textContent = item;
    ul.setAttribute("data-index", i);
    //creates element to be pushed onto the dom
    var button = document.createElement("button");
    button.textContent = "Remove";
    //appends to go onto dom once created
    ul.appendChild(button);
    fridge.appendChild(ul);
  }
}

// Get stored items from local storage
function init() {
  //takes a string  oand turns it into an object
  var storedItems = JSON.parse(localStorage.getItem("items"));
  // if items were retrieved from local storage update the stored items to it
  if (storedItems !== null) {
    items = storedItems;
  }
  // helper function that will render items to the DOM
  renderItems();
}

function storeItems() {
  // turns object into a string and set key in local storage
  localStorage.setItem("items", JSON.stringify(items));
}

// when you add food to the input area, it creates a variable fot it which will put it in the fridge
formEl.addEventListener("submit", function(event) {
  event.preventDefault();
  var itemText = foodInput.value.trim(); 
  if (itemText === "") {
    return;
  }
 // adding a new value to that array 
  items.push(itemText);
  foodInput.value = "";
 
  // will take the inputs and store them => recalls the info
  storeItems();
  renderItems();
});

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

init();



// start API 
//add event listen - on search btn 

searchEl.addEventListener("click", function() {
    var storedItems = JSON.parse(localStorage.getItem("items"));
  var foodAPI = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + storedItems + '&app_id=0bef8d90&app_key=3aa6e2558540ee0b95bb5b427b5c3a98' + allergyChoices
  //  + '&health=' + allergies;
  fetch(foodAPI) 
    .then(response => response.json()) 
    .then(data => {
      console.log(data);
      var recipe = document.createElement('li'); 
      recipe.textContent = data.hits[recipe];
      recipeEl.appendChild(recipe);
    })
    
  })

//on click, box checked add event.target.value to array



if(dairyFree.checked = true) {
  console.log("yay");
} else {
  console.log("WRONG");
}
//per_page=5


