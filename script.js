//Credit to Copilot to fixing bugs! If it looks too much like AI, it's probably just bug fixes after school. 

// Get all cells !!!-Credit to Copilot for teaching me querySelector and speeding up the coding process!-!!!
let cells = document.querySelectorAll(".cell");
for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add("vacant");
    addElementForInspection("Class added to cell " + (i + 1));
}
addElementForInspection("Cells initialized!")

function getCellsInColumn(column) {
    let cellsInColumn = [];
    for (let i = column; i < cells.length; i += 7) {
        cellsInColumn.push(cells[i]);
    }
    return cellsInColumn;
}

function getCellsInRow(row) {
    let cellsInRow = [];
    for (let i = row; i < ((row*7)+7); i++) {
        cellsInRow.push(cells[i]);
    }
    return cellsInRow;
}
//Credit to Copilot for making this function! I didn't even know I needed this!
// Return an array of column indices that still have at least one vacant cell
function getAvailableColumns() {
    let available = [];
    // Use number of drop buttons to determine how many columns exist
    for (let col = 0; col < dropButtons.length; col++) {
        let colCells = getCellsInColumn(col);
        for (let i = 0; i < colCells.length; i++) {
            if (colCells[i] && colCells[i].classList.contains("vacant")) {
                available.push(col);
                addElementForInspection(available);
                break;
            }
        }
    }
    return available;
}

// Append event listeners to each drop button
// Append event listeners to each drop button

let dropButtons = document.querySelectorAll(".drop-button");
for (let i = 0; i < dropButtons.length; i++) {
    dropButtons[i].addEventListener("click", beginPlay);
    addElementForInspection("Event listener added!");
}

// Function to add a disc to the selected column
function addDisc(column, playerNum) {
    // Cache the column cells so we don't recompute repeatedly
    let columnCells = getCellsInColumn(column);
    for (let i = columnCells.length - 1; i >= 0; i--) {
        if (columnCells[i].classList.contains("vacant")) {
            if (playerNum == 1) {
                columnCells[i].classList.replace("vacant", "player1");
            } else {
                columnCells[i].classList.replace("vacant", "player2");
            }
            return;
        }
    }
    // column is full (no vacant cells)
}

function beginPlay(event) {
    //Credit to Copilot for major bug fixes! Couldn't have done it without it!
    // Ensure column is a number (charAt returns a string)
    let column = parseInt(event.target.id.charAt(event.target.id.length - 1), 10);
    // Player 1 (red) plays in the clicked column
    addDisc(column, 1);

    // Enemy (yellow) picks a random available column
    let available = getAvailableColumns();
    if (available.length == 0) {
        addElementForInspection("beginPlay: board full or no available columns for enemy.");
        return;
    }
    // Random choice among available columns
    let enemyColumn = available[Math.floor(Math.random() * available.length)];
    addDisc(enemyColumn, 2);

    checkColumn();
    checkRow();
    checkDiagonals();
}
//Credit to copilot for bug fixes and comments
function checkColumn() {
    // Check vertical wins in each column by scanning from bottom to top
    for (let i = 0; i < 7; i++) {
        let colCells = getCellsInColumn(i);
        let playerOneDiscs = 0;
        let playerTwoDiscs = 0;
        for (let j = 0; j < colCells.length; j++) {
            let cell = colCells[j];
            //If undefined or null, continue. Credit to copilot for teaching me something new!
            if (!cell) continue;

            if (cell.classList.contains("player1")) {
                playerOneDiscs++;
                playerTwoDiscs = 0;
                addElementForInspection("Checked cell. Player one is one disc closer to a connect 4!");
            } else if (cell.classList.contains("player2")) {
                playerTwoDiscs++;
                playerOneDiscs = 0;
                addElementForInspection("Checked cell. Player two is one disc closer to a connect 4!");
            } else {
                // empty cell: reset both counters
                playerOneDiscs = 0;
                playerTwoDiscs = 0;
                addElementForInspection("Checked cell. Empty!");
            }

            if (playerOneDiscs == 4) {
                let winningP = document.createElement("p");
                winningP.innerText = "Player one won with a column!";
                let main = document.getElementById("main");
                main.appendChild(winningP);
                return;
            }
            if (playerTwoDiscs == 4) {
                let winningP = document.createElement("p");
                winningP.innerText = "Player two won with a column!";
                let main = document.getElementById("main");
                main.appendChild(winningP);
                return;
            }
        }
    }
}

