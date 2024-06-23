// variables
let inputPlace = document.querySelectorAll(".check-place");
let winner = document.querySelector(".winner");
let showCrossTurn = document.querySelector(".cross-turn");
let showCircleTurn = document.querySelector(".circle-turn");
let placeError = document.querySelector(".place-error");
let winnerShow = document.querySelector(".winner-show");

let crossTurn = true;
let circleTurn = false;
let turn = 0;

// win condition or patterns
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

// checks if the place is empty
function checkPlace(item) {
  return item.classList.contains("checked");
}

// changes turns
function turnRoller() {
  [crossTurn, circleTurn] = [circleTurn, crossTurn];
  if (circleTurn) {
    showCrossTurn.classList.replace("block", "hidden");
    showCircleTurn.classList.replace("hidden", "block");
  } else {
    showCrossTurn.classList.replace("hidden", "block");
    showCircleTurn.classList.replace("block", "hidden");
  }
}

// checks where the players marker was placed
function checker(index, subindex, turn_mark) {
  return inputPlace[winCondition[index][subindex]].classList.contains(
    `${turn_mark}`,
  );
}

// checks if the player won the game
function winChecker(turn_mark) {
  for (i = 0; i < winCondition.length; i++) {
    if (
      checker(i, 0, turn_mark) &
      checker(i, 1, turn_mark) &
      checker(i, 2, turn_mark)
    ) {
      winner.textContent = turn_mark;
      winnerShow.classList.replace("hidden", "block");
      turn = 0;
      break;
    }
  }
}

// inputting the mark
inputPlace.forEach((item) => {
  item.addEventListener("click", () => {
    // if the place is unchecked
    if (!checkPlace(item)) {
      // Mark of which player's turn that is
      let turn_mark = crossTurn ? "cross" : "circle";

      item.classList.add("checked", `${turn_mark}`);
      item.firstElementChild.src = `./src/image/${turn_mark}.png`;
      turn += 0.5;
      
      // One can't win before 3 moves
      if (turn >= 2.5) {
        winChecker(turn_mark);
      }
      if (turn === 4.5) {
        winnerShow.innerHTML = "This game is draw";
        winnerShow.classList.replace("hidden", "block");
      }
      placeError.classList.replace("block", "hidden");
      turnRoller();
    } else {
      placeError.classList.replace("hidden", "block");
    }
  });
});
