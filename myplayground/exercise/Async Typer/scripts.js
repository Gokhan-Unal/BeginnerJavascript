function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomBetween(min = 20, max = 150, randomNumber = Math.random()) {
  return Math.floor(randomNumber * (max - min) + min);
}

async function draw(element) {
  const text = element.textContent;
  let soFar = '';
  for (const letter of text) {
    // console.log(letter);
    soFar += letter;
    element.textContent = soFar;
    const { typeMin, typeMax } = element.dataset;
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    await wait(amountOfTimeToWait);
  }
}

// document.querySelectorAll('[data-type]').forEach(draw);

// els.forEach(el => draw(el));

// recursion
function drawRecursion(element) {
  let index = 1;
  const text = element.textContent;
  const { typeMin, typeMax } = element.dataset;
  async function drawLetter() {
    element.textContent = text.slice(0, index);
    index += 1;
    const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
    await wait(typeMin, typeMax);
    if (index <= text.length) {
      drawLetter();
    }
  }
  drawLetter();
}

document.querySelectorAll('[data-type]').forEach(drawRecursion);
