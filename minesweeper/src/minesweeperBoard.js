import './style.css';

export default class Minesweeper {
  constructor(container, rows, cols, mines) {
    this.container = container;
    this.counter = 0;
    this.duration = 0;
    this.boardData = [];
    this.rows = rows;
    this.cols = cols;
    this.minesQty = mines || 10;
    this.openedCells = 0;
    this.flaggedMines = 0;
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
    const row = Number(rowStr);
    const col = Number(colStr);

    if (row < 0 || row > this.boardData.length - 1) {
      return;
    }

    if (col < 0 || col > this.boardData[row].length - 1) {
      return;
    }

    if (this.boardData[row][col] === 1) {
      return;
    }

    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    const isOpen = cell.disabled;

    if (isOpen) {
      return;
    }
    const result = this.checkCell(row, col);

    if (result === 'mine') {
      return;
    }

    this.openCell(cell, result);

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
    cell.classList.add('opened');

    if (!cell.disabled) {
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
        return 'green';
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

  showMessage = (text) => {
    const message = document.querySelector('.message');
    message.innerText = text;
  }

  endGame = () => {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.disabled = true;
    });

    clearInterval(this.interval);
    const message = this.success ? 
      `Hooray! You found all mines in ${this.duration} seconds and ${this.counter} moves!` : 
      'Game over. Try again.';
    this.showMessage(message);
  }

  render = () => {
    this.board = document.createElement('div');
    this.board.className = 'board';

    const maxWidth = `${(this.rows * 50).toString()}px`;
    this.container.style.setProperty('max-width', maxWidth);
  
    const infoEl = document.createElement('div');
    infoEl.className = 'info';
    this.container.append(infoEl);

    const counter = document.createElement('p');
    counter.className = 'counter';
    counter.innerText = `Moves: ${this.counter}`;
    infoEl.append(counter);

    const message = document.createElement('p');
    message.className = 'message';
    message.innerText = '';

    if (this.success) {
      message.style.setProperty('color', 'green');
    } else {
      message.style.setProperty('color', 'red');
    }

    infoEl.append(message);

    const durationEl = document.createElement('p');
    durationEl.className = 'duration';
    durationEl.innerText = 'Duration: 0';
    infoEl.append(durationEl);

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
      const cell = event.target;

      const { row, col } = cell.dataset;
      const result = this.makeMove(row, col);

      this.openCell(cell, result);

      if (result === 'mine') {
        this.success = false;
        this.endGame();
        this.revealBoard();
      } 
    });

    this.board.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      const cell = event.target;
      
        if (!cell.disabled) {
          if (cell.dataset.mine) {
            cell.removeAttribute('data-mine');
            cell.innerHTML = '';
            this.flaggedMines--;
          } else if (this.flaggedMines < this.minesQty) {
            cell.setAttribute('data-mine', true);
            cell.innerHTML = '&#x1F6A9;';
            this.flaggedMines++;
          }
        }
    });
  }

  start = () => {
    this.boardData = this.generateBoardData();
    this.render();
  }
}
