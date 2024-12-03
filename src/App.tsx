import React,{ useState, useEffect } from 'react'
import './App.css'

function App() {
  const [playerTurn, setPlayerTurn] = useState<string>('X')
  const [winner, setWinner] = useState<string>('');

  const [iaTurn, setIaTurn] = useState<string>('O')

  const [Column, setColumn] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  const resetGame = () => {
    setPlayerTurn('X');
    setWinner('');
    setColumn([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  }


  const handleSquareClick = (indexCol: number, indexRow: number) => {
    if (winner != '') {
      return;
    }
    if (Column[indexCol][indexRow] == 0) {
      let newColumn = [...Column];
      newColumn[indexCol][indexRow] = playerTurn == 'X' ? 1 : 2;
      setColumn(newColumn);
      setPlayerTurn(playerTurn == 'X' ? 'O' : 'X');
    }
  }

  const checkWinner = () => {
    for (let i = 0; i < 3; i++) {
      if (checkRow(i)) {
        return Column[i][0];
      }
      if (checkColumn(i)) {
        return Column[0][i];
      }
    }
    if (checkDiagonal()) {
      return Column[0][0];
    }
    if (checkAntiDiagonal()) {
      return Column[0][2];
    }
    return 0;
  }

  const checkRow = (row: number) => {
    return Column[row][0] == Column[row][1] && Column[row][1] == Column[row][2] && Column[row][0] != 0;
  }

  const checkColumn = (col: number) => {
    return Column[0][col] == Column[1][col] && Column[1][col] == Column[2][col] && Column[0][col] != 0;
  }

  const checkDiagonal = () => {
    return Column[0][0] == Column[1][1] && Column[1][1] == Column[2][2] && Column[0][0] != 0;
  }

  const checkAntiDiagonal = () => {
    return Column[0][2] == Column[1][1] && Column[1][1] == Column[2][0] && Column[0][2] != 0;
  }

  useEffect(()=>{  
    const winner = checkWinner();
    if (winner != 0) {
      setWinner(`Player ${winner == 1 ? 'X' : 'O'} win!`);
    }
  },[Column])

  return (
    <>
      <div>
        <p className='title'>Tic Tac Toe Game</p>
      </div>
      <div className='buttonContainer'>
        <button className='buttonReset' onClick={resetGame}>
          Reset
        </button>
        <button className='buttonReset' onClick={()=>console.log("play vs ia")}>
          Play vs Ia
        </button>
      </div>
      <div className='playerTurn'>
        <p>
          {!winner ? `Player turn : ${playerTurn}` : winner}
        </p>
      </div>
      <div className='gameBoard'>
        {Column.map((row, indexCol) => (
          <div key={indexCol} className=''>
            {row.map((square, indexRow) => (
              <div key={indexRow} className='square' onClick={()=>handleSquareClick(indexCol,indexRow)}>
                {square == 0 ? '' : square == 1 ? 'X' : 'O'} 
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
