// keyboard
const keyboardDiv = document.getElementById("keyboard")
const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["⏎", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
]

renderKeyboard()
function renderKeyboard() {
    keyboardDiv.innerHTML = "" 
    for (let r = 0 ; r < keyboardRows.length; r++) {
        let row = document.createElement("div")
        row.setAttribute("class", "keyboardRow")
        for (let i = 0; i < keyboardRows[r].length; i++) {
            let d = document.createElement("span")
            d.innerHTML = `${keyboardRows[r][i]}`
            d.setAttribute("class", "keyboardKeySpan")
            d.setAttribute("id", keyboardRows[r][i])
            row.appendChild(d)
        }
        keyboardDiv.appendChild(row)
    }
}