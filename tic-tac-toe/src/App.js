import { useState } from "react";
/*
 * The first line defines a function called Square. The export JavaScript keyword makes this function accessible outside of this file. The default keyword tells other files using your code that it’s the main function in your file.

NEXT STEPS

For the current move only, show “You are at move #…” instead of a button.
COMPLETED

Rewrite Board to use two loops to make the squares instead of hardcoding them.
COMPLETED

Add a toggle button that lets you sort the moves in either ascending or descending order.

When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).

Display the location for each move in the format (row, col) in the move history list.

*/

export default function Game() {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), move: 0 },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove].squares;
  const xIsNext = currentMove % 2 === 0;
  const [isReversed, setIsReversed] = useState(false);

  function handlePlay(nextSquares) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      {
        squares: nextSquares,
        move: currentMove + 1,
      },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  let orderedHistory = isReversed ? [...history].reverse() : history;

  const moves = orderedHistory.map((entry) => {
    const description =
      entry.move === currentMove
        ? `You are at move #${entry.move}`
        : entry.move > 0
          ? `Go to move #${entry.move}`
          : "Go to game start";

    return (
      <li key={entry.move}>
        {entry.move === currentMove ? (
          <p>{description}</p>
        ) : (
          <button onClick={() => jumpTo(entry.move)}>{description}</button>
        )}
      </li>
    );
  });

  function flipMoveOrder() {
    setIsReversed(!isReversed);
  }

  return (
    <>
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="flip-move-order">
        <button onClick={flipMoveOrder}>Flip Move Order</button>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //the following code uses two loops to create the rows and then the columns/squares within the rows.
  return (
    <>
      <div className="status">{status}</div>
      {Array.from({ length: 3 }).map((_, i) => {
        const rowSquares = Array.from({ length: 3 }).map((_, j) => {
          let properIndex = i * 3 + j;
          return (
            <Square
              key={properIndex}
              value={squares[properIndex]}
              onSquareClick={() => handleClick(properIndex)}
            />
          );
        });

        return (
          <div key={i} className="board-row">
            {rowSquares}
          </div>
        );
      })}
    </>
  );
}

/*
 * Old board hardcode
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
*/
function Square({ value, onSquareClick }) {
  //    function handleClick() {
  //        setValue("X")
  //    }

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
