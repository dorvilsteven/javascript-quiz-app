// time penalty
var PENALTY = 10;
var score = 0;
var count = 0;
var time = 60;

// main area divs, accessed by id 
var main = document.querySelector('#main-container');
var homePage = document.querySelector('#homepage');
var quiz = document.querySelector('#quiz');
var result = document.querySelector('#choiceResult');
var endResult = document.querySelector('#end-result');
var highScores = document.querySelector('#high-scores');

// divs for displaying questions
var questionEl = document.querySelector('#question-div');
var questionTitle = questionEl.querySelector('.question-title');
var choicesEl = document.querySelector('#choices-div');
var choiceList = choicesEl.querySelector('.choice-list');
var choiceItem = choiceList.querySelectorAll('.choice-list-item');

// links and buttons
var startGameButton = document.querySelector('#startQuizGame');
var highscoresLink = document.querySelector('#highscores-link');
var buttonReturn = document.querySelector('#button-return');
var buttonClear = document.querySelector('#button-clear');

// form 
var formEl = document.getElementById('resultForm');
var scoreSubmit = document.getElementById('score-submit');

// text that displays time and score and highscores
var timer = document.querySelector('#timerText');
var scoreDisplay = document.querySelector('#score');
var scoresList = document.querySelector('#scores-list');
var scoreInput = document.getElementById('#initialValue');

// questions array
var questions = [
    {
        question: 'Which of the following is not considered an HTML semantic tag?',
        choices: ['<article>','<part>','<section>','<nav>'],
        answer: 1
    },{
        question: 'Which of the following is an HTML tag attribute?',
        choices: ['display','style','meta','color'],
        answer: 1
    },{
        question: 'A container is given a display of flex, which is not a valid value for the justify-content property?',
        choices: ['center','space-between','flex-end','flex-around'],
        answer: 3
    },{
        question: 'What is the syntax for a comment is JavaScript?',
        choices: ['//, /**/','<!-- -->','document.comment()','var comment ='],
        answer: 0  
    },{
        question: 'How can we select this tag "<h2 id="header2" class="article-title">Title of Artitle</h2>"?',
        choices: ['#TitleofArticle','.h2','.article-title','header2'],
        answer: 2
    },{
        question: 'What is the value of "z" in the following code? var x = "3"; var y = "3"; var z = x + y;',
        choices: ['undefined','9','6','33'],
        answer: 3
    },{
        question: 'Which element is an inline HTML element?',
        choices: ['<div>','<form>','<img>','<nav>'],
        answer: 2
    },{
        question: 'Which is not a object in JavaScript?',
        choices: ['window','for','MATH','document'],
        answer: 1
    },{
        question: 'Where should you link your external stylesheet in your HTML file?',
        choices: ['at the bottom of the <body> tag','at the very top of the file','at the top of the <body> tag','at the bottom of the <head> tag'],
        answer: 3
    },{
        question: 'How do you reference a variable in CSS?',
        choices: ['var(--variable-name)','variable-name','.variable-name','#variable-name'],
        answer: 0
}];

var goHome = function() {
  // hide 
  highScores.classList.add('no-display');
  endResult.classList.add('no-display');
  // show
  main.classList.remove('no-display');
  homePage.classList.remove('no-display');  
};

var displayHighScores = function() {
    // hide
    main.classList.add('no-display');
    // show
    highScores.classList.remove('no-display');
    
    // list is either scores from local storage or empty array
    var list = JSON.parse(localStorage.getItem('scores')) || [];
    
    // if the scores list ul has no children, then diplay the list from local storage, if it does have children, then there is nothing to display it is already there
    if (scoresList.childElementCount === 0) {
        for (var i=0;i<list.length;i++) {
            // for each element in list
            // create li
            var listItem = document.createElement('li');
            // add class
            listItem.classList.add('highscores-list-item');
            // add text content 
            listItem.textContent = `${i+1}. ${list[i].initials} - ${list[i].score}`;
            // append to ul 
            scoresList.appendChild(listItem);
        }
    }
};

