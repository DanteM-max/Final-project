
//Credit to Copilot to fixing bugs! If it looks too much like AI, it's probably just bug fixes after school. 

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
    for (let i = (row*7); i < ((row*7)+7); i++) {
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
    checkDiagonals();
}

function beginAutoPlay() {
    let available = getAvailableColumns();
    if (available.length == 0) {
        console.log("beginPlay: board full or no available columns for enemy.");
        return;
    }

    // Random choice among available columns
    let playerColumnOne = available[Math.floor(Math.random() * available.length)];
    addDisc(playerColumnOne, 1);
    // Random choice among available columns
    let playerColumnTwo = available[Math.floor(Math.random() * available.length)];
    addDisc(playerColumnTwo, 2);
    checkColumn();
    checkRow();
    checkDiagonals();
}
//Credit to Copilot for bug fixes and comments (and me for testing!)
function checkColumn() {
    // Check vertical wins in each column by scanning from bottom to top
    for (let i = 0; i < 7; i++) {
        let colCells = getCellsInColumn(i);
        let playerOneDiscs = 0;
        let playerTwoDiscs = 0;
        for (let j = 0; j < colCells.length; j++) {
            let cell = colCells[j];
            //If undefined or null, continue. Credit to Copilot for teaching me something new!
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
                announceWin("Player one won with a column!");
                return;
            }
            if (playerTwoDiscs == 4) {
                announceWin("Player two won with a column!");
                return;
            }
        }
    }
}

//Credit to me for identifying the glitch, and Copilot for the fix!
function checkRow() {
    // Check horizontal wins in each row by scanning left to right
    for (let i = 0; i < 6; i++) {
        let rowCells = getCellsInRow(i);
        let playerOneDiscs = 0;
        let playerTwoDiscs = 0;
        for (let j = 0; j < rowCells.length; j++) {
            let cell = rowCells[j];
            //If undefined or null, continue. Credit to Copilot for teaching me something new!
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
                announceWin("Player one won with a row!");
                return;
            }
            if (playerTwoDiscs == 4) {
                announceWin("Player two won with a row!");
                return;
            }
        }
    }
}


function checkDiagonals() {
    let playerOneDiscs = 0;
    let playerTwoDiscs = 0;

    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 7; c++) {
            let idx = (r*7) + c;
            console.log(idx);
            if (cells[idx].classList.contains("player1") || cells[idx].classList.contains("player2")) {

            }
        }
    }
}

//Credit to Copilot for suggesting a helper function. Updated by me to append to #results.
function announceWin(text) {
    let winningP = document.createElement("p");
    winningP.innerText = text;
    let results = document.getElementById("results");
    results.appendChild(winningP);
}
//Sorry if this makes it more Ai-generated than it's supposed to be. I asked it to fix bugs, and my original functions for the check diagonal code are in the comments, if that helps. 


function addElementForChromebooks(text) {
    let h1 = document.createElement("h1");
    h1.innerText = text;
    let main = document.getElementById("main");
    main.appendChild(h1);
}

/* let autoPlay = confirm("Do you want to play the Connect 4 game?");
if (autoPlay) {
    while (getAvailableColumns().length > 0) {
        setTimeout(function() {
            beginAutoPlay();
        }, 1000)
    }
} */