/*
kszulc 21.03.2023
JS, HTML manipulation excercise
*/

window.onload = function () {
  start();
};

const itemNb = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var mainDiv = document.querySelector(".hero-banner-container");
var stateBlocked = false;

function start() {
  // Link buttons
  let startButtonElement = document.getElementById("startButton");
  let resetBtnElement = document.getElementById("resetButton");
  // Add Action(Event) listeners to buttons
  startButtonElement.addEventListener("click", loadDiv);
  resetBtnElement.addEventListener("click", resetMainDiv);
}

function loadDiv() {
  if (!stateBlocked) {
    resetMainDiv(); //Applied optionally to reset/remove div list after button was pressed before and avoid duplicates and main div boundry cross (no overflow setting applied in css)
    stateBlocked = true;
    mainDiv.setAttribute("class", "hero-banner-container animated-in"); // 'setAttribute' (unlike classList.add) resets/removes existing classes in element and applies defined ones in the command

    itemNb.forEach((number) => {
      let childDiv = document.createElement("div");
      childDiv.textContent = "Item " + number;
      mainDiv.appendChild(childDiv);

      if (number == itemNb[itemNb.length - 1]) {
        transitionsHandler();
      }
    });
  }
}

function transitionsHandler() {
  let transitionEl = document.querySelector(".animated-in");
  transitionEl.addEventListener("transitionend", function (e) {
    //First transition handler -> animated-in
    mainDiv.classList.add("animated-out");
    stateBlocked = true; //Keep state blocked to avoid Start button reaction during transition time
    transitionEl.addEventListener("transitionend", function (e) {
      //Second transition handler -> animated-out
      if (e.target.matches(".animated-out")) {
        stateBlocked = false; // Unblock state to allow entire loadDiv function to be run again
        return;
      }
    });
    return; //Returns added just in case - 'transitionend' inspects all transitions and can run multiple commands, need to find more efficient solution
  });
}

function resetMainDiv() {
  if (mainDiv.classList.value !== "hero-banner-container") {
    // Reset main div class only when reset button is pressed
    mainDiv.setAttribute("class", "hero-banner-container");
  }
  var lastElement = mainDiv.lastElementChild; //Remove child divs section
  while (lastElement) {
    mainDiv.removeChild(lastElement);
    lastElement = mainDiv.lastElementChild;
  }
}
