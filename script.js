const cardBucket = document.getElementById("card-bucket");
const playerHand = document.getElementById("player");
const topBucketCard = document.getElementById("card-bucket-card-3")
const enemyHand = document.getElementById("enemy");
const playedCardContainer = document.getElementById("played-cards");
const playedCard = document.getElementById("played-card");
const currentTurnContainer = document.getElementById("current-turn");
const advanceButton = document.getElementById("advance-button");

const cardColors = ["blue", "red", "yellow", "green"];

let playerTurn = Math.random() > 0.5;
//let playerTurn = false;
let currentNumber =  Math.floor(Math.random() * 8 + 1);
let currentColor = cardColors[Math.floor(Math.random() * cardColors.length)];

let playerCards = [];
let enemyCards = [];

const logCardInfo = e => {
    let num;
    let color;
    !e.target.unoNumber ? num = e.target.parentNode.unoNumber : num = e.target.unoNumber;
    !e.target.unoColor ? color = e.target.parentNode.unoColor : color = e.target.unoColor;
    console.log(`This card is a ${color} ${num}`);
}

const playerCardEventHandler = e =>{
    if(playerTurn){
        let num;
        let color;
        !e.target.unoNumber ? num = e.target.parentNode.unoNumber : num = e.target.unoNumber;
        !e.target.unoColor ? color = e.target.parentNode.unoColor : color = e.target.unoColor;
        console.log(`Current color: ${currentColor}, your color: ${color}`);
        console.log(`Current number: ${currentNumber}, your number: ${num}`);
        if(e.target.unoNumber === currentNumber || e.target.unoColor === currentColor){
            console.log("True card")
            updatePlayedCard(e.target.unoNumber, e.target.unoColor);
            !e.target.unoNumber ? playerHand.removeChild(e.target.parentNode) : playerHand.removeChild(e.target);
            playerTurn = false;
            currentTurnContainer.innerHTML = "Enemy's turn";
            currentColor = color;
            currentNumber = num;
        }
    }
    if(!playerHand.children.length){
        let newElement = document.createElement("h1");
        newElement.innerHTML = "WINNER!";
        playerHand.appendChild(newElement);
    }
}

const makeNewCard = () => {
    let newCard = document.createElement("div");
    let newCardText = document.createElement("p");
    const newCardNumber = Math.floor(Math.random() * 8 + 1);
    const newCardColor = cardColors[Math.floor(Math.random() * cardColors.length)];
    newCardText.innerHTML = newCardNumber;
    newCard.appendChild(newCardText);
    newCard.unoNumber = newCardNumber;
    newCard.unoColor = newCardColor;
    newCard.addEventListener("click",logCardInfo);
    return newCard;
}

const addPlayerCard = () => {
    let newCard = makeNewCard();
    newCard.className = `open card player-card ${newCard.unoColor}`;
    newCard.addEventListener("click", playerCardEventHandler);
    playerHand.appendChild(newCard);
    enemyCards.push(newCard);
}

const addEnemyCard = () => {
    let newCard = makeNewCard();
    newCard.children[0].innerHTML = "UNO";
    const newCardColor = newCard.unoColor;
    newCard.className = `closed card enemy-card ${newCardColor}`;
    enemyHand.appendChild(newCard);
    enemyCards.push(newCard);
}

const updatePlayedCard = (cardNum, cardColor) => {
    playedCard.children[0].innerHTML = cardNum;
    playedCard.className = `open card ${cardColor} middle-card`;
}

const topBucketCardHandler = () => {
    if(playerTurn){
        addPlayerCard();
        playerTurn = !playerTurn;
        currentTurnContainer.innerHTML = "Enemy's turn!";
        console.log("Added card to player!");
    }

}

const computerPlay = () => {
    let index = 0;
    let foundCard = false;
    for(card of enemyHand.children){
        let thisCardColor = card.unoColor;
        let thisCardNumber = card.unoNumber;
        if(thisCardColor === currentColor || thisCardNumber === currentNumber){
            updatePlayedCard(thisCardNumber, thisCardColor);
            enemyCards.splice(index, 1);
            console.log(`Current color: ${currentColor}, Number: ${currentNumber}`);
            console.log(`New color: ${thisCardColor}, Number: ${thisCardNumber}`);
            playerTurn = true;
            currentTurnContainer.innerHTML = "Player's turn!";
            foundCard = true;
            enemyHand.removeChild(card);
            currentColor = thisCardColor;
            currentNumber = thisCardNumber;
            break;
        }
        index++;
    }
    if(!foundCard){
        addEnemyCard();
        playerTurn = true;
        currentTurnContainer.innerHTML = "Player's turn!";
        console.log("Enemy drawing a new card");
    }
    if(!enemyHand.children.length){
        let newElement = document.createElement("h1");
        newElement.innerHTML = "WINNER!";
        enemyHand.appendChild(newElement);
        console.log("Loser");
    }
}

const advance = () => {
    if(playerTurn){
    }
    
    else{
        computerPlay();
    }
}



//Main
for(let i = 0; i < 6; i++){
    addPlayerCard();
    addEnemyCard();
}

updatePlayedCard(currentNumber, currentColor);

advanceButton.addEventListener("click", advance);

topBucketCard.addEventListener("click", topBucketCardHandler);

if(playerTurn){
    currentTurnContainer.innerHTML = "Player's turn!";
}

else{
    currentTurnContainer.innerHTML = "Enemy's turn!";
}