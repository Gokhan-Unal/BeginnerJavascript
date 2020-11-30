// Make a div
const div = document.createElement('div')
div.classList.add('wrapper')
document.body.appendChild(div)

const notOrdered = document.createElement('ul')
const list1 = document.createElement('li')
list1.textContent = 'one'
const list2 = document.createElement('li')
list2.textContent = 'two'
const list3 = document.createElement('li')
list3.textContent = 'three'

// or

const myUl = `
<ul>
<li>one</li>
<li>two</li>
<li>three</li>
</ul>
`

div.innerHTML = myUl

// add a class of wrapper to it -

// put it into the body -

// make an unordered list-

// add three list items with the words "one, two three" in them
// put that list into the above wrapper -

// create an image

const myImage = document.createElement('img')
myImage.width = 250
myImage.classList.add('cute')
myImage.alt = 'Cute Puppy'
myImage.src = 'https://picsum.photos/500'
div.appendChild(myImage)

// set the source to an image
// set the width to 250
// add a class of cute
// add an alt of Cute Puppy
// Append that image to the wrapper

// with HTML string, make a div, with two paragraphs inside of it
// put this div before the unordered list from above

const mySecondDiv = `<div>
  <p>Paragraph1</p>
  <p>Paragraph2</p>
</div>`

const myUlEl = document.querySelector('ul')
myUlEl.insertAdjacentHTML('beforebegin', mySecondDiv)

const mySecondDivEl = document.querySelector('div')
// console.log(mySecondDivEl)
const secondP = mySecondDivEl.firstElementChild.lastElementChild.classList.add(
  'warn'
)
// console.log(mySecondDivEl)
const gonnaDeleteIt = mySecondDivEl.firstElementChild.firstElementChild
gonnaDeleteIt.remove()

// add a class to the second paragraph called warning-
// remove the first paragraph-

function generatePlayerCard(name, age, height) {
  return `
    <div class="playerCard">
      <h2>${name} — ${age}</h2>
      <p>They are ${height} and ${age} years old. In Dog years this person would be ${
    age * 7
  }. That would be a tall dog!</p>
  <button class="delete" type="button">Delete</button>
    </div>
  `
}

// create a function called generatePlayerCard that takes in three arguments: name, age, and height -

// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div> -

// make a new div with a class of cards

const cardsDiv = document.createElement('div')
cardsDiv.classList.add('cards')

let cardsHTML = generatePlayerCard('hey', 12, 169)
cardsHTML += generatePlayerCard('mey', 15, 167)
cardsHTML += generatePlayerCard('key', 21, 152)
cardsHTML += generatePlayerCard('sey', 42, 267)

console.log(cardsHTML)

// Have that function make 4 cards +

cardsDiv.insertAdjacentHTML('afterbegin', cardsHTML)

div.insertAdjacentElement('beforebegin', cardsDiv)

// append those cards to the div -
// put the div into the DOM just before the wrapper element -
// Bonus, put a delete Button on each card so when you click it, the whole card is removed

// select all the buttons!
// make out delete function
// loop over them and attach a listener

function deleteCard(e) {
  const buttonDelete = e.currentTarget
  // buttonDelete.parentElement.remove()
  buttonDelete.closest('.playerCard').remove()
}

const buttons = document.querySelectorAll('.delete')
buttons.forEach((button) => {
  button.addEventListener('click', deleteCard)
})
