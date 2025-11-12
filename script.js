console.log("Script active");

// Get all cells !!!-Credit to Copilot for teaching me querySelector and speeding up the coding process!-!!!
let cells = document.querySelectorAll(".cell");
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
    dropButtons[i].addEventListener("click", addDisc);
} 

