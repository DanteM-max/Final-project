// Credits: original column logic written by me; improvements and
// fixes (win-check, enemy randomness, and other tweaks) added by Copilot.

// Get all cells !!!-Credit to Copilot for teaching me querySelector and speeding up the coding process!-!!!
let cells = document.querySelectorAll(".cell");
for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add("vacant");
}

function getCellsInColumn(column) {
    let cellsInColumn = [];
    for (let i = column; i < cells.length; i += 7) {
        cellsInColumn.push(cells[i]);
    }
    return cellsInColumn;
}

// Return an array of column indices that still have at least one vacant cell
function getAvailableColumns() {
    let available = [];
    // Use number of drop buttons to determine how many columns exist
    for (let col = 0; col < dropButtons.length; col++) {
        let colCells = getCellsInColumn(col);
        for (let i = 0; i < colCells.length; i++) {
            if (colCells[i] && colCells[i].classList.contains("vacant")) {
                available.push(col);
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
    if (available.length === 0) {
        console.log("beginPlay: board full or no available columns for enemy.");
        return;
    }
    // Random choice among available columns
    let enemyColumn = available[Math.floor(Math.random() * available.length)];
    addDisc(enemyColumn, 2);

    checkColumn();
}

function checkColumn() {
    // Check vertical wins in each column by scanning from bottom to top
    for (let i = 0; i < 7; i++) {
        let colCells = getCellsInColumn(i);
        let playerOneDiscs = 0;
        let playerTwoDiscs = 0;
        for (let j = 0; j < colCells.length; j++) {
            let cell = colCells[j];
            if (!cell) continue;

            if (cell.classList.contains("player1")) {
                playerOneDiscs++;
                playerTwoDiscs = 0;
            } else if (cell.classList.contains("player2")) {
                playerTwoDiscs++;
                playerOneDiscs = 0;
            } else {
                // empty cell: reset both counters
                playerOneDiscs = 0;
                playerTwoDiscs = 0;
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
    let playerOneDiscs = 0; 
    let playerTwoDiscs = 0;
    for (let i = 0; i < 6; i++) {

    }
    for (let i = 0; i < cells.length; i++) {
        if (true) {
            
        }
    }
}