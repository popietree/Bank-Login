//console.log(containerMovements.innerHTML);

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//loop array calcuate reccommed porttion and add htat property
//no need to map, just set to new value
dogs.forEach(function (dog) {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});
console.log(dogs);

//3.find all sarahs dogs and and see if its eating too uch or tooel little
dogs.forEach(function (dog) {
  ownerSarah = dog.owners.flat().includes('Sarah');
  if (ownerSarah) {
    console.log(
      `${dogs.curFood > dogs.recommendedFood ? 'too much' : 'too little'}`,
      dogs
    );
  }
});

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
///another solution3

const ownersEatTooMuch2 = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owners);

// .flat();
console.log(ownersEatTooMuch2);

//3.make an arry fo dogs who eat too much and too littelr, filter
const ownersEatTooMuch = [];
const ownersEatTooLittle = [];
dogs.forEach(function (dogs) {
  if (dogs.recommendedFood > dogs.curFood) {
    ownersEatTooMuch.push(dogs.owners);
  } else {
    ownersEatTooLittle.push(dogs.owners);
  }
  //console.log(dogs.recommendedFood);
});
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

//filter array method......
const tooMuch = dogs
  .filter(dogs => dogs.recommendedFood < dogs.curFood)
  .map(dogs => dogs.owners)
  .flat();
//or flat map
console.log(tooMuch);

const tooLittle = dogs.filter(dogs => dogs.recommendedFood > dogs.curFood);

////3.logs the string whos dog eats properly
const whosDogs = function (arr, much) {
  const listNames = arr.flat().join(', and ') + ["'s dogs"];
  console.log(`${listNames} eat too ${much === 'much' ? 'much!' : 'little!'} `);
};

whosDogs(ownersEatTooMuch, 'much');
whosDogs(ownersEatTooLittle, 'little');

//4. log if each exacly curr = recc
const [first, second, third, fourth] = dogs;

const equalRecc = dogs.some(dogs => dogs.curFood === dogs.recommendedFood);
console.log(equalRecc);

//6 log if eating okay amount of food (t/f)

const okayReccFood = dogs.filter(
  dogs =>
    dogs.curFood > dogs.recommendedFood * 0.9 &&
    dogs.curFood < dogs.recommendedFood * 1.1
);
console.log(okayReccFood);

// 6. other solution

const okayReccSome = dogs.some(
  dogs =>
    dogs.curFood > dogs.recommendedFood * 0.9 &&
    dogs.curFood < dogs.recommendedFood * 1.1
);
console.log(okayReccSome);

//array of dogs that are eatign okay
const okayArr = [...okayReccFood];
console.log(okayArr);

let numbers = [4, 2, 5, 1, 3];
numbers.sort((a, b) => {
  console.log(a, b);

  return a - b;
});
console.log(numbers);

const sorted = dogs.slice().sort((a, b) => {
  console.log(a.recommendedFood, b.recommendedFood);
  return a.recommendedFood - b.recommendedFood;
});
console.log(sorted);

// 6.
// current > (recommended * 0.90) && current < (recommended * 1.10)
// const checkEatingOkay = dog => {
//   dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1;
// };
// console.log(dogs.some(checkEatingOkay));

