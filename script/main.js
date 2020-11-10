// CONSTANTS
//cards .card.dK = diamond king
const SUITS = ['h','d','s','c']
const RANKS = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
const CHIPS = ['1',5,10,20,50,100];


//STATE VARIABLES
let playerHand;
let playerTotal;
let dealerHand;
let dealerTotal;
let currentDeck = []; //deck in use. once a card is removed, cant be picked again.
let pot = []; //array of chips
let wallet = 1000;
let potTotal = 0;


//CACHED ELEMENTS

const hitBut = document.getElementById("hit");
const stayBut = document.getElementById("stay");
const chipButs = document.getElementById("chip-container");
const dealerContainer = document.getElementById('dealer-container');
const playerContainer = document.getElementById('player-container');
console.log(dealerContainer);


//EVENT LISTENERS

hitBut.addEventListener('click', handleHit);
stayBut.addEventListener('click', handleStay);
chipButs.addEventListener('click', handleBet);

//FUNCTIONS

init();

function gameLoop() {
    dealHands();
    render();
}

//Deal beginning hands
function dealHands() {
    while(playerHand.length <= 1) {
        pullCard(playerHand,playerTotal,1);
    }
    while(dealerHand.length <= 1) {
        pullCard(dealerHand,dealerTotal,0);
    }
    console.log('player Hand: '+ playerHand);
    console.log('dealerHand: '+ dealerHand);
}

//Pull random card from currentDeck and place it in hand.
function pullCard(currentHand,currentTotal,who) {
    let randomDraw = Math.floor(Math.random() * currentDeck.length);
    let card = currentDeck[randomDraw];
    currentHand.push(card);
    currentDeck.splice(randomDraw,1);
    updateHandTotal(currentHand,currentTotal,who);
    render();
}

//adds up the value of hand, helper from pullcard
function updateHandTotal(currentHand,currentTotal,who) {
    
    currentHand.forEach(function (ele) {
    
        let num = ele.slice(1,3);
        //debugger;
        if((num === 'K')||(num === 'Q')||(num === 'J')) {
            num = 10;
        }

        if(num === 'A') {
            if(playerTotal < 10) {
                num = 11;
            } else {
                num = 1;
            }
        }

        num = parseInt(num)
        currentTotal = num;
    })
    
    if(who) {
        playerTotal += currentTotal;
    }  
    if( 0 === who) {
        dealerTotal += currentTotal;
    }

    console.log('playerTotal is' + playerTotal);
    console.log('dealerTotal is' + dealerTotal);
    console.log(currentHand);
}

function handleBet(evt) {

    selectedChip = evt.target.id
    selectedChip = selectedChip.slice(2,5);
    selectedChip = parseInt(selectedChip);
    if(wallet < selectedChip) return console.log('YOUBROKEFOOL');
    //move chip to pot icebox
    wallet -= selectedChip;
    pot.push(selectedChip);
    countPot();

}

function countPot() {
    potTotal = pot.reduce((acc,ele) => acc + ele)
    console.log(potTotal);
}



function handleHit() {
    pullCard(playerHand,playerTotal, 1);
    if(playerTotal > 21) {
        whoWon();
    }
    //disable betting.
    //update graphics
}



function handleStay() {
    //Hide Hit and Stay Buttons
    dealerPlays();
    whoWon();
}

function dealerPlays() {

    while(playerTotal >= dealerTotal) {
        if (dealerTotal === 21) {
            break;
        }
        pullCard(dealerHand,dealerTotal, 0);
        console.log(dealerHand);
        console.log("dealer hits, new total is:" + dealerTotal)
    }
    console.log(dealerTotal)
}

function whoWon() {
    //if player over 21, bust!
    if(playerTotal > 21) {
        //LOSS
        console.log('YOU LOSE')
        pot = [];
    }
    //dealer bust
    if (dealerTotal > 21) {
        console.log('You win man, he busted');
        wallet += (potTotal*2);
        pot = [];
    }

    if((dealerTotal < 21 && playerTotal < 21) && playerTotal > dealerTotal) {
        console.log('You Win!')
        wallet += potTotal;
        pot = [];
    }
    if((dealerTotal < 21 && playerTotal < 21) && dealerTotal > playerTotal) {
        console.log('YOU LOSE');
        pot = [];
    } 

    if(playerTotal === 21 && dealerTotal ===21) {
        console.log('Push')
        pot = [];
    }
    renderNextHandButton() 
}

function renderNextHandButton() {

}

function renderMoveCards() {

}

function renderMoveChip() {

}

function renderCards() {

    playerContainer.innerHTML = ` `;
    playerHand.forEach(function(ele) {
        playerContainer.insertAdjacentHTML('afterbegin',`<div class="card ${ele}"></div>`);
    })

    dealerContainer.innerHTML = ` `;
    dealerHand.forEach(function(ele) {
        dealerContainer.insertAdjacentHTML('afterbegin',`<div class="card ${ele}"></div>`);
    })
        
}

function render() {
   renderCards();
}

//Creates new deck at beginning of game
function refreshDeck() {
    let suitIdx = 0;
    let rankIdx = 0;

    while (suitIdx<4) {
        rankIdx = 0;
        while(rankIdx<13) {
            currentDeck.push(`${SUITS[suitIdx]}${RANKS[rankIdx]}`);
            rankIdx += 1;
        }
        suitIdx += 1;
    }
}

function init() {
    pot = [];
    playerHand = [];
    playerTotal = null;
    dealerHand = [];
    dealerTotal = null;
    refreshDeck();
    gameLoop();
}


