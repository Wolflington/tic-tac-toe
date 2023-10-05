//Store every grid in an array inside of Gameboard object
const gameboard = (() => {
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

//Object for PLAYER
const player = (name, marker) => {
    const getName = () => {
        return name;
    }

    const getMarker = () => {
        return marker;
    }

    return {getName, getMarker};
}