// function to clear the highscores
var clearHighScores = function() {
    // clear localStorage 
    localStorage.removeItem('scores');
    // clear the list, remove all li elements 
    scoresList.innerHTML = '';
};

// function to add new score to local storage, accepts initial and score
var addToLocalStorage = function(initials, score) {
    // creates new empty array, if scores doesnt exist in local storage
    var list = JSON.parse(localStorage.getItem('scores')) || [];
    // push the new score to the array
    list.push({
            initials: initials,
            score: score
    });
    // update local storage with the updated array 
    localStorage.setItem('scores', JSON.stringify(list));
    // go to highscores screen 
    displayHighScores();
};
// end game function accepts score parameter
var endGame = function(score) {
    // hide certain displays
    quiz.classList.add('no-display');
    result.classList.add('no-display');
    // show the endResult display
    endResult.classList.remove('no-display');
    // on the form submit, hoist initials and score to be updated to local storage
    formEl.onsubmit = function(event) {
        event.preventDefault();
        var initials = document.querySelector('input[name="initials"]').value;
        // check if input value is empty strings
        if (!initials) {
            alert("Please Enter Your Initials!");
            return false;
        }
        // add data to local storage
        addToLocalStorage(initials, score);
    }
};

// function takes in questions array
var displayQuestions = function(questions, count) {
    // displays the question  
    questionTitle.textContent = questions[count].question;
    // loops through each objects choices array
    for (var i=0;i<questions[count].choices.length;i++) {
        // display each choice inside of a li
        choiceList.querySelector(`.choice-list-item[data-choice='${i}']`).textContent = `${i+1}. ${questions[count].choices[i]}`;
    }
};
var startGame = function(score, count, time) {
    // game logic
    // start count down 
    var timeCountdown = setInterval(function() {
        // if time runs out
        if (time < 1) {
            // leave the startGame func, and clear the timer
            timer.textContent = `Time: Game over`;
            scoreDisplay.textContent = score;
            endGame(score);
            clearInterval(timeCountdown);
        } else {
            // decrease the timer
            time--;
            timer.textContent = `Time: ${time}`;
        }
    }, 1000); // every second
    // if we run out of questions
    if (count >= questions.length) {
        // leave the startGame func, and clear the timer
        timer.textContent = `Time: Game over`;
        scoreDisplay.textContent = score;
        endGame(score);
        clearInterval(timeCountdown);
    } else {
        // if there are still more questions
        displayQuestions(questions, count);
        // if a choice is clicked then run the function
        choiceList.onclick = function(event) {
            var choice = event.target;
            // when a choice is made
            if (choice.matches(`.choice-list-item`)) {
                var choiceNumber = parseInt(choice.getAttribute('data-choice'));
                // check the choice to see if it is equal to the answer
                if (choiceNumber === questions[count].answer) {
                    // if it is correct, update score and update user on the screen
                    score++;
                    result.classList.add('border');
                    result.textContent = `Correct! Score: ${score}`;
                } else {
                    // if it is incorrect, update time with penalty and tell the user on the screen
                    time -= (PENALTY);
                    result.classList.add('border');
                    result.textContent = `Incorrect!`;
                }
            }
            // clear timer, recall startGame with updated values
            clearInterval(timeCountdown);
            startGame(score, count+1, time);
        };
    }
};

// go back button event listener 
buttonReturn.addEventListener('click', goHome);
// clear highscores event listener
buttonClear.addEventListener('click', clearHighScores)
// visit high scores section
highscoresLink.addEventListener('click', displayHighScores);
// main start game button event listener
startGameButton.addEventListener('click', function() {
    // hide homepage
    homePage.classList.add('no-display');
    // remove display none styling from quiz game and result
    quiz.classList.remove('no-display');
    result.classList.remove('no-display');
    // run game logic
    // score, starts at 0, and tracks user score
    // count, starts at 0, and tracks question count
    // time, keeps track of how much time is left
    startGame(score, count, time);
});