const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const restartGame = document.querySelector(".restart__game");

const characters = [
    "card01",
    "card02",
    "card03",
    "card04",
    "card05",
    "card06",
    "card07",
    "card08",
    "card09",
    "card10",
    "card11",
    "card12",
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

let firstCard = "";
let secondCard = "";

const checkEndGame = () => {
    const disableCards = document.querySelectorAll(".disable__card");

    if (disableCards.length === 24) {
        setTimeout(() => {
            clearInterval(this.loop);
            restart();
        }, 2000);
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        firstCard.firstChild.classList.add("disable__card");
        secondCard.firstChild.classList.add("disable__card");

        firstCard = "";
        secondCard = "";

        checkEndGame();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal__card");
            secondCard.classList.remove("reveal__card");

            firstCard = "";
            secondCard = "";
        }, 800);
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.className.includes("reveal__card")) {
        return;
    }

    if (firstCard === "") {
        target.parentNode.classList.add("reveal__card");
        firstCard = target.parentNode;
    } else if (secondCard === "") {
        target.parentNode.classList.add("reveal__card");
        secondCard = target.parentNode;

        checkCards();
    }
};

const createCard = (character) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url('../assets/images/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character);

    return card;
};

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

window.onload = () => {
    const playerName = localStorage.getItem("player");
    spanPlayer.innerHTML = playerName;
    startTimer();
    loadGame();
};
