// CONSTANTS
//cards .card.dK = diamond king
const suits = ['h','d','s','c']
const ranks = ['02','03','04','05','06','07','08','09','10','J','Q','K','A']


//STATE VARIABLES
let playerHand;
let playerTotal;
let dealerHand;
let dealerTotal;
let currentDeck = []; //deck in use. once a card is removed, cant be picked again.

//CACHED ELEMENTS

const hitBut = document.getElementById("hit");
const stayBut = document.getElementById("stay")

function say() {
    console.log('how do i not know this yet.')
}

//EVENT LISTENERS

hitBut.addEventListener('click', handleHit);
stayBut.addEventListener('click', handleStay);

//FUNCTIONS

init();

function gameLoop() {
    dealHands();
    render();
}


//Pull random card from currentDeck and place it in hand.
function pullCard(currentHand,currentTotal,who) {
    let randomDraw = Math.floor(Math.random() * currentDeck.length);
    let card = currentDeck[randomDraw];
    currentHand.push(card);
    currentDeck.splice(randomDraw,1);
    updateHandTotal(currentHand,currentTotal,who);
}

//adds up the value of hand, helper from pullcard
function updateHandTotal(currentHand,currentTotal,who) {
    currentTotal = 0;
    currentHand.forEach( function (ele) {
        let num = ele.slice(1,3);
        
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

        num = parseInt(num);
        currentTotal += num;

    })
    if(who) {
        playerTotal = currentTotal;
    } else {
        dealerTotal = currentTotal
    }
    console.log(`Total = ` + currentTotal);
    console.log(currentHand);
}

//Deal beginning hands
function dealHands() {
    while(playerHand.length <= 1) {
        pullCard(playerHand,playerTotal,1);
    }
    while(dealerHand.length <= 1) {
        pullCard(dealerHand,dealerTotal,0);
    }
    console.log('playerHand: '+playerHand);
}

function handleHit() {
  pullCard(playerHand,playerTotal, 1);
  //update graphics
}

function handleStay() {
    //Hide Hit and Stay Buttons
    //whoWon();
    dealerPlays();
}

function whoWon() {
    //if player over 21, bust!
    //if player has 5 
    //if Even === TIE
    //if player under dealer === LOSE
    //if player gets blackjack, check if dealer has blackjack, if not player wins (with Bonus)
}

function dealerPlays() {

    while(playerTotal > dealerTotal) {
        pullCard(dealerHand,dealerTotal, 0);
        console.log(dealerHand);
        console.log("dealer hits, new total is:" + dealerTotal)
    }
    console.log(dealerTotal)
}


function render() {

}

//Creates new deck at beginning of game
function refreshDeck() {
    let suitIdx = 0;
    let rankIdx = 0;

    while (suitIdx<4) {
        rankIdx = 0;
        while(rankIdx<13) {
            currentDeck.push(`${suits[suitIdx]}${ranks[rankIdx]}`);
            rankIdx += 1;
        }
        suitIdx += 1;
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