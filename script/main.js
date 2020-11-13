// CONSTANTS
//cards .card.dK = diamond king
const SUITS = ['h','d','s','c']
const RANKS = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
const CHIPS = [1,5,10,20,50,100];


//STATE VARIABLES
let playerHand;
let playerTotal;
let dealerHand;
let dealerTotal;
let currentDeck = []; //deck in use. once a card is removed, cant be picked again.
let pot = []; //array of chips
let wallet = 1000;
let potTotal = 0;
let onlyCountOnce = true;
let poppedTotal;


//CACHED ELEMENTS

const hitBut = document.getElementById("hit");
const stayBut = document.getElementById("stay");
const chipButs = document.getElementById("chip-container");
const dealBut = document.getElementById('deal');
const dealerContainer = document.getElementById('dealer-container');
const playerContainer = document.getElementById('player-container');
const dealerTotalEl = document.getElementById('dealer-total');
const playerTotalEl = document.getElementById('player-total');
const playerWalletEl = document.getElementById('current-wallet');
const potTotalEl = document.getElementById('pot-total')
const winDisplayEl = document.querySelector('p')


//EVENT LISTENERS

hitBut.addEventListener('click', handleHit);
stayBut.addEventListener('click', handleStay);
chipButs.addEventListener('click', handleBet);
dealBut.addEventListener('click', init);

//FUNCTIONS

init();



//Deal beginning hands
function dealHands() {
    while(playerHand.length <= 1) {
        pullCard(playerHand,playerTotal,1);
    }
    while(dealerHand.length <= 1) {
        pullCard(dealerHand,dealerTotal,0);
    }

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
        if((num === 'K')||(num === 'Q')||(num === 'J')) {
            num = 10;
        }
        if(num === 'A') {
            if(currentTotal < 10) {
                num = 11;
            } else {
                num = 1;
            }
        }
        num = parseInt(num)
        currentTotal = num;  
    })

    //Update Totals
    if(who) {
        playerTotal += currentTotal;
    }
    if( 0 === who ) {
        dealerTotal += currentTotal;
        dealerTotal += poppedTotal;
        poppedTotal = 0;
    }
    if(dealerHand.length === 2 && onlyCountOnce) {
        dealerTotal -= currentTotal;
        poppedTotal = currentTotal;
        onlyCountOnce = false;
    }
}

//Bet handler
function handleBet(evt) {
    selectedChip = evt.target.id
    if('chip-container' === selectedChip) {
        return;
    }
    selectedChip = selectedChip.slice(2,5);
    selectedChip = parseInt(selectedChip);
    if(wallet < selectedChip) return;
    //move chip to pot icebox
    wallet -= selectedChip;
    pot.push(selectedChip);
    countPot();
    render();
}

function countPot() {
    potTotal = pot.reduce((acc,ele) => acc + ele)
    console.log(potTotal);
}

//Display you win, you lose, tie!
function renderWinState(state) {
    if(state === 0) {
        winDisplayEl.textContent = 'You Lose!';
    }
    if(state === 1) {
        winDisplayEl.textContent = "Winner Winner Chicken Dinner!";
    }
    if(state === -1) {
        winDisplayEl.textContent = "";
    }
    if(state === 2) {
        winDisplayEl.textContent = "tie!";
    }
}

function handleHit() {
    pullCard(playerHand,playerTotal, 1);
    if(playerTotal > 21) {
        whoWon();
    }
    renderDisableBetting(0);

}

function handleStay() {
    //Hide Hit and Stay Buttons
    dealerPlays();
    whoWon();
    renderDisableBetting(0);
}

function dealerPlays() {
    while(playerTotal >= dealerTotal) {
        if (dealerTotal >= 17) {
            break;
        }
        pullCard(dealerHand,dealerTotal, 0);
    }
}

//Logic to determine who is the winner.
function whoWon() {
    if(playerTotal > 21) {
        renderWinState(0);
    }
    
    if (dealerTotal > 21) {
        renderWinState(1);
        wallet += (potTotal*2);
    }

    if((dealerTotal < 21 && playerTotal <= 21) && playerTotal > dealerTotal) {
        renderWinState(1);
        wallet += (potTotal*2);
    }
    if((dealerTotal <= 21 && playerTotal < 21) && dealerTotal > playerTotal) {
        renderWinState(0);
    } 

    if(playerTotal === 21 && dealerTotal === 21) {
        renderWinState(2);
        wallet += potTotal;
    }
    renderDealHandButton(1);
    render();
}


function renderDealHandButton(state) {
    if(state === 0) {
        dealBut.style.display = 'none'
        hitBut.style.display = "block"
        stayBut.style.display = "block"
    }
    if(state === 1) {
        dealBut.style.display = "block"
        hitBut.style.display = "none"
        stayBut.style.display = "none"
    }
}

//Renders the values in the middle of screen.
function renderValue() {
    dealerTotalEl.innerHTML = `<div id="dealer-total">${dealerTotal}</div>`;
    playerTotalEl.innerHTML = `<div id="player-total">${playerTotal}</div>`;
    potTotalEl.innerHTML = `<div id="player-total">$${potTotal}</div>`;
    playerWalletEl.innerHTML = `<div id="player-total">Wallet : $${wallet}</div>`;
}

//Stops the player from being able to bet during the game.
function renderDisableBetting(state){
    if(state === 1) {
        chipButs.style.pointerEvents = 'all';
    } else if (state === 0) {
        chipButs.style.pointerEvents = 'none' ;

    }
}

//RendersCards
function renderCards() {
    playerContainer.innerHTML = ` `;
    playerHand.forEach(function(ele) {
        playerContainer.insertAdjacentHTML('afterbegin',`<div class="card ${ele}" align-content="flex-end"></div>`);
    })
    
    dealerContainer.innerHTML = ` `;
    dealerHand.forEach(function(ele) {
        dealerContainer.insertAdjacentHTML('afterbegin',`<div class="card ${ele}" align-content="flex-end"></div>`);
    })

    if(dealerHand.length === 2) {
        dealerContainer.innerHTML = ` `;
        dealerContainer.insertAdjacentHTML('afterbegin',`<div class="card back" align-content="flex-end"></div>`);
        dealerContainer.insertAdjacentHTML('afterbegin',`<div class="card ${dealerHand[0]}" align-content="flex-end"></div>`);
    }        
}

//Updates the cards, potValue, player and dealer hand values
function render() {
   renderCards();
   renderValue();
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
    onlyCountOnce = true;
    poppedTotal = 0;
    potTotal = 0;
    playerHand = [];
    playerTotal = null;
    dealerHand = [];
    dealerTotal = null;
    renderWinState(-1);
    renderDealHandButton(1);
    renderDisableBetting(1)
    refreshDeck();
    dealHands();
    render();
}


