//! Function declaration
// ! hoisting works 🎉
// function doctorize(firstName) {
//   return `Dr. ${firstName}`
// }

// ! Anon Function
// function (firstName) {
//   return `Dr. ${firstName}`
// }

// ! Function Expression
// ! Anon function but function variable name helps it
// ! hoisting is not working 😥
const doctorize = function (firstName) {
  return `Dr. ${firstName}`
}

// Old way
function inchToCM(inches) {
  const cm = inches * 2.54
  return cm
}
// 2. way
function inchToCM2(inches) {
  return inches * 2.54
}

// 3. way implicit | with return explicit
// const inchToCM3 = inches => inches * 2.54

// returning an object
// regular way
// function makeABaby(first, last) {
//   const baby = {
//     name: `${first} ${last}`,
//     age: 0
//   }
//   return baby;
// }

// ! to make an implicit return we have to wrap it in parentheses
// const makeABaby = (first, last) => ({ name: `${first} ${last}`, age: 0 })

// // IIFE
// ;(function (age) {
//   console.log('IIFE')
//   return `You are age of ${age}`
// })(10)

// Methods
const wes = {
  name: 'Westopher Bos',
  // Method!
  sayHi: function() {
    console.log(`Hey ${this.name}`);
    return 'Hey Wes';
  },
  // Short hand Method
  yellHi() {
    console.log('HEY WESSSSS');
  },
  // Arrow function
  wisperHi: () => { 
    console.log('hii wesss im a mouse');
  }
}

const button = document.querySelector('.clickMe')

button.addEventListener('click', wes.yellHi)