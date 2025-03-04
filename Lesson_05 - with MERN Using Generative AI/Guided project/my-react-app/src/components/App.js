import React, { useState } from 'react';
import '../styles/App.css';

const App = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    // Calculate winner function
    const calculateWinner = (squares) => {
        const winningLines = [
            [0, 1, 2], // top row
            [3, 4, 5], // middle row
            [6, 7, 8], // bottom row
            [0, 3, 6], // left column
            [1, 4, 7], // middle column
            [2, 5, 8], // right column
            [0, 4, 8], // diagonal
            [2, 4, 6]  // diagonal
        ];

        for (let line of winningLines) {
            const [a, b, c] = line;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    // Check if game is draw
    const isDraw = (squares) => {
        return squares.every(square => square !== null);
    };

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const renderSquare = (index) => (
        <button className="square" onClick={() => handleClick(index)}>
            {board[index]}
        </button>
    );

    const winner = calculateWinner(board);
    const gameIsDraw = isDraw(board);
    let status;

    if (winner) {
        status = `Winner: ${winner}`;
    } else if (gameIsDraw) {
        status = "Game is a Draw!";
    } else {
        status = `Next Player: ${isXNext ? 'X' : 'O'}`;
    }

    return (
        <div className="App">
            <h1 className="title">Tic Tac Toe</h1>
            <div className="status">
                <span className={winner ? (winner === 'X' ? 'x-player' : 'o-player') : (isXNext ? 'x-player' : 'o-player')}>
                    {status}
                </span>
            </div>
            <div className="board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <button className="reset-button" onClick={resetGame}>
                Reset Game
            </button>
        </div>
    );
};

export default App;