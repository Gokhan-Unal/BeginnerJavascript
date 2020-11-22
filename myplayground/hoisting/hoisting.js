// Hoisting carries the functions or variables to the top so they can be accessible

let age
console.log(age)
age = 10

sayHi()

function sayHi() {
  console.log('hey!')
  console.log(add(10, 2))
}

const add = (a, b) => a + b