function checkRow() {
    // Check vertical wins in each column by scanning from bottom to top
    for (let i = 0; i < 6; i++) {
        let rowCells = getCellsInRow(i);
        let playerOneDiscs = 0;
        let playerTwoDiscs = 0;
        for (let j = 0; j < rowCells.length; j++) {
            let cell = rowCells[j];
            //If undefined or null, continue. Credit to copilot for teaching me something new!
            if (!cell) continue;

            if (cell.classList.contains("player1")) {
                playerOneDiscs++;
                playerTwoDiscs = 0;
                addElementForInspection("Checked cell. Player one is one disc closer to a connect 4!");
            } else if (cell.classList.contains("player2")) {
                playerTwoDiscs++;
                playerOneDiscs = 0;
                addElementForInspection("Checked cell. Player two is one disc closer to a connect 4!");
            } else {
                // empty cell: reset both counters
                playerOneDiscs = 0;
                playerTwoDiscs = 0;
                addElementForInspection("Checked cell. Empty!");
            }

            if (playerOneDiscs == 4) {
                let winningP = document.createElement("p");
                winningP.innerText = "Player one won with a row!";
                let main = document.getElementById("main");
                main.appendChild(winningP);
                return;
            }
            if (playerTwoDiscs == 4) {
                let winningP = document.createElement("p");
                winningP.innerText = "Player two won with a row!";
                let main = document.getElementById("main");
                main.appendChild(winningP);
                return;
            }
        }
    }
}

//function initializeCellForDiagonal(cellNum) {
//    let cell1 = cells[cellNum];
//    let newCellPosibilities = [(cellNum-8),(cellNum-6),(cellNum+6),(cellNum+8)];
//    let cell2Possibilities = [];
//    for (let i = 0; i < newCellPosibilities.length; i++) {
//        cell2Possibilities.push(cells[newCellPosibilities[i]]);
//    }
    
//}

// Previous diagonal-checking code (kept commented for reference). Thanks, Copilot for commenting this out! Also, credit to Copilot for all of the bug fixes related to the diagonals. I was stumped!
/*
function initializeCellForDiagonal(cellNum) {
    let cell1 = cells[cellNum];
    let newCellPosibilities = [(cellNum-8),(cellNum-6),(cellNum+6),(cellNum+8)];
    let cell2Possibilities = [];
    for (let i = 0; i < newCellPosibilities.length; i++) {
        cell2Possibilities.push(cells[newCellPosibilities[i]]);
    }
}

function checkOneDiagonal(cellIndex) {
    let cellArray1 = [];
    let cellArray2 = [];
    let cellArray3 = [];
    let cellArray4 = [];
    for (let i = 0; i < 4; i++) {
        let newClassList = Array.from(cells[(cellIndex) - (i*6)].classList);
        let lastClass = newClassList[newClassList.length - 1];
        cellArray1.push(lastClass);
    }
    for (let i = 0; i < 4; i++) {
        let newClassList = Array.from(cells[(cellIndex) - (i*8)].classList);
        let lastClass = newClassList[newClassList.length - 1];
        cellArray2.push(lastClass);
    }
    for (let i = 0; i < 4; i++) {
        let newClassList = Array.from(cells[(cellIndex) + (i*6)].classList);
        let lastClass = newClassList[newClassList.length - 1];
        cellArray3.push(lastClass);
    }
    for (let i = 0; i < 4; i++) {
        let newClassList = Array.from(cells[(cellIndex) + (i*8)].classList);
        let lastClass = newClassList[newClassList.length - 1];
        cellArray4.push(lastClass);
    }
    if (cellArray1[0] == "player1" && cellArray1[1] == "player1" && cellArray1[2] == "player1" && cellArray1[3] == "player1" || cellArray2[0] == "player1" && cellArray2[1] == "player1" && cellArray2[2] == "player1" && cellArray2[3] == "player1" || cellArray3[0] == "player1" && cellArray3[1] == "player1" && cellArray3[2] == "player1" && cellArray3[3] == "player1" || cellArray4[0] == "player1" && cellArray4[1] == "player1" && cellArray4[2] == "player1" && cellArray4[3] == "player1") {
        return "P1";
    } else if (cellArray1[0] == "player2" && cellArray1[1] == "player2" && cellArray1[2] == "player2" && cellArray1[3] == "player2" || cellArray2[0] == "player2" && cellArray2[1] == "player2" && cellArray2[2] == "player2" && cellArray2[3] == "player2" || cellArray3[0] == "player2" && cellArray3[1] == "player2" && cellArray3[2] == "player2" && cellArray3[3] == "player2" || cellArray4[0] == "player2" && cellArray4[1] == "player2" && cellArray4[2] == "player2" && cellArray4[3] == "player2") {
        return "P2";
    } else {
        return null;
    }
}

function checkDiagonals() {
    for (let i = 0; i < cells.length; i++) {
        let winningPlayer = checkOneDiagonal(i);
        if (!winningPlayer) continue;
        if (winningPlayer == "P1") {
            let winningP = document.createElement("p");
            winningP.innerText = "Player one won with a diagonal!";
            let main = document.getElementById("main");
            main.appendChild(winningP);
            return;
        }
        if (winningPlayer == "P2") {
            let winningP = document.createElement("p");
            winningP.innerText = "Player two won! with a diagonal";
            let main = document.getElementById("main");
            main.appendChild(winningP);
            return;
        }
    }
}
*/

