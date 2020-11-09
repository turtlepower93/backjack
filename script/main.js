// CONSTANTS
//cards .card.dK = diamond king
const suits = ['h','d','s','c']
const ranks = ['01','02','03','04','05','06','07','08','09','10','J','Q','K','A']

//STATE VARIABLES
let playerHand;
let playerTotal;
let dealerHand;
let dealerTotal;
let currentDeck = []; //deck in use. once a card is removed, cant be picked again.

//CACHED ELEMENTS

const hitBut = document.getElementById("hit");
const stayBut = document.getElementById("hit")

function say() {
    console.log('how do i not know this yet.')
}

//EVENT LISTENERS

hitBut.addEventListener('click', handleHit);

//FUNCTIONS

init();

function gameLoop() {
    dealHands();

    render();
}


//helperFunction. Call at Deal Hand. and at Hit.
function pullCard(currentHand) {
    let randomSeedSuit = Math.floor(Math.random() * 4);
    let randomSeedRank = Math.floor(Math.random() * 14);
    let card = '';
    card = suits[randomSeedSuit] + ranks[randomSeedRank];
    currentHand.push(card);


    //Have to erase card from deck
    

    return;
}

function dealHands() {
    while(playerHand.length <= 1) {
        pullCard(playerHand);
    }
    while(dealerHand.length <= 1) {
        pullCard(dealerHand);
    }
    console.log(playerHand);
}

function handleHit() {
  pullCard(playerHand);
}

function dealerPlays() {

}


function render() {

}

function refreshDeck() {
    let suitIdx = 0;
    let rankIdx = 0;
    while(currentDeck.length < 52) {
        currentDeck.push(`${suits[suitIdx]}${ranks[rankIdx]}`)
        suitIdx += 1;
        rankIdx += 1;
        console.log(suitIdx)
        if (suitIdx === 3) {
            suitIdx = 0;
        }
        if (rankIdx === 14) {
            rankIdx = 0;
        }
    }
}

function init() {
    playerHand = [];
    playerTotal = null;
    dealerHand = [];
    dealerTotal = null;
    refreshDeck();
    gameLoop();
}





























// function BlackJackInOneFunction() {
//     let userTotal = 0;
//     while(userTotal < 21) {
//         console.log('You are at' + userTotal + " Hit?");
//         var answer = prompt('y/n');
//         if(answer === 'y') {
//             userTotal += Math.floor(Math.random()*11);
//         } else {
//            return console.log('compare current number with dealer.');
//         }
        
//     }
// }


// function compareWithDealer() {
//     dealerTotal = Math.getRandomInt(0,23);
//     if()
//     if(playerTotal > dealerTotal) {
//         return console.log('player won!');
//     } else {
//         console.log('compooter won')
//     }
// }

// function init() {
//     playerTotal = 0;
//     dealerTotal = 0;
//     compareWithDealer();
// }





//HOW TO WIN
//IF player is over 21 then LOSE
//IF player1 total > player2 total then player1 wins;

//cool thing is, ai logic follows player logic.
//Firstly, if you are below 21 and you are above the playerTotal, then you win, dont hit.
//you will always hit if you are below the currentTableTotal (playerTotal bc im)







//ICEBOX:
//