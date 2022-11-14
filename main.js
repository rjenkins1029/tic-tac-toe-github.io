const board = document.querySelector('.board')
const onePlayerBtn = document.querySelector('#one-player')
const twoPlayerBtn = document.querySelector('#two-players')
const message = document.querySelector('.message')
const resetBtn = document.querySelector('#reset')
let numberOfPlayers = 1
let turns = 0
let gameOver = false

// arrays of winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// create the board
for (let i = 0; i < 9; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.dataset.squareId = i
    board.appendChild(square)
}
const squares = Array.from(document.querySelectorAll('.square'))

// one player button
onePlayerBtn.addEventListener("click", () => {
    reset()
    numberOfPlayers = 1
    message.innerText = "Your turn"
    
})

// two player button
twoPlayerBtn.addEventListener("click", () => {
    reset()
    numberOfPlayers = 2
    message.innerText = "Player Ones turn"
})

// create event listener for squares
document.addEventListener("click", e => {
    if (gameOver === true) return
    if (!e.target.matches('.square')) return
    if (e.target.matches('.player-one')) return
    if (e.target.matches('.player-two')) return
    if(numberOfPlayers === 1) onePlayer(e)
    if(numberOfPlayers === 2) twoPlayers(e)
})

// event listener for reset button
resetBtn.addEventListener("click", reset)

// if one player, play with computer
function onePlayer(e) {
    e.target.classList.add('player-one')
    checkForWinner()
    if(!gameOver) {
        const emptySquares = squares.filter (square => {
            return !square.classList.contains('player-one') && !square.classList.contains('player-two')
        })
        console.log(emptySquares)
        if (emptySquares.length !== 0) {
            message.innerText = "Computers turn"
            computer(emptySquares)
            checkForWinner() 
        } else {
           message.innerText = "Game Over"
            gameOver = true
        }
    }
}

// computer player
function computer(emptySquares) {
    setTimeout(() => {
        let random = Math.round(Math.random() * (emptySquares.length-1))
        if (random === -1) random = random + 1
        emptySquares[random].classList.add('player-two')
        message.innerText = "Your turn"
    }, 1000)
    
}

// if two players, take it in turns to play
function twoPlayers(e) {
    if (turns % 2 === 0) {
        e.target.classList.add('player-one')
        message.innerText = "Player Twos turn"
        checkForWinner()
        } else {
            e.target.classList.add('player-two')
            message.innerText = "Player Ones turn"
            checkForWinner()
        } turns ++
        if (turns === squares.length  && gameOver === false) {
            message.innerText = "Game Over"
            gameOver = true
        }
}

// check for a winning combination
function checkForWinner() {
    winningCombinations.forEach(combination => {
        if (combination.every(index => squares[index].classList.contains('player-one'))) {
            message.innerText = "Player One wins!"
            gameOver = true
        } else if (combination.every(index => squares[index].classList.contains('player-two'))) {
            message.innerText = "Player Two wins!"
            gameOver = true
        } 
    })
}

// reset the game
function reset() {
    squares.forEach(square => {
        square.classList.remove('player-one')
        square.classList.remove('player-two')
        message.innerText = "Your turn"
        if (numberOfPlayers === 2) message.innerText = "Player Ones turn"
        turns = 0
        gameOver = false
    })
}
