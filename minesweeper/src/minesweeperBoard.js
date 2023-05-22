import './style.css';
import clickSoundSrc from '../assets/computer-mouse-click.mp3';
import endGameSoundSrc from '../assets/game_over.wav';
import winGameSoundSrc from '../assets/win-sound.wav';

export default class Minesweeper {
  constructor(container, rows, cols, mines, soundOn) {
    this.container = container;
    this.counter = 0;
    this.duration = 0;
    this.boardData = [];
    this.rows = rows;
    this.cols = cols;
    this.minesQty = mines;
    this.openedCells = 0;
    this.flaggedMines = 0;
    this.minesRemaining = mines;
    this.soundOn = soundOn;
  }

  generateBoardData = () => {
    const board = [];

    for (let i = 0; i < this.rows; i++) {
      const row = [];

      for (let j = 0; j < this.cols; j++) {
        row.push(0);
      }

      board.push(row);
    }

    return board;
  }

  addMinesToBoardData = (firstMoveRow, firstMoveCol) => {
    let minesPlaced = 0;

    while (minesPlaced < this.minesQty) {
      const randomRow = Math.floor(Math.random() * this.rows);
      const randomCol = Math.floor(Math.random() * this.cols);

      if ((Number(firstMoveRow) !== randomRow || 
          Number(firstMoveCol) !== randomCol) && 
          this.boardData[randomRow][randomCol] !== 1) {
        this.boardData[randomRow][randomCol] = 1;
        minesPlaced++;
      }
    }
  }

  updateCounter = () => {
    const counter = this.container.querySelector('.counter');
    counter.innerText = `Moves: ${this.counter}`;
  }

  checkCell = (row, col) => {
    if (this.boardData[row] && this.boardData[row][col] === 1) {
      return 'mine';
    } else {
      let minesQty = 0;

      for (let i = Number(row) - 1; i <= Number(row) + 1; i++) {
        for (let j = Number(col) - 1; j <= Number(col) + 1; j++) {
          if (this.boardData[i] && this.boardData[i][j] && this.boardData[i][j] === 1) {
            minesQty++;
          }
        }
      }
      return minesQty;
    }
  }

  openCellIfEmpty = (rowStr, colStr) => {
    if (isNaN(rowStr) || isNaN(colStr)) {
      return;
    }
    
    const row = Number(rowStr);
    const col = Number(colStr);

    if (row < 0 || row > this.boardData.length - 1) {
      return;
    }

    if (col < 0 || col > this.boardData[row]?.length - 1) {
      return;
    }

    if (this.boardData[row] && this.boardData[row][col] === 1) {
      return;
    }

    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    const isOpen = cell && cell.disabled;

    if (cell.dataset.mine) {
      return;
    }

    if (isOpen) {
      return;
    }

    const result = this.checkCell(row, col);

    if (result === 'mine') {
      return;
    }

    if (cell && cell.classList.contains('cell')) {
      this.openCell(cell, result);
    }

    if (result === 0) {
      this.openCellIfEmpty(row - 1, col);
      this.openCellIfEmpty(row - 1, col - 1);
      this.openCellIfEmpty(row, col - 1);
      this.openCellIfEmpty(row + 1, col - 1);
      this.openCellIfEmpty(row + 1, col);
      this.openCellIfEmpty(row + 1, col + 1);
      this.openCellIfEmpty(row, col + 1);
      this.openCellIfEmpty(row - 1, col + 1);
    } else {
      return;
    }
  }

  openCell = (cell, result) => {
    if (cell) {
      cell.classList.add('opened');
    }
    
    if (!cell?.disabled) {
      this.openedCells++;
    }
    
    if (result === 'mine') {
      cell.classList.add('mine');
      cell.innerHTML = '&#x1F4A3;';
    } else if (result > 0) {
      cell.innerHTML = result;
      cell.style.color = this.chooseColorForNumber(result);
      cell.disabled = true;
    } else {
      cell.disabled = true;
      cell.innerHTML = '';
    }

    const cellsQtyToOpen = this.boardData[0].length * this.boardData.length - this.minesQty;

    if (result !== 'mine' && this.openedCells === cellsQtyToOpen) {
      this.success = true;
      this.revealBoard();
      this.endGame();
    }
  }

  makeMove = (row, col) => {
    this.counter++;
    this.updateCounter();

    if (this.counter === 1) {
      this.addMinesToBoardData(row, col);

      const duration = this.container.querySelector('.duration');
    
      this.interval = setInterval(() => {
        this.duration++;
        duration.innerText = `Duration: ${this.duration}`;
      }, 1000);
    }

    const result = this.checkCell(row, col);
    this.openCellIfEmpty(row, col);

    return result; 
  }

  chooseColorForNumber = (number) => {
    switch(number) {
      case 1: 
        return 'blue';
      case 2: 
        return 'yellow';
      case 3:
        return 'darkgoldenrod';
      case 4:
        return 'violet';
      case 5:
        return 'red';
      case 6: 
        return 'darkslateblue';
      case 7:
        return 'black';
      case 8:
        return 'coral'
      default: 
        return 'red';
    }
  }

