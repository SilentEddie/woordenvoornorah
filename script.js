const synth = window.speechSynthesis

let currentWord = ""
let gameStarted = false;
let lastInput = ""
let numberOfTriesForThisWord = 0;
let inputPossible = false;

start()

function start() {
  setListereners()
}

function setListereners() {
  const inputField = document.getElementById("input-field")
  inputField.addEventListener("click", focusInputField);
  inputField.addEventListener("blur", () => {document.getElementById("input-field").focus()});
  inputField.addEventListener("input", copyToCopyField);
  window.addEventListener("keydown", (event) => {
    if ((event.key === "Enter")) {
      handleEnterKey(event)
    }
    const blockedKeys = [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Control", "Alt", "Shift", "CapsLock", "Tab", "Meta", "Escape", "Home", "End"]
    if (blockedKeys.includes(event.key)) {
      event.preventDefault()
      console.log(document.getElementById("input-field").selectionStart)
    }
  }, true);
    
}

function focusInputField() {
  if (gameStarted) return;
  startGame()
}

function copyToCopyField() {
  const inputField = document.getElementById("input-field")
  const copyField = document.getElementById("copy")
  copyField.innerText = inputField.value;
}

function handleEnterKey(event) {
  if ((event.key === "Enter")) {;
    
    event.preventDefault();
    processInput()
  }  
}

function lockInput() {
  inputPossible = false;
  document.getElementById("input-field").disadbles = true;
}

function startGame() {
  if (gameStarted) return;
  gameStarted = true;
  makeWordsAppear()
  startInputField()
  chooseWords()
  sayHalloForTimeOfDay()
  talk("Welkom bij het spel....Woorden voor Nora!")
  startBorderAnimation()
  playNextWord()
}

function makeWordsAppear() {
  removeClassHiddenForElement("woorden", 1420);
  removeClassHiddenForElement("voor", 1800);
  removeClassHiddenForElement("norah", 2200);
}

function startInputField() {
  setTimeout(function() {
    document.getElementById("anti-select-overlay").classList.add("blocking")
  }, 10);
  setTimeout(function() {
    document.getElementById("click-here").innerText = "";
    document.getElementById("copy").classList.add("active")
  }, 1000);
}

function startBorderAnimation() {
  document.getElementById("game-board-border").classList.add("active")
}

function removeClassHiddenForElement(elementId, time) {
  setTimeout(function() {
    document.getElementById(elementId).classList.remove("hidden")
  }, time);
}

function playNextWord() {
  if (gameWords.length < 1) {
    endGame()
    return;
  }
  currentWord = gameWords.pop()
  if (!currentWord) endGame()
  askToWriteCurrentWord()
}

function askToWriteCurrentWord() {
  if(!currentWord) return;
  let sentence = "Hoe schrijf je het woord , , , " + currentWord + "?"
  talk(sentence)
}

function clearScreenAndPlayNextWord() {
  setTimeout(function() {
    clearScreen()
    playNextWord()
  }, 2000);
}

function clearScreen() {
  document.getElementById("input-field").value = "";
  lastInput = ""
  copyToCopyField()
}

function processInput() {
  let input = document.getElementById('input-field')
  if (input.value === "") return;
  if (input.value.toLowerCase() ===  currentWord.toLowerCase()) wordWasWrittenCorrectly()
  else if (numberOfTriesForThisWord < 2) wordWasNotWrittenCorrectlyTryAgain()
  else wordWasNotWrittenCorrectlySkipWord()
}

function endGame() {
  setTimeout(function() {
    talk("Het spel is afgelopen. Tot de volgende keer!")
    sayGoodbyeForTimeOfDay();    
  }, 1000);

  setTimeout(function() {
    gameStarted = false;
    document.getElementById("click-here").innerText = "opnieuw";
    document.getElementById("input-field").value = "";
    document.getElementById("input-field").blur();
  }, 4000);
}

function wordWasWrittenCorrectly() {
  sayRandomVersionOfGoodJob()
  clearScreenAndPlayNextWord()
  numberOfTriesForThisWord = 0;
}

function wordWasNotWrittenCorrectlyTryAgain() {
  sayRandomVersionOfBadJob()
  talk("Probeer het nog een keer")
  clearScreen()
  numberOfTriesForThisWord++
  askToWriteCurrentWord()
}

function wordWasNotWrittenCorrectlySkipWord() {
  sayRandomVersionOfBadJob()
  talk("Laten we het woord overslaan")
  numberOfTriesForThisWord = 0;
  clearScreenAndPlayNextWord()
}

function giveHintAboutFirstLetter() {
  talk("Het eerste letter is een " + currentWord[0])
}



