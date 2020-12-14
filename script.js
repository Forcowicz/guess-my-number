'use strict';

const scoreDOM = document.querySelector('.score');
const message = document.querySelector('.message');

let score, secretNumber, highscore, between, gameOver, input;
highscore = 0;
input = document.getElementById('input');

init();

document.querySelector('.check').addEventListener('click', () => {
  if(!gameOver) {
    const guess = Number(document.querySelector('#guess').value);

    if (!guess) {
      message.textContent = 'Brak numeru!';
    } else if (guess === secretNumber) {
      message.textContent = "Dobry strzał!";
      document.querySelector('body').style.backgroundColor = '#60B347';
      document.querySelector('.number').textContent = String(secretNumber);
      gameOver = true;

      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    } else if (guess > secretNumber) {
      if (score > 1) {
        message.textContent = 'Za wysoko!';
        decreaseScore();
      } else {
        endGame();
      }
    } else if (guess < secretNumber) {
      if (score > 1) {
        message.textContent = 'Za nisko!';
        decreaseScore();
      } else {
        endGame();
      }
    }
  }
});

document.querySelector('.again').addEventListener('click', init);

input.addEventListener('focusout', () => {
  if(Number(input.value) < 1 || Number(input.value) > 100000 && input.value) {
    alert('Liczba musi być w zakresie pomiędzy 1 a 100000!');
    input.value = '20';
    input.focus();
  }
});

function init() {
  score = 20;
  between = Number(input.value);
  document.querySelector('.score').textContent = '20';
  secretNumber = Math.trunc(Math.random() * between) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('#guess').value = '';
  document.querySelector('.number').textContent = '?';
  message.textContent = 'Zacznij zgadywać...';
  document.querySelector('.between').textContent = `1 - ${between}`;
  gameOver = false;
}

function decreaseScore() {
  if(score > 0) {
    score--;
    scoreDOM.textContent = String(score);
  }
}

function endGame() {
  message.textContent = 'You lost the game :(';
  gameOver = true;
  decreaseScore();
}