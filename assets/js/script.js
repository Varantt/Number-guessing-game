/**I want you to create a simple guess the number type game.
 It should choose a random number between 1 and 100, then challenge the player to guess the
  number in 10 turns. After each turn, the player should be told if they are right or wrong,
   and if they are wrong, whether the guess was too low or too high. It should also tell the
    player what numbers they previously guessed. The game will end once the player guesses correctly, 
    or once they run out of turns. When the game ends, the player should be given an option to start playing 
    again.

    **/
let resetBtn = document.querySelector(".reset-btn");
let guessedNumber = Math.floor(Math.random() * 100) + 1;
let previousGuesses = [];
let counter = 0;
let prompts = document.getElementById("previousGuesses");
let hint = document.getElementById("closeness");
let desc = document.getElementById("description");
let inputNumber = document.getElementById("guess");
let gameEnded = false;

inputNumber.addEventListener("change", (e) => e.target.focus());

const checkGameEnded = (counter) => {
  if (counter >= 10) {
    hint.textContent = "GAME OVER!!";
    gameEnded = true;
    resetBtn.classList.add("d-block");
    return;
  }
};

const handleReset = () => {
  counter = 0;
  previousGuesses = [];
  desc.classList.remove("d-block");
  hint.textContent = "";
  prompts.textContent = "";
  inputNumber.value = "";
  gameEnded = false;
  resetBtn.classList.remove('d-block');
};
resetBtn.addEventListener("click", handleReset);

const guessNumber = (e) => {
  e.preventDefault();
  if (gameEnded) {
    return;
  }

  console.log(inputNumber.value);
  console.log(e);
  let input = parseInt(document.querySelector("input").value);
  console.log(guessedNumber);
  //   checking 10 turns
  checkGameEnded(counter);

  counter++;
  previousGuesses.push(input);
  console.log(previousGuesses);

  desc.classList.add("d-block");
  // If user guesses
  if (input === guessedNumber) {
    hint.textContent = "CORRECT!";
    hint.classList.add("true");
    hint.classList.remove("false");
    resetBtn.classList.add("d-block");
    gameEnded = true;

    return;
  } else if (input > guessedNumber) {
    // if too high
    hint.textContent = "too high";
    hint.classList.add("false");
    prompts.textContent = `Previous guesses:  ${previousGuesses.join(", ")}`;
  } else if (input < guessedNumber) {
    // if too low
    hint.textContent = "too low";
    hint.classList.add("false");
    prompts.textContent = `Previous guesses:  ${previousGuesses.join(", ")}`;
  }

  inputNumber.value = "";

  checkGameEnded(counter);
};

let submitBtn = document.querySelector('button[type="submit"]');
submitBtn.addEventListener("click", guessNumber);
