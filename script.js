'use strict';

const scoreDOM = document.querySelector('.score');
const message = document.querySelector('.message');

let score, secretNumber, highscore, between;
highscore = 0;

init();

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('#guess').value);

  if(!guess) {
    message.textContent = 'Brak numeru!';
  } else if (guess === secretNumber) {
    message.textContent = "Dobry strzał!";
    document.querySelector('body').style.backgroundColor = '#60B347';
    document.querySelector('.number').textContent = String(secretNumber);

    if(score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess > secretNumber) {
    if(score > 1) {
      message.textContent = 'Za wysoko!';
      decreaseScore();
    } else {
      gameOver();
    }
  } else if (guess < secretNumber) {
    if(score > 1) {
      message.textContent = 'Za nisko!';
      decreaseScore();
    } else {
      gameOver();
    }
  }
});

document.querySelector('.again').addEventListener('click', init);

function init() {
  score = 20;
  between = Number(document.getElementById('input').value);
  document.querySelector('.score').textContent = '20';
  secretNumber = Math.trunc(Math.random() * between) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('#guess').value = '';
  document.querySelector('.number').textContent = '?';
  message.textContent = 'Zacznij zgadywać...';
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