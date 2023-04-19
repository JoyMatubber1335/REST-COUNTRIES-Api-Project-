const searchBtn = document.getElementById("search-btn");
const countryList = document.getElementById("meal");
const countryDetailsContent = document.querySelector(".meal-details-content");
const CloseBtn = document.getElementById("recipe-close-btn");

// event listeners
searchBtn.addEventListener("click", getcountryList);
countryList.addEventListener("click", getCountryInfo);
CloseBtn.addEventListener("click", () => {
  countryDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that matches with the ingredients
function getcountryList() {
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
                              <h3>${data.name.common}</h3>
                              <a href = "#" class = "country-btn">Get Details</a>
                          </div>
                      </div>
                  `;
        });
        countryList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any meal!";
        countryList.classList.add("notFound");
      }

      countryList.innerHTML = html;
    });
}

// get country
function getCountryInfo(e) {
  e.preventDefault();
  if (e.target.classList.contains("country-btn")) {
    let countryItem = e.target.parentElement.parentElement;
    console.log(countryItem);
    fetch(`https://restcountries.com/v3.1/name/${countryItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => CountryInfoModal(data));
  }
}

// create a modal
function CountryInfoModal(country) {
  console.log(country);
  country = country[0];
  let html = `
        <h2 class = "recipe-title">${country.name.common}</h2>
        Area => <p class = "recipe-category">${country.area}</p>
         Population =>   <p  class = "recipe-category"  Population>${country.population}</p>
        <div class = "recipe-instruct">
            <h3>Flag</h3>
            <img src="${country.flags.png}" />
        </div>
        <a href=${country.maps.googleMaps}>Map</a>
        
      
    `;
  countryDetailsContent.innerHTML = html;
  countryDetailsContent.parentElement.classList.add("showRecipe");
}
// <div class = "recipe-meal-img">
//     <img src = "${meal.strMealThumb}" alt = "">
// </div>
// <div class = "recipe-link">
//     <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
// </div>
