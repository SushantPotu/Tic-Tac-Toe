import React, {useState, useRef} from 'react'
import './TicTacToe.css' 
import O from '../images/circle.png'
import X from '../images/cross.png'

let board = [[' ',' ',' '], 
             [' ',' ',' '], 
             [' ',' ',' ']];

const TicTacToe = () => {

  let end = false;
  let [moveCount, setMoveCount] = useState(1);
  
// initializing the game board boxes and button
  let resetR = useRef(null);
  let boxes = [useRef(null), useRef(null),useRef(null), useRef(null),useRef(null), useRef(null),useRef(null), useRef(null),useRef(null)]
  let [box1, box2, box3, box4, box5, box6, box7, box8, box9] = boxes;
  
// Alternating between 'x' and 'o' between moves and checking game states
  const playerSwitch = (element, num) => {
    if (end || board[num[0]][num[1]] !== ' ') {
      return;
    }

    const isPlayerOne = moveCount % 2 === 0;
    const currentPlayer = isPlayerOne ? 'X' : 'O';
    const currentImage = isPlayerOne ? X : O;

    element.target.innerHTML = `<img src='${currentImage}'/>`;
    board[num[0]][num[1]] = currentPlayer;
    
    setMoveCount(moveCount + 1);
    
    console.log(`Player ${isPlayerOne ? '1' : '2'} moved`);
    console.log(moveCount + 1);
    checkWin();
  };
    
  
  const checkWin = () => {
      // Check rows
      for (let row of board) {
          if (row[0] !== ' ' && row.every(cell => cell === row[0])) {
              won(row[0]);
          }
      }
      // Check columns
      for (let col = 0; col < board.length; col++) {
          if (board[0][col] !== ' ' && 
              board.every(row => row[col] === board[0][col])) {
              won(board[0][col]);
          }
      }

      // Check diagonals
      if (board[0][0] !== ' ' && 
          board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
          won(board[1][1]);
      }
      if (board[0][2] !== ' ' && 
          board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
          won(board[1][1]);
      }
      // Check for tie
      else if (board.flat().every(cell => cell === 'X' || cell === 'O') && end === false) {
        tie();
      }
  }

  const reset = () => {
    resetR.current.innerHTML = 'Reset';
    board = [[' ',' ',' '], 
             [' ',' ',' '], 
             [' ',' ',' ']];
    boxes.map((element) => {
      element.current.innerHTML = " ";
    });
    setMoveCount(0);
  }

  const tie = () => {
    end = true;
    alert('It\'s a tie!');
    resetR.current.innerHTML = 'Play again!';
  }

  const won = (w) => {
      end = true;
      alert('Player '+ w +' wins!');
      resetR.current.innerHTML = 'Play again!';
  }

  return (
    <div className = 'container'>
        <h1 className='title'>Tic Tac Toe</h1>
        <div className='board'>
          <div className='row1'>
            <div className='boxes'ref={box1} onClick={(element)=>{playerSwitch(element,[0,0])}}></div>
            <div className='boxes'ref={box2} onClick={(element)=>{playerSwitch(element,[0,1])}}></div>
            <div className='boxes'ref={box3} onClick={(element)=>{playerSwitch(element,[0,2])}}></div>
          </div>
          <div className='row2'>
            <div className='boxes'ref={box4} onClick={(element)=>{playerSwitch(element,[1,0])}}></div>
            <div className='boxes'ref={box5} onClick={(element)=>{playerSwitch(element,[1,1])}}></div>
            <div className='boxes'ref={box6} onClick={(element)=>{playerSwitch(element,[1,2])}}></div>
          </div>
          <div className='row3'>
            <div className='boxes'ref={box7} onClick={(element)=>{playerSwitch(element,[2,0])}}></div>
            <div className='boxes'ref={box8} onClick={(element)=>{playerSwitch(element,[2,1])}}></div>
            <div className='boxes'ref={box9} onClick={(element)=>{playerSwitch(element,[2,2])}}></div>
          </div>
        </div>
        <button className='reset' ref={resetR} onClick={()=>{reset()}}>Reset</button>
    </div>
  )
}

export default TicTacToe;