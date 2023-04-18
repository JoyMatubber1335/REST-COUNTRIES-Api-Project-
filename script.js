const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  console.log(searchInputTxt);
  fetch(`https://restcountries.com/v3.1/name/${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data) {
        data.forEach((data) => {
          html += `
                      <div class = "meal-item" data-id = "${data.name.common}">
                          <div class = "meal-img">
                              <img src = "${data.flags.png}" alt = "food">
                          </div>
                          <div class = "meal-name">
                              <h3>${data.population}</h3>
                              <a href = "#" class = "country-btn">Get Details</a>
                          </div>
                      </div>
                  `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
}

// get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("country-btn")) {
    let countryItem = e.target.parentElement.parentElement;
    console.log(countryItem);
    fetch(`https://restcountries.com/v3.1/name/${countryItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data));
  }
}

// create a modal
function mealRecipeModal(country) {
  console.log(country);
  country = country[0];
  let html = `
        <h2 class = "recipe-title">${country.name.common}</h2>
        <p class = "recipe-category">${country.area}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <img src="${country.flags.png}" />
        </div>
        <a href=${country.maps.googleMaps}>Map</a>
        
      
    `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
// <div class = "recipe-meal-img">
//     <img src = "${meal.strMealThumb}" alt = "">
// </div>
// <div class = "recipe-link">
//     <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
// </div>
