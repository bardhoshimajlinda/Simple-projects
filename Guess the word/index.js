// GUESS THE WORD
import wordList from './wordList.js';

document.addEventListener('DOMContentLoaded', () => {
  let currentWord;
  let currentHint;
  let remainingGuesses;
  const guessedLetters = [];
  let wordInProgress;

  const wordDisplay = document.querySelector('.word-in-progress');
  const remainingDisplay = document.querySelector('.remaining span');
  const guessedLettersDisplay = document.querySelector('.guessed-letters');
  const messageDisplay = document.querySelector('.message');
  const playAgainButton = document.querySelector('.play-again');
  const hintDisplay = document.querySelector('.hint-text');

  startNewGame();
  updateDisplay(); // Call updateDisplay() initially to show underscores

  document.querySelector('.guess-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const input = document.getElementById('letter');
    const guess = input.value.toLowerCase();

    if (guess && /^[a-z]$/.test(guess)) {
      if (guessedLetters.includes(guess)) {
        showMessage('You already guessed that letter. Try again!');
      } else if (currentWord.includes(guess)) {
        updateWordInProgress(guess);
        if (wordInProgress === currentWord) {
          endGame(true);
        }
      } else {
        remainingGuesses--;
        guessedLetters.push(guess);
        if (remainingGuesses === 0) {
          endGame(false);
        }
      }

      input.value = '';
      updateDisplay();
    } else {
      showMessage('Please enter a valid single letter.');
    }
  });

  playAgainButton.addEventListener('click', () => {
    startNewGame();
    updateDisplay();
  });

  function startNewGame() {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    currentWord = wordList[randomIndex].word.toLowerCase();
    currentHint = wordList[randomIndex].hint;
    remainingGuesses = 8;
    guessedLetters.length = 0;
    wordInProgress = '_'.repeat(currentWord.length);
    hintDisplay.textContent = `${currentHint}`;
    showMessage('');
    playAgainButton.classList.add('hide');
    document.querySelector('.guess-form').classList.remove('hide');
    wordDisplay.classList.remove('win');
  }

  function updateWordInProgress(guess) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === guess) {
        wordInProgress = wordInProgress.substring(0, i) + guess + wordInProgress.substring(i + 1);
      }
    }
  }

  function updateDisplay() {
    wordDisplay.textContent = wordInProgress.split('').join(' ');
    remainingDisplay.textContent = remainingGuesses;
    guessedLettersDisplay.innerHTML = guessedLetters.map(letter => `<li>${letter}</li>`).join('');
  }

  function showMessage(text) {
    messageDisplay.textContent = text;
  }

 function endGame(isWinner) {
  if (isWinner) {
    showMessage('Congratulations! You guessed the word. You win!');
    wordDisplay.classList.add('win');
  } else {
    showMessage(`You did not find the word. The word was "${currentWord}". Try another word!`);
  }

  hintDisplay.textContent = ''; 
  playAgainButton.classList.remove('hide');
  document.querySelector('.guess-form').classList.add('hide');
}
});