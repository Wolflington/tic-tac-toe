//For making a move when the grids are clicked
const chooseMove = (() => {

    function playMove() {
        const tictacBoard = document.getElementById('gameboard');
        tictacBoard.addEventListener('click', (e) => {
            const gridsIndex = e.target.dataset.index;
            if (gridsIndex) {
                Game.makeMove(parseInt(gridsIndex));
            }
        });
    }

    return { playMove };
})();
chooseMove.playMove();


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
            Game.switchPlayer();
            Game.startGame(player1, player2);
            chooseMove.playMove();
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
    const winCombination = [
        [0, 1, 2],  // 1st row horizontal
        [3, 4, 5],  // 2nd row horizontal
        [6, 7, 8],  // 3rd row horizontal

        [0, 3, 6],  // 1st column vertical
        [1, 4, 7],  // 2nd column vertical
        [2, 5, 8],  // 3rd column vertical

        [0, 4, 8],  // diagonal from left
        [2, 4, 6],  // diagonal from right 
    ];


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
        const boardArray = board.getBoard();

        for (const winCondition of winCombination) {
            const [a, b, c] = winCondition; //sets the winCondition identical to winCombination

            //Checks if there is three consecutive markers and if the first combination is not blank
            if (boardArray[a] !== '' && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) { 
                //Set the winner to currentPlayer
                winner = currentPlayer;
                //isGameOver becomes true, ending the game
                isGameOver = true;
                alert(`Winner is ${currentPlayer.name}!`)
                return;
            }
        }

        //Check for a tie once the board is full and there is no three consecutive marks
        //IF boardArray DOES NOT include blank element
        if (!boardArray.includes('')) {
            isGameOver = true;
            alert(`It's a tie!`);
        }
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

        //Checks every element in the board until the last index. If there are changes on an element when a player puts a marker then it gets pushed wherever index/grid it was clicked
        for (let i = 0; i < boardArray.length; i++) {
            //Targets the data-index of the grid instead of the grids itself in order to keep track of the elements in the boardArray
            const grid = document.querySelector(`[data-index="${i}"]`);
            //PRINT the current index of boardArray as to website
            grid.textContent = boardArray[i];
        }
    };


    return { startGame, getCurrentPlayer, makeMove, switchPlayer };
})();



const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

Game.startGame(player1, player2);