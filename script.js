console.log("Script Started, running...");
let storageIndex = 0; 
console.log(storageIndex);
let smartOrRandom = false;
console.log(smartOrRandom);
let aiCheckbox = document.getElementById("ai-checkbox");
console.log(aiCheckbox);

function addWinFromStorage(key) {
    let winningP = document.createElement("p");
    let messages = ["Player 1 won with a column!","Player 1 won with a row!","Player 1 won with a diagonal!","Player 2 won with a column!","Player 2 won with a row!","Player 2 won with a diagonal!"];
    winningP.innerText = messages[localStorage.getItem(key) - 1];
    let results = document.getElementById("results");
    results.appendChild(winningP);
}


for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem("win" + i)) {
        console.log("Adding a win... ");
        addWinFromStorage("win" + i);
        console.log("Win added! Continuing...");
    }
}
console.log("Wins added!!!");
// Get all cells !!!-Credit to Copilot for teaching me querySelector and speeding up the coding process!-!!!
let cells = document.querySelectorAll(".cell");
console.log(cells);
for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add("vacant");
    console.log("Class added to cell " + (i + 1));
}
console.log("Cells initialized!");
// Append event listeners to each drop button

let dropButtons = document.querySelectorAll(".drop-button");
for (let i = 0; i < dropButtons.length; i++) {
    dropButtons[i].addEventListener("click", beginPlay);
    console.log("Event listener added!");
}

console.log("Looking through functions...");
setTimeout(function() {
    console.log("There's a tree in here!");
},100);

//functions (and the tree);

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
function getAvailableColumns() {
    console.error("tree");
    let available = [];
    // Use number of drop buttons to determine how many columns exist
    for (let col = 0; col < dropButtons.length; col++) {
        let colCells = getCellsInColumn(col);
        for (let i = 0; i < colCells.length; i++) {
            if (colCells[i] && colCells[i].classList.contains("vacant")) {
                available.push(col);
                console.log("🌲");
                console.log("I fOuNd A tReE");
                console.log(available);
                break;
            }
        }
    }
    return available;
}

// Function to add a disc to the selected column
function addDisc(column, playerNum) {
    // Cache the column cells so we don't recompute repeatedly
    let columnCells = getCellsInColumn(column);
    console.log(columnCells);
    for (let i = columnCells.length - 1; i >= 0; i--) {
        console.log(i);
        if (columnCells[i].classList.contains("vacant")) {
            if (playerNum == 1) {
                columnCells[i].classList.replace("vacant", "player1");
            } else {
                columnCells[i].classList.replace("vacant", "player2");
            }
            console.log("Class replaced!");
            return;
        }
    }
    // column is full (no vacant cells)
}

function beginPlay(event) {
    console.log(event);
    let column = parseInt(event.target.id.charAt(event.target.id.length - 1), 10);
    console.log(column);
    addDisc(column, 1);

    let available = getAvailableColumns();
    console.log(available);
    if (available.length == 0) {
        console.log("beginPlay: board full or no available columns for enemy.");
        return;
    }
        if (smartOrRandom) {
        // *** USE THE SMART AI FUNCTION HERE Thanks to Gemini for smartness***
        let enemyColumn = getSmartComputerMove();
        console.log(enemyColumn);
    
        if (enemyColumn !== null) {
            setTimeout(function() {
                addDisc(enemyColumn, 2); // Player 2 makes their smart move
            },getRandomIntInclusive(0,750));
            
        }
        checkWins(false);
    } else {
        // Random choice among available columns
        let enemyColumn = available[Math.floor(Math.random() * available.length)];
        console.log(enemyColumn);
        setTimeout(function() {
            addDisc(enemyColumn, 2);
        },getRandomIntInclusive(0,750))
    }
    
    checkWins(false)
}

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

//small functions...

console.log("These are small functions! Let's see if I can find anything out of the ordinary...");

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

function getRandomIntInclusive(min, max) {
  // The maximum is inclusive and the minimum is inclusive
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  console.error(random);
  return random; 
}

function updateAiBool() {
    smartOrRandom = aiCheckbox.checked;
    console.log(smartOrRandom);
}


console.log("dinner");
//Dinner is over, big functions now!


function clearWins() {
    console.log("cleared elements!")
    localStorage.clear();
    const results = document.getElementById("results");
    if (results) {
        results.innerHTML = "";
    }
}

