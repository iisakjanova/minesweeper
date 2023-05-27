/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/minesweeperBoard.js":
/*!*********************************!*\
  !*** ./src/minesweeperBoard.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Minesweeper)
/* harmony export */ });
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _assets_computer_mouse_click_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/computer-mouse-click.mp3 */ "./assets/computer-mouse-click.mp3");
/* harmony import */ var _assets_game_over_wav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/game_over.wav */ "./assets/game_over.wav");
/* harmony import */ var _assets_win_sound_wav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/win-sound.wav */ "./assets/win-sound.wav");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var Minesweeper = /*#__PURE__*/_createClass(function Minesweeper(container, rows, cols, mines, soundOn) {
  var _this = this;
  _classCallCheck(this, Minesweeper);
  _defineProperty(this, "generateBoardData", function () {
    var board = [];
    for (var i = 0; i < _this.rows; i++) {
      var row = [];
      for (var j = 0; j < _this.cols; j++) {
        row.push(0);
      }
      board.push(row);
    }
    return board;
  });
  _defineProperty(this, "addMinesToBoardData", function (firstMoveRow, firstMoveCol) {
    var minesPlaced = 0;
    while (minesPlaced < _this.minesQty) {
      var randomRow = Math.floor(Math.random() * _this.rows);
      var randomCol = Math.floor(Math.random() * _this.cols);
      if ((Number(firstMoveRow) !== randomRow || Number(firstMoveCol) !== randomCol) && _this.boardData[randomRow][randomCol] !== 1) {
        _this.boardData[randomRow][randomCol] = 1;
        minesPlaced++;
      }
    }
  });
  _defineProperty(this, "updateCounter", function () {
    var counter = _this.container.querySelector('.counter');
    counter.innerText = "Moves: ".concat(_this.counter);
  });
  _defineProperty(this, "checkCell", function (row, col) {
    if (_this.boardData[row] && _this.boardData[row][col] === 1) {
      return 'mine';
    } else {
      var minesQty = 0;
      for (var i = Number(row) - 1; i <= Number(row) + 1; i++) {
        for (var j = Number(col) - 1; j <= Number(col) + 1; j++) {
          if (_this.boardData[i] && _this.boardData[i][j] && _this.boardData[i][j] === 1) {
            minesQty++;
          }
        }
      }
      return minesQty;
    }
  });
  _defineProperty(this, "openCellIfEmpty", function (rowStr, colStr) {
    var _this$boardData$row;
    if (isNaN(rowStr) || isNaN(colStr)) {
      return;
    }
    var row = Number(rowStr);
    var col = Number(colStr);
    if (row < 0 || row > _this.boardData.length - 1) {
      return;
    }
    if (col < 0 || col > ((_this$boardData$row = _this.boardData[row]) === null || _this$boardData$row === void 0 ? void 0 : _this$boardData$row.length) - 1) {
      return;
    }
    if (_this.boardData[row] && _this.boardData[row][col] === 1) {
      return;
    }
    var cell = document.querySelector("[data-row=\"".concat(row, "\"][data-col=\"").concat(col, "\"]"));
    var isOpen = cell && cell.disabled;
    if (cell.dataset.mine) {
      return;
    }
    if (isOpen) {
      return;
    }
    var result = _this.checkCell(row, col);
    if (result === 'mine') {
      return;
    }
    if (cell && cell.classList.contains('cell')) {
      _this.openCell(cell, result);
    }
    if (result === 0) {
      _this.openCellIfEmpty(row - 1, col);
      _this.openCellIfEmpty(row - 1, col - 1);
      _this.openCellIfEmpty(row, col - 1);
      _this.openCellIfEmpty(row + 1, col - 1);
      _this.openCellIfEmpty(row + 1, col);
      _this.openCellIfEmpty(row + 1, col + 1);
      _this.openCellIfEmpty(row, col + 1);
      _this.openCellIfEmpty(row - 1, col + 1);
    } else {
      return;
    }
  });
  _defineProperty(this, "openCell", function (cell, result) {
    if (cell) {
      cell.classList.add('opened');
    }
    if (!(cell !== null && cell !== void 0 && cell.disabled)) {
      _this.openedCells++;
    }
    if (result === 'mine') {
      cell.classList.add('mine');
      cell.innerHTML = '&#x1F4A3;';
    } else if (result > 0) {
      cell.innerHTML = result;
      cell.style.color = _this.chooseColorForNumber(result);
      cell.disabled = true;
    } else {
      cell.disabled = true;
      cell.innerHTML = '';
    }
    var cellsQtyToOpen = _this.boardData[0].length * _this.boardData.length - _this.minesQty;
    if (result !== 'mine' && _this.openedCells === cellsQtyToOpen) {
      _this.success = true;
      _this.revealBoard();
      _this.endGame();
    }
  });
  _defineProperty(this, "makeMove", function (row, col) {
    _this.counter++;
    _this.updateCounter();
    if (_this.counter === 1) {
      _this.addMinesToBoardData(row, col);
      var duration = _this.container.querySelector('.duration');
      _this.interval = setInterval(function () {
        _this.duration++;
        duration.innerText = "Duration: ".concat(_this.duration);
      }, 1000);
    }
    var result = _this.checkCell(row, col);
    _this.openCellIfEmpty(row, col);
    return result;
  });
  _defineProperty(this, "chooseColorForNumber", function (number) {
    switch (number) {
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
        return 'coral';
      default:
        return 'red';
    }
  });
  _defineProperty(this, "revealBoard", function () {
    for (var i = 0; i < _this.boardData.length; i++) {
      for (var j = 0; j < _this.boardData[i].length; j++) {
        var row = i;
        var col = j;
        var cell = document.querySelector("[data-row=\"".concat(row, "\"][data-col=\"").concat(col, "\"]"));
        if (_this.boardData[i] && _this.boardData[i][j] === 1) {
          cell.innerHTML = '&#x1F4A3;';
        } else {
          var minesQty = 0;
          for (var _i = Number(row) - 1; _i <= Number(row) + 1; _i++) {
            for (var _j = Number(col) - 1; _j <= Number(col) + 1; _j++) {
              if (_this.boardData[_i] && _this.boardData[_i][_j] && _this.boardData[_i][_j] === 1) {
                minesQty++;
              }
            }
          }
          if (minesQty > 0) {
            cell.innerHTML = minesQty;
            cell.style.color = _this.chooseColorForNumber(minesQty);
            cell.disabled = true;
          } else {
            cell.disabled = true;
            cell.innerHTML = '';
          }
        }
        cell.classList.add('opened');
      }
    }
  });
  _defineProperty(this, "showMessage", function (text, color) {
    var message = document.querySelector('.message');
    message.innerText = text;
    message.style.setProperty('color', color);
  });
  _defineProperty(this, "endGame", function () {
    var cells = document.querySelectorAll('.cell');
    cells.forEach(function (cell) {
      cell.disabled = true;
    });
    clearInterval(_this.interval);
    var message = _this.success ? "Hooray! You found all mines in \n".concat(_this.duration, " seconds and ").concat(_this.counter, " moves!") : 'Game over. Try again.';
    var messageColor = _this.success ? 'green' : 'red';
    _this.showMessage(message, messageColor);
    if (_this.soundOn) {
      var endGameSound = new Audio(_assets_game_over_wav__WEBPACK_IMPORTED_MODULE_2__["default"]);
      var winGameSound = new Audio(_assets_win_sound_wav__WEBPACK_IMPORTED_MODULE_3__["default"]);
      if (_this.success) {
        winGameSound.play();
      } else {
        endGameSound.play();
      }
    }
    var gameResult = _this.success ? 'WIN' : 'LOSE';
    var result = {
      moves: _this.counter,
      time: "".concat(_this.duration, " sec"),
      date: new Date().toISOString(),
      result: gameResult
    };
    _this.saveResult(result);
  });
  _defineProperty(this, "saveResult", function (result) {
    // Retrieve existing results from localStorage
    var results = JSON.parse(localStorage.getItem('results')) || [];

    // Add the new result to the array
    results.unshift(result);

    // Truncate the array to keep only the latest 10 results
    results.length = Math.min(results.length, 10);

    // Save the updated results array to localStorage
    localStorage.setItem('results', JSON.stringify(results));
  });
  _defineProperty(this, "render", function () {
    _this.board = document.createElement('div');
    _this.board.className = 'board';
    var maxWidth = "".concat((_this.rows * 50).toString(), "px");
    _this.container.style.setProperty('max-width', maxWidth);
    var infoEl = document.createElement('div');
    infoEl.className = 'info';
    _this.container.append(infoEl);
    var gameStatLeftCol = document.createElement('div');
    gameStatLeftCol.className = 'game-stat-col';
    infoEl.append(gameStatLeftCol);
    var cellsFlagged = document.createElement('p');
    cellsFlagged.className = 'flagged-cells';
    cellsFlagged.innerText = "Cells flagged: ".concat(_this.flaggedMines);
    gameStatLeftCol.append(cellsFlagged);
    var minesRemainingEl = document.createElement('p');
    minesRemainingEl.className = 'mines-remaining';
    minesRemainingEl.innerText = "Mines remaining: ".concat(_this.minesRemaining);
    gameStatLeftCol.append(minesRemainingEl);
    var message = document.createElement('p');
    message.className = 'message';
    message.innerText = '';
    infoEl.append(message);
    var gameStatRightCol = document.createElement('div');
    gameStatRightCol.className = 'game-stat-col';
    infoEl.append(gameStatRightCol);
    var counter = document.createElement('p');
    counter.className = 'counter';
    counter.innerText = "Moves: ".concat(_this.counter);
    gameStatRightCol.append(counter);
    var durationEl = document.createElement('p');
    durationEl.className = 'duration';
    durationEl.innerText = 'Duration: 0';
    gameStatRightCol.append(durationEl);
    for (var i = 0; i < _this.boardData.length; i++) {
      var row = document.createElement('div');
      row.className = 'row';
      for (var j = 0; j < _this.boardData[i].length; j++) {
        var cell = document.createElement('button');
        cell.className = 'cell';
        cell.setAttribute('data-row', i);
        cell.setAttribute('data-col', j);
        row.append(cell);
      }
      _this.board.append(row);
    }
    _this.container.append(_this.board);
    _this.board.addEventListener('click', function (event) {
      if (_this.soundOn) {
        var clickSound = new Audio(_assets_computer_mouse_click_mp3__WEBPACK_IMPORTED_MODULE_1__["default"]);
        clickSound.currentTime = 0;
        clickSound.play();
      }
      var cell = event.target;
      var _cell$dataset = cell.dataset,
        row = _cell$dataset.row,
        col = _cell$dataset.col,
        mine = _cell$dataset.mine;
      if (mine) {
        return;
      }
      var result = _this.makeMove(row, col);
      if (cell && cell.classList.contains('cell')) {
        _this.openCell(cell, result);
      }
      if (result === 'mine') {
        _this.success = false;
        _this.endGame();
        _this.revealBoard();
      }
    });
    _this.board.addEventListener('contextmenu', function (event) {
      event.preventDefault();
      var cellsFlaggedEl = document.querySelector('.flagged-cells');
      var minesRemainingEl = document.querySelector('.mines-remaining');
      if (_this.soundOn) {
        var clickSound = new Audio(_assets_computer_mouse_click_mp3__WEBPACK_IMPORTED_MODULE_1__["default"]);
        clickSound.currentTime = 0;
        clickSound.play();
      }
      if (!event.target.classList.contains('cell')) {
        return;
      }
      var cell = event.target;
      if (!cell.disabled) {
        if (cell.dataset.mine) {
          cell.removeAttribute('data-mine');
          cell.innerHTML = '';
          _this.flaggedMines--;
          _this.minesRemaining++;
        } else if (_this.flaggedMines < _this.minesQty) {
          cell.setAttribute('data-mine', true);
          cell.innerHTML = '&#x1F6A9;';
          _this.flaggedMines++;
          _this.minesRemaining--;
        }
        minesRemainingEl.innerText = "Mines remaining: ".concat(_this.minesRemaining);
        cellsFlaggedEl.innerText = "Cells flagged: ".concat(_this.flaggedMines);
      }
    });
  });
  _defineProperty(this, "start", function () {
    _this.boardData = _this.generateBoardData();
    _this.render();
  });
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
});


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "*,\n::before,\n::after {\n    box-sizing: border-box;\n}\n\n#page {\n  margin-bottom: 50px;\n}\n\n.dark-mode {\n  background: #444444;\n  color: white;\n}\n\n.title {\n  text-align: center;\n}\n\n.game-mode-part {\n  display: flex;\n  justify-content: space-between;\n}\n\n.start-btn {\n  background: linear-gradient(to bottom right, #C7E9FF, #A4D4FF);\n  border: #A4D4FF;\n  border-radius: 2px;\n  padding: 5px;\n  width: 100px;\n}\n\n.dark-mode .start-btn {\n  background: linear-gradient(to bottom right, #0000CD, #000080);\n  color: white;\n}\n\n.start-btn:hover {\n  background: linear-gradient(to top left, #C7E9FF, #A4D4FF);\n}\n\n.dark-mode .start-btn:hover {\n  background: linear-gradient(to top left,#0000CD, #000080);\n}\n\n.settings-game-form {\n  display: flex;\n  flex-direction: column;\n}\n\n.settings-label {\n  align-self: center;\n}\n\n.settings-item {\n  display: flex;\n  justify-content: space-between;\n}\n\n.settings-input,\n.switch-color-select {\n  border: 1px solid #8bc6f9;\n}\n\n.dark-mode .settings-input,\n.dark-mode .switch-color-select {\n  background: transparent;\n  color: white;\n}\n\n.settings-btn {\n  background: linear-gradient(to bottom right, #C7E9FF, #A4D4FF);\n  border: #A4D4FF;\n  border-radius: 2px;\n}\n\n.dark-mode .settings-btn,\n.dark-mode .sound-btn,\n.dark-mode .latest-results-btn {\n  background: linear-gradient(to bottom right, #0000CD, #000080);\n  color: white;\n}\n\n.settings-btn:hover {\n  background: linear-gradient(to top left, #C7E9FF, #A4D4FF);\n}\n\n.dark-mode .settings-btn:hover,\n.dark-mode .sound-btn:hover,\n.dark-mode .latest-results-btn:hover {\n  background: linear-gradient(to top left,#0000CD, #000080);\n}\n\n.info {\n  display: flex;\n  justify-content: space-between;\n  margin: 0 10px;\n}\n\n.container {\n  max-width: 500px;\n  padding: 0 10px;\n  margin: 0 auto;\n}\n\n.board {\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  border-radius: 3px;\n  border: 2px solid #76b8f3;\n}\n\n.row {\n  display: flex;\n}\n\n.cell {\n  width: 10%;\n  max-width: 50px;\n  background: radial-gradient(circle at center, #C7E9FF, #A4D4FF);\n  aspect-ratio: 1/1;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); \n  transition: box-shadow 0.3s ease;\n  border: 1px solid #8bc6f9;\n  padding: 0;\n}\n\n.dark-mode .cell {\n  background: radial-gradient(circle at center, #0000CD, #000080);\n}\n\n.cell:hover:not(:disabled){\n  background: radial-gradient(circle at center, #A4D4FF, #C7E9FF);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);\n}\n\n.dark-mode .cell:hover:not(:disabled){\n  background: radial-gradient(circle at center, #000080, #0000CD);\n}\n\n.opened {\n  background: #b4d6f0;\n  box-shadow: none;\n  border: 1px solid #8bc6f9;\n}\n\n.dark-mode .opened {\n  background: #0471c4;\n  box-shadow: none;\n  border: 1px solid #8bc6f9;\n}\n\n.opened.mine {\n  background-color: pink;\n}\n\n.message {\n  height: 20px;\n  text-align: center;\n}\n\n.cell:disabled {\n  color: black;\n}\n\n.switch-color-label {\n  text-align: center;\n}\n\n.switch-color-select {\n  display: block;\n  margin: 0 auto;\n  padding: 10px;\n}\n\n.sound-btn,\n.latest-results-btn {\n  margin: 30px auto 30px auto;\n  display: block;\n  background: linear-gradient(to bottom right, #C7E9FF, #A4D4FF);\n  border: #A4D4FF;\n  border-radius: 2px;\n  padding: 10px;\n}\n\n.sound-btn:hover,\n.latest-results-btn:hover {\n  background: linear-gradient(to top left, #C7E9FF, #A4D4FF);\n}\n\n.last-results {\n  text-align: center;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;IAGI,sBAAsB;AAC1B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,8DAA8D;EAC9D,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,8DAA8D;EAC9D,YAAY;AACd;;AAEA;EACE,0DAA0D;AAC5D;;AAEA;EACE,yDAAyD;AAC3D;;AAEA;EACE,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;;EAEE,yBAAyB;AAC3B;;AAEA;;EAEE,uBAAuB;EACvB,YAAY;AACd;;AAEA;EACE,8DAA8D;EAC9D,eAAe;EACf,kBAAkB;AACpB;;AAEA;;;EAGE,8DAA8D;EAC9D,YAAY;AACd;;AAEA;EACE,0DAA0D;AAC5D;;AAEA;;;EAGE,yDAAyD;AAC3D;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,cAAc;AAChB;;AAEA;EACE,gBAAgB;EAChB,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,cAAc;EACd,aAAa;EACb,sBAAsB;EACtB,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,UAAU;EACV,eAAe;EACf,+DAA+D;EAC/D,iBAAiB;EACjB,wCAAwC;EACxC,gCAAgC;EAChC,yBAAyB;EACzB,UAAU;AACZ;;AAEA;EACE,+DAA+D;AACjE;;AAEA;EACE,+DAA+D;EAC/D,yCAAyC;AAC3C;;AAEA;EACE,+DAA+D;AACjE;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,yBAAyB;AAC3B;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;EAChB,yBAAyB;AAC3B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,YAAY;EACZ,kBAAkB;AACpB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,cAAc;EACd,aAAa;AACf;;AAEA;;EAEE,2BAA2B;EAC3B,cAAc;EACd,8DAA8D;EAC9D,eAAe;EACf,kBAAkB;EAClB,aAAa;AACf;;AAEA;;EAEE,0DAA0D;AAC5D;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":["*,\n::before,\n::after {\n    box-sizing: border-box;\n}\n\n#page {\n  margin-bottom: 50px;\n}\n\n.dark-mode {\n  background: #444444;\n  color: white;\n}\n\n.title {\n  text-align: center;\n}\n\n.game-mode-part {\n  display: flex;\n  justify-content: space-between;\n}\n\n.start-btn {\n  background: linear-gradient(to bottom right, #C7E9FF, #A4D4FF);\n  border: #A4D4FF;\n  border-radius: 2px;\n  padding: 5px;\n  width: 100px;\n}\n\n.dark-mode .start-btn {\n  background: linear-gradient(to bottom right, #0000CD, #000080);\n  color: white;\n}\n\n.start-btn:hover {\n  background: linear-gradient(to top left, #C7E9FF, #A4D4FF);\n}\n\n.dark-mode .start-btn:hover {\n  background: linear-gradient(to top left,#0000CD, #000080);\n}\n\n.settings-game-form {\n  display: flex;\n  flex-direction: column;\n}\n\n.settings-label {\n  align-self: center;\n}\n\n.settings-item {\n  display: flex;\n  justify-content: space-between;\n}\n\n.settings-input,\n.switch-color-select {\n  border: 1px solid #8bc6f9;\n}\n\n.dark-mode .settings-input,\n.dark-mode .switch-color-select {\n  background: transparent;\n  color: white;\n}\n\n.settings-btn {\n  background: linear-gradient(to bottom right, #C7E9FF, #A4D4FF);\n  border: #A4D4FF;\n  border-radius: 2px;\n}\n\n.dark-mode .settings-btn,\n.dark-mode .sound-btn,\n.dark-mode .latest-results-btn {\n  background: linear-gradient(to bottom right, #0000CD, #000080);\n  color: white;\n}\n\n.settings-btn:hover {\n  background: linear-gradient(to top left, #C7E9FF, #A4D4FF);\n}\n\n.dark-mode .settings-btn:hover,\n.dark-mode .sound-btn:hover,\n.dark-mode .latest-results-btn:hover {\n  background: linear-gradient(to top left,#0000CD, #000080);\n}\n\n.info {\n  display: flex;\n  justify-content: space-between;\n  margin: 0 10px;\n}\n\n.container {\n  max-width: 500px;\n  padding: 0 10px;\n  margin: 0 auto;\n}\n\n.board {\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  border-radius: 3px;\n  border: 2px solid #76b8f3;\n}\n\n.row {\n  display: flex;\n}\n\n.cell {\n  width: 10%;\n  max-width: 50px;\n  background: radial-gradient(circle at center, #C7E9FF, #A4D4FF);\n  aspect-ratio: 1/1;\n  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); \n  transition: box-shadow 0.3s ease;\n  border: 1px solid #8bc6f9;\n  padding: 0;\n}\n\n.dark-mode .cell {\n  background: radial-gradient(circle at center, #0000CD, #000080);\n}\n\n.cell:hover:not(:disabled){\n  background: radial-gradient(circle at center, #A4D4FF, #C7E9FF);\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);\n}\n\n.dark-mode .cell:hover:not(:disabled){\n  background: radial-gradient(circle at center, #000080, #0000CD);\n}\n\n.opened {\n  background: #b4d6f0;\n  box-shadow: none;\n  border: 1px solid #8bc6f9;\n}\n\n.dark-mode .opened {\n  background: #0471c4;\n  box-shadow: none;\n  border: 1px solid #8bc6f9;\n}\n\n.opened.mine {\n  background-color: pink;\n}\n\n.message {\n  height: 20px;\n  text-align: center;\n}\n\n.cell:disabled {\n  color: black;\n}\n\n.switch-color-label {\n  text-align: center;\n}\n\n.switch-color-select {\n  display: block;\n  margin: 0 auto;\n  padding: 10px;\n}\n\n.sound-btn,\n.latest-results-btn {\n  margin: 30px auto 30px auto;\n  display: block;\n  background: linear-gradient(to bottom right, #C7E9FF, #A4D4FF);\n  border: #A4D4FF;\n  border-radius: 2px;\n  padding: 10px;\n}\n\n.sound-btn:hover,\n.latest-results-btn:hover {\n  background: linear-gradient(to top left, #C7E9FF, #A4D4FF);\n}\n\n.last-results {\n  text-align: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./assets/computer-mouse-click.mp3":
/*!*****************************************!*\
  !*** ./assets/computer-mouse-click.mp3 ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/computer-mouse-click.mp3");

/***/ }),

