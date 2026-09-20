package com.sudoku.sudokusolver.controller;

import com.sudoku.sudokusolver.solver.SudokuSolver;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sudoku")
public class SudokuController {

    private final SudokuSolver sudokuSolver = new SudokuSolver();

    @PostMapping("/solve")
    public int[][] solve(@RequestBody int[][] board) {

        sudokuSolver.solve(board);

        return board;
    }
}