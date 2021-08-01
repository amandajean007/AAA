//site listener 
$(document).ready(function () {
    let usesrChoice = []; //user choice empty array to be put into 
    //pulls from html
    //notice the very slight difference of the (s) 
    const userChoices = document.getElementById("userChoice");
    const searchEl = document.querySelectorAll(".btn");
    const recipeEl = document.getElementById("recipe-area");

//Function to go and auto fill when users collect 
$(function autoFillFood () {
    //put array to run through- pulldown/autofill
    userChoices.toLowerCase(); //make sure that it can be read no matter what 
    //wonder if we can't use the API for the drop down and could completely ignore this?? 
    var autoFillList = ['apple', 'avocado', 'apricots', 'lemons', 'pears', 'banana', 'melon', 'fruits', 'baby spinach', 'mixed greens', 'broccoli',
    'cauliflower', 'carrots', 'herbs', 'potatoes','onions', 'garlic', 'peppers', 'roots', 'salmon', 'cod', 'shrimp', 'tortillas', 'bread', 
    'pitas', 'bacon', 'sausage', 'beef', 'pork', 'chicken', 'ham', 'turkey', 'canned tomatos', 'black beans', 'pinto beans', 'milk', 'butter', ''] 
    //autocomplete is a completed widget that we just need to call 
    //taking given skill and pulling it 
    $('#food-list').autocomplete({
      source: autoFillList
    }) 
  }
  //function here to save user choices to then run through next function 
  );



function getRecipe() {
// where fetch will be
const APIKeyRecipe = '3aa6e2558540ee0b95bb5b427b5c3a98	—'
var APIsite = ''
//where to put empty array of food? 
// from rapid api thingy (idk if it will work)
// fetch("https://edamam-recipe-search.p.rapidapi.com/search?q=chicken", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "edamam-recipe-search.p.rapidapi.com"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

}
})


//take options from autofill to run through the apis 
    //keep choices and search api for the food receipes 


// only one recipe- if don't like it, run through function again