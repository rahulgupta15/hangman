/*----- constants -----*/
const words = [
  "AUTOGRAT","BITTERS","BLEND","BOOMERANG","BROKEN","CHASER","CHILL","COOLER","DOUBLE","FLAME","FLOAT","FROST","GARNISH","HIGHBALL","JIGGER","MIXER","PONY","PINT","RIM","ROCKS","SHAKEN","SHOOTER","SHOT","SOUR","SPILL","STIR","TWIST","VIRGIN",
];

const maxGuess = 6;

/*----- app's state (variables) -----*/
let secretWord;
let wordInProgress;
let usedLetters;
let wrongLetters;

/*----- cached element references -----*/
const guessEl = document.getElementById("guess");
const letterButtons = document.querySelectorAll(".alpha");
const messageEl = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const gallowsEl = document.getElementById('gallows');

/*----- event listeners -----*/
document.getElementById('letters')
  .addEventListener('click', letterClick);

/*----- functions -----*/
function gameOver() {
  if ((secretWord === wordInProgress) || (wrongLetters.length === maxGuess)){
    return true
  } else {
    return false
  }
}

function letterClick(evt) {
  let letter = evt.target.textContent;
  
  if (
    evt.target.tagName !== 'BUTTON' ||
    usedLetters.includes(letter) ||
    gameOver()
  ) return;

  usedLetters.push(letter);
  if (secretWord.includes(letter)) {
    let newwordInProgress = '';
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord.charAt(i) === letter) {
        newwordInProgress += letter 
      }else {
        newwordInProgress += wordInProgress.charAt(i)
      }
    }
    wordInProgress = newwordInProgress;
  } else {
    wrongLetters.push(letter);
  }
  render();
  console.log("incoming letter is" + letter)
  console.log("the used letters are " + usedLetters)
  console.log("the secret word is " + secretWord)
  console.log("the incoreect guesses are " + wrongLetters)
  console.log("max # of wrong guesses is " + maxGuess)  
  console.log("word progess so far is " + wordInProgress)
  console.log("number of wrong guesses currently " + wrongLetters.length)

}
init();

function init() {
  let renderIndex = Math.floor(Math.random() * words.length);
  secretWord = words[renderIndex];
  wordInProgress = "_".repeat(secretWord.length);
  usedLetters=[];
  wrongLetters=[]
  render();
}

function render() {
  guessEl.textContent = wordInProgress;
  letterButtons.forEach(function(button) {
    let letter = button.textContent;
    if (wrongLetters.includes(letter)) {
      button.className = "wrong";
    } else if (usedLetters.includes(letter)) {
      button.className = "correct";
    } else {
      button.className = "";
    }
  })
  gallowsEl.style.backgroundPositionX = `${-75 * wrongLetters.length}px`;
  renderMessage();
}

function renderMessage() {
  if (secretWord === wordInProgress) {
    messageEl.textContent = "Yeehaw! Drinks on us tonight!";
  } else if (wrongLetters.length === maxGuess) {
    messageEl.textContent = "Bruh, your getting plastered!";
  } else {
    messageEl.textContent = "Orders in!"
  }
};