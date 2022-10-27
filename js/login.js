const input = document.querySelector(".input__login");
const button = document.querySelector(".btn__login");
const form = document.querySelector(".form__login");

const validateInput = ({ target }) => {
    if (target.value.length > 2) {
        button.removeAttribute("disabled");
        return;
    }
    button.setAttribute("disabled", "");
};

const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("player", input.value);
    window.location = "pages/game.html";
};

input.addEventListener("input", validateInput);
form.addEventListener("submit", handleSubmit);
