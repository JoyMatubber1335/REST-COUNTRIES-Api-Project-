const countrySelect = document.getElementById("country-select");
const clock = document.getElementById("clock");
const clockBd = document.getElementById("clockBd");
const currentTimeBD = document.getElementById("current-time");
const logoutBtn = document.querySelector("#logout-btn");
// display the current time
function CurrentTimeBD() {
  const currentTime = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const dateString = currentTime.toLocaleString(undefined, options);
  currentTimeBD.innerHTML = dateString;
}
CurrentTimeBD();
// setInterval(CurrentTimeBD, 1000); // update every second

// fetch all countries from REST Countries API
fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.name.common;
      option.text = country.name.common;
      countrySelect.appendChild(option);
    });
  });

// when a country is selected fetch the current time for that country and display it
countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;
  console.log(selectedCountry);
  fetch(`https://restcountries.com/v3.1/name/${selectedCountry}?fullText=true`)
    .then((response) => response.json())
    .then((data) => {
      const selectedCountryData = data[0];
      const timeZonForSelectedCountry = selectedCountryData.timezones[0]; //utc+5:00
      console.log(timeZonForSelectedCountry);

      const currentTime = new Date(); // curent time
      const localTime = currentTime.getTime(); // ms local time
      console.log(currentTime);
      console.log(localTime);

      const localOffset = currentTime.getTimezoneOffset() * 60000; // ms i uts time
      const utc = localTime + localOffset;

      const offsetStr = timeZonForSelectedCountry;
      const offsetFloat = parseFloat(offsetStr.replace("UTC", ""));
      let selectedCountryTime = utc + 3600000 * offsetFloat;  // 5.0 to sec
      console.log(selectedCountryTime);
      console.log(
        `The local time in ${selectedCountry} is ${new Date(
          selectedCountryTime
        ).toLocaleString()}`
      );
      // const timestamp = selectedCountryTime;  //

      const date = new Date(selectedCountryTime);
      const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const dateString = date.toLocaleString(undefined, options);
      console.log(dateString);
      clock.innerHTML = dateString;
    })
    .catch((error) => console.error(error));
});

logoutBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // containerApp.style.opacity = 100;
  //inputLoginUsername.value = inputLoginPin.value = "";
  window.location.href = "../Login/index.html";
});