function checkWins(determineIfSendBool) {
    //checkColumn();
    for (let i = 0; i < 7; i++) {
        let colCells = getCellsInColumn(i);
        let player1Discs = 0;
        let player2Discs = 0; 
        for (let j = 0; j < colCells.length; j++) {
            let cell = colCells[j];
            if (!cell) continue;

            if (cell.classList.contains("player1")) {
                player1Discs++;
                player2Discs = 0;
                console.log("Checked cell. Player one is one disc closer to a connect 4!");
            } else if (cell.classList.contains("player2")) {
                player2Discs++;
                player1Discs = 0;
                console.log("Checked cell. Player two is one disc closer to a connect 4!");
            } else {
                // empty cell: reset both counters
                player1Discs = 0;
                player2Discs = 0;
                console.log("Checked cell. Empty!");
            }

            if (player1Discs == 4) {
                if (localStorage.length != 0) {
                    storageIndex++;
                }

                if (determineIfSendBool) {
                    return [true,"player1"];
                } else {
                    announceWin("Player one won with a column!",1);
                    return;
                }
            }
            if (player2Discs == 4) {
                if (localStorage.length != 0) {
                    storageIndex++;
                }

                if (determineIfSendBool) {
                    return [true,"player2"];
                } else { 
                    announceWin("Player two won with a column!",4);
                    return;
                }
            }
        }

    }
    //checkRow();
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
                if (determineIfSendBool) {
                    return [true,"player1"];
                } else {
                    announceWin("Player one won with a row!",2);
                    return;
                }
            }
            if (playerTwoDiscs == 4) {
                if (localStorage.length != 0) {
                    storageIndex++;
                }

                if (determineIfSendBool) {
                    return [true,"player2"];
                } else {
                    announceWin("Player two won with a row!",5);
                    return;
                }
                
            }
        }
    }

    //negative slope, checkDiagonals();
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

                if (determineIfSendBool) {
                    return [true,"player1"];
                } else {
                    announceWin("Player 1 won with a diagonal!",3);
                    return;
                }
            
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

                if (determineIfSendBool) {
                    return [true,"player2"];
                } else {
                    announceWin("Player 2 won with a diagonal!",6);
                    return;
                }
            
        }

        //positive slope, checkDiagonals();
        if (
            cells[i] && cells[i].classList.contains("player1") &&
            cells[i-6] && cells[i-6].classList.contains("player1") &&
            cells[i-12] && cells[i-12].classList.contains("player1") &&
            cells[i-18] && cells[i-18].classList.contains("player1")
        ) {
            if (localStorage.length != 0) {
                    storageIndex++;
                }

                if (determineIfSendBool) {
                    return [true,"player1"];
                } else {
                    announceWin("Player 1 won with a diagonal!",3);
                    return;
                }
            
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

                if (determineIfSendBool) {
                    return [true,"player2"];
                } else {
                    announceWin("Player 2 won with a diagonal!",6);
                    return;
                }
            
        }
    }

    if (determineIfSendBool) return [false,"no winner"];
}

function getSmartComputerMove() {
    let available = getAvailableColumns();
    if (available.length === 0) {
        return null;
    }

    

    // --- AI Strategy ---

    // --- AI Strategy ---
    // NOTE (where you went wrong): the previous implementation iterated every
    // cell index from 0..41 and used `getColFromId(cell)` which conflated
    // cell indices and column numbers. `available` already contains actual
    // column numbers (e.g. [0,2,4]). We must iterate `available` values.

    // 1. Check if AI (Player 2) can win on this turn and take it
    for (let k = 0; k < available.length; k++) {
        const col = available[k]; // actual column number
        const sim = checkMoveResult(col, "player2"); // returns [bool, "playerX"]
        if (Array.isArray(sim) && sim[0] === true && sim[1] === "player2") {
            console.log("AI Chose Winning Move in column " + col);
            return col;
        }
    }

    // 2. Check if Player 1 has a winning move and block it
    for (let k = 0; k < available.length; k++) {
        const col = available[k];
        const sim = checkMoveResult(col, "player1");
        if (Array.isArray(sim) && sim[0] === true && sim[1] === "player1") {
            console.log("AI Chose Blocking Move in column " + col);
            return col;
        }
    }

    // 3. Otherwise, pick a random available column (fallback strategy)
    const randIndex = getRandomIntInclusive(0, available.length - 1);
    return available[randIndex];
}

    function checkMoveResult(column, playerClass) {
        // This function simulates dropping a disc into `column` for
        // `playerClass` and returns the same shaped array as `checkWins(true)`:
        // [booleanHasWin, "player1"/"player2"/"no winner"].
        // Bug note: previously this returned `false` in some cases and callers
        // indexed the result (e.g. result[0]) which caused errors. Always
        // return an array to make checks predictable.
        let colCells = getCellsInColumn(column);
        for (let i = colCells.length - 1; i >= 0; i--) {
            if (colCells[i].classList.contains("vacant")) {
                // Temporarily simulate the move
                colCells[i].classList.replace("vacant", playerClass);

                // Use the helper function to check the board state. This
                // returns an array like [true, "player2"] when a win is found.
                const wins = checkWins(true);

                // Revert simulation
                colCells[i].classList.replace(playerClass, "vacant");

                // Ensure we always return an array with [boolean, info]
                if (Array.isArray(wins)) return wins;
                return [false, "no winner"];
            }
        }
        return [false, "no winner"];
    }