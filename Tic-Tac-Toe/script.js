const cells = document.querySelectorAll('.cell');
const title = document.querySelector('#title');
const xDisplay = document.querySelector('#x-play');
const oDisplay = document.querySelector('#o-play');
const restart = document.querySelector('#restart');

// Initialising variables
let player = 'X';
let isGamePause = false;
let isGameStart = false;

choosePlayer = (input) => {
    if(!isGameStart){
        player=input;
        if(player == 'X'){
            xDisplay.classList.add('player-active');
        }
        else {
            oDisplay.classList.add('player-active')
        }
    }
}

// Array to track state of each cell
const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '',
                    ]

// Array to win conditions
const winConditions = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6] // diagonals
]

// Event listner to each cell
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index));
})

tapCell = (cell, index) => {
    // Ensure cell is empty and game isn't pause
    if(cell.textContent == '' && !isGamePause){
        isGameStart = true;
        updateCell(cell, index);
        
        if(!checkWinner()){
            changePlayer();
            updatePlayerActive();
        }
    }
}

updateCell = (cell, index) => {
    cell.textContent = player;
    inputCells[index] = player;
    cell.style.color = (player == 'X' ? '#1892EA' : '#A737FF');
}

updatePlayerActive = () => {
    if(player=='X'){
        xDisplay.classList.add('player-active');
        oDisplay.classList.remove('player-active');
    }
    else{
        xDisplay.classList.remove('player-active');
        oDisplay.classList.add('player-active');
    }
}

changePlayer = () => {
    player = player == 'X' ? 'O' : 'X';
}

checkWinner = () => {
    for ( const[a, b, c] of winConditions) {
        
        if( inputCells[a] == player &&
            inputCells[b] == player &&
            inputCells[c] == player
        ){
            declareWinner([a,b,c]);
            return true;
        }
    }

    // Check for draw
    if(inputCells.every(cell => cell!='')){
        declareDraw();
        return true;
    }
}

declareWinner = (indices) => {
    title.textContent = `${player} Won`;
    isGamePause =true;

    indices.forEach((index) => {
        cells[index].style.background = '#2A2343';
    })
}

declareDraw = () => {
    title.textContent = 'Draw !';
    isGamePause = true;
}

restart.addEventListener('click', () => {
    inputCells.fill('');

    cells.forEach((cell) => {
        cell.textContent = '';
        cell.style.background = '';
    })
    isGamePause = false;
    isGameStart = false;
    title.textContent = 'Choose';
    xDisplay.classList.remove('player-active');
    oDisplay.classList.remove('player-active');
})