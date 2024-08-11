const searchBox =  document.querySelector('.searchBox');
const searchBtn =  document.querySelector('.searchBtn');
const recipeContainer =  document.querySelector('.recipe-container');
const recipContainer =  document.querySelector('.recip');
const aboutUs =  document.querySelector('.about-us');
const featuredRecipe =  document.querySelector('.featured-recipe');
const typesList =  document.querySelector('.typesList');
const contact =  document.querySelector('.contact');

const recipeDetailsContent =  document.querySelector('.recipe-details-content');
const recipeCloseBtnr =  document.querySelector('.recipe-close-btn');
const scrollToTopBtn = document.getElementById('scrollToTopBtn');


window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

// Scroll to the top when the button is clicked
scrollToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scroll effect
    });
};

//fuunction to get recipes
const fetchRecipes= async (query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes....<h2>";

    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response =  await data.json();
    recipeContainer.innerHTML="";
    recipContainer.innerHTML="";
    aboutUs.innerHTML="";
    featuredRecipe.innerHTML="";
    typesList.innerHTML="";
    contact.innerHTML="";




 




    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3>
      <p><span>${meal.strArea}</span> Dish</p>
      <p>Belongs to <span>${meal.strCategory}</span> Category</p>

        `

        const button =  document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //addding eventlistener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);

    });
   }
   catch(error){
    recipeContainer.innerHTML="<h2>Error in Fetching Recipes....<h2>";

   }

   
}
//fuction to fetch inredients and measurements

const fetchIngredients = (meal) => {
    let IngredientsList = "";
    for(let i=1;i<=20;i++)
    {
        const Ingredient = meal[`strIngredient${i}`];
        if(Ingredient){
            const measure = meal[`strMeasure${i}`];
            IngredientsList += `<li>${measure} ${Ingredient}</li>`
        }
        else
        {
            break;
        }
    }
    return IngredientsList;
}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
   <div class="recipeIngre">

    <h3>Ingredients:</h3>
    </div>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
      <h3>Instructions : </h3>
      <p>${meal.strInstructions}</p>
    <div>  
    `
    recipeDetailsContent.parentElement.style.display = "block";
}


recipeCloseBtnr.addEventListener('click', ()=> {
    recipeDetailsContent.parentElement.style.display ="none";
});


searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
// console.log("Button Clicked");
document.body.style.backgroundImage = 'none';
    recipeContainer.style.display = 'grid';
    recipContainer.style.display = 'none';

});



// ----login