/***/ "./assets/game_over.wav":
/*!******************************!*\
  !*** ./assets/game_over.wav ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/game_over.wav");

/***/ }),

/***/ "./assets/win-sound.wav":
/*!******************************!*\
  !*** ./assets/win-sound.wav ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "assets/win-sound.wav");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _minesweeperBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minesweeperBoard */ "./src/minesweeperBoard.js");


var minesweeper;
var size = 10;
var minesQty = 10;
var mode = 'light';
var isSoundOn = true;
var results = JSON.parse(localStorage.getItem('results')) || [];
var showResults = false;
var body = document.getElementById('page');
var title = document.createElement('h1');
title.className = 'title';
title.innerText = 'Minesweeper';
body.append(title);
var gameModePart = document.createElement('div');
gameModePart.className = 'game-mode-part container';
body.append(gameModePart);
var startBtn = document.createElement('button');
startBtn.innerHTML = 'play';
startBtn.className = 'start-btn';
gameModePart.append(startBtn);
var settingsGameForm = document.createElement('form');
settingsGameForm.className = 'settings-game-form';
var labelGameForm = document.createElement('label');
labelGameForm.className = 'settings-label';
labelGameForm.innerText = 'Game settings';
settingsGameForm.append(labelGameForm);
var sizeEl = document.createElement('div');
sizeEl.className = 'settings-item';
var sizeLabel = document.createElement('label');
sizeLabel.innerHTML = 'Size: ';
sizeEl.append(sizeLabel);
var sizeInput = document.createElement('select');
sizeInput.className = 'settings-input';
var options = [{
  'name': 'easy',
  'size': '10X10',
  'value': 10
}, {
  'name': 'medium',
  'size': '15X15',
  'value': 15
}, {
  'name': 'hard',
  'size': '25X25',
  'value': 25
}];
for (var _i = 0, _options = options; _i < _options.length; _i++) {
  var opt = _options[_i];
  var option = document.createElement('option');
  option.value = opt.value;
  option.innerHTML = "".concat(opt.name, " (").concat(opt.size, ")");
  sizeInput.append(option);
}
sizeEl.append(sizeInput);
settingsGameForm.append(sizeEl);
var minesQtyEl = document.createElement('div');
minesQtyEl.className = 'settings-item';
var minesQtyLabel = document.createElement('label');
minesQtyLabel.innerHTML = 'Mines: ';
minesQtyEl.append(minesQtyLabel);
var minesQtyInput = document.createElement('input');
minesQtyInput.className = 'settings-input';
minesQtyInput.type = 'number';
minesQtyInput.value = 10;
minesQtyInput.min = 10;
minesQtyInput.max = 99;
minesQtyEl.append(minesQtyInput);
settingsGameForm.append(minesQtyEl);
var btnSettingsGameForm = document.createElement('button');
btnSettingsGameForm.className = 'settings-btn';
btnSettingsGameForm.innerHTML = 'ok';
settingsGameForm.append(btnSettingsGameForm);
gameModePart.append(settingsGameForm);
var container = document.createElement('div');
container.className = 'container';
body.append(container);
var switchColorModeLabel = document.createElement('p');
switchColorModeLabel.className = 'switch-color-label';
switchColorModeLabel.innerHTML = 'Choose color theme';
body.append(switchColorModeLabel);
var switchColorModeSelect = document.createElement('select');
switchColorModeSelect.className = 'switch-color-select';
var lightOption = document.createElement('option');
lightOption.value = 'light';
lightOption.innerText = 'light';
switchColorModeSelect.append(lightOption);
var darkOption = document.createElement('option');
darkOption.value = 'dark';
darkOption.innerText = 'dark';
switchColorModeSelect.append(darkOption);
body.append(switchColorModeSelect);
var soundOnBtn = document.createElement('button');
soundOnBtn.innerHTML = 'sound on';
soundOnBtn.className = 'sound-btn';
body.append(soundOnBtn);
var showLatestResultsBtn = document.createElement('button');
showLatestResultsBtn.className = 'latest-results-btn';
showLatestResultsBtn.innerText = 'Latest 10 results';
body.append(showLatestResultsBtn);
var lastResults = document.createElement('div');
lastResults.className = 'last-results';
body.append(lastResults);
switchColorModeSelect.addEventListener('change', function (event) {
  mode = event.target.value;
  if (mode === 'dark') {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
});
soundOnBtn.addEventListener('click', function () {
  isSoundOn = !isSoundOn;
  if (soundOnBtn.innerHTML === 'sound on') {
    soundOnBtn.innerHTML = 'sound off';
  } else {
    soundOnBtn.innerHTML = 'sound on';
  }
  if (minesweeper) {
    container.innerHTML = '';
  }
  minesweeper = new _minesweeperBoard__WEBPACK_IMPORTED_MODULE_1__["default"](container, size, size, minesQty, isSoundOn);
  minesweeper.start();
});
showLatestResultsBtn.addEventListener('click', function () {
  showResults = !showResults;
  if (showResults) {
    for (var i = 0; i < results.length; i++) {
      var result = document.createElement('p');
      result.innerHTML = "Date: ".concat(results[i].date, " Moves: ").concat(results[i].moves, " Time: ").concat(results[i].time, " ").concat(results[i].result);
      lastResults.append(result);
    }
  } else {
    lastResults.innerHTML = '';
  }
});
startBtn.addEventListener('click', function () {
  if (minesweeper) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
  minesweeper = new _minesweeperBoard__WEBPACK_IMPORTED_MODULE_1__["default"](container, size, size, minesQty, isSoundOn);
  minesweeper.start();
});
sizeInput.addEventListener('change', function (event) {
  var difficulty = event.target;
  size = difficulty.value;
});
minesQtyInput.addEventListener('input', function (event) {
  var value = parseInt(event.target.value);
  if (isNaN(value) || value < 10 || value > 99) {
    minesQtyInput.setCustomValidity('Please enter a number between 10 and 99.');
  } else {
    minesQtyInput.setCustomValidity('');
    minesQty = value;
  }
});
settingsGameForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (minesweeper) {
    container.innerHTML = '';
  }
  minesweeper = new _minesweeperBoard__WEBPACK_IMPORTED_MODULE_1__["default"](container, size, size, minesQty, isSoundOn);
  minesweeper.start();
});
minesweeper = new _minesweeperBoard__WEBPACK_IMPORTED_MODULE_1__["default"](container, 10, 10, 10, isSoundOn);
minesweeper.start();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map