'use strict';

const scoreDOM = document.querySelector('.score');

let score, secretNumber, highscore, between, gameOver, input, fullScore;
highscore = 0; fullScore = 0;
input = document.getElementById('input');

const displayMessage = message => {
  document.querySelector('.message').textContent = message;
};

init();

document.querySelector('.check').addEventListener('click', () => {
  if(!gameOver) {
    const guess = Number(document.querySelector('#guess').value);

    if (!guess) {
      displayMessage('Brak numeru!');
    } else if (guess === secretNumber) {
      displayMessage('Dobry strzał!');
      document.querySelector('body').style.backgroundColor = '#60B347';
      document.querySelector('.number').textContent = String(secretNumber);
      gameOver = true;
      fullScore += score;
      document.querySelector('.fullScore').textContent = fullScore;

      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
    } else if(guess !== secretNumber) {
      if (score > 1) {
        displayMessage(guess > secretNumber ? 'Za wysoko!' : 'Za nisko!');
        if(score > 0) {
          score--;
          scoreDOM.textContent = String(score);
        }
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

document.addEventListener('keyup', function(event) {
  if(event.code === 'Enter') {
    document.querySelector('.check').click()
  } else if(event.code === 'KeyR') {
    document.querySelector('.again').click();
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
  displayMessage('Zacznij zgadywać...');
  document.querySelector('.between').textContent = `1 - ${between}`;
  gameOver = false;
}

function endGame() {
  displayMessage('You lost the game :(');
  document.querySelector('body').style.backgroundColor = '#ff6060';
  gameOver = true;
  if(score > 0) {
    score--;
    scoreDOM.textContent = String(score);
  }
}