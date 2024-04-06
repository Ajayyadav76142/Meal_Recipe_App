const searchBox =document.querySelector('.searchBox')
const searchBtn =document.querySelector('.searchBtn')
const recipeContainer =document.querySelector('.recipe-container')
const recipedetailscontent =document.querySelector(`.recipe-details-content`)
const recipeclosebtn =document.querySelector(`.recipe-close-btn`)

// Api from The MEAL DB
const fetchRecipes =async(query)=>{

    recipeContainer.innerHTML="<h2>fetching Recipes........<h2>";
    try {
        
    // for writting in javscript we have to pass ${query}
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    // Now we have to convert data in json
    const response=await data.json();

    recipeContainer.innerhtml ="";
    response.meals.forEach(meal => {
            // console.log(meal);
            const recipeDiv=document.createElement('div');
            recipeDiv.classList.add('recipe')
            recipeDiv.innerHTML=`
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belong to<span>${meal.strCategory}</span> Category</p>
            `
            // Create Button view recipe

            const button = document.createElement('button')
            button.textContent="View Recipe";
            recipeDiv.appendChild(button);

            // Adding Event Listener to recipe button
            button.addEventListener('click',()=>{
                openRecipePopup(meal)

            })

            recipeContainer.appendChild(recipeDiv);
    });
}
catch (error) {
    // when meal is not found
    recipeContainer.innerHTML="<h2>Error in fetching Recipes....<h2>";   
}
}
// function to fetch Ingredients and measurement
const fetchIngredients = (meal)=>{
    // console.log(meal);
    let ingredientsList= "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`]
            ingredientsList += ` <li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}
// for view Recipe details name Ingedients instruction
const openRecipePopup =(meal)=>{
    recipedetailscontent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    
    <div class="recipeinstructions">
        <h3>Instruction</h3>
        <p >${meal.strInstructions}</p>
    </div>
    `
    recipedetailscontent.parentElement.style.display="block";

}

recipeclosebtn.addEventListener('click',(e)=>{
    recipedetailscontent.parentElement.style.display="none";
})
searchBtn.addEventListener('click',(e)=>{
    // it prevent from Auto submit
    e.preventDefault();
    // it give you input from the search button
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2> Type the meal in the search box ..</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    // console.log("Button Clicked");
})