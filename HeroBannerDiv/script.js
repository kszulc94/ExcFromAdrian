/*
kszulc 21.03.2023
JS, HTML manipulation excercise
*/

// Init values and variables
const wait = (msec) => new Promise((resolve, _noRejectParam) => {
    setTimeout(resolve, msec);
  });
const itemDelay = 500; // Delay time (in ms) between items adding
var animatedOutDur = ""; //Stores transition duration from css for animted-out class - value taken when class loaded to div
var abort = ""; //Flag for reset button to abort async function - without it items keep adding until all are added, even after the reset is pressed
var mainDiv = document.querySelector(".hero-banner-container");
var stateUnblocked = true;

window.onload = function () {
  start();
};

function start() {
  // Link buttons
  let startButtonElement = document.getElementById("startButton");
  let resetBtnElement = document.getElementById("resetButton");
  // Add Action(Event) listeners to buttons
  startButtonElement.addEventListener("click", loadDiv);
  resetBtnElement.addEventListener("click", resetMainDiv);
}

function loadDiv() {
  if (!stateUnblocked) {
    return;
  }
  resetMainDiv(); //Applied optionally to reset/remove div list after button was pressed before and avoid duplicates and main div boundry cross (no overflow setting applied in css)
  mainDiv.setAttribute("class", "hero-banner-container animated-in"); // 'setAttribute' (unlike classList.add) resets/removes existing classes in element and applies defined ones in the command
  mainDivHandler();
}

async function mainDivHandler() {
  abort = false;
  stateUnblocked = false;
  for (let i = 0; i < 10; i++) {
    if (abort) {
      //Checks if loop needs to be aborted - applicable when Reset button is pressed
      return;
    }
    let childDiv = document.createElement("div");
    childDiv.textContent = "Item " + (i + 1);
    mainDiv.appendChild(childDiv);
    await wait(itemDelay); //Delay between item adding
    if (i == 9) {
      mainDiv.classList.add("animated-out");
      animatedOutDur = getTransitionDurationFromCSS(
        document.querySelector(".animated-out")
      );
      await wait(animatedOutDur); //Wait for transition/animation to finish in order to unblock state
      stateUnblocked = true;
    }
  }
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
    abort = true; //Set abort flag to true - aborts loop in loadDiv function
    stateUnblocked = true; //Unblocks the flag after reset
  }
}

function getTransitionDurationFromCSS(element) {
  return parseFloat(this.getComputedStyle(element).transitionDuration) * 1000;
}
