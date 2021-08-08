var recipeEl = document.querySelector("#recipeContainer");
var foodInput = document.querySelector("#food-list");
var formEl = document.querySelector("#food-form");
var fridge = document.querySelector("#userFridge");
var allergies = document.querySelector("#allergies");
var searchBtn = document.querySelector("#searchBtn");
var storedItems = JSON.parse(localStorage.getItem("items"));
var recipeImage = document.querySelector("#recipeImg");
var items = [];
var allergyChoices = [];

// Will pull the food items from the fridge
function renderItems() {
  fridge.innerHTML = "";
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    //console.log(item);
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
var saveAndPush = function (event) {
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
fridge.addEventListener("click", function (event) {
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

searchBtn.addEventListener("click", function (event) {
  var queryUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + storedItems + '&app_id=0bef8d90&app_key=3aa6e2558540ee0b95bb5b427b5c3a98';

  // fetch API call
  fetch(queryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      show(data);
    });

  function show(data) {
    var recipeArr = []
    var hitsArr = data.hits

    for (let i = 0; i < hitsArr.length; i++) {
      //object to be run through 
      const recipeObj = {
        label: hitsArr[i].recipe.label,
        image: hitsArr[i].recipe.image,
        link: hitsArr[i].recipe.url
      };
      recipeArr.push(recipeObj)

    }
    // math floors it to get random object/array
    var randomRecipeGen = Math.floor(Math.random() * recipeArr.length)
    var randomObj = recipeArr[randomRecipeGen];

    // title
    var recipeName0 = document.querySelector("#recipeName0");
    recipeName0.textContent = randomObj.label;
    //food image
    recipeImage.setAttribute("src", randomObj.image);
    recipeImage.classList = "card-image";
    // recipe link 
    var recipeLink = document.querySelector("#recipeLink");
    recipeLink.href = randomObj.link;
    // recipeLink.textContent = recipeUrl
  };
});

formEl.addEventListener("submit", saveAndPush)
init();