const searchBtn = document.getElementById("search-btn");
const countryList = document.getElementById("rest");
const countryDetailsContent = document.querySelector(".rest-details-content");
const CloseBtn = document.getElementById("country-close-btn");
const logoutBtn = document.querySelector("#logout-btn");
// event listeners
searchBtn.addEventListener("click", getcountryList);
countryList.addEventListener("click", getCountryInfo);
CloseBtn.addEventListener("click", () => {
  countryDetailsContent.parentElement.classList.remove("showcountry");
});

// get country  list that matches with the value
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
                      <div class = "rest-item" data-id = "${data.name.common}">
                          <div class = "rest-img">
                              <img src = "${data.flags.png}" alt = "food">
                          </div>
                          <div class = "rest-name">
                              <h3>${data.name.common}</h3>
                              <a href = "#" class = "country-btn">Get Details</a>
                          </div>
                      </div>
                  `;
        });
        countryList.classList.remove("notFound");
      } else {
        html = "Sorry, we didn't find any rest!";
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
        <h2 class = "country-title">${country.name.common}</h2>
        Area => <p class = "country-category">${country.area}</p>
         Population =>   <p  class = "country-category"  Population>${country.population}</p>
        <div class = "country-instruct">
            <h3>Flag</h3>
            <img src="${country.flags.png}" />
        </div>
        <a href=${country.maps.googleMaps}>Map</a>
        
      
    `;
  countryDetailsContent.innerHTML = html;
  countryDetailsContent.parentElement.classList.add("showcountry");
}

logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // containerApp.style.opacity = 100;
  //inputLoginUsername.value = inputLoginPin.value = "";
  window.location.href = "../Login/index.html";
});
