'use strict';

const scoreDOM = document.querySelector('.score');
const message = document.querySelector('.message');

let score, secretNumber, highscore;
highscore = 0;

init();

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if(!guess) {
    message.textContent = 'No number!';
  } else if (guess === secretNumber) {
    message.textContent = "That's right!";
    document.querySelector('body').style.backgroundColor = '#60B347';
    document.querySelector('.number').textContent = String(secretNumber);

    if(score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess > secretNumber) {
    if(score > 1) {
      message.textContent = 'Too high!';
      decreaseScore();
    } else {
      gameOver();
    }
  } else if (guess < secretNumber) {
    if(score > 1) {
      message.textContent = 'Too low!';
      decreaseScore();
    } else {
      gameOver();
    }
  }
});

document.querySelector('.again').addEventListener('click', init);

function init() {
  score = 20;
  document.querySelector('.score').textContent = '20';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.guess').value = '';
  document.querySelector('.number').textContent = '?';
  message.textContent = 'Start guessing...';
}

function decreaseScore() {
  if(score > 0) {
    score--;
    scoreDOM.textContent = String(score);
  }
}

function gameOver() {
  message.textContent = 'You lost the game :(';
  decreaseScore();
}