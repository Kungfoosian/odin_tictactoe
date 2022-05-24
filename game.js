function Game(){
  let board = Board(clickHandler);
  let player1 = new Player('X');
  let player2 = new Player('O');
  let currentPlayer = player1;
  
  const TURNS = 9;
  
  const announcement = document.getElementById('announcement');
  announcement.innerText = 'Current player: ' + currentPlayer.marker;
  
  function play(){
    board.display();
  }

  function clickHandler(event, player = currentPlayer){
    let squareId = event.target.id;

    board.registerChoice(squareId, player.marker);

    currentPlayer = player1 ? player2 : player1;
    console.log(currentPlayer);
  }

  return { play };
}

function Player(marker){
  this.marker = marker;
}

function Board(cbClickHandler){
  const container = document.getElementById('board-container');

  let board = new Array(9);
  board.fill(Square());

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
    if (board[squareId].isFilled()) return;

    board[squareId].value = marker;
    document.getElementById(squareId).innerText = marker;
  }

  return {board, display, registerChoice};
}

function Square(){
  let square = { value: undefined };

  function isFilled() {
    return square.value !== undefined;
  }

  function update(newValue) {
    square.value = newValue;
  }

  return { square, isFilled, update };
}

let game = Game();
game.play();