import './style.css';
import Minesweeper from './minesweeperBoard';

let minesweeper;
let size = 10;
let minesQty = 10;
let mode = 'light';
let isSoundOn = true;
let results = JSON.parse(localStorage.getItem('results')) || [];
let showResults = false;

const body = document.getElementById('page');

const title = document.createElement('h1');
title.className = 'title';
title.innerText = 'Minesweeper'
body.append(title);

const gameModePart = document.createElement('div');
gameModePart.className = 'game-mode-part container';
body.append(gameModePart);

const startBtn = document.createElement('button');
startBtn.innerHTML = 'play';
startBtn.className = 'start-btn';
gameModePart.append(startBtn);

const settingsGameForm = document.createElement('form');
settingsGameForm.className = 'settings-game-form';

const labelGameForm = document.createElement('label');
labelGameForm.className = 'settings-label';
labelGameForm.innerText = 'Game settings';
settingsGameForm.append(labelGameForm);

const sizeEl = document.createElement('div');
sizeEl.className = 'settings-item';

const sizeLabel = document.createElement('label');
sizeLabel.innerHTML = 'Size: ';
sizeEl.append(sizeLabel);

const sizeInput = document.createElement('select');
sizeInput.className = 'settings-input';
const options = [
  {'name': 'easy', 'size': '10X10', 'value': 10}, 
  {'name': 'medium', 'size': '15X15', 'value': 15}, 
  {'name': 'hard', 'size': '25X25', 'value': 25}, 
];

for (const opt of options) {
  const option = document.createElement('option');
  option.value = opt.value;
  option.innerHTML = `${opt.name} (${opt.size})`;
  sizeInput.append(option);  
}

sizeEl.append(sizeInput);

settingsGameForm.append(sizeEl);

const minesQtyEl = document.createElement('div');
minesQtyEl.className = 'settings-item';

const minesQtyLabel = document.createElement('label');
minesQtyLabel.innerHTML = 'Mines: ';
minesQtyEl.append(minesQtyLabel);

const minesQtyInput = document.createElement('input');
minesQtyInput.className = 'settings-input';
minesQtyInput.type = 'number';
minesQtyInput.value = 10;
minesQtyInput.min = 10;
minesQtyInput.max = 99;
minesQtyEl.append(minesQtyInput)
settingsGameForm.append(minesQtyEl);

const btnSettingsGameForm = document.createElement('button');
btnSettingsGameForm.className = 'settings-btn';
btnSettingsGameForm.innerHTML = 'ok';
settingsGameForm.append(btnSettingsGameForm);

gameModePart.append(settingsGameForm);

const container = document.createElement('div');
container.className = 'container';
body.append(container);

const switchColorModeLabel = document.createElement('p');
switchColorModeLabel.className = 'switch-color-label';
switchColorModeLabel.innerHTML = 'Choose color theme';
body.append(switchColorModeLabel);

const switchColorModeSelect = document.createElement('select');
switchColorModeSelect.className = 'switch-color-select'
const lightOption = document.createElement('option');
lightOption.value = 'light';
lightOption.innerText = 'light';
switchColorModeSelect.append(lightOption);
const darkOption = document.createElement('option');
darkOption.value = 'dark';
darkOption.innerText = 'dark';
switchColorModeSelect.append(darkOption);
body.append(switchColorModeSelect);

const soundOnBtn = document.createElement('button');
soundOnBtn.innerHTML = 'sound on';
soundOnBtn.className ='sound-btn';
body.append(soundOnBtn);

const showLatestResultsBtn = document.createElement('button');
showLatestResultsBtn.className = 'latest-results-btn';
showLatestResultsBtn.innerText = 'Latest 10 results';
body.append(showLatestResultsBtn);

const lastResults = document.createElement('div');
  lastResults.className = 'last-results';
  body.append(lastResults);

switchColorModeSelect.addEventListener('change', (event) => {
  mode = event.target.value;

  if (mode === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
});

soundOnBtn.addEventListener('click', () => {
  isSoundOn = !isSoundOn;

  if (soundOnBtn.innerHTML === 'sound on') {
    soundOnBtn.innerHTML = 'sound off';
  } else {
    soundOnBtn.innerHTML = 'sound on';
  }

  if (minesweeper) {
    container.innerHTML = '';
  }

  minesweeper = new Minesweeper(container, size, size, minesQty, isSoundOn);
  minesweeper.start();
  
});

showLatestResultsBtn.addEventListener('click', () => {
  showResults = !showResults;

  if (showResults) {
    for (let i = 0; i < results.length; i++) {
      const result = document.createElement('p');
      result.innerHTML = `Date: ${results[i].date} Moves: ${results[i].moves} Time: ${results[i].time} ${results[i].result}`;
      lastResults.append(result);
    }
  } else {
    lastResults.innerHTML = '';
  }
});

startBtn.addEventListener('click', () => {
  if (minesweeper) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  minesweeper = new Minesweeper(container, size, size, minesQty, isSoundOn);
  minesweeper.start();
});

sizeInput.addEventListener('change', (event) => {
  const difficulty = event.target;
  size = difficulty.value;
});

minesQtyInput.addEventListener('input', (event) =>  {
  const value = parseInt(event.target.value);
  
  if (isNaN(value) || value < 10 || value > 99) {
    minesQtyInput.setCustomValidity('Please enter a number between 10 and 99.');
  } else {
    minesQtyInput.setCustomValidity('');
    minesQty = value;
  }
});

settingsGameForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (minesweeper) {
    container.innerHTML = '';
  }

  minesweeper = new Minesweeper(container, size, size, minesQty, isSoundOn);
  minesweeper.start();
  
});

minesweeper = new Minesweeper(container, 10, 10, 10, isSoundOn);
minesweeper.start();
