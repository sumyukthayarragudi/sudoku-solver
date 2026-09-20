package com.sudoku.sudokusolver.solver;

public class SudokuSolver {

    public boolean solve(int[][] board) {

        for (int row = 0; row < 9; row++) {

            for (int col = 0; col < 9; col++) {

                // Find an empty cell
                if (board[row][col] == 0) {

                    // Try numbers 1 to 9
                    for (int num = 1; num <= 9; num++) {

                        if (isSafe(board, row, col, num)) {

                            board[row][col] = num;

                            // Recursively solve the remaining cells
                            if (solve(board)) {
                                return true;
                            }

                            // Backtrack
                            board[row][col] = 0;
                        }
                    }

                    return false;
                }
            }
        }

        return true;
    }

    private boolean isSafe(int[][] board, int row, int col, int num) {

        // Check row
        for (int i = 0; i < 9; i++) {
            if (board[row][i] == num) {
                return false;
            }
        }

        // Check column
        for (int i = 0; i < 9; i++) {
            if (board[i][col] == num) {
                return false;
            }
        }

        // Check 3x3 box
        int startRow = row - row % 3;
        int startCol = col - col % 3;

        for (int i = startRow; i < startRow + 3; i++) {

            for (int j = startCol; j < startCol + 3; j++) {

                if (board[i][j] == num) {
                    return false;
                }
            }
        }

        return true;
    }
}