  revealBoard = () => {
    for (let i = 0; i < this.boardData.length; i++) {
      for (let j = 0; j < this.boardData[i].length; j++) {
        let row = i;
        let col = j;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

        if (this.boardData[i] && this.boardData[i][j] === 1) {
          cell.innerHTML = '&#x1F4A3;';
        } else {
          let minesQty = 0;
          
          for (let i = Number(row) - 1; i <= Number(row) + 1; i++) {
            for (let j = Number(col) - 1; j <= Number(col) + 1; j++) {
              if (this.boardData[i] && this.boardData[i][j] && this.boardData[i][j] === 1) {
                minesQty++;
              }
            }
          }
  
          if (minesQty > 0) {
            cell.innerHTML = minesQty;
            cell.style.color = this.chooseColorForNumber(minesQty);
            cell.disabled = true;
          } else {
            cell.disabled = true;
            cell.innerHTML = '';
          }
        }

        cell.classList.add('opened');
      }
    }
  }

  showMessage = (text, color) => {
    const message = document.querySelector('.message');
    message.innerText = text;
    message.style.setProperty('color', color);
  }

  endGame = () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.disabled = true;
    });

    clearInterval(this.interval);
    const message = this.success ? 
      `Hooray! You found all mines in \n${this.duration} seconds and ${this.counter} moves!` : 
      'Game over. Try again.';

    const messageColor = this.success ? 'green' : 'red';
    this.showMessage(message, messageColor);

    if (this.soundOn) {
      const endGameSound = new Audio(endGameSoundSrc);
      const winGameSound = new Audio(winGameSoundSrc);

      if (this.success) {
        winGameSound.play();
      } else {
        endGameSound.play();
      }
    }

    let gameResult = this.success ? 'WIN' : 'LOSE';

    const result = {
      moves: this.counter,
      time: `${this.duration} sec`,
      date: new Date().toISOString(),
      result: gameResult,
    };

    this.saveResult(result);
  }

  saveResult = (result) => {
    // Retrieve existing results from localStorage
    const results = JSON.parse(localStorage.getItem('results')) || [];
  
    // Add the new result to the array
    results.unshift(result);
  
    // Truncate the array to keep only the latest 10 results
    results.length = Math.min(results.length, 10);
  
    // Save the updated results array to localStorage
    localStorage.setItem('results', JSON.stringify(results));
  };

  render = () => {
    this.board = document.createElement('div');
    this.board.className = 'board';

    const maxWidth = `${(this.rows * 50).toString()}px`;
    this.container.style.setProperty('max-width', maxWidth);
  
    const infoEl = document.createElement('div');
    infoEl.className = 'info';
    this.container.append(infoEl);

    const gameStatLeftCol = document.createElement('div');
    gameStatLeftCol.className = 'game-stat-col';
    infoEl.append(gameStatLeftCol);

    const cellsFlagged = document.createElement('p');
    cellsFlagged.className = 'flagged-cells';
    cellsFlagged.innerText = `Cells flagged: ${this.flaggedMines}`;
    gameStatLeftCol.append(cellsFlagged);

    const minesRemainingEl = document.createElement('p');
    minesRemainingEl.className = 'mines-remaining';
    minesRemainingEl.innerText = `Mines remaining: ${this.minesRemaining}`;
    gameStatLeftCol.append(minesRemainingEl);

    const message = document.createElement('p');
    message.className = 'message';
    message.innerText = '';

    infoEl.append(message);

    const gameStatRightCol = document.createElement('div');
    gameStatRightCol.className = 'game-stat-col';
    infoEl.append(gameStatRightCol);

    const counter = document.createElement('p');
    counter.className = 'counter';
    counter.innerText = `Moves: ${this.counter}`;
    gameStatRightCol.append(counter);

    const durationEl = document.createElement('p');
    durationEl.className = 'duration';
    durationEl.innerText = 'Duration: 0';
    gameStatRightCol.append(durationEl);

    for (let i = 0; i < this.boardData.length; i++) {
      const row = document.createElement('div');
      row.className = 'row';

      for (let j = 0; j < this.boardData[i].length; j++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-col', j);
        row.append(cell);
      }

      this.board.append(row);
    }

    this.container.append(this.board);
    
    this.board.addEventListener('click', (event) => {
      if (this.soundOn) {
        const clickSound = new Audio(clickSoundSrc);
        clickSound.currentTime = 0;
        clickSound.play();
      }
      
      const cell = event.target;

      const { row, col, mine } = cell.dataset;

      if (mine) {
        return;
      }

      const result = this.makeMove(row, col);

      if (cell && cell.classList.contains('cell')) {
        this.openCell(cell, result);
      }
      
      if (result === 'mine') {
        this.success = false;
        this.endGame();
        this.revealBoard();
      } 
    });

    this.board.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const cellsFlaggedEl = document.querySelector('.flagged-cells');
      const minesRemainingEl = document.querySelector('.mines-remaining');

      if (this.soundOn) {
        const clickSound = new Audio(clickSoundSrc);
        clickSound.currentTime = 0;
        clickSound.play();
      }
      
      const cell = event.target;
      
        if (!cell.disabled) {
          if (cell.dataset.mine) {
            cell.removeAttribute('data-mine');
            cell.innerHTML = '';
            this.flaggedMines--;
            this.minesRemaining++;

          } else if (this.flaggedMines < this.minesQty) {
            cell.setAttribute('data-mine', true);
            cell.innerHTML = '&#x1F6A9;';
            this.flaggedMines++;
            this.minesRemaining--;
          }

          minesRemainingEl.innerText = `Mines remaining: ${this.minesRemaining}`;
          cellsFlaggedEl.innerText = `Cells flagged: ${this.flaggedMines}`;
        }
    });
  }

  start = () => {
    this.boardData = this.generateBoardData();
    this.render();
  }
}
