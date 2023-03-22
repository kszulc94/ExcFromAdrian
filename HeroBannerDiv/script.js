/*
kszulc 21.03.2023
JS, HTML manipulation excercise
*/

window.onload = function (){
    start();
}

var mainDiv = document.querySelector(".hero-banner-container");

function start (){

    // Link buttons
    let startButtonElement = document.getElementById("startButton");
    let resetBtnElement = document.getElementById("resetButton");
    // Add Action(Event) listeners to buttons
    startButtonElement.addEventListener("click", loadDiv);
    resetBtnElement.addEventListener("click", resetMainDiv);

}

function loadDiv() {

    resetMainDiv(); //Applied optionally to reset/remove div list after button was pressed before and avoid duplicates and main div boundry cross (no overflow setting applied in css)

    //  mainDiv.classList.add("animated-in");  // 'classList.add' doesn't reset element's "class" attribute, just adds defined ones in the command to existing element's classes

    mainDiv.setAttribute("class", "hero-banner-container animated-in"); // 'setAttribute' resets/removes existing classes in element and applies defined ones in the command

    for(let i=0; i< 10; i++){
        let childDiv = document.createElement("div");
        childDiv.textContent = "Item " + (i+1);
        mainDiv.appendChild(childDiv);
        if(i==9){
            setTimeout(function () {
                mainDiv.classList.remove("animated-in");
                mainDiv.classList.add("animated-out");
                // mainDiv.setAttribute("class", "animated-out");
                
            }, 300)
            
        }
        
    }

}

function resetMainDiv() {
    
    if(mainDiv.classList.value !== "hero-banner-container"){  // Reset main div class only when reset button is pressed
        mainDiv.setAttribute("class", "hero-banner-container");
    }
        var lastElement = mainDiv.lastElementChild;     //Remove child divs section
        while(lastElement) {
        mainDiv.removeChild(lastElement);
        lastElement = mainDiv.lastElementChild;
    }

}

