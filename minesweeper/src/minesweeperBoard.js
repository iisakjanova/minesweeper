import './style.css';

export default class Minesweeper {
  constructor(container) {
    this.container = container;
    this.counter = 0;
    this.duration = 0;
    this.boardData = [];
  }

  generateBoardData = (rows, cols) => {
    const board = [];

    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
        row.push(0);
      }

      board.push(row);
    }

    const numMines = Math.floor(rows * cols * 0.1);
    let minesPlaced = 0;

    while (minesPlaced < numMines) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      if (board[randomRow][randomCol] !== 1) {
        board[randomRow][randomCol] = 1;
        minesPlaced++;
      }
    }

    return board;
  }

  updateCounter = () => {
    const counter = this.container.querySelector('.counter');
    counter.innerText = `Moves: ${this.counter}`;
  }

  checkCell = (row, col) => {
    if (this.boardData[row][col] === 1) {
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

      this.counter++;
      this.updateCounter();
      
      if (this.counter === (this.boardData[0].length * this.boardData.length - 10)) {
        this.success = true;
        this.endGame();
      }

      return minesQty;
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

    const counter = document.createElement('p');
    counter.className = 'counter';
    counter.innerText = `Moves: ${this.counter}`;
    this.container.append(counter);

    const durationEl = document.createElement('p');
    durationEl.className = 'duration';
    durationEl.innerText = 'Duration: 0';
    this.container.append(durationEl);

    const message = document.createElement('p');
    message.className = 'message';
    message.innerText = '';
    this.container.prepend(message);

    for (let i = 0; i < this.boardData.length; i++) {
      for (let j = 0; j < this.boardData[i].length; j++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-col', j);
        this.board.append(cell);
      }
    }

    this.container.append(this.board);

    this.board.addEventListener('click', (event) => {
      const cell = event.target;
      cell.classList.add('opened');

      const { row, col } = cell.dataset;
      const result = this.checkCell(row, col);

      if (result === 'mine') {
        cell.classList.add('mine');
        this.success = false;
        this.endGame();
      } else if (result > 0) {
        cell.innerText = result;
        cell.disabled = true;
      } else {
        cell.disabled = true;
      }
    });
  }

  start = () => {
    this.boardData = this.generateBoardData(10, 10);
    this.render();
    const duration = this.container.querySelector('.duration');
    
    this.interval = setInterval(() => {
      this.duration++;
      duration.innerText = `Duration: ${this.duration}`;
    }, 1000);
  }
}