/*
const eurToUsd = 1.1;

labelBalance.addEventListener('click', function () {
  //   const movementsUI = Array.from(
  //     //arry from (length), (map)
  //     //using array from to make a array ;ike data into array then in array from map the array into what we want it
  //     document.querySelectorAll('.movements__value'),
  //     el => Number(el.textContent.replace('€', ''))
  //   );

  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
    el => Number(el.textContent)
  );
  console.log(movementsUI2);
});

const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((acc, ele) => acc + ele, 0);
console.log(bankDepositSum);

//finding number of accounts with over 100 depostit
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, ele) => (ele >= 1000 ? ++count : count), 0);

console.log(numDeposits1000);


let a = 10;
//does increment but will return old value
console.log(a++); //cl 10
console.log(a); //11

//crate new object, not number or string
//reduce to new array or object
//create onject with sum of depostis and withdrawals
//must retun manually not implicit return
const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, curr) => {
      sums[curr > 0 ? 'deposits' : 'withdrawals'] += curr;
      //   curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr);
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
//acc is empty object
console.log(sums);


//convert string to title case
//this is a nice title  => This Is a Nice Title

const convertTitelCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const exceptions = ['a', 'an', 'and', 'but', 'or', 'on', 'in', 'with'];
  //work indivially with works so put in array
  const titleCase = title
    .toLocaleLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitelCase('this is a LONG nice title'));
console.log(convertTitelCase('and this is a LONG nice title'));

// More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill('ojo', 2, 6);
console.log(arr);

//sort dogs array after shallow copy. and sort by recc food ascending order
//compare with a and b
////////////////////////////////////////////


const array = new Array(32, 23, 23, 23, 23, 456, 4356, 3);
console.log(array);

const x = new Array(7, 4);
console.log(x);

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(z);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);
const allDeposits = movements.every(mov => mov > 0);

// seperate call back
const deposit = mov => mov > 0;
console.log(movements.some(deposit));

const arrD = [[1, [2, 3, [3, 4]]], [4, [5, 6]], 7, 8];
console.log(arrD.flat(3));

//calcuate overall bacle of all accounts
const accMovements = accounts.map(acc => acc.movements);
console.log(accMovements);
const allmovements = accMovements.flat();
console.log(allmovements);
const overAll = allmovements.reduce((acc, mov) => acc + mov, 0);
console.log(overAll);

//chaining
const accMovements2 = accounts.map(acc => acc.movements).flat();

console.log(accMovements2);

const accMovements3 = accounts.flatMap(acc => acc.movements);

console.log(accMovements3);

const owners = ['alison', 'joans', 'adem', 'asdf'];
owners.sort;

const numbers = [-400, -700, -3, 1, 2000, 300];

//return < 0 // A,B
//reutn > 0 B,A
numbers.sort((a, b) => {});


const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

const owner = [];
for (const acc of accounts) {
  console.log(acc);
  if (acc.owner.includes('Sarah Smith')) console.log(acc);
}

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithDrawal = movements.find(mov => mov < 0);
console.log(firstWithDrawal);

//pipeline chaining methods, hard to debug
//which pipline caused the bug
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

/////////////////////////////////////////////////////
/////////////////coding challenge

// const calcAverageHumanAge = function (arrAges) {
//   //for each for sideeeffect, map is new array with tranasformsed info
//   const dogInHumanAge = arrAges
//     .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
//     .filter(dogHumanAge => dogHumanAge >= 18)
//     .reduce((acc, ele, i, arr) => {
//       // 2 and 3 avg = 2/2 +3/2
//       // acc +age /arr.length
//       console.log(arr);
//       return acc + ele / arr.length;
//       //return acc + ele;
//     }, 0);
// };


const calcAverageHumanAge = ages =>
  ages
    .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter(dogHumanAge => dogHumanAge >= 18)
    .reduce((acc, age, i, arr) => {
      console.log(arr);
      return acc + age / arr.length;
      //return acc + ele;
    }, 0);

console.log(calcAverageHumanAge([3, 5, 2, 12, 7]));


const checkDogs = function (dogsJulia, dogsKate) {
  const juliaCorrect = [...dogsJulia];
  juliaCorrect.splice(0, 1);
  juliaCorrect.splice(-2);
  //juliaCorrect.splice will update the arrayindex and you have to select from new array
  const dogs = juliaCorrect.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function (ele, i) {
    const ages = ele >= 3 ? 'adult' : 'puppy';
    console.log(`Dog number ${i + 1}
is an ${ages}, and is ${ele} years old`);
  });

  //
};

//checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
//Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
//Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

//console.log(containerMovements.innerHTML);

//


const createUsernames = function (user) {
  const username = user
    .toLocaleLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  //must return somethign
  return username;
};


//after split can loop over array and take first letter into new array then join that array

//comuting all usernames in teh account array
//modify objects so elements
//lop and do


console.log(createUsernames(accounts));
console.log(accounts);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//maximun values with reduce. can be string or object

const max = movements.reduce(function (acc, mov) {
  if (acc > mov) return acc;
  else return (acc = mov);
}, movements[0]);
console.log(max);

//MAP METHOD
//applyes callback function on original arrray

const eurToUsd = 1.1;
//convert the currenty to another by multiphyign each element by rate
const movementsUsd = movements.map(function (mov) {
  return 55;
});

const movementsUsdArr = movements.map(mov => {
  return 44;
});
console.log(movementsUsd);
console.log(movements);

const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * eurToUsd);
}
console.log(movementsUsdFor);

const movementsDescriptions = movements.map(
  (mov, i, arr) => `you ${mov > 0 ? 'deposited' : 'withdrew'} ${mov}`
);
console.log(movementsDescriptions);
console.log(movements);

//filter to retun a boolean value
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements, deposits);

//previosuly
const depositFor = [];
for (const mov of movements) if (mov > 0) depositFor.push(mov);
console.log(depositFor);

//array with withdreals mov < 0

const withdrawlFiilter = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawlFiilter);

const withdrawlArr = movements.filter(mov => mov < 0);
//REDUCE MEthod
//will get global balance
const balance = movements.reduce(function (acc, ele, i, arrayindex) {
  return acc + ele;
}, 0);

console.log(balance);

let sum = 0;
for (const mov of movements) {
  sum = sum + mov;
  console.log(sum);
}



/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

//for each on map
currencies.forEach(function (value, key, map) {
  //
  console.log(`${key}: ${value}`);
});

//for each set (unique)

const currenciesuniq = new Set(['usd', 'gbp', 'usd', 'eur']);
console.log(currenciesuniq);

currenciesuniq.forEach(function (value, key, set) {
  console.log(`${key}: ${value}`);
});



let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
let arr2 = ['h', 'i', 'alison'];

//slice method

console.log(arr.slice(2, 4));

console.log('abcde'.slice(1, 3));

//SPLICE method
console.log(arr.splice(2, 4));
//arr.splice(-1);
console.log(arr);

//concate
const letter = arr.concat(arr2);
console.log(letter.join('y'));

//for each
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//negative is withdraw

//previous
for (const [i, el] of movements.entries()) {
  if (movements > 0) {
    console.log(`you deposited ${money}`);
  } else {
    console.log(`you withdrew ${Math.abs(money)}`);
  }
}
//for each is higher order function, will call function for each iteration for each element in array as arguemtn
movements.forEach(function (money, i, arr) {
  if (movements > 0) {
    console.log(`you deposited ${money}`);
  } else {
    console.log(`you withdrddew ${Math.abs(money)}`);
  }
  //
});

//how ot access counter

//0: function
*/
