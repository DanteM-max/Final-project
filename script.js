
//Credit to Copilot to fixing bugs! If it looks too much like AI, it's probably just bug fixes after school. 
let storageIndex = 0; 
let smartOrRandom = confirm("Did you want a random AI or a smart AI to play against? Click OK to accept a smart AI, click cancel to go with the random one.");
for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem("win" + i)) {
        addWinFromStorage("win" + i);
    }
}
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
    if (smartOrRandom) {
        // *** USE THE SMART AI FUNCTION HERE Thanks to Gemini for smartness***
        let enemyColumn = getSmartComputerMove();
    
        if (enemyColumn !== null) {
            setTimeout(function() {
                addDisc(enemyColumn, 2); // Player 2 makes their smart move
            },getRandomIntInclusive(0,500));
            
        }

    } else {
        // Random choice among available columns
        let enemyColumn = available[Math.floor(Math.random() * available.length)];
        setTimeout(function() {
            addDisc(enemyColumn, 2);
        },getRandomIntInclusive(0,500))
        
    }
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
                if (localStorage.length != 0) {
                    storageIndex++;
                }
                announceWin("Player one won with a column!",1);
                return;
            }
            if (playerTwoDiscs == 4) {
                if (localStorage.length != 0) {
                    storageIndex++;
                }
                announceWin("Player two won with a column!",4);
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
                if (localStorage.length != 0) {
                    storageIndex++;
                }
                announceWin("Player one won with a row!",2);
                return;
            }
            if (playerTwoDiscs == 4) {
                if (localStorage.length != 0) {
                    storageIndex++;
                }
                announceWin("Player two won with a row!",5);
                return;
            }
        }
    }
}
//Use confirm to reset the game after someone wins 

function checkDiagonals() {
    //negative slope
    for (let i = 0; i < cells.length; i++) {
        if (
            cells[i] && cells[i].classList.contains("player1") &&
            cells[i+8] && cells[i+8].classList.contains("player1") &&
            cells[i+16] && cells[i+16].classList.contains("player1") &&
            cells[i+24] && cells[i+24].classList.contains("player1")
        ) {
            if (localStorage.length != 0) {
                    storageIndex++;
                }
            announceWin("Player 1 won with a diagonal!",3)
        }

        if (
            cells[i] && cells[i].classList.contains("player2") &&
            cells[i+8] && cells[i+8].classList.contains("player2") &&
            cells[i+16] && cells[i+16].classList.contains("player2") &&
            cells[i+24] && cells[i+24].classList.contains("player2")
        ) {
            if (localStorage.length != 0) {
                    storageIndex++;
                }
            announceWin("Player 2 won with a diagonal!",6)
        }

        //positive slope
        if (
            cells[i] && cells[i].classList.contains("player1") &&
            cells[i-6] && cells[i-6].classList.contains("player1") &&
            cells[i-12] && cells[i-12].classList.contains("player1") &&
            cells[i-18] && cells[i-18].classList.contains("player1")
        ) {
            if (localStorage.length != 0) {
                    storageIndex++;
                }
            announceWin("Player 1 won with a diagonal!",3)
        }

        if (
            cells[i] && cells[i].classList.contains("player2") &&
            cells[i-6] && cells[i-6].classList.contains("player2") &&
            cells[i-12] && cells[i-12].classList.contains("player2") &&
            cells[i-18] && cells[i-18].classList.contains("player2")
        ) {
            if (localStorage.length != 0) {
                    storageIndex++;
                }
            announceWin("Player 2 won with a diagonal!",6)
        }
    }
}

