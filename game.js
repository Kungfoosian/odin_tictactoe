function Game(){
  let board = Board(clickHandler);
  let player1 = new Player('X');
  let player2 = new Player('O');
  let currentPlayer = player1;

  // console.log(board);
  
  const TURNS = 9;
  
  const announcement = document.getElementById('announcement');
  announcement.innerText = 'Current player: ' + currentPlayer.marker;

  function play(){
    board.display();
  }

  function clickHandler(event, player = currentPlayer){
    console.log('\ncurrent player: ' + player.marker);
    let squareId = event.target.id;
    console.log('square chosen: ' + squareId);
    board.registerChoice(squareId, player.marker);

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    console.log('current player switched, new current player: ' + currentPlayer.marker);
  }

  return { play };
}

function Player(marker){
  this.marker = marker;
}

function Board(cbClickHandler){
  const container = document.getElementById('board-container');

  let board = [Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square(), Square()];

  function display(){
    board.forEach((square, id) => {
      let newSquare = document.createElement('button');

      newSquare.id = id;

      newSquare.classList.add('squares');

      newSquare.addEventListener('click', cbClickHandler );

      container.appendChild(newSquare);
    })
  }

  function registerChoice(squareId, marker) {
    console.log(`square  chosen: ${squareId}, marker: ${marker}`);

    if (board[squareId].isFilled()) return;

    board[squareId].value = marker;
    document.getElementById(squareId).innerText = marker;
    console.log(board);
  }

  return {board, display, registerChoice};
}

function Square(){
  return { 
    value: undefined,
    isFilled() { return this.value !== undefined },
    update(newValue) { this.value = newValue },
  };
}

let game = Game();
game.play();