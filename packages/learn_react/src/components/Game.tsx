import Board from "./Board";
import {useState} from 'react';

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)] as string[][]);
  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: string[]) {
    setXIsNext(!xIsNext);
    setHistory([...history, nextSquares]);
  }

  function jumpTo(index: number) {
    setHistory(history.slice(0,index+1));

    const lastSquares=history[history.length - 1];
    setXIsNext(lastSquares[lastSquares.length-1] === 'X');
  }

  const moves = history.map((sequence, index) => {
    let description = ''
    if (index === 0) {
      description = 'Go to game start';
    } else {
      description = `Go to move #${index}`;
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    )
  });


  return (
    <div>
      <div>
        <Board squares={currentSquares} xIsNext={xIsNext} handlePlay={handlePlay}/>
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
