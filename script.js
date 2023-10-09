const Gameboard = () => {
    //Create an array for board
    let board = ['', '', '', '', '', '', '', '', '']; //board where 'X' and 'O' goes

    const getBoard = () => [...board];

    const getMarker = (index, marker) => {
        if (board[index] === '') { //Check the board if blank
            board[index] = marker;
            return true; //Marker placed successfully
        }
        return false; //Grid is occupied
    };

    const resetBoard = () => {
        const resetBtn = document.querySelector('.reset');
        resetBtn.addEventListener('click', (e) => {
            for (let i = 0; i < board.length; i++) {
                const grid = document.querySelector(`[data-index="${i}"]`);
                board[i] = '';
                grid.textContent = board[i];
            }
        });
    };

    return { getBoard, getMarker, resetBoard };
};

//Factory Function for PLAYER
const Player = (name, marker) => {
    return { name, marker };
};

const Game = (() => {
    const board = Gameboard();
    let currentPlayer;
    let winner = null;
    let isGameOver = false;

    //Function expression to start the game and set the players
    const startGame = (player1, player2) => {
        currentPlayer = player1;
        board.resetBoard(); //Inherit resetBoard from Gameboard module
        isGameOver = false;
        winner = null; //isGameOver and winner is set to default in every start of the game
        render();
    };

    const getCurrentPlayer = () => currentPlayer; //getCurrentPlayer will be returned to swap players

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkForWinners = () => {

    };

    const makeMove = (index) => {
        if (!isGameOver) {
            if(board.getMarker(index, currentPlayer.marker)) { //Calls other functions to invoke to keep the game playing
                checkForWinners();
                switchPlayer();
                render();
            }
        }
    };

    const render = () => { //Updates the UI to reflect the current state of the game
        const boardArray = board.getBoard();

        //Checks every element in the board until the last index. If there are changes on an element (say, a player put X or O) then it gets printed in the grid
        for (let i = 0; i < boardArray.length; i++) {
            //Targets the data-index of the grid instead of the grids itself in order to keep track of the elements in the boardArray
            const grid = document.querySelector(`[data-index="${i}"]`);
            //PRINT the current index of boardArray as to website
            grid.textContent = boardArray[i];
        }
    };

    return { startGame, getCurrentPlayer, makeMove };
})();


const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

Game.startGame(player1, player2);

//For making a move when the grids are clicked
const tictacBoard = document.getElementById('gameboard');
tictacBoard.addEventListener('click', (e) => {
    const gridsIndex = e.target.dataset.index;
    if (gridsIndex) {
        Game.makeMove(parseInt(gridsIndex));
    }
});