//Credit to Copilot to fixing bugs!

// Get all cells !!!-Credit to Copilot for teaching me querySelector and speeding up the coding process!-!!!
let cells = document.querySelectorAll(".cell");
for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add("vacant");
    console.log("Class added to cell " + (i + 1));
}
console.log("Cells initialized!")

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
                console.log(available);
                break;
            }
        }
    }
    return available;
}

// Append event listeners to each drop button


let dropButtons = document.querySelectorAll(".drop-button");
for (let i = 0; i < dropButtons.length; i++) {
    dropButtons[i].addEventListener("click", beginPlay);
    console.log("Event listener added!");
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
        console.log("beginPlay: board full or no available columns for enemy.");
        return;
    }
    // Random choice among available columns
    let enemyColumn = available[Math.floor(Math.random() * available.length)];
    addDisc(enemyColumn, 2);

    checkColumn();
    checkRow();
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
                console.log("Checked cell. Player one is one disc closer to a connect 4!");
            } else if (cell.classList.contains("player2")) {
                playerTwoDiscs++;
                playerOneDiscs = 0;
                console.log("Checked cell. Player two is one disc closer to a connect 4!");
            } else {
                // empty cell: reset both counters
                playerOneDiscs = 0;
                playerTwoDiscs = 0;
                console.log("Checked cell. Empty!");
            }

            if (playerOneDiscs == 4) {
                let winningP = document.createElement("p");
                winningP.innerText = "Player one won!";
                let main = document.getElementById("main");
                main.appendChild(winningP);
                return;
            }
            if (playerTwoDiscs == 4) {
                let winningP = document.createElement("p");
                winningP.innerText = "Player two won!";
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
                console.log("Checked cell. Player one is one disc closer to a connect 4!");
            } else if (cell.classList.contains("player2")) {
                playerTwoDiscs++;
                playerOneDiscs = 0;
                console.log("Checked cell. Player two is one disc closer to a connect 4!");
            } else {
                // empty cell: reset both counters
                playerOneDiscs = 0;
                playerTwoDiscs = 0;
                console.log("Checked cell. Empty!");
            }

            if (playerOneDiscs == 4) {
                let winningP = document.createElement("p");
                winningP.innerText = "Player one won!";
                let main = document.getElementById("main");
                main.appendChild(winningP);
                return;
            }
            if (playerTwoDiscs == 4) {
                let winningP = document.createElement("p");
                winningP.innerText = "Player two won!";
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

function checkDiagonal() {
    
}