"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  pin: 1111,
};

const account2 = {
  owner: "Joy Matubber",
  pin: 2222,
};

const accounts = [account1, account2];
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");

const containerApp = document.querySelector(".app");
//const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

///containerMovements.innerHTML = "";
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

const UpdateUI = function (acc) {
  displayMovment(acc); // display Movment
  balanceDisplay(acc); // display login account balance
  displaySummery(acc); // display in
};

btnLogin.addEventListener("click", function (e) {
  e.preventDefault(); // reload hoa off kore karon amra jokhn submit button e click kroi page ta reload hoy
  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === +inputLoginPin.value) {
    labelWelcome.textContent = `Wlcome Back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputClosePin.blur();
    // timer
    // if (timer) clearInterval(timer);

    // timer = startLogoutTimer();

    UpdateUI(currentAccount);
    currentDate();
  }
  // console.log(currentAccount.userName);
  inputLoginUsername.value = inputLoginPin.value = "";
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "../Details/index.html";
});

// ddelete account

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      // kon account delet korbo khuje ber korbe
      (acc) => acc.userName === currentAccount.userName
    );
    console.log(index);
    accounts.splice(index, 1); // delete one time
    containerApp.style.opacity = 0; //account delete kore dile information show korbe na
  }
  inputCloseUsername.value = inputClosePin.value = ""; // set this positin is emplty
  // console.log('delete');
});
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  window.location.href = "../FlagGame/index.html";
});
