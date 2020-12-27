import { isValidColor } from './colors';

function logWords(results) {
  console.log(results[results.length - 1][0].transcript);
  // console.log(
  //   `Confidence is ${(results[results.length - 1][0].confidence * 100).toFixed(
  //     2
  //   )}%`
  // );
}

export function handleResult({ results }) {
  // logWords(results);
  const words = results[results.length - 1][0].transcript;
  let color = words.toLowerCase();
  color = color.replace(/\s/g, '');
  if (!isValidColor(color)) return;
  const colorSpan = document.querySelector(`.${color}`);
  colorSpan.classList.add('got');
  console.log(colorSpan);
  document.body.style.background = color;
}
