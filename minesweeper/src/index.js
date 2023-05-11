import './style.css';
import Minesweeper from './minesweeperBoard';

const body = document.getElementById('page');

const title = document.createElement('h1');
title.className = 'title';
title.innerText = 'Minesweeper'
body.append(title);

const container = document.createElement('div');
container.className = 'container';
body.append(container);

const minesweeper = new Minesweeper(container);
minesweeper.start();
