var apiKey = "9973533";
var randomDrinkURL = `https://www.thecocktaildb.com/api/json/v2/${apiKey}/random.php`;
var randomFoodURL = `https://www.themealdb.com/api/json/v2/${apiKey}/random.php`;

var randomize = document.querySelector('#randomizer');
var randomDrink = document.querySelector('#randomDrink');
var randomFood = document.querySelector('#randomFood')

randomize.addEventListener("click", function () {
    fetch(randomDrinkURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showDrink(data);
            console.log(data);
        });

    function showDrink(data) {
        //beginning div
        var drinkCard = document.createElement("div");
        drinkCard.classList = "card card-resize"

        // img div
        var drinkThumbDiv = document.createElement("div");
        drinkThumbDiv.classList = "card-image waves-effect waves-block waves-light"
        // the image
        var drinkThumb = document.createElement("img");
        drinkThumb.classList = "activator"
        drinkThumb.setAttribute("src", data.drinks[0].strDrinkThumb);
        drinkThumbDiv.append(drinkThumb);
        // drink name div
        var drinkNameDiv = document.createElement("div");
        drinkNameDiv.classList = "card-content"
        //drink name 
        var drinkName = document.createElement("span");
        drinkName.classList = "card-title activator grey-text text-darken-4"
        //drinkName.href = 
        drinkName.textContent = data.drinks[0].strDrink
        //all the appends
        drinkNameDiv.append(drinkName);
        drinkCard.append(drinkThumbDiv);
        drinkCard.append(drinkNameDiv);
        randomDrink.append(drinkCard);
    }

    fetch(randomFoodURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            showFood(data);
            console.log(data)
        });

    function showFood(data) {
        //beginning div
        var foodCard = document.createElement("div");
        foodCard.classList = "card card-resize"

        //food img div 
        var foodThumbDiv = document.createElement("div");
        foodThumbDiv.classList = "card-image waves-effect waves-block waves-light"
        // food img
        var foodThumb = document.createElement("img");
        foodThumb.classList = "activator"
        foodThumb.setAttribute("src", data.meals[0].strMealThumb);
        foodThumbDiv.append(foodThumb);

        //food name div
        var foodNameDiv = document.createElement("div");
        foodNameDiv.classList = "card-content"
        //food name 
        var foodName = document.createElement("a");
        foodName.classList = "card-title activator grey-text text-darken-4"
        foodName.textContent = data.meals[0].strMeal
        foodName.href = data.meals[0].strSource
        foodNameDiv.append(foodName);

        //all the appends 
        foodCard.append(foodThumbDiv);
        foodCard.append(foodNameDiv);
        randomFood.append(foodCard);

    }
});