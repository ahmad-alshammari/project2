let card = document.getElementsByClassName('card');
let cards = [...card];


// getElementsByClassName method from  https://www.w3schools.com/js/js_htmldom_nodelist.asp
let deck = document.getElementsByClassName('card-deck')[0];
let moves = 0;
//  moves counter
let counter = document.querySelector('.moves');
let stars = document.querySelectorAll('.fa-star');
let starsList = document.querySelectorAll('.stars li');
let matchingCard = document.getElementsByClassName('matching');
let closeIcon = document.querySelector('.close');
let modal = document.getElementsByClassName('modal')[0];
let openedCards = [];
let second = 0, minute = 0, hour = 0;
let timer = document.querySelector('.timer');
let interval;
const restartButton = document.querySelector('.restart');
const modalPlayAgainButton = document.querySelector('.play-again');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function startGame() {
  
    cards = shuffle(cards);
    for (let i = 0; i < cards.length; i++) {
        cards.forEach(i => deck.appendChild(i));
        cards[i].classList.remove('show', 'open', 'matching', 'disabled');
    }
    openedCards = [];
  
    moves = 0;
    counter.innerHTML = moves;
  
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = '#ffd700';
        stars[i].style.display = 'inline';
    }
  
    let second = 0;
    let minute = 0;
    let hour = 0;
    let timer = document.querySelector('.timer');
    timer.innerHTML = '0 mins 0 secs';

    clearInterval(interval);
}

// Start game
document.body.onload = startGame();

// restart listener 
restartButton.addEventListener('click', startGame);

// Call reset function
modalPlayAgainButton.addEventListener('click', reset);




let displayCard = function() {
  this.classList.toggle('open');
  this.classList.toggle('show');
  this.classList.toggle('disabled');
};


//If the cards are matchining
function matching() {
    openedCards[0].classList.add('matching', 'disabled');
    openedCards[1].classList.add('matching', 'disabled');
    openedCards[0].classList.remove('show', 'open');
    openedCards[1].classList.remove('show', 'open');
    openedCards = [];
}

//If the cards are not matchining
function notMatching() {
    openedCards[0].classList.add('not-matching');
    openedCards[1].classList.add('not-matching');
    disable();
    setTimeout(function() {
        openedCards[0].classList.remove('show', 'open', 'not-matching');
        openedCards[1].classList.remove('show', 'open', 'not-matching');
        enable();
        openedCards = [];
    }, 400);
}


function cardOpen() {
  openedCards.push(this);
  let len = openedCards.length;
  
  if (len == 1 && moves == 0) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  } else if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matching();
    } else {
      notMatching();
    }
  }
}


// disable not flipped cards
function disable() {
  cards.forEach(card => card.classList.add('disabled'));
}

// Enable flipped cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (let i = 0; i < matchingCard.length; i++) {
      matchingCard[i].classList.add('disabled');
    }
  });
}


function moveCounter() {
  
  moves++;
  counter.innerHTML = moves;
  // rating by ginving stars according to moves number.
  if (moves > 10 && moves < 12) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.display = 'none';
      }
    }
  }
  else if (moves > 16) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.display = 'none';
      }
    }
  }
}

// the timer
function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + ' mins ' + second + ' secs';
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}


//  close button
function closeModal() {
    closeIcon.addEventListener('click', function(e) {
        modal.classList.remove('show');
        startGame();
    });
}

// rest button
function reset() {
    modal.classList.remove('show');
    startGame();
}

// Win function

function congratulations() {
  if (matchingCard.length == 16) {
   
    clearInterval(interval);
    let finalTime = timer.innerHTML;

    modal.classList.add('show');

    let starRating = document.querySelector('.stars').innerHTML;

    document.getElementsByClassName('final-moves')[0].innerHTML = moves;
    document.getElementsByClassName('star-rating')[0].innerHTML = starRating;
    document.getElementsByClassName('total-time')[0].innerHTML = finalTime;

    
    closeModal();
  }
}





for (let i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener('click', displayCard);
  card.addEventListener('click', cardOpen);
  card.addEventListener('click', congratulations);
}