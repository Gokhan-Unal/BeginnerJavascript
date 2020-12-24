const { clearConfigCache } = require('prettier');

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(1000);
  popup.remove();
  popup = null;
}

function ask(options) {
  return new Promise(async function(resolve) {
    const popup = document.createElement('form');
    popup.classList.add('popup');
    popup.insertAdjacentHTML(
      'afterbegin',
      `<fieldset>
        <label>${options.title}</label>
        <input type="text" name="input" />
        <button type="submit">Submit</button>
      </fieldset> 
    `
    );

    if (options.cancel) {
      const skipButton = document.createElement('button');
      skipButton.type = 'button';
      skipButton.textContent = 'cancel';
      popup.firstElementChild.appendChild(skipButton);
      skipButton.addEventListener(
        'click',
        function() {
          resolve(null);
          destroyPopup(popup);
        },
        { once: true }
      );
    }

    popup.addEventListener(
      'submit',
      function(e) {
        e.preventDefault();
        resolve(e.target.input.value);
        destroyPopup(popup);
      },
      { once: true }
    );

    document.body.appendChild(popup);
    await wait(50);
    popup.classList.add('open');
  });
}

async function askQuestion(e) {
  const button = e.currentTarget;
  // button.hasAttribute('data-cancel') // also works
  const shouldCancel = 'cancel' in button.dataset;
  const answer = await ask({
    title: button.dataset.question,
    cancel: shouldCancel,
  });
  console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach(button => button.addEventListener('click', askQuestion));

const questions = [
  { title: 'What is your name' },
  { title: 'What is your age', cancel: true },
  { title: 'What is your dogs name' },
];

// Promise.all([ask(questions[0], ask(questions[1]), ask(questions[2]))]).then(
//   answers => console.log(answers)
// );

// questions.forEach(async function(question) {
//   const answer = await ask(question);
//   console.log(answer);
// });

// util func.
async function asyncMap(array, callback) {
  const results = [];
  for (const item of array) {
    // const result = await callback(item); // or
    results.push(await callback(item));
  }
  return results;
}

// // ⭐⭐
// async function askMany() {
//   for (const question of questions) {
//     const answer = await ask(question);
//     console.log(answer);
//   }
// }

async function go() {
  const answers = await asyncMap(questions, ask);
  console.log(answers);
}

go();