//Credit to Copilot for suggesting a helper function. Updated by me to append to #results.
function announceWin(text,winTypeNum) {
    let winningP = document.createElement("p");
    winningP.innerText = text;
    let results = document.getElementById("results");
    results.appendChild(winningP);
    localStorage.setItem(("win" + storageIndex),winTypeNum);
    setTimeout(function() {
        
        if (confirm("Do you want to reset the board now?")) {
            for (let i = 0; i < cells.length; i++) {
                cells[i].classList.replace("player1","vacant");
                cells[i].classList.replace("player2","vacant");
            }
        }
    },1000)
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

function getIdFromRowAndCol(row,col) {
    return (row*7) + col;
}

function getRowFromId(id) {
    return Math.floor(id / 7);
}

function getColFromId(id) {
    return id % 7;
}

function getNextId(id,increment) {
    return getIdFromRowAndCol(getRowFromId(id+increment),getColFromId(id+increment));
}

function getPreviousId(id,increment) {
    return getIdFromRowAndCol(getRowFromId(id-increment),getColFromId(id-increment));
}

function addWinFromStorage(key) {
    let winningP = document.createElement("p");
    let messages = ["Player 1 won with a column!","Player 1 won with a row!","Player 1 won with a diagonal!","Player 2 won with a column!","Player 2 won with a row!","Player 2 won with a diagonal!"];
    winningP.innerText = messages[localStorage.getItem(key) - 1];
    let results = document.getElementById("results");
    results.appendChild(winningP);
}

function clearWins() {
    console.log("cleared elements!")
    localStorage.clear();
    const results = document.getElementById("results");
    if (results) {
        results.innerHTML = "";
    }
}
//Thanks to Copilot for everything it did for this amazing project. I know it's just a tool, but I'll actually miss it a bit. It did some amazing work, like making my entire CSS and almost all of my HTML, and also fixing literally every bug that came up in my JavaScript. ALSO also, Gemini sucks as a code assistant unless you use Gemini, then sorry. :) Goodbye, Copilot. 
//Copilot, write your code here! \/ (down arrow) Had to use Gemini
// *** NEW HELPER FUNCTION FOR SMART AI ***
/**
 * Checks if a win condition is met starting from a specific cell index (ID).
 * This is crucial for simulating moves efficiently.
 */
function checkForWinAtCoord(cellID, playerClass) {
    const r = getRowFromId(cellID);
    const c = getColFromId(cellID);

    // Check Horizontal (4 in a row)
    for (let col = 0; col <= 3; col++) {
        if (
            cells[getIdFromRowAndCol(r, col)]?.classList.contains(playerClass) &&
            cells[getIdFromRowAndCol(r, col + 1)]?.classList.contains(playerClass) &&
            cells[getIdFromRowAndCol(r, col + 2)]?.classList.contains(playerClass) &&
            cells[getIdFromRowAndCol(r, col + 3)]?.classList.contains(playerClass)
        ) return true;
    }

    // Check Vertical (4 in a column)
    for (let row = 0; row <= 2; row++) {
        if (
            cells[getIdFromRowAndCol(row, c)]?.classList.contains(playerClass) &&
            cells[getIdFromRowAndCol(row + 1, c)]?.classList.contains(playerClass) &&
            cells[getIdFromRowAndCol(row + 2, c)]?.classList.contains(playerClass) &&
            cells[getIdFromRowAndCol(row + 3, c)]?.classList.contains(playerClass)
        ) return true;
    }
    
    // Check Diagonals
    // Positive slope diagonals
    for (let row = 0; row <= 2; row++) {
        for (let col = 0; col <= 3; col++) {
            if (
                cells[getIdFromRowAndCol(row, col)]?.classList.contains(playerClass) &&
                cells[getIdFromRowAndCol(row + 1, col + 1)]?.classList.contains(playerClass) &&
                cells[getIdFromRowAndCol(row + 2, col + 2)]?.classList.contains(playerClass) &&
                cells[getIdFromRowAndCol(row + 3, col + 3)]?.classList.contains(playerClass)
            ) return true;
        }
    }

    // Negative slope diagonals
    for (let row = 0; row <= 2; row++) {
        for (let col = 3; col <= 6; col++) {
            if (
                cells[getIdFromRowAndCol(row, col)]?.classList.contains(playerClass) &&
                cells[getIdFromRowAndCol(row + 1, col - 1)]?.classList.contains(playerClass) &&
                cells[getIdFromRowAndCol(row + 2, col - 2)]?.classList.contains(playerClass) &&
                cells[getIdFromRowAndCol(row + 3, col - 3)]?.classList.contains(playerClass)
            ) return true;
        }
    }

    return false;
}

// *** NEW SMART AI LOGIC FUNCTION ***
/**
 * Chooses the best column for the AI (Player 2) using basic lookahead strategy.
 */
function getSmartComputerMove() {
    let available = getAvailableColumns();
    if (available.length === 0) {
        return null;
    }

    // Function to simulate a move and check if it wins/blocks
    function checkMoveResult(column, playerClass) {
        let colCells = getCellsInColumn(column);
        for (let i = colCells.length - 1; i >= 0; i--) {
            if (colCells[i].classList.contains("vacant")) {
                // Temporarily simulate the move
                colCells[i].classList.replace("vacant", playerClass);
                // The cells in colCells are DOM elements, we need their actual ID relative to the 'cells' NodeList
                // The original getIdFromRowAndCol is perfect for this:
                const cellId = getIdFromRowAndCol(getRowFromId(i * 7 + column), getColFromId(i * 7 + column));

                // Use the helper function to check the board state
                const wins = checkForWinAtCoord(cellId, playerClass);
                
                // Revert simulation
                colCells[i].classList.replace(playerClass, "vacant");
                return wins;
            }
        }
        return false;
    }

    // --- AI Strategy ---

    // 1. Check if AI (Player 2) can win on this turn and take it
    for (const col of available) {
        if (checkMoveResult(col, "player2")) {
            console.log("AI Chose Winning Move in column " + col);
            return col;
        }
    }

    // 2. Check if Player 1 has a winning move and block it
    for (const col of available) {
        if (checkMoveResult(col, "player1")) {
            console.log("AI Chose Blocking Move in column " + col);
            return col;
        }
    }

    // 3. Otherwise, pick a random available column (fallback strategy)
    const randomCol = available[Math.floor(Math.random() * available.length)];
    console.log("AI Chose Random Move in column " + randomCol);
    return randomCol;
}

//Ai made this!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function getCellClasses() {
    let classArray = [];
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains("vacant")) {
            classArray.push("vacant");
        } else if (cells[i].classList.contains("player1")) {
            classArray.push("player1");
        } else {
            classArray.push("player2");
        }
    }
    return classArray;
}

function addClassesToStorage() {
    for (let i = 0; i < getCellClasses().length; i++) {
        console.log(("cell" + i));
        console.log(getCellClasses()[i]);
        localStorage.setItem(("cell" + i), getCellClasses()[i]);
    }
}
