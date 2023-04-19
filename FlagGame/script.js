// API endpoint
const apiEndpoint = "https://restcountries.com/v2/all";

// Game state variables
let score = 0;
let currentFlag = null;
let countries = [];

// DOM elements
const flagImg = document.querySelector("#flag-img");
const answerInput = document.querySelector("#answer-input");
const submitBtn = document.querySelector("#submit-btn");
const scoreDisplay = document.querySelector("#score-display");
const resultDisplay = document.querySelector("#result-display");

// Get country data from API
fetch(apiEndpoint)
  .then((response) => response.json())
  .then((data) => {
    countries = data;

    initializeGame();
  })
  .catch((error) => {
    console.error(error);
  });

// Game initialization function
function initializeGame() {
  // Make a copy of the countries array
  countries = [...countries];

  // Reset score
  score = 0;
  updateScoreDisplay();

  // Show first flag
  showNextFlag();

  // Add event listener to submit button
  submitBtn.addEventListener("click", handleAnswerSubmission);
  console.log(countries);
}

// Function to show the next flag
function showNextFlag() {
  // Choose a random country
  const randomIndex = Math.floor(Math.random() * countries.length);
  const randomCountry = countries[randomIndex];

  // Set current flag to the country's flag
  currentFlag = randomCountry.flag;
  flagImg.src = currentFlag;
  console.log(randomCountry.name);

  // Remove the country from the array
  countries.splice(randomIndex, 1);
}

// Function to handle answer submission
async function handleAnswerSubmission(e) {
  e.preventDefault();

  // Get the user's answer
  const userAnswer = answerInput.value.trim();

  // Check if the user has entered an answer
  if (userAnswer === "") {
    resultDisplay.textContent = "Please enter an answer.";
    return;
  }

  // Get the actual country name
  // const actualCountry = getCountryName(currentFlag);
  const countryCode = currentFlag.split("/").pop().slice(0, -4);
  // let actualCountry;
  let response = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`
  );
  let data = await response.json();
  let actualCountry = data[0].name.common;
  // console.log(actualCountry);

  // console.log(actualCountry);
  // Check if the answer is correct
  if (actualCountry === userAnswer) {
    resultDisplay.textContent = "Correct!";
    score++;
    updateScoreDisplay();
    showNextFlag();
  } else {
    resultDisplay.textContent = `Wrong! The answer was ${actualCountry}`;
    // console.log(actualCountry);
    showNextFlag();
  }

  // Clear input field
  answerInput.value = "";
}

// Function to update the score display
function updateScoreDisplay() {
  scoreDisplay.textContent = `Score: ${score}`;
}
