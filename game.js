function Game(){
  let board = Board(clickHandler);
  let player1 = new Player('X');
  let player2 = new Player('O');
  let currentPlayer = player1;
  let winConditionMet = false;

  const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  function play(){
    board.display();
  }

  const announcement = document.getElementById('announcement');
  announcement.innerText = 'Current player: ' + currentPlayer.marker;
  
  function clickHandler(event, player = currentPlayer){
    if(winConditionMet) return;

    let squareId = event.target.id;
    
    if(board.board[squareId].isFilled()) return;
    
    board.registerChoice(squareId, player);

    if (player.choices.length >= 3 && checkForWin(player)) {
      announcement.innerText = 'Winner: ' + currentPlayer.marker;

      console.log('winner: ' + player.marker);
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;

      announcement.innerText = 'Current player: ' + currentPlayer.marker;
    }
    
  }

  function checkForWin(player){
    let choices = player.choices;

    for(let i = 0; i < WIN_PATTERNS.length; i++){
      let pattern = WIN_PATTERNS[i];

      if (pattern.every(element => choices.includes(element))) {
        winConditionMet = true;
        return true;
      }
    }

    return false;
  }

  return { play };
}

function Player(marker){
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

    player.choices.push(Number.parseInt(squareId));
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