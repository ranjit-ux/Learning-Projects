import React from 'react';
import './TicTacToe.css'
import O_image from '../Images/O_image.png';
import X_image from '../Images/X_image.png';
const TicTacToe = ()=>{
    return(
        <div className="container">
            <h1 className="title">Tic Tac Toe Game with <span>React</span></h1>

            <div className="board">

            </div>
            <button className="reset">Reset</button>
        </div>
    )
}

export default TicTacToe;