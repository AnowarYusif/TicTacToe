import React, { useState } from 'react';

function App() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /*----- app's state (variables) -----*/
  const [board, setBoard] = useState(Array(9).fill(''));
  const [gameOver, setGameOver] = useState(false);
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  function handleTurn(event) {
    let idx = event.target.id;

    if (!gameOver && board[idx] === '') {
      let newBoard = [...board];
      newBoard[idx] = turn;
      setBoard(newBoard);
      setTurn(turn === 'X' ? 'O' : 'X');

      const newWinner = getWinner(newBoard);

      if (newWinner || newBoard.every((val) => val !== '')) {
        setWinner(newWinner);
        setGameOver(true);
      }
    }
  }

  function getWinner(board) {
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    // Check for a tie
    if (board.every((val) => val !== '')) {
      return 'Tie';
    }

    return null;
  }

  function handleReset() {
    setBoard(Array(9).fill(''));
    setGameOver(false);
    setTurn('X');
    setWinner(null);
  }

  return (
    <div>
      <h1>Tic-React-Toe</h1>
      <h2>{gameOver ? (winner ? `${winner === 'Tie' ? "It's a tie!" : `${winner} wins the game!`}` : "") : `It's ${turn}'s turn!`}</h2>
      <div className="flex-container flex-column">
        <div className="flex-container flex-wrap" id="board" onClick={handleTurn}>
          {board.map((value, idx) => (
            <div key={idx} className="square" id={idx}>
              {value}
            </div>
          ))}
        </div>
        <button id="reset-button" onClick={handleReset}>
          reset
        </button>
      </div>
    </div>
  );
}

export default App;
