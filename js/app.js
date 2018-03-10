/*
 * Create a list that holds all of your cards
 */

let card = document.getElementsByClassName('card');
let cards = [...card]

let openedCards = [];

let moves = 0;
let counter = document.querySelector('.moves')

let matchedCard = document.getElementsByClassName("match")

let closeicon = document.querySelector(".close");

let modal = document.getElementById("popup1")


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// @description shuffles cards when page is refreshed / loads
document.body.onload = startGame();


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function startGame() {

    // console.log("startGame")

    //cards = shuffle(cards)

    const deck = document.getElementsByClassName("deck");

    for (var i = 0; i < cards.length; i++) {
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck[0].appendChild(item)
        });

        cards[i].classList.remove("show", "open", "match", "disabled")
    }

    //reset moves
    moves = 0;
    counter.innerHTML = moves;
};
    



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function display(card) {

    //console.log("I am in display function - My card is", card)

    this.classList.toggle('open');
    this.classList.toggle('show');
    this.classList.toggle("disabled")

}

let cardCounter = 0;


function openCardList(card) {

    openedCards.push(this);
    // console.log(card)

    if (openedCards.length == 2) {
        moveCounter()
        if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
            //console.log(openedCards[0])
            //console.log(openedCards[1])
            matched()
        }
        else {
            unmatched()
        }
    }

};

function moveCounter(){ 

    moves++;

    counter.innerHTML = moves;

}

function congrats(){
    if (matchedCard.length == 2){
        // clearInterval(interval);
        //finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        //document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}

// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
        
    });
}

// @desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}




function matched() {

    // console.log("matched")

    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("open", "show", "no-event");
    openedCards[1].classList.remove("open", "show", "no-event");

    openedCards = [];

};

function unmatched() {  
    // console.log("unmatched")
    openedCards[0].classList.add("unmatched", "disabled");
    openedCards[1].classList.add("unmatched", "disabled");
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        openedCards = [];
    }, 1000);


};


for (let i = 0; i < cards.length; i++) {
    card = cards[i]
    cards[i].addEventListener('click',display)
    cards[i].addEventListener('click',openCardList)
    cards[i].addEventListener('click',congrats)

}

