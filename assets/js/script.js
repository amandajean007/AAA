//site listener 
$(document).ready(function () {
    let usersChoice = []; //user choice empty array to be put into 
    //pulls from html
    //notice the very slight difference of the (s) 
    const userChoices = document.getElementById("food-list");
    const searchEl = document.querySelectorAll(".btn");
    const recipeEl = document.getElementById("recipe-area");
    let userListFood = document.getElementById("userFridge");
});

var foodInput = document.querySelector("#food-list");
var formEl = document.querySelector("#food-form");
var fridge = document.querySelector("#userFridge");
// var todoCountSpan = document.querySelector("#todo-count");
var items = [];

// TODO: What is the purpose of this function? .....................will pull the todos
function renderItems() {
  // TODO: Describe the functionality of the following two lines of code. ........pulling from innerHTML to DOM including length for loop
  fridge.innerHTML = ""; 
  //item.CountSpan.textContent = todos.length;/*updates todo count*/
  
  // TODO: Describe the functionality of the following `for` loop. takes in user input and makes it into an element and creates the list item and the complete button and pushes onto dom
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    console.log(item);
// creates list item and pushes to the dom
    var li = document.createElement("li");
    li.textContent = item;
    li.setAttribute("data-index", i);
//creates element to be pushed onto the dom
    var button = document.createElement("button");
    button.textContent = "Remove";
//appends to go onto dom once created
    li.appendChild(button);
    fridge.appendChild(li);
    //when creating element- remember to append or will not show up on dom
  }
}

// TODO: What is the purpose of the following function?
function init() {
  // TODO: What is the purpose of the following line of code?
  //takes a string  oand turns it into an object
  var storedItems = JSON.parse(localStorage.getItem("items"));
  // TODO: Describe the functionality of the following `if` statement.          makes it so if nothing is in the string nothing will be added
  if (storedItems !== null) {
    items = storedItems;
  }
  // TODO: Describe the purpose of the following line of code.     runs the function, pulls info back
  renderItems();
}

function storeItems() {
  // TODO: Describe the purpose of the following line of code.      turns object into a string
  localStorage.setItem("items", JSON.stringify(items));
}

// TODO: Describe the purpose of the following line of code.  when event submit is clicked it takes it to local storage
formEl.addEventListener("submit", function(event) {
  event.preventDefault();
  var itemText = foodInput.value.trim();
  // TODO: Describe the functionality of the following `if` statement. if text box is left blank, return a 
  if (itemText === "") {
    return;
  }
 // TODO: Describe the purpose of the following lines of code.       adding a new value to that array 
  items.push(itemText);
  foodInput.value = "";
 
  // TODO: What will happen when the following functions are called? .......will take the inputs and store them ...........recalls the info
  storeItems();
  renderItems();
});

// TODO: Describe the purpose of the following line of code. ....... when you click this button, 
fridge.addEventListener("click", function(event) {
  var element = event.target;
  // TODO: Describe the functionality of the following `if` statement.
  if (element.matches("button") === true) {
    var index = element.parentElement.getAttribute("data-index");
    items.splice(index, 1);
    // TODO: What will happen when the following functions are called?
    storeItems();
    renderItems();
  }
});

init();