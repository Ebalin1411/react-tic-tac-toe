import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


//Functional Component for Square
interface SquareProps {
  value: string;
  onClick: Function;
  
}
 


const Square = (props: SquareProps) => ( 
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
   
);

 



// Code For Board

interface BoardState {
  grid: Array<string>;
  xIsNext :boolean
}
// Board Class
class Board extends React.Component<{}, BoardState> {
  constructor(props:SquareProps) {
    super(props);
    this.state = {
      grid: Array(9).fill(null),
      xIsNext :true
    };
  }

  handleClick(index: number) {
    console.log('Handle click in board for ', index);

    const newGrid = [...this.state.grid];     
    newGrid[index] = this.state.xIsNext ? 'X' :'O';
    
    console.log(newGrid)
    this.setState({

      grid: newGrid,
      xIsNext:!this.state.xIsNext,

    });
  }

  renderSquare(i: number) {
    return (
      <Square value={this.state.grid[i]} onClick={() => this.handleClick(i)} />
    );
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X':'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root') as any);
root.render(<Game />);