// Fixed diagonal detection implementation (credit: Copilot). The original code
// above is left commented for reference (credit: me).

function announceWin(text) {
    let winningP = document.createElement("p");
    winningP.innerText = text;
    let main = document.getElementById("main");
    main.appendChild(winningP);
}
//Sorry if this makes it more Ai-generated than it's supposed to be. I asked it to fix bugs, and my original functions for the check diagonal code are in the comments, if that helps. 
function checkDiagonals() {
  // board is 7 columns (0..6) and 6 rows (0..5)
  // DOWN-RIGHT diagonals (r -> r+3, c -> c+3) : start rows 0..2, cols 0..3
  for (let r = 0; r <= 2; r++) {
    for (let c = 0; c <= 3; c++) {
      let idx = r * 7 + c;
      // player1
      if (
        cells[idx] && cells[idx].classList.contains("player1") &&
        cells[idx + 8] && cells[idx + 8].classList.contains("player1") &&
        cells[idx + 16] && cells[idx + 16].classList.contains("player1") &&
        cells[idx + 24] && cells[idx + 24].classList.contains("player1")
      ) {
        announceWin("Player one won with a diagonal!");
        return;
      }
      // player2
      if (
        cells[idx] && cells[idx].classList.contains("player2") &&
        cells[idx + 8] && cells[idx + 8].classList.contains("player2") &&
        cells[idx + 16] && cells[idx + 16].classList.contains("player2") &&
        cells[idx + 24] && cells[idx + 24].classList.contains("player2")
      ) {
        announceWin("Player two won with a diagonal!");
        return;
      }
    }
  }

  // UP-RIGHT diagonals (r -> r-3, c -> c+3) : start rows 3..5, cols 0..3
  for (let r = 3; r <= 5; r++) {
    for (let c = 0; c <= 3; c++) {
      let idx = r * 7 + c;
      // player1
      if (
        cells[idx] && cells[idx].classList.contains("player1") &&
        cells[idx - 6] && cells[idx - 6].classList.contains("player1") &&
        cells[idx - 12] && cells[idx - 12].classList.contains("player1") &&
        cells[idx - 18] && cells[idx - 18].classList.contains("player1")
      ) {
        announceWin("Player one won with a diagonal!");
        return;
      }
      // player2
      if (
        cells[idx] && cells[idx].classList.contains("player2") &&
        cells[idx - 6] && cells[idx - 6].classList.contains("player2") &&
        cells[idx - 12] && cells[idx - 12].classList.contains("player2") &&
        cells[idx - 18] && cells[idx - 18].classList.contains("player2")
      ) {
        announceWin("Player two won with a diagonal!");
        return;
      }
        }
    }
}

function addElementForInspection(text) {
    let h1 = document.createElement("h1");
    h1.innerText = text;
    let main = document.getElementById("main");
    main.appendChild(h1);
}