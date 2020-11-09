// CONSTANTS
//cards .card.dK = diamond king
const suits = ['h','d','s','c']
const ranks = [1,2,3,4,5,6,7,8,9,10,'J','Q','K','A']

//STATE VARIABLES
let playerHand;
let playerTotal;
let dealerHand;
let dealerTotal;
let currentDeck; //deck in use. once a card is removed, cant be picked again.

//CACHED ELEMENTS


//EVENT LISTENERS


//FUNCTIONS

init();

render();































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