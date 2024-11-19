import logo from './logo.svg';
import './App.css';
import { useState } from 'react'



function Square({ value, onSquareClick }) {

  return (

    <button className="square" onClick={onSquareClick}>
      {value}
    </button>

  );

}

//function for creating the board component

//the game takes three props xIsNext, squares and onPlay

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i) {

    if (calculateWinner(squares) || squares[i]) {

      return

    }

    const nextSquares = squares.slice()

    if (xIsNext) {

      nextSquares[i] = 'X'

    } else {

      nextSquares[i] = 'O'
    }

    onPlay(nextSquares)

  }

  const winner = calculateWinner(squares)

  let status

  if (winner) {

    status = 'Winner:' + winner

  } else {

    status = 'Next player:' + (xIsNext ? 'X' : 'O')

  }

  return (

    <>

      <div className="status">{status}</div>

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>


    </>
  )

}

// this is the top level component
export default function Game(){

  //history state contains the history of the entire game

  const [history, setHistory] = useState([Array(9).fill(null)])

  //using state to track which player is next

  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  //this function is called by the board component to update the game


  function handlePlay(nextSquares){

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)

  }

  function jumpTo(nextMove){

    setCurrentMove(nextMove)

  }

  const moves = history.map((squares, move) => {

    let description

    if(move > 0){

      description ='Go to move #' + move

    } else {

      description = 'Go to game Start'

    }

    return (

      <li key = {move}>
         
         <button onClick = {() => jumpTo(move)}>{description}</button>

      </li>
    )
  })

  return (

    <div className="game">

      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );

}


function calculateWinner(squares){

  const lines = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

  ]

  for (let i = 0; i < lines.length; i++){

    const[a,b,c] = lines[i]

    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){

      return squares[a]
    }
  }

  return null

}
