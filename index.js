const cardsArray = [
  {
    name: "cheeseburger",
    img: "assets/images/cheeseburger.png",
  },
  {
    name: "fries",
    img: "assets/images/fries.png",
  },
  {
    name: "hotdog",
    img: "assets/images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "assets/images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "assets/images/milkshake.png",
  },
  {
    name: "pizza",
    img: "assets/images/pizza.png",
  },
  {
    name: "cheeseburger",
    img: "assets/images/cheeseburger.png",
  },
  {
    name: "fries",
    img: "assets/images/fries.png",
  },
  {
    name: "hotdog",
    img: "assets/images/hotdog.png",
  },
  {
    name: "ice-cream",
    img: "assets/images/ice-cream.png",
  },
  {
    name: "milkshake",
    img: "assets/images/milkshake.png",
  },
  {
    name: "pizza",
    img: "assets/images/pizza.png",
  },
];
cardsArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector("#grid");
const scoreDisplay = document.querySelector("#score");
const gridContainer = document.querySelector(".wrapper");
const winGameSound = new Audio("assets/audio/win.wav");
const matchedCardsSound = new Audio("assets/audio/matched_cards.mp3");
const unmatchedCardsSound = new Audio("assets/audio/unmatched_cards.mp3");
let cardsChosen = [];
let cardsChosenIds = [];
const scores = [];
function cardBoard() {
  for (let i = 0; i < cardsArray.length; i++) {
    let card = document.createElement("img");
    card.setAttribute("src", "assets/images/blank.png");
    card.setAttribute("data-id", i);
    card.setAttribute("draggable", false); // * DISABLE IMAGE DRAGGING
    gridDisplay.appendChild(card);
    card.addEventListener("click", flipCard);

    console.log(card);
  }
}
cardBoard();
function newGame() {
  const newGameButton = document.createElement("button");
  newGameButton.textContent = "Play again";
  newGameButton.classList.add("play-again-btn");
  gridContainer.appendChild(newGameButton);
  newGameButton.addEventListener("click", () => {
    window.location.reload(); // * RELOADS THE BROWSER TO INITIALIZE A NEW GAME
  });
}
function checkMatch() {
  const cards = document.querySelectorAll("#grid img");
  console.log("Check a match");
  console.log(cards);
  //* Potential problem: User clicks on same card twice
  if (cardsChosenIds[0] !== cardsChosenIds[1]) {
    if (cardsChosen[0] === cardsChosen[1]) {
      console.log(cards[cardsChosenIds[0]]);
      console.log(cards[cardsChosenIds[1]]);
      cards[cardsChosenIds[0]].classList.add("visibility");
      cards[cardsChosenIds[1]].classList.add("visibility");
      console.log("Match found");
      matchedCardsSound.currentTime = 0; // * ALLOW REPEATED PLAYBACK
      matchedCardsSound.play();
      scores.push(cardsChosen[0] && cardsChosen[1]);
      scoreDisplay.textContent = scores;
    }
  }
  cards[cardsChosenIds[0]].setAttribute("src", "assets/images/blank.png");
  cards[cardsChosenIds[1]].setAttribute("src", "assets/images/blank.png");
  unmatchedCardsSound.currentTime = 0;
  unmatchedCardsSound.play();
  cardsChosen = [];
  cardsChosenIds = [];
  if (scores.length === cardsArray.length / 2) {
    winGameSound.currentTime = 0;
    setTimeout(winGameSound.play(), 1000);
    gridDisplay.setAttribute("style", "animation:none;"); // * STOP GRID ANIMATION AFTER GAME OVER
    setTimeout(newGame(), 500); // * SHOW BUTTON AFTER 500 MS
  }
}

function flipCard() {
  // ? what happens when flipping a card
  console.log(`When flipping card this is ${this}`);
  let cardId = this.getAttribute("data-id"); // * GET DATA ID ON CURRENT CLICKED ELEMENT
  cardsChosenIds.push(cardId);
  cardsChosen.push(cardsArray[cardId].name);

  this.setAttribute("src", cardsArray[cardId].img); // * CHANGE FROM BLANK TO $IMAGE
  setTimeout(() => {
    this.setAttribute("src", "assets/images/blank.png"); // * RESET FLIPPED CARD TO BLANK AFTER NOT CLICKING ANOTHER CARD
  }, 5000);
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(`cardId is ${cardId}`);
  console.log(`cardsChosenId is ${cardsChosenIds}`);
  console.log(`cardsChosen is ${cardsChosen}`);
}
