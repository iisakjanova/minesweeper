import './style.css';
import Minesweeper from './minesweeperBoard';

const body = document.getElementById('page');

const title = document.createElement('h1');
title.className = 'title';
title.innerText = 'Minesweeper'
body.append(title);

const startBtn = document.createElement('button');
startBtn.innerText = 'new';
body.append(startBtn);

const container = document.createElement('div');
container.className = 'container';
body.append(container);

let minesweeper;

startBtn.addEventListener('click', () => {
  if (minesweeper) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  minesweeper = new Minesweeper(container, 10, 10);
  minesweeper.start();
});

minesweeper = new Minesweeper(container, 10, 10);
minesweeper.start();
