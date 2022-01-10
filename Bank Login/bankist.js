'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
// console.log('Bankist');

// const future = new Date(2037, 10, 6, 3, 55);
// console.log(future.getTime());
// console.log(+future);

// const calcdaysPassed = (date1, date2) => {
//   console.log(date1 - date2);
//   (date2 - date1) / (1000 * 60 * 6 * 24);
// };

// const days1 = calcdaysPassed(new Date(2037, 10, 6), new Date(2037, 10, 16));
// console.log(days1);

//////////////////////
// Data
//API will be in object not map
const account1 = {
  owner: 'Alison Zhao',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1234,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2021-04-01T10:17:24.185Z',
    '2021-05-08T14:11:59.604Z',
    '2021-05-08T17:01:17.194Z',
    '2021-09-08T23:36:17.929Z',
    '2021-09-10T10:51:36.790Z',
  ],
  currency: 'JPY',
  locale: 'ja-JP', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//
//create a date

//format date is being used in for each which will go throght each date in array
const formatDate = function (date, locale) {
  //create fuction that will calcualte the numberes of days passed based on two dates
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  // store the number of days passed from when user opens login and the date the transactions happen (  date = new Date(acc.movementsDates[i]) )

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    console.log(daysPassed);

    // //pad the day to 0(day) by padding string
    // const day = `${date.getDate()}`.padStart(2, 0);
    // //month is zero based
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    //return `${day}/${month}/${year}`;
    return new Intl.DateTimeFormat(locale).format(date);
  }
};
//does not apss account, reusavel funcition
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

//will receive on array of movements and work with data
const displayMovements = function (acc, sort = false) {
  //empty container then add new elements
  //why does this set the the container to the right ${i + 1} ${type}
  //this will wioe out previous entries ???
  containerMovements.innerHTML = '';
  // dont sort unlysng data, just display, so use splice to create a new array then sort if sort is true
  const movSort = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  //use the mov as the movemrnt to display. sorted or not sorted
  movSort.forEach(function (mov, i) {
    //create the html block that will have the text content of this informaito
    //select html by copy and paste in html template
    //go through each loop and change the hardcoded data
    //know if deposite or withdrawal with ternary operate
    //will change
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //console.log(acc.movementsDates);
    //for each row of the transaction date that is stored ina array
    //lopping two arays at same time
    const date = new Date(acc.movementsDates[i]);
    //also need ot pass current locale
    const displayDate = formatDate(date, acc.locale);

    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    //when dispaying new movemnts. like transder or loan, you need to input a date that is not from the acc.movement DAtes
    const html = `
     <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
    
    <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>`;
    //to fixed will print all movement number values to 2 decimal
    //insert this where you want to place movement row
    //first string is position you ant attach HTML
    containerMovements.insertAdjacentHTML('afterBegin', html);
  });
};

//update balance and displace balance
const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  acc.balance = balance;
  //display in text area balance value

  const formatBalance = formatCurrency(acc.balance, acc.locale, acc.currency);

  labelBalance.textContent = formatBalance;
};
//calling display fn

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  // labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.loacle,
    acc.currency
  );

  //apping will create new array when mapped
  //pay interest if only 1 euro
  //dynamical interst rate
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.loacle,
    acc.currency
  );
};

//compute username by using initials

const createUsernames = function (accs) {
  // for each will mutate the origianl array not create a new aray
  //no reaturn because you want side effect , which is adding propety to object
  accs.forEach(function (accs) {
    accs.username = accs.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('transefr');
  const amount = Number(inputTransferAmount.value);
  //only useful if find account object to look for the person to match
  //inaddition to matchin the find will select the username property
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  //clear input feild after every try to transfer
  //create a confirm page for transfer showing amount and who
  inputTransferTo.value = inputTransferAmount.value = '';
  console.log(amount, receiverAcc);
  //check if jonas has enought money
  //make sure that the amount is not negative
  //cant transfer to own

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    console.log('valid');
    //add the  transer by negative the account owner
    //add positve cash flow to reciver acc
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //push the date to movemebt dates to display in row
    //in real world thereis object fro each movement with amount date...
    const transferDate = new Date().toISOString();
    currentAccount.movementsDates.push(transferDate);
    receiverAcc.movementsDates.push(transferDate);

    //update UI
    updateUI(currentAccount);

    //reset timer to rest it again
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

const updateUI = function (currentAcc) {
  //display movements
  displayMovements(currentAcc);

  //display balance
  calcDisplayBalance(currentAcc);

  //display summary
  calcDisplaySummary(currentAcc);
};

//make loan deposit if at least 10% of requested loan amount

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  //math floor wil round down the loan so loans amount is integer
  const amount = Math.floor(inputLoanAmount.value);
  //need T/F value in if. looking for if any values then. SOME method
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //add the transfer amount to the movements
      currentAccount.movements.push(amount);

      //add  date loan was given
      const loanDate = new Date().toISOString();
      currentAccount.movementsDates.push(loanDate);

      updateUI(currentAccount);
    }, 0);
    //if loan not valid, clear the text field and not do anything

    clearInterval(timer);
    timer = startLogOutTimer();
  }
  inputLoanAmount.value = '';
});

//need glboal becuase for trnasfer money and current acc for otehr funciosn
let currentAccount, timer;

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0); //const hour =
    //in each callback call, print remaining tim e to UI
    // labelTimer.textContent = `${min}: ${sec}`;
    labelTimer.textContent = `${min}:${sec}`;

    //logout
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      //using classes for style
      containerApp.style.opacity = 0;
    }
    // when 0 will logout

    //decrease 1 sec, then if 0
    time--;
  };
  let time = 60;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//select form with username and pin class login
// for form element the page will reloade after submit
btnLogin.addEventListener('click', function (e) {
  //prevetn form from submitting or refreshing
  e.preventDefault();
  // find account form account array
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  //have username that will select from the data base
  console.log(currentAccount);
  //? where is inputLoginPin get avlaues
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //diasplay UI if rigth credential
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(' ')[0]}`;
    //using classes for style
    containerApp.style.opacity = 100;

    //API experimentation
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'long',
    };

    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    //create current date and time
    //const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // //month is zero based
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = now.getHours();
    // const min = now.getMinutes();

    // labelDate.textContent = `${day}/${month}/${year} ${hour}:${min}`;

    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
    updateUI(currentAccount);
  }
  //set the user and pin input back to nothing
  // inputLoginPin.value = '';
  // inputLoginUsername.value = '';
  inputLoginUsername.value = inputLoginPin.value = '';
  //blurs focus from element after login and the cursor is still on the last elemtn pin.
  inputLoginPin.blur();
  //when click enter in text form filed, will trigger click
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //check credential by cureetn user = confirm user input and pin
  //find the current user then match with user input value
  //+'number' will NUmber(string)
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === +inputClosePin.value
  ) {
    //muste the array with splcie
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    //delete acc
    accounts.splice(index, 1);
    //hide ui
    containerApp.style.opacity = 0;
  }
  //clear input fields
  inputClosePin.value = inputCloseUsername.value = '';
});

//need state variaable for sorting
let sortState = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault;
  displayMovements(currentAccount, !sortState);
  //flip vaiavle
  sortState = !sortState;
});

//FAKE login
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;
if (timer) clearInterval(timer);
timer = startLogOutTimer();
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  weekday: 'long',
};

// const locale = navigator.language;
// console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat(
  currentAccount.locale,
  options
).format(now);
