console.log("Script active");

// Get all cells !!!-Credit to Copilot for teaching me querySelector and speeding up the coding process!-!!!
let cells = document.querySelectorAll(".cell");
for (let i = 0; i < cells.length; i++) {
    cells[i].classList.add("vacant");
}
console.log(cells);

function getCellsInColumn(column) {
    let cellsInColumn = [];
    for (let i = column; i < cells.length; i += 7) {
        cellsInColumn.push(cells[i]);
    }
    return cellsInColumn;
}
for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
        
    }
}
// Append event listeners to each drop button


let dropButtons = document.querySelectorAll(".drop-button");
for (let i = 0; i < dropButtons.length; i++) {
    dropButtons[i].addEventListener("click", beginPlay);
} 

// Function to add a disc to the selected column
function addDisc(column, playerNum) {
    for (let i = getCellsInColumn(column).length - 1; i >=0; i--) {
        //Thanks to Copilot for showing me the .classList.consains() method!
        if (getCellsInColumn(column)[i].classList.contains("vacant")) {
            if (playerNum == 1) {
                getCellsInColumn(column)[i].classList.replace("vacant", "player1");
            } else {
                getCellsInColumn(column)[i].classList.replace("vacant", "player2");
            }
        }
    }
}

function beginPlay(event) {
    let column = event.target.id.charAt(event.target.id.length - 1);
    addDisc(column, 1);
    
}