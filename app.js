/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. If you roll 2 six in a row You loose your complete score After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach winning Points points on GLOBAL score wins the game

*/

var activePlayer, playerNumber, dice, hasWon, isSix, winningScore;

var player0 = {
    globalScore: 0,
    currentScore: 0,
    currentScorePrev: 0,
    curr: document.querySelector('#current-0'),
    globl: document.querySelector('#score-0')
}

var player1 = {
    globalScore: 0,
    currentScore: 0,
    currentScorePrev: 0,
    curr: document.querySelector('#current-1'),
    globl: document.querySelector('#score-1')
}

////////////////Functions///////////////////
var updateInfo = function () {

    activePlayer.currentScorePrev = 0;
    activePlayer.globalScore += activePlayer.currentScore;
    activePlayer.globl.textContent = activePlayer.globalScore;
    activePlayer.currentScore = 0;

}

var rollDie = function () {

    // var dice = Math.random()*6;
    // dice = Math.round(dice);
    // if(dice){
    //     return dice;
    // }else{
    //     dice = rollDie()
    // }
    // return dice;

    dice = Math.floor(Math.random() * 6) + 1;
    dice == 6 ? isSix = true : isSix = false;
    if (isSix && activePlayer.currentScorePrev == 6) {
        doubleSix();
    } else {
        if (!hasWon) {
            if (dice == 1) {

                document.querySelector('.dice').style.display = 'none';
                activePlayer.currentScore = 0;
                player0.curr.textContent = player1.curr.textContent = 0;
                playerNumber = 1 - playerNumber;
                if (playerNumber)
                    activePlayer = player1;
                else
                    activePlayer = player0;

                document.querySelector('.player-0-panel').classList.toggle('active');
                document.querySelector('.player-1-panel').classList.toggle('active');

            } else {
                document.querySelector('.dice').style.display = 'block';
                document.querySelector('.dice').src = 'dice-' + dice + '.png';
                activePlayer.currentScore += dice;
                activePlayer.curr.textContent = activePlayer.currentScore;
                activePlayer.currentScorePrev = dice;
            }
        }
    }
}

var start = function () {

    winningScore = prompt('Enter Winning Score') || 100;
    alert(`${winningScore} is the Winning score`);
    document.querySelector('.dice').style.display = 'none';
    player0.curr.textContent = player0.globl.textContent = player1.globl.textContent = player1.curr.textContent = 0;
    player0.currentScore = player0.globalScore = player1.currentScore = player1.globalScore = 0;
    playerNumber = 0;
    activePlayer = player0;
    hasWon = false;
    isSix = false;
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}

var newGame = function () {

    if (hasWon) {
        winningScore = prompt('Enter Winning Score') || 100;
        alert(`${winningScore} is the Winning score`);
        document.querySelector('.player-' + playerNumber + '-panel').classList.toggle('winner');
        document.querySelector('#name-' + playerNumber).textContent = 'PLAYER ' + (playerNumber + 1);
        document.querySelector('.dice').style.display = 'none';
        player0.curr.textContent = player0.globl.textContent = player1.globl.textContent = player1.curr.textContent = 0;
        player0.currentScore = player0.globalScore = player1.currentScore = player1.globalScore = 0;
        playerNumber = 0;
        activePlayer = player0;
        hasWon = false;
        isSix = false;
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');

    } else {
        start();
    }

}

var changePlayer = function () {
    updateInfo();
    if (!hasWon) {

        if (activePlayer.globalScore < winningScore) {

            player0.curr.textContent = player1.curr.textContent = 0;
            playerNumber = 1 - playerNumber;
            if (playerNumber)
                activePlayer = player1;
            else
                activePlayer = player0;
            document.querySelector('.player-0-panel').classList.toggle('active');
            document.querySelector('.player-1-panel').classList.toggle('active');
            document.querySelector('.dice').style.display = 'none';

        } else {

            document.querySelector('.player-' + playerNumber + '-panel').classList.toggle('winner');
            document.querySelector('#name-' + playerNumber).textContent = 'WINNER!!!';
            hasWon = true;
            document.querySelector('#current-' + playerNumber).textContent = 0;

        }

    }
}

var doubleSix = function () {
    activePlayer.currentScore = 0;
    activePlayer.globalScore = 0;
    activePlayer.curr.textContent = 0;
    activePlayer.globl.textContent = 0;
    alert('OOPS!!! You Were Hit by a DOUBLE SIX.')
    changePlayer();
}

start();
document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-hold').addEventListener('click', changePlayer);
document.querySelector('.btn-roll').addEventListener('click', rollDie);

