//Store every grid in an array inside of Gameboard object
const Gameboard = (() => {
    //Create an array for board
    let board = ['', '', '', '', '', '', '', '', '']; //board where 'X' and 'O' goes

    const getBoard = () => [...board];

    const getMarker = (index, marker) => {
        //IF the board's index is equivalent to blank,
        if (board[index] === '') { //Check the board if blank
            board[index] = marker;
            return true; //Marker placed successfully
        }
        return false; //Grid is occupied
    };

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    return { getBoard, getMarker, resetBoard };
})();

//Factory Function for PLAYER
const Player = (name) => {
    const getName = () => {
        return name;
    }
    return {getName};
}

const Game = (() => {
    let currentPlayer;
    let winner = null;
    let isGameOver = false;

    //Function expression to start the game and set the players
    const startGame = (player1, player2) => {
        currentPlayer = player1;
        Gameboard.resetBoard(); //Inherit resetBoard from Gameboard module
        isGameOver = false;
        winner = null; //isGameOver and winner is set to default in every start of the game
        // render() //Keep this function commented for a while since I still haven't thought of it
    };

    const getCurrentPlayer = () => currentPlayer; //getCurrentPlayer will be returned to swap players

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const checkForWinners = () => {

    };

    const makeMove = () => {
        if (!isGameOver) {
            if(Gameboard.getMarker(index, currentPlayer.marker)) { //Calls other functions to invoke to keep the game playing
                checkForWinners();
                switchPlayer();
                // render();
            }
        }
    };

    // const render = () => { //Updates the UI to reflect the current state of the game

    // };

    return { startGame, getCurrentPlayer, makeMove };
})();

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

Game.startGame(player1, player2);