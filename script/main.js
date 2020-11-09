// let playerTotal;
// let dealerTotal;

console.log('hi')


function BlackJackInOneFunction() {
    let userTotal = 0;
    while(userTotal < 21) {
        console.log('You are at' + userTotal + " Hit?");
        var answer = prompt('y/n');
        if(answer === 'y') {
            userTotal += Math.floor(Math.random()*11);
        } else {
           return console.log('compare current number with dealer.');
        }
        
    }
}


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


//Notes:
//Dealer AI is more complicated than i thought. couple of cases:
//Dealer total isnt just a random number.
//the dealer plays just like the user... HOW DO I MODEL THIS?!
//basics, the dealer only has to beat the player.
//IF the dealer's total is greater than the user, then he wins.


//HOW TO WIN
//IF player is over 21 then LOSE
//IF player1 total > player2 total then player1 wins;

//cool thing is, ai logic follows player logic.
//Firstly, if you are below 21 and you are above the playerTotal, then you win, dont hit.
//you will always hit if you are below the currentTableTotal (playerTotal bc im)







//ICEBOX:
//