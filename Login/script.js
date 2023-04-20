"use strict";

const account1 = {
  owner: "Joy Matubber",
  pin: 2222,
};

const account2 = {
  owner: "Joy Sharma",
  pin: 1111,
};

const accounts = [account1, account2];
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");

const containerImg = document.querySelector(".b-img");
const containerNav = document.querySelector(".nav-bar");
const containerApp = document.querySelector(".app");
const containerHome = document.querySelector(".home");

const btnLogin = document.querySelector(".login__btn");
const btnDetails = document.querySelector(".form__btn--details");
const btnGame = document.querySelector(".form__btn--game");
const btnTime = document.querySelector(".form__btn--time");
const btnLogout = document.querySelector(".btn--logout");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");

let currentAccount, timer;

const createUserName = function (account) {
  account.forEach(function (acc) {
    acc.userName = acc.owner
      .toLocaleLowerCase() //joy matubber
      .split(" ") // 'joy' 'matubber'
      .map(
        (name) => name[0] //'j' 'm'
      )
      .join(""); //jm
  });
};
// console.log('ok');
createUserName(accounts);

btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); // reload hoa off kore karon amra jokhn submit button e click kroi page ta reload hoy
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Wlcome Back ${
      currentAccount.owner.split(" ")[0]
    }`;
    // window.location.href = "../Details/homePage.js";
    // containerApp.style.opacity = 100;
    containerApp.classList.remove("disable");
    containerImg.classList.add("disable");
    containerNav.classList.add("disable");

    // containerHome.style.opacity = 0;
    inputLoginUsername.value = inputLoginPin.value = "";
  } else {
    alert("User Name Password Is not Match !!! Try Again  ");
  }
  // console.log(currentAccount.userName);
  inputLoginUsername.value = inputLoginPin.value = "";
});

btnDetails.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "../Details/index.html";
});

btnGame.addEventListener("click", function (e) {
  e.preventDefault();

  window.location.href = "../FlagGame/index.html";
});

btnTime.addEventListener("click", function (e) {
  e.preventDefault();

  window.location.href = "../TimeZone/index.html";
});
//logout

btnLogout.addEventListener("click", function (e) {
  e.preventDefault();

  window.location.href = "../Login/index.html";
});
