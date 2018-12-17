// Create a list that holds all of your cards

let cardsArray = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'];

let cardsToInterect = $('.card').toArray();

// List of open cards

let openingCards = [];

// Functions

// Function to set move counter to 0

let moveCounter = null

function zeroMoveCounter() {
    moveCounter = 0;
    $('.moves').text(moveCounter);
}

// Shuffle Function
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
};


// Replace Function
function replaceArray (array) {

    for (let i = 0; i <= array.length; i++) {
        $(cardsToInterect[i]).children().attr('class','');
        $(cardsToInterect[i]).children().toggleClass('fa '+ array[i]);
    }
};

// Revealed Function
function revealedCard (cardClicked) {
    $(cardClicked).toggleClass('open revealed');
    openingCards.push(cardClicked);
    listIsTwo();
};

// Check if the list has two items
function listIsTwo () {
    if (openingCards.length === 2) {
        itsMatch(openingCards);
        openingCards = [];
        moveCounter = moveCounter + 1;
        $('.moves').text(moveCounter);
    }
}

// Match Function
function itsMatch (array) {
    item0 = $(array[0]).children().attr('class');
    item1 = $(array[1]).children().attr('class');

    if (item0 === item1) {
        $(array[0]).toggleClass('match');
        $(array[1]).toggleClass('match');
    } else {
        setTimeout (function() {
            $(array[0]).toggleClass('open revealed');
            $(array[1]).toggleClass('open revealed');
        }, 2000);        
    }
}

/*
 * On load display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

shuffle(cardsArray);

replaceArray(cardsArray);

zeroMoveCounter();

// Restart Buttom Event

$('.restart').click(function() {
    shuffle(cardsArray);
    replaceArray(cardsArray);
    $(cardsToInterect).attr('class','card');
    openingCards = [];
    zeroMoveCounter();
});

// Event of click in card

for (let i = 0; i <= cardsToInterect.length; i++) {
    $(cardsToInterect[i]).click( function() {
        revealedCard(cardsToInterect[i]);
    })
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
