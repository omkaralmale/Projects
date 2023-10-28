const display = document.getElementById("display");

function addToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function deleteDisplay() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    display.value = eval(display.value);
  } catch (error) {
    display.value = "Error";
  }
}

// Attach event listeners to the buttons
const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const buttonValue = this.innerText;
    body.innerHTML = buttonValue;
    if (buttonValue === "=") {
      calculateResult();
    } else if (buttonValue === "C") {
      clearDisplay();
    } else {
      addToDisplay(buttonValue);
    }
  });
});
