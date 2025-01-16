// 'use strict';
// // Selecting elements
// const player0El = document.querySelector('.player--0');
// const player1El = document.querySelector('.player--1');
// const score0El = document.querySelector('#score--0');
// const score1El = document.getElementById('score--1'); // both work as same
// const diceEl = document.querySelector('.dice');
// const current0El = document.getElementById('current--0');
// const current1El = document.getElementById('current--1');
// const btnNew = document.querySelector('.btn--new');
// const btnRoll = document.querySelector('.btn--roll');
// const btnHold = document.querySelector('.btn--hold');

// // starting condition
// score0El.textContent = 0;
// score1El.textContent = 0;
// diceEl.classList.add('hidden');

// // current score
// let currentScore = 0;
// let activePlayer = 0;

// // Rolling dice functioanlity
// btnRoll.addEventListener('click', function () {
//   // 1. Generate a random dice roll
//   const dice = Math.trunc(Math.random() * 6) + 1;
//   console.log(dice);

//   // 2. Display dice
//   diceEl.classList.remove('hidden');
//   diceEl.src = `dice-${dice}.png`;

//   // 3. Check for Rolled 1
//   if (dice !== 1) {
//     //add dice to current score
//     currentScore += dice;
//     document.getElementById(`current--${activePlayer}`).textContent =
//       currentScore; // change later
//   } else {
//     // switch to new platyer
//     document.getElementById(`current--${activePlayer}`).textContent = 0;
//     currentScore = 0;
//     activePlayer = activePlayer === 0 ? 1 : 0;
//     player0El.classList.toggle('player--active');
//     player1El.classList.toggle('player--active');
//   }
// });

// btnHold.addEventListener('click', function () {
//   // 1. Add current score to  hold score

//   document.getElementById(`score--${activePlayer}`).textContent =
//     Number(document.getElementById(`score--${activePlayer}`).textContent) +
//     currentScore;
//   // 2. switch to next player if press hold
//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   currentScore = 0;
//   activePlayer = activePlayer === 0 ? 1 : 0;
//   player0El.classList.toggle('player--active');
//   player1El.classList.toggle('player--active');
//   //3. check if player score is = 100, if yes that player wins the game
//   if (
//     Number(document.getElementById(`score--${activePlayer}`).textContent) >= 100
//   ) {
//     btnRoll.disabled = true;
//     btnHold.disabled = true;
//   }

//   // 4. if player wins then disable the roll and hold button
//   if (
//     Number(document.getElementById(`score--${activePlayer}`).textContent) <= 100
//   ) {
//     btnRoll.disabled = true;
//     btnHold.disabled = true;
//   }
// });
// btnNew.addEventListener('click', function () {
//   // 1. Reset all the scores
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   current0El.textContent = 0;
//   current1El.textContent = 0;
//   currentScore = 0;
//   activePlayer = 0;

//   // 2. Reset the player
//   player0El.classList.remove('player--winner');
//   player1El.classList.remove('player--winner');
//   player0El.classList.add('player--active');
//   player1El.classList.remove('player--active');

//   // 3.enable the roll and hold button
//   btnRoll.disabled = false;
//   btnHold.disabled = false;
// });

// storing element
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceEl.classList.add('hidden');
};
init();
const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a number
    let dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Add score to currentPlayer
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      // currentScore = 0;
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // player0El.classList.toggle('player--active');
      // player1El.classList.toggle('player--active');
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add currentScore to Total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. If activePlayer Score <=100 player wins,else continue
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 2. Switch the Player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
