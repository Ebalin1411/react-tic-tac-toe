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
  newGrid: Array<string>;
  
}
// Board Class
class Board extends React.Component<{}, BoardState> {
      constructor(props:SquareProps) {
        super(props);
        this.state = {
          grid: Array(9).fill(null),
          xIsNext :true,
          newGrid :[]
        };
      }
  
      handleClick(i: number) {
        //console.log('Handle click in board for ', i);
        const newGrid = [...this.state.grid.slice()];   
          if(calculateWinner(newGrid) || newGrid[i]){ 
              return;
            }

        newGrid[i] = this.state.xIsNext ? 'X' :'O';     
        //console.log("status "+ this.state.xIsNext ) 
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

     let winner = calculateWinner(this.state.grid);
     let status; 
        
        if(winner){         
          status ='Winner: ' + winner;   
          console.log('game status if winner combi is there :' +status) 
            
        }else{                      
          status = 'Next player: ' +  (this.state.xIsNext ? 'X':'O');  
          console.log('game status :' +status)        
        }
    
        
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


function calculateWinner(newGrid:Array<string>){
    const lines= [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
        for(let i=0; i<lines.length; i++) {
            const [a, b, c] = lines[i];
              if(newGrid[a] && newGrid[a] === newGrid[b] && newGrid[a] === newGrid[c])
                {            
                    return newGrid[a];          
                }
        } return null;

   
}
