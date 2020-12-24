const shoppingForm = document.querySelector('.shopping')
const list = document.querySelector('.list')

let items = []

function handleSubmit(e) {
  e.preventDefault()
  const name = e.currentTarget.item.value // form has an input and input has a name attr. that item
  if (!name) return
  const item = {
    name,
    id: Date.now(),
    complete: false,
  }
  console.log(`There are ${items.length} items`)
  items.push(item)
  //  e.currentTarget.item.value = ''
  e.target.reset()

  list.dispatchEvent(new CustomEvent('itemsUpdated'))

  // displayItems()
}

function displayItems() {
  console.log(items)
  const html = items
    .map((item) => {
      return `<li class="shopping-item">
      <input value="${item.id}" type="checkbox" ${item.complete ? 'checked' : ''}>
      <span class="itemName">${item.name}</span>
      <button aria-label="Remove ${item.name}" value="${item.id}">&times;</button>
    </li>`
    })
    .join('')
  list.innerHTML = html
}

function mirrorToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items))
}

function restoreFromLocalStorage() {
  const lsItems = JSON.parse(localStorage.getItem('items'))
  if (lsItems.length) {
    items.push(...lsItems)
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
  }
}

function deleteItem(id) {
  console.log('Delete Item', id)
  items = items.filter((item) => item.id !== id)
  list.dispatchEvent(new CustomEvent('itemsUpdated'))

  console.log(items)
}

function markAsComplete(id) {
  const itemRef = items.find((item) => item.id === id)
  itemRef.complete = !itemRef.complete
  list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

shoppingForm.addEventListener('submit', handleSubmit)
list.addEventListener('itemsUpdated', displayItems)
list.addEventListener('itemsUpdated', mirrorToLocalStorage)

// Event Delegation: We listen or the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', function (e) {
  const id = parseInt(e.target.value)

  console.log(`e.target${e.target}, e.currentTarget${e.currentTarget}`)

  if (e.target.matches('button')) {
    deleteItem(id)
  }

  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id)
  }
})

restoreFromLocalStorage()
