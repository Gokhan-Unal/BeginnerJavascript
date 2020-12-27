import { hslToRgb } from './utils';

const WIDTH = 1500;
const HEIGHT = 1500;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let analyzer;
let bufferLength;

function handleError() {
  console.log('You must give access to yor mic');
}

async function getAudio() {
  const stream = await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .catch(handleError);
  const audioCtx = new AudioContext(); // where processing audio is done
  analyzer = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);
  // how much data should we collect
  analyzer.fftSize = 2 ** 12;
  // how many pieces of data are there
  bufferLength = analyzer.frequencyBinCount;
  const timeData = new Uint8Array(bufferLength);
  // console.log(timeData);
  const frequencyData = new Uint8Array(bufferLength);
  // console.log(frequencyData);
  drawTimeData(timeData);
  drawFrequency(frequencyData);
}

function drawTimeData(timeData) {
  // console.log(timeData);
  // inject time data into our timeData array
  // gives visualization over time
  analyzer.getByteTimeDomainData(timeData);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  requestAnimationFrame(() => drawTimeData(timeData));
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#f50d3f';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  let x = 0;
  timeData.forEach((data, i) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2 - 250;
    // console.log(v);
    // draw our lines
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  });
  ctx.stroke();
}

function drawFrequency(frequencyData) {
  analyzer.getByteFrequencyData(frequencyData);
  requestAnimationFrame(() => drawFrequency(frequencyData));
  const barWidth = (WIDTH / bufferLength) * 2.5;
  let x = 0;
  frequencyData.forEach(amount => {
    const percent = amount / 255;
    const [h, s, l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
    const barHeight = (HEIGHT * percent) / 2;
    const [r, g, b] = hslToRgb(h, s, l);
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  });
}

getAudio();
