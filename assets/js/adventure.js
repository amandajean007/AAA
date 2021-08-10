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
        drinkName.textContent = data.drinks[0].strDrink
        // recipe reveal stuff 
        //div for recipe 
        var recipeReveal = document.createElement("div");
        recipeReveal.classList = "card-reveal"
        // recipe reveal stuff 
        var recipeInfo = document.createElement("span");
        recipeInfo.classList = "card-title activator grey-text text-darken-4"
        recipeInfo.textContent = data.drinks[0].strDrink
        // close symbol
        var closeRecipe = document.createElement("i");
        closeRecipe.classList = "material-icons right"
        closeRecipe.textContent = "close"
        // recipe 
        var recipeDetails = document.createElement("div");
        recipeDetails.classList = "recipe-details"
        recipeDetails.setAttribute = ("id", data.drinks[0].idDrink);
        recipeInfo.append(closeRecipe);
        recipeReveal.append(recipeInfo);
        recipeReveal.append(recipeDetails);

        drinkCard.append(drinkThumbDiv);
        drinkCard.append(drinkNameDiv);
        drinkCard.append(recipeReveal);
        randomDrink.append(drinkCard);
        // name of drink        
        var abv = document.createElement("p");
        abv.textContent = data.drinks[0].strAlcoholic
        recipeReveal.append(abv);
        abv.classList = "abv"; 
    
        var measurementDiv = document.createElement("div");
        measurementDiv.classList = "recipe-measurements"
        recipeReveal.append(measurementDiv);
        // div for ingrediants 
        var ingredientDiv = document.createElement("div");
        ingredientDiv.classList = "recipe-ingredients"
        recipeReveal.append(ingredientDiv);

        // arrray for all the ingrediants and measurements 
        for (var i = 1; i < 16; i++) {
            var objKeyMeasure = `strMeasure${i}`;
            
            if (data.drinks[0][objKeyMeasure]) {
                var recipeMeasureDisplay = document.createElement("p");
                recipeMeasureDisplay.textContent = data.drinks[0][objKeyMeasure];
                measurementDiv.append(recipeMeasureDisplay);
            }
        }

        for (var i = 1; i < 16; i++) {
            var objKeyIngredient = `strIngredient${i}`;
            
            if (data.drinks[0][objKeyIngredient]) {
                var recipeIngredientDisplay = document.createElement("p");
                recipeIngredientDisplay.textContent = data.drinks[0][objKeyIngredient]
                ingredientDiv.append(recipeIngredientDisplay);
            }
        }
        // drink instructions 
        var recipeInstructions =document.createElement("p");
        recipeInstructions.textContent = data.drinks[0].strInstructions
        recipeInstructions.classList = "drinkRecipeInstructions"
        recipeReveal.append(recipeInstructions);

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