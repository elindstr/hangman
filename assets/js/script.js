// global variables
let currentWord
let correctLetters = []
let incorrectLetters = []
let statsGames = 0
let statsWins = 0
let statsLosses = 0

// on load, update stats
document.addEventListener("DOMContentLoaded", () => {
    updateStats()    
})

function resetCorrectLettersDisplay (){
    const figureContainer = document.getElementById("correctLetters")
    figureContainer.innerHTML = ""
    document.getElementById("incorrectLetters").innerHTML = ""

    for (let i = 0; i < currentWord.length; i++) {
        letterInput = document.createElement("span")
        letterInput.textContent = "__"
        letterInput.setAttribute("class", "input-letters");
        letterInput.setAttribute("id", `input_${i}`);
        figureContainer.appendChild(letterInput)
    }
}

function keyCheck (userInput) {
    console.log(userInput)
    
    // virtual keyboard
    let keyboardKeySpan = document.getElementById(userInput)

    // userInput is in the currentWord and not already guessed
    if ( (currentWord.includes(userInput)) && ((correctLetters.includes(userInput) == false))) {
        correctLetters.push(userInput)
        //console.log("correct letter: " + userInput)

        //add to correctLetters figure
        for (let i = 0; i < currentWord.length; i++) {
            if (userInput === currentWord[i]) {
                let letterInput = document.getElementById(`input_${i}`)
                letterInput.textContent = userInput
            }
        }

        // green correct letters
        keyboardKeySpan.style.backgroundColor = "green"

        //check for win
        isWin = true
        for (let i = 0; i < currentWord.length; i++) {
            if (correctLetters.includes(currentWord[i]) == false) {
                isWin = false
            }
        }
        if (isWin == true) {
            //console.log("win")
            endGame("win")
        }
    }

    else if ( (currentWord.includes(userInput) == false) && (userInput.match(/^[A-Z]$/)) && (incorrectLetters.includes(userInput) == false)) {
    // userInput is not in the currentWord, is a letter, and is not already guessed 

        incorrectLetters.push(userInput)
        incorrectLetters = incorrectLetters.sort()
        //console.log("incorrect letter: " + userInput)

        //add to incorrectLetters figure
        let incorrectLettersDisplay = document.getElementById("incorrectLetters")
        incorrectLettersDisplay.innerHTML = ""
        for (let i = 0; i < incorrectLetters.length; i++) {
            letterInput = document.createElement("span")
            letterInput.textContent = incorrectLetters[i]
            letterInput.setAttribute("class", "input-incorrect-letters");
            incorrectLettersDisplay.appendChild(letterInput)
        }

        // blacken incorrect letters
        keyboardKeySpan.style.backgroundColor = "rgb(63, 63, 63)"

        //draw hangman
        drawHangman(incorrectLetters.length)

        //check for loss
        if (incorrectLetters.length == 7) {
            //console.log("loss")
            endGame("lose")     
        }

    }
}

function drawHangman(incorrectLettersLength) {
    let hangmanFigure = document.getElementById("hangmanFigure")
    let output = ""
    if (incorrectLettersLength >= 7) {
        output = "O <br> / | \\ <br> | <br> /\\"
    }
    else if (incorrectLettersLength === 6) {
        output = "O <br> / | \\ <br> | <br> /"
    }
    else if (incorrectLettersLength === 5) {
        output = "O <br> / | \\ <br> |"
    }
    else if (incorrectLettersLength === 4) {
        output = "O <br> / | \\"
    }
    else if (incorrectLettersLength === 3) {
        output = "O <br> / |"
    }
    else if (incorrectLettersLength === 2) {
        output = "O <br> |"
    }
    else if (incorrectLettersLength === 1) {
        output = "O"
    }

    hangmanFigure.innerHTML = output
}

// Start
let startButton = document.getElementById("startButton")
startButton.addEventListener("click", () => {

    // pull random word from bank and create input list
    let randomInt = Math.floor(Math.random() * (words.length -1));
    currentWord = words[randomInt].toUpperCase()
    resetCorrectLettersDisplay()

    // reset variables, displays, listeners, figures, timer
    correctLetters = []
    incorrectLetters = []
    document.getElementById("incorrectLetters").innerHTML = ""
    drawHangman(0)
    startTimer()

    //reset keyboard
    for (let r = 0 ; r < keyboardRows.length; r++) {
        for (let i = 0; i < keyboardRows[r].length; i++) {
            let span = document.querySelector(`#${keyboardRows[r][i]}`)
            span.style.backgroundColor = "darkgrey"
        }
    }

    //add event listeners
    document.addEventListener("keydown", handleKey)
    keyboardDiv.addEventListener("click", handleClick) 
})

function handleKey (event) {
    userInput = event.key.toUpperCase()
    keyCheck(userInput)
}
function handleClick(event) {
    userInput = event.target.id
    userInput? keyCheck (userInput): null
}

// Stats
function updateStats() {    
    statsGamesSaved = localStorage.getItem("statsGames")
    statsGamesSaved? statsGames = statsGamesSaved: null
    
    statsWinsSaved = localStorage.getItem("statsWins")
    statsWinsSaved? statsWins = statsWinsSaved: null

    statsLossesSaved = localStorage.getItem("statsLosses")
    statsLossesSaved? statsLosses = statsLossesSaved: null

    document.getElementById("statsGames").textContent = statsGames
    document.getElementById("statsWins").textContent = statsWins
    document.getElementById("statsLosses").textContent = statsLosses
}

// End Game
function endGame(result) {

    //disabled game play
    clearInterval(timerInterval)
    document.removeEventListener("keydown", handleKey)
    keyboardDiv.removeEventListener("click", handleClick)

    //reveal letters
    for (let i = 0; i < currentWord.length; i++) {
        document.getElementById(`input_${i}`).textContent = currentWord[i]
    }

    //update stats
    statsGames++
    if (result == "win") {
        statsWins++
    }
    else {
        statsLosses++
    }

    //save states to local storage
    localStorage.setItem("statsGames", statsGames)
    localStorage.setItem("statsWins", statsWins)
    localStorage.setItem("statsLosses", statsLosses)

    //update stat displays
    updateStats()
}

// Timer
function startTimer (){
    let timer = 90
    document.getElementById("timer").innerHTML = `Time: ${timer}`
    timerInterval = setInterval(() => {
        if (timer === 0) {
            clearInterval(timerInterval)
            endGame("loss")
        }
        else {
            timer--;
            document.getElementById("timer").innerHTML = `Time: ${timer}`
        }

    }, 1000);
}

// handle mobile inputs; try to force keyboard open
let input = document.createElement('input');
input.type = 'text';
input.style.position = 'absolute';
input.style.opacity = '0';
input.width = "100%"
input.height = "100%"
document.body.appendChild(input);
function focusInput() {
    input.focus()
}

