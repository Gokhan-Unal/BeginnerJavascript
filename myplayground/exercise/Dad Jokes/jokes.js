const jokeButton = document.querySelector('.getJoke');
const jokeButtonSpan = jokeButton.querySelector('.jokeText');
const jokeHolder = document.querySelector('.joke p');
const loader = document.querySelector('.loader');

const buttonText = [
  'Ugh.',
  '🤦🏻‍♂️',
  'omg dad.',
  'you are the worst',
  'seriously',
  'stop it.',
  'please stop',
  'that was the worst one',
];

function randomItemFromArray(arr, notBe) {
  const item = arr[Math.floor(Math.random() * arr.length)];
  if (item === notBe) {
    return randomItemFromArray(arr, notBe);
  }
  return item;
}

async function fetchJoke() {
  loader.classList.remove('hidden');
  const res = await fetch('https://icanhazdadjoke.com', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await res.json();
  loader.classList.add('hidden');

  // console.log(joke);
  return data;
}

async function handleClick() {
  const { joke } = await fetchJoke();
  jokeHolder.textContent = joke;
  jokeButtonSpan.textContent = randomItemFromArray(
    buttonText,
    jokeButtonSpan.textContent
  );
}

jokeButton.addEventListener('click', handleClick);

// fetchJoke();
