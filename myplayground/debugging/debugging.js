const people = [
  { name: 'Wes', cool: true, country: 'Canada' },
  { name: 'Scott', cool: true, country: 'Merica' },
  { name: 'Snickers', cool: false, country: 'Dog Country' },
];

people.forEach((person, index) => {
  console.log(person.name);
  debugger 
  console.log(person.cool);
  console.log(person.country);
});

function groupUp() {
  console.group("Starting")
  console.log("hey");
  // debugger
  console.error("noo")
  console.info("yoo")
  console.warn("careful");
  console.groupEnd("Starting")
}

groupUp()

// Console Methods ✅

// Callstack ✅

// Grabbing Elements ✅
// devtools $0 selects the element that active
// $1 second selected element
// $() selectors in devtools console
// $$() selects all

// Breakpoints ✅
// use debugger

// Scope   ✅

// Network Requests  ✅

// Break On Attribute ✅
// right click an element in devtools break on -> pick one of the choices and click on an element

// Some Setup Code

function doctorize(name) {
  return `Dr. ${name}`;
}

function greet(name) {
  doesntExist();
  return `Hello ${name}`;
}

function go() {
  const name = doctorize(greet('Wes'));
  console.log(name);
}

const button = document.querySelector('.bigger');

button.addEventListener('click', function(e) {
  const newFontSize =
    parseFloat(getComputedStyle(e.currentTarget).fontSize) + 1;
  e.currentTarget.style.fontSize = `${newFontSize}px`;
});

// A Dad joke fetch
async function fetchDadJoke() {
  const res = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'text/plain',
    },
  });
  const joke = await res.text();
  console.log(joke);
  return joke;
}
