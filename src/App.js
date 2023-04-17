import React, { useState, useEffect } from 'react';
import './App.css'

function App() {
  //basic idea?
  //Could have an array of 9 elements which each has 9 elemnets
  // each could be a button
  //should turn the who array null after use
  // should highlight the winner?How to do it

  const [player, setPlayer] = useState('X');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);

  useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        setXWins(xWins + 1);
      } 
      if(winner === 'O') {
        setOWins(oWins + 1);
      }

      setTimeout(() => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setPlayer('X');
      }, 2000);
    }
  }, [winner]);

  const handleClick = (index) => {
    if (winner || board[index]) return;

    const updatedBox = [...board];
    updatedBox[index] = player;
    setBoard(updatedBox);

    const newWinner = calculateWinner(updatedBox);
    if (newWinner) {
      setWinner(newWinner);
    } else if (updatedBox.every((square) => square !== null)) {
      // Check for a draw
      setWinner('draw');
    } else {
      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const calculateWinner = (board) => {
    const allwinpos = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],
    ];

    for (let i = 0; i < allwinpos.length; i++) {
      const [winpos1, winpos2, winpos3] = allwinpos[i];
      if (board[winpos1] && board[winpos1] === board[winpos2] && board[winpos1] === board[winpos3]) {
        return board[winpos1];
      }
    }

    return null;
  };

  const Box = (index) => {
    return (
      <button className="sq" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  let status;
  if (winner === 'draw') {
    status = 'Match draw!(Automatic reload in 2 seconds)';
  } else if (winner) {
    status = `Winner: ${winner}` + `(Automatic reload in 2 seconds)`;
  } else {
    status = `Next player: ${player}`;
  }

  return (
    <div className='whole'>
      <h1>Tic-Tac-Toe</h1>
      <div className='container'>
      <div className="status">{status}</div>
      <div className="board">
        {Box(0)}
        {Box(1)}
        {Box(2)}
      </div>
      <div className="board">
        {Box(3)}
        {Box(4)}
        {Box(5)}
      </div>
      <div className="board">
        {Box(6)}
        {Box(7)}
        {Box(8)}
      </div>
      <div className="winner-counts">
        X Wins: {xWins} | O Wins: {oWins}
      </div>
      </div>
    </div>
  );
}

export default App