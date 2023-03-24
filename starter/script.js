'use strict';

//      * Selecting Elements*
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

//      *Starting Conditions*

let AllScore, currentScore, score, playing, activePlayer;
const init = function () {
   currentScore = 0;
   activePlayer = 0;
   score = [0, 0];
   playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

let switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6 + 1);
    playing = true;
    //    *Display dice*
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //    *Check fr rolled 1: if true*
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // * change later
    }
    //    *switch to next player*
    else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .getElementById(`player--${activePlayer}`)
        .classList.toggle('player--winner');
      document
        .getElementById(`player--${activePlayer}`)
        .classList.toggle('player--active');
    } else {
      //  *switch to the next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
