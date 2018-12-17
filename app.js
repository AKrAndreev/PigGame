/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var playersScore;
var roundScore;
var currentPlayer;
var isGameFinished;
var prevNum;
var prevNum2;

var finalScore;

init();

document.querySelector('.btn-roll').addEventListener('click',function () {

  if (!isGameFinished){

      if (finalScore >0){
          //1. Get random number
          var dice =  Math.floor(Math.random()*6)+1;
          var dice1 =  Math.floor(Math.random()*6)+1;
          //2. Display result
          var diceDOM = document.querySelector('.dice');
          var diceDOM2 = document.querySelector('.dice1');
          diceDOM.style.display='block';
          diceDOM.src = 'dice-' + dice + '.png';
          diceDOM2.style.display='block';
          diceDOM2.src = 'dice-' + dice1 + '.png';
          //3. update score if not 0
          if(dice !== 1 && dice1 !== 1){

              if (prevNum === 6 && dice === 6 || prevNum2 === 6 && dice1 === 6){
                  playersScore[currentPlayer] = 0;
                  document.querySelector('#score-' + currentPlayer).textContent = playersScore[currentPlayer];
                  prevNum = -1;
                  prevNum2 = -1;
                  nextPlayer();
              }

              prevNum = dice;
              prevNum2 = dice1;
              roundScore+=(dice+dice1);
              document.querySelector('#current-' + currentPlayer).textContent=roundScore;

          }else {
              nextPlayer();
          }
      }else {
          alert("Please, enter final score!")
      }

  }
});

document.querySelector('.btn-hold').addEventListener('click',function () {
    if (!isGameFinished){
        //1. Add current score to global
        playersScore[currentPlayer] += roundScore;
        //2. update UI
        document.querySelector('#score-' + currentPlayer).textContent = playersScore[currentPlayer];
        //3. check if player win
        if (playersScore[currentPlayer]>=finalScore){
            document.querySelector('#name-' + currentPlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice1').style.display = 'none';
            document.querySelector('.player-'+currentPlayer + '-panel').classList.add('winner');
            document.querySelector('.player-'+currentPlayer + '-panel').classList.remove('active');
            isGameFinished=true;
        }else {
            nextPlayer();
        }
    }
});


document.querySelector('.btn-new').addEventListener('click',init);


document.getElementById("score-button").addEventListener('click',function () {
    if (!isGameFinished){
        finalScore =document.getElementById("new-final-value").value;
        document.getElementById("new-final-value").value="";
        init();
    }

});

function init() {
    //finalScore=100;
     prevNum = -1;
    prevNum2=-1;
     playersScore =[0,0];
     roundScore = 0;
     currentPlayer = 0;
    isGameFinished = false;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

}