import React, { useEffect, useState } from 'react'
import './App.css'
import CoverPage from './components/CoverPage'




function Square({ handelClick, value }) {
  return <button onClick={handelClick} >{value}</button>
}
// 0 1 2
// 3 4 5
// 6 7 8

const App = () => {

  const [showCover, setShowCover] = useState(true);
  const startGame = () => {
    setShowCover(false);
  };

  const [squares, setSquares] = useState(Array(9).fill(''));
  const [isXturn, setIsXturn] = useState(true);
  const [status, setStatus] = useState('');
  const [color, setColor] = useState(null)

  const handelSquareClick = (getCurrentIndex) => {

    if (squares[getCurrentIndex] || winnerFunc(squares)) return;
    console.log("clicked", getCurrentIndex)
    let copySquares = [...squares];
    copySquares[getCurrentIndex] = isXturn ? "X" : "O";
    setSquares(copySquares);
    setIsXturn(!isXturn)
  }
  const winnerFunc = (squares) => {
    const rowIndex = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < rowIndex.length; i++) {
      const [a, b, c] = rowIndex[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }

    }
    return null
  }
  console.log(squares);
  console.log(isXturn)

  useEffect(() => {
    if (!winnerFunc(squares) && squares.every(item => item !== '')) {
      setStatus(`Match Draw Please restart the Game`);
    }
    else if (winnerFunc(squares)) {
      const winner = winnerFunc(squares)
      setStatus(`Winner is ${winner} 😀`)
    }
    else {
      setStatus(`Next player is :${isXturn ? "X" : "O"}`)
    }
  }, [squares, isXturn])

  const handelRestart = () => {
    setSquares(Array(9).fill(''))
    setIsXturn(true)
  }
  return (
  <div className='DomBody'>
    {showCover ? (
      <CoverPage onStartGame={startGame} />
    ) : (
      <>
        <div className='section'>
          <div className='board-row'>
            <Square value={squares[0]} handelClick={() => handelSquareClick(0)} />
            <Square value={squares[1]} handelClick={() => handelSquareClick(1)} />
            <Square value={squares[2]} handelClick={() => handelSquareClick(2)} />
          </div>
          <div className='board-row'>
            <Square value={squares[3]} handelClick={() => handelSquareClick(3)} />
            <Square value={squares[4]} handelClick={() => handelSquareClick(4)} />
            <Square value={squares[5]} handelClick={() => handelSquareClick(5)} />
          </div>
          <div className='board-row'>
            <Square value={squares[6]} handelClick={() => handelSquareClick(6)} />
            <Square value={squares[7]} handelClick={() => handelSquareClick(7)} />
            <Square value={squares[8]} handelClick={() => handelSquareClick(8)} />
          </div>
        </div>
        <h3 style={{ textAlign: 'center', marginTop: '10px' }}>{status}</h3>
        <div className='spanButton' onClick={() => handelRestart()}>
          Restart
        </div>
      </>
    )}
  </div>
);
    }
     
  


export default App
