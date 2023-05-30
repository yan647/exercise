import Square from "./Square";

function calculateWinner(squares: string[]): string | null {
  const rightLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < rightLines.length; i++) {
    const [a, b, c] = rightLines[i];
    if (squares[a] && squares[b] === squares[c] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;

}

export default function Board({
                                squares,
                                xIsNext,
                                handlePlay
                              }: { squares: string[], xIsNext: boolean, handlePlay: (squares: string[]) => void }
) {
  let columns = new Array(3).fill([]).map(() => new Array(3).fill(''));

  const handleSquareClick = (index: number) => {
    const nextSquare = squares.slice();
    if (nextSquare[index] || calculateWinner(squares)) {
      return;
    }
    nextSquare[index] = xIsNext ? 'X' : 'O';
    handlePlay(nextSquare)
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = `winner: ${winner}`;
  } else {
    status = `Next player:${xIsNext ? 'X' : 'O'}`
  }

  return (
    <>
      <div>{status}</div>
      {
        columns.map((column, colIndex) => {
          return (<div className="board-row" key={colIndex}>
            {column.map((row, rowIndex) => {
              let index = colIndex * 3 + rowIndex;
              return (<Square value={squares[index]} onSquareClick={() => handleSquareClick(index)}/>)
            })}
          </div>)
        })
      }
    </>
  );
}
