function Game(){
  let board = Board(clickHandler);
  let player1 = new Player('X');
  let player2 = new Player('O');
  let currentPlayer = player1;

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  // console.log(board);
  
  const TURNS = 9;
  
  const announcement = document.getElementById('announcement');
  announcement.innerText = 'Current player: ' + currentPlayer.marker;

  function play(){
    board.display();
  }

  function clickHandler(event, player = currentPlayer){
    let squareId = event.target.id;

    if(board.board[squareId].isFilled()) return;

    board.registerChoice(squareId, player);

    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  function winConditionMet(player){
    let choices = player.choices;
    
  }

  return { play };
}

function Player(marker){
  // this.marker = marker;
  return {
    marker: marker,
    choices: [],
  }
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

  function registerChoice(squareId, player) {
    board[squareId].value = player.marker;
    document.getElementById(squareId).innerText = player.marker;

    player.choices.push(squareId);
    // console.log(player);
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