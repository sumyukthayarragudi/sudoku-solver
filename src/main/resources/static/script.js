const exampleBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

function createBoard() {

    const board = document.getElementById("sudoku-board");

    board.innerHTML = "";

    for (let row = 0; row < 9; row++) {

        for (let col = 0; col < 9; col++) {

            const input = document.createElement("input");

            input.type = "text";
            input.maxLength = 1;
            input.className = "cell";

            input.dataset.row = row;
            input.dataset.col = col;

            input.addEventListener("input", function () {

                if (!/^[1-9]$/.test(this.value)) {
                    this.value = "";
                    this.classList.remove("given");
                } else {
                    this.classList.add("given");
                    this.classList.remove("solved");
                }

            });

            board.appendChild(input);
        }
    }
}

function loadExample() {

    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell, index) => {

        const row = Math.floor(index / 9);
        const col = index % 9;

        if (exampleBoard[row][col] === 0) {

            cell.value = "";
            cell.classList.remove("given");
            cell.classList.remove("solved");

        } else {

            cell.value = exampleBoard[row][col];

            cell.classList.add("given");
            cell.classList.remove("solved");
        }
    });

    document.getElementById("message").textContent =
        "Example Sudoku loaded.";
}

function clearBoard() {

    document.querySelectorAll(".cell").forEach(cell => {

        cell.value = "";

        cell.classList.remove("given");
        cell.classList.remove("solved");
    });

    document.getElementById("message").textContent = "";
}

function getBoard() {

    const board = [];

    const cells = document.querySelectorAll(".cell");

    for (let row = 0; row < 9; row++) {

        const currentRow = [];

        for (let col = 0; col < 9; col++) {

            const value = cells[row * 9 + col].value;

            currentRow.push(
                value === "" ? 0 : Number(value)
            );
        }

        board.push(currentRow);
    }

    return board;
}

function isValidBoard(board) {

    // Check rows
    for (let row = 0; row < 9; row++) {

        const numbers = new Set();

        for (let col = 0; col < 9; col++) {

            const value = board[row][col];

            if (value !== 0) {

                if (numbers.has(value)) {
                    return false;
                }

                numbers.add(value);
            }
        }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {

        const numbers = new Set();

        for (let row = 0; row < 9; row++) {

            const value = board[row][col];

            if (value !== 0) {

                if (numbers.has(value)) {
                    return false;
                }

                numbers.add(value);
            }
        }
    }

    // Check 3x3 boxes
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {

        for (let boxCol = 0; boxCol < 9; boxCol += 3) {

            const numbers = new Set();

            for (let row = boxRow; row < boxRow + 3; row++) {

                for (let col = boxCol; col < boxCol + 3; col++) {

                    const value = board[row][col];

                    if (value !== 0) {

                        if (numbers.has(value)) {
                            return false;
                        }

                        numbers.add(value);
                    }
                }
            }
        }
    }

    return true;
}

async function solveSudoku() {

    const board = getBoard();

    if (!isValidBoard(board)) {

        document.getElementById("message").textContent =
            "⚠️ Invalid Sudoku! Please check the numbers entered.";

        return;
    }

    // Remember which cells were originally filled
    const originalBoard = board.map(row => [...row]);

    document.getElementById("message").textContent =
        "Solving Sudoku...";

    try {

        const response = await fetch("/api/sudoku/solve", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(board)
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const solvedBoard = await response.json();

        const cells = document.querySelectorAll(".cell");

        cells.forEach((cell, index) => {

            const row = Math.floor(index / 9);
            const col = index % 9;

            cell.value = solvedBoard[row][col];

            if (originalBoard[row][col] !== 0) {

                // Original number
                cell.classList.add("given");
                cell.classList.remove("solved");

            } else {

                // Number generated by solver
                cell.classList.add("solved");
                cell.classList.remove("given");
            }
        });

        document.getElementById("message").textContent =
            "✓ Sudoku solved using Java Backtracking!";

    } catch (error) {

        console.error(error);

        document.getElementById("message").textContent =
            "✗ Unable to solve Sudoku.";
    }
}

createBoard();