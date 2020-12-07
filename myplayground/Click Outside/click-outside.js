const cardButtons = document.querySelectorAll('.card button')
const modalInner = document.querySelector('.modal-inner')
const modalOuter = document.querySelector('.modal-outer')

function handleCardButton(event) {
  const button = event.currentTarget
  const card = button.closest('.card')
  const imgSrc = card.querySelector('img').src
  const description = card.dataset.description
  const name = card.querySelector('h2').textContent
  const img = imgSrc.replace('200', '600')
  modalInner.innerHTML = `
    <img src="${img}" alt="${name}" />
    <p>${description}</p>
  `
  modalOuter.classList.add('open')

  // console.log(card)
}

cardButtons.forEach((button) =>
  button.addEventListener('click', handleCardButton)
)


function closeModal() {
  modalOuter.classList.remove('open')
}

modalOuter.addEventListener('click', function(event) {
  const isOutside = !event.target.closest('.modal-inner')
  if (isOutside) {
    closeModal()
  }
})

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal()
  }
})