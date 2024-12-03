import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentPlayerSymbol, setCurrentPlayerSymbol] = useState<string>("X");
  const [winner, setWinner] = useState<string>("");

  const [aISymbol, setAISymbol] = useState<string>("");

  const [Column, setColumn] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const resetGame = () => {
    setCurrentPlayerSymbol("X");
    setWinner("");
    setColumn([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  };

  const setAI = () => {
    let tampAISymbol = Math.floor(Math.random() * (1 + 1)) ;
    let indexCol = Math.floor(Math.random() * (2 + 1)) ;
    let indexRow = Math.floor(Math.random() * (2 + 1)) ;
    setAISymbol(tampAISymbol == 0 ? "X" : "O");
    if (tampAISymbol == 0) {
      let newColumn = [...Column];
      newColumn[indexCol][indexRow] = 1;
      setColumn(newColumn);
      setCurrentPlayerSymbol("O");
    }
  };

  const handleSquareClick = (indexCol: number, indexRow: number) => {
    if (winner != "") {
      return;
    }
    if (Column[indexCol][indexRow] == 0) {
      let newColumn = [...Column];
      newColumn[indexCol][indexRow] = currentPlayerSymbol == "X" ? 1 : 2;
      setColumn(newColumn);
      setCurrentPlayerSymbol(currentPlayerSymbol == "X" ? "O" : "X");
    }
  };

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
  };

  const checkDraw = () => {
    let isZeroInside = []

    for(let i = 0; i<Column.length;i++){
      for(let j = 0; j<Column.length;j++){
        if(Column[i][j]== 0){
          isZeroInside.push(0);
        }
      }
    }


    return isZeroInside.length == 0 ? 1 : 0;
  }

  const checkRow = (row: number) => {
    return (
      Column[row][0] == Column[row][1] &&
      Column[row][1] == Column[row][2] &&
      Column[row][0] != 0
    );
  };

  const checkColumn = (col: number) => {
    return (
      Column[0][col] == Column[1][col] &&
      Column[1][col] == Column[2][col] &&
      Column[0][col] != 0
    );
  };

  const checkDiagonal = () => {
    return (
      Column[0][0] == Column[1][1] &&
      Column[1][1] == Column[2][2] &&
      Column[0][0] != 0
    );
  };

  const checkAntiDiagonal = () => {
    return (
      Column[0][2] == Column[1][1] &&
      Column[1][1] == Column[2][0] &&
      Column[0][2] != 0
    );
  };

  

  useEffect(() => {
    const winner = checkWinner();
    const draw = checkDraw();
    if (winner != 0) {
      setWinner(`Player ${winner == 1 ? "X" : "O"} win!`);
    }
    if(draw==1){
      setWinner(`It's a Draw!`);
    }
  }, [Column]);


  useEffect(() => {
    const winner = checkWinner();

    if (aISymbol == currentPlayerSymbol && winner == 0) {
      let newColumn = [...Column];

      let possibleSquares = [];

      for (let i = 0; i < newColumn.length; i++) {
        for (let j = 0; j < newColumn.length; j++) {
          if (newColumn[i][j] == 0) {
             possibleSquares.push([i,j])
          }
        }
      }
    let aiSquareChoice = Math.floor(Math.random() * (possibleSquares.length));
  
    newColumn[possibleSquares[aiSquareChoice][0]][possibleSquares[aiSquareChoice][1]] = aISymbol == 'X' ?  1 : 2;

    setColumn(newColumn);
    setCurrentPlayerSymbol(currentPlayerSymbol == "X" ? "O" : "X");

    }
  }, [currentPlayerSymbol]);

  return (
    <>
      <div>
        <p className="title">Tic Tac Toe Game</p>
      </div>
      <div className="buttonContainer">
        <button className="buttonReset" onClick={resetGame}>
          Reset
        </button>
        <button className="buttonReset" onClick={setAI}>
          Play vs Ia
        </button>
      </div>
      <div className="currentPlayerSymbol">
        <p>{!winner ? `Player turn : ${currentPlayerSymbol}` : winner}</p>
        <p>{aISymbol && "Ia is playing : " + aISymbol}</p>
      </div>
      <div className="gameBoard">
        {Column.map((row, indexCol) => (
          <div key={indexCol} className="">
            {row.map((square, indexRow) => (
              <div
                key={indexRow}
                className="square"
                onClick={() => handleSquareClick(indexCol, indexRow)}
              >
                {square == 0 ? "" : square == 1 ? "X" : "O"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
