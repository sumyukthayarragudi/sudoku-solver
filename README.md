# 🧩 Sudoku Solver

A web-based Sudoku Solver developed using Java, Spring Boot, HTML, CSS, and JavaScript.

The application solves Sudoku puzzles using the Backtracking algorithm and provides input validation before solving.

## 🚀 Features

- 9×9 Sudoku board
- Load a sample Sudoku puzzle
- Manually enter Sudoku values
- Clear the Sudoku board
- Validate user input
- Detect duplicate values in rows
- Detect duplicate values in columns
- Detect duplicate values in 3×3 boxes
- Solve Sudoku using the Backtracking algorithm
- Java-based backend processing
- Spring Boot REST API
- Different styling for original and solver-generated numbers
- Responsive web interface

## 🛠️ Technologies Used

- Java
- Spring Boot
- Spring Web
- Thymeleaf
- HTML5
- CSS3
- JavaScript
- Maven

## 🧠 Algorithm

The application uses the **Backtracking Algorithm** to solve Sudoku.

The algorithm:

1. Finds an empty cell.
2. Tries numbers from 1 to 9.
3. Checks whether the number is valid in the row, column, and 3×3 box.
4. Places the number if it is valid.
5. Recursively solves the remaining cells.
6. Backtracks when a selected number leads to an invalid solution.

## 📁 Project Structure

```text
SudokuSolverWeb
│
├── src
│   └── main
│       ├── java
│       │   ├── com.sudoku.sudokusolver
│       │   │   └── SudokuSolverWebApplication.java
│       │   │
│       │   ├── controller
│       │   │   ├── HomeController.java
│       │   │   └── SudokuController.java
│       │   │
│       │   └── solver
│       │       └── SudokuSolver.java
│       │
│       └── resources
│           ├── static
│           │   ├── style.css
│           │   └── script.js
│           │
│           └── templates
│               └── index.html
│
├── pom.xml
├── README.md
└── .gitignore

🔄 Application Flow

User
  ↓
Sudoku Web Interface
  ↓
JavaScript
  ↓
Spring Boot REST API
  ↓
SudokuController
  ↓
SudokuSolver
  ↓
Backtracking Algorithm
  ↓
Solved Sudoku
  ↓
Web Interface

▶️ How to Run

Prerequisites

• Java JDK
• IntelliJ IDEA
• Maven

Steps

1.Clone the repository.
2.Open the project in IntelliJ IDEA.
3.Allow Maven dependencies to load.
4.Run SudokuSolverWebApplication.
5.Open http://localhost:8080 in a web browser.
6.Load an example or enter your own Sudoku puzzle.
7.Click Solve Sudoku.

🔍 Validation

The application validates the Sudoku before sending it to the backend.

It checks:

• Rows
• Columns
• 3×3 boxes

Invalid puzzles display an appropriate validation message.