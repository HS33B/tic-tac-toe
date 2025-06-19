(function(){
    const row1 = document.querySelector('.row1');
    const row2 = document.querySelector('.row2');
    const row3 = document.querySelector('.row3');

    function startGame() {
        for (let i=0; i<3; i++) {
            let divs = document.createElement('div');
            divs.classList.add(`box`);
            divs.setAttribute('data-index', i);
            row1.appendChild(divs);
        }
        for (let i=3; i<6; i++) {
            let divs = document.createElement('div');
            divs.classList.add('box');
            divs.setAttribute('data-index', i);
            row2.appendChild(divs);
        }
        for (let i=6; i<9; i++) {
            let divs = document.createElement('div');
            divs.classList.add('box');
            divs.setAttribute('data-index', i);
            row3.appendChild(divs);
        }
    }
    startGame();
})();

const board = (function () {

    let array = ['', '', '', '', '', '', '', '', ''];

    const arrayMarker = (index, mark) => {
        if (array[index] == ''){
            array[index] = mark;
            gameCheck();
            return (array[index]);
        }
    }
    const arrayReset = () => {
        const boxes= document.querySelectorAll('.box');
        boxes.forEach(box => {box.innerHTML = ''})
        return array = ['', '', '', '', '', '', '', '', ''];
    }

    const gameCheck = () => {
        let winner = null;
    if( (array[0] == 'X' && array[1] == 'X' && array[2] == 'X') ||
        (array[3] == 'X' && array[4] == 'X' && array[5] == 'X') ||
        (array[6] == 'X' && array[7] == 'X' && array[8] == 'X') ||
        (array[0] == 'X' && array[3] == 'X' && array[6] == 'X') ||
        (array[0] == 'X' && array[4] == 'X' && array[8] == 'X') ||
        (array[1] == 'X' && array[4] == 'X' && array[7] == 'X') ||
        (array[2] == 'X' && array[4] == 'X' && array[6] == 'X') ||
        (array[2] == 'X' && array[5] == 'X' && array[8] == 'X')
        )
        {
        winner = 'X';
    }

    else if((array[0] == 'O' && array[1] == 'O' && array[2] == 'O') ||
            (array[3] == 'O' && array[4] == 'O' && array[5] == 'O') ||
            (array[6] == 'O' && array[7] == 'O' && array[8] == 'O') ||
            (array[0] == 'O' && array[3] == 'O' && array[6] == 'O') ||
            (array[0] == 'O' && array[4] == 'O' && array[8] == 'O') ||
            (array[1] == 'O' && array[4] == 'O' && array[7] == 'O') ||
            (array[2] == 'O' && array[4] == 'O' && array[6] == 'O') ||
            (array[2] == 'O' && array[5] == 'O' && array[8] == 'O')
        )
        {
        winner = 'O'
    }

    else if(array.every(item => item !== ''))
    {
        winner = 'Draw';
    }
    if(winner) {
        setTimeout(() => {
            if (winner === 'Draw') alert("DRAW!");
            else alert(`${winner} WON!`);
            board.arrayReset();
            playerController.resetPlayer();
        }, 100);
    }
    }

    return{
        arrayMarker,
        arrayReset
    };

})();

function createPlayer(mark) {
        return {mark};
}
const playerController = (function(){
    const playerX = createPlayer('X');
    const playerO = createPlayer('O');
    let currentPlayer = playerX;

    const switchPlayer = () => {
        if(currentPlayer == playerX) {
            currentPlayer = playerO;
        }
        else{
            currentPlayer = playerX;
        }
    }
    const getCurrentPlayer = () => {
        return currentPlayer;
    }
    const resetPlayer = () => {
        currentPlayer = playerX;
    }
    return{
        switchPlayer,
        getCurrentPlayer,
        resetPlayer
    }
})();

const gameFlow = (function() {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach(box => {
        box.addEventListener('click', () => {
                if (box.innerHTML === '') {
                let val = Number(box.getAttribute('data-index'));
                board.arrayMarker(val, playerController.getCurrentPlayer().mark);
                box.innerHTML = playerController.getCurrentPlayer().mark;
                playerController.switchPlayer();
            }
        })
    })
})();