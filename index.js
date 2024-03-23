// Create player object (add money pot)
let player = {
    name: "",
    chips: 200
}

// Cards, sums, game states
let playerCards = [];
let dealerCards = [];
let sum = 0;
let dealerSum = 0;
let gameState = "TITLE";  

// DOM - used for rendering
let messageEl = document.getElementById("messageEl");
let playerCardEl = document.getElementById("playerCardEl");
let dealerHandEl = document.getElementById("dealerHandEl");
let sumEl = document.getElementById("sumEl");

let startBtn = document.getElementById("startBtn");
let newCardBtn = document.getElementById("newCardBtn");
let foldBtn = document.getElementById("foldBtn");
let nextBtn = document.getElementById("nextBtn");
let quitBtn = document.getElementById("quitBtn");

let nameEntry = document.getElementById("nameEntry");
let displayName = document.getElementById("displayName");

// Functions (getRandomCard, startGame, renderGame, newCard)
function getRandomCard() {
    let randomCard = Math.floor(Math.random()*13) + 1;
    if (randomCard > 10) {
        return 10;
    } else {
        return randomCard;
    }
}

function nextRound() {
    gameState = "START";
    sum = 0;
    playerCards = [];
    dealerCards = [];
    playerCards.push(getRandomCard());
    playerCards.push(getRandomCard());
    dealerCards.push(getRandomCard());
    sum = playerCards[0] + playerCards[1];
    dealerSum = dealerCards[0];
    renderGame();
}

function quitGame(){
    gameState = "TITLE";
    player.chips = 200;
    renderGame();
}

function startGame() {
    let nameInput = document.getElementById("nameInput");
    let playerName = nameInput.value;
    player.name = playerName;
    nextRound();
}

function renderGame() {
    playerCardEl.textContent = "Your hand: ";
    for (let i = 0; i < playerCards.length; i++){
        playerCardEl.textContent += playerCards[i] + " ";
    }
    dealerHandEl.textContent = "Dealer's hand: ";
    for (let i = 0; i < dealerCards.length; i++){
        dealerHandEl.textContent += dealerCards[i] + " ";
    }
    if (dealerSum > 21) {
        messageEl.textContent = "Dealer went bust! You won!";
        player.chips += 5;
        gameState = "END";
    }

    if (gameState === "FOLD"){
        if (dealerSum < 17){
            messageEl.texContent = "You fold!"
            newCardBtn.textContent = "NEXT";
            foldBtn.style.display = "none";
        } else {
            gameState = "END";
        }
    }

    sumEl.textContent = "Sum: " + sum;
    if (sum < 21) { 
        if (gameState === "END") {
            if (sum > dealerSum){
                messageEl.textContent = "You won!";
                player.chips += 5;
            } else if (dealerSum > 21) {
                messageEl.textContent = "Dealer went bust! You won!";
                player.chips += 5;
            } else if (dealerSum === 21) {
                messageEl.textContent = "You lost! Dealer got Blackjack!";
                player.chips -= 30;
            } else if (dealerSum > sum) {
                messageEl.textContent = "You lost :( Better luck next time!";
                player.chips -= 15;
            } else if (dealerSum == sum) {
                messageEl.textContent = "It's a tie!";
            } 
        } else {
            messageEl.textContent = "Do you want to draw another card?";
        }
    } else if (sum === 21) {
        messageEl.textContent = "You won! You've got Blackjack!";
        player.chips += 20
        gameState = "END";
    } else {
        messageEl.textContent = "You're out of the game :( Better luck next time!";
        player.chips -= 15;
        gameState = "END";
    }

    // Game states
    if (gameState == "TITLE") {        
        nameEntry.style.display = "inline";
        nameInput.style.display = "inline";
        displayName.style.display = "none";
        nextBtn.style.display = "none";
        quitBtn.style.display = "none";
        startBtn.style.display = "inline";
    } else if (gameState == "START") {
        // Update message screen
        nameEntry.style.display = "none";
        nameInput.style.display = "none";
        displayName.style.display = "inline";
        // Update buttons
        nextBtn.style.display = "none";
        quitBtn.style.display = "none";
        startBtn.style.display = "none";
        newCardBtn.textContent = "NEW CARD";
        newCardBtn.style.display = "inline";
        foldBtn.style.display = "inline";
    } else if (gameState === "END") {
        nextBtn.style.display = "inline";
        quitBtn.style.display = "inline";
        newCardBtn.style.display = "none";
        foldBtn.style.display = "none";
    }
    displayName.textContent = player.name + " " + "$" + player.chips;
}

function newCard() {
    if (gameState === "START"){
        let playerCard = getRandomCard();
        sum += playerCard;
        playerCards.push(playerCard);
        let dealerCard = getRandomCard();
        dealerSum += dealerCard;
        dealerCards.push(dealerCard);
    } else if (gameState === "FOLD"){
        let dealerCard = getRandomCard();
        dealerSum += dealerCard;
        dealerCards.push(dealerCard);
    }
    renderGame();
}

function fold() {
    gameState = "FOLD";
    renderGame();
}


