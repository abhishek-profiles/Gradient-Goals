const circle = document.querySelectorAll(".circle");
const innerInput = document.querySelectorAll(".inner-input");
const upperMessage = document.querySelector(".upper-message");
const errorLabel = document.querySelector(".error-label");
const progressValue = document.querySelector(".progress-value");
const heading = document.querySelector(".heading");
const footer = document.querySelector(".footer");

const theMessage = [
  "Start strong! Take the first step today!",
  "Nice job! First goal down, keep it up!",
  "Great! Two down, one more to go!",
  "You did it! All goals completed, you're on fire!",
];

const inputCharacter = JSON.parse(localStorage.getItem("inputCharacter")) || {
  first: { name: "", completed: false },
  second: { name: "", completed: false },
  third: { name: "", completed: false },
};
console.log(inputCharacter);

let completedInputs = Object.values(inputCharacter).filter(
  (input) => input.completed
).length;
progressValue.style.width = `${(completedInputs / innerInput.length) * 100}%`;
progressValue.firstElementChild.innerText = `${completedInputs}/${innerInput.length} Completed`;
upperMessage.innerText = theMessage[completedInputs];

circle.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const checkEmptyFields = [...innerInput].every((fields) => {
      return fields.value;
    });

    if (checkEmptyFields) {
      checkbox.parentElement.classList.toggle("completed");

      const inputId = checkbox.nextElementSibling.id;
      inputCharacter[inputId].completed = !inputCharacter[inputId].completed;
      completedInputs = Object.values(inputCharacter).filter(
        (input) => input.completed
      ).length;

      progressValue.style.width = `${
        (completedInputs / innerInput.length) * 100
      }%`;
      progressValue.firstElementChild.innerText = `${completedInputs}/${innerInput.length} Completed`;
      upperMessage.innerText = theMessage[completedInputs];

      localStorage.setItem("inputCharacter", JSON.stringify(inputCharacter));
    } else {
      errorLabel.parentElement.classList.add("show-error");
    }
  });
});

innerInput.forEach((input) => {
  input.value = inputCharacter[input.id].name;

  if (inputCharacter[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    errorLabel.parentElement.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (inputCharacter[input.id].completed) {
      input.value = inputCharacter[input.id].name;
      return;
    }
    inputCharacter[input.id] = {
      name: input.value,
      completed: false,
    };
    localStorage.setItem("inputCharacter", JSON.stringify(inputCharacter));
  });
});

// Select the button and body
const colorToggleBtn = document.getElementById("darkMode");
const body = document.body;

// Add event listener to toggle the "dark-mode" class
darkMode.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("dark-mode-toggle");
  upperMessage.classList.toggle("animated-text");
  heading.classList.toggle("color-white");

  footer.firstElementChild.classList.toggle("animated-text");
  localStorage.setItem("darkMode", isDarkMode);
});
