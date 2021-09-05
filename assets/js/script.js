// time penalty
var PENALTY = 10;

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
var scoresList = document.querySelector('#scores-list');
var scoreSubmit = document.getElementById('score-submit');
var buttonReturn = document.querySelector('#button-return');
var buttonClear = document.querySelector('#button-clear');

// text that dsplays time and score
var timer = document.querySelector('#timerText');
var scoreDisplay = document.querySelector('#score');


var score = 0;
var count = 0;
var time = 60;

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
  highScores.classList.add('no-display');
  endResult.classList.add('no-display');
  main.classList.remove('no-display');
  homePage.classList.remove('no-display');  
};

var displayHighScores = function() {
    main.classList.add('no-display');
    highScores.classList.remove('no-display');
    
    var list = JSON.parse(localStorage.getItem('scores')) || [];
    
    if (scoresList.childElementCount === 0) {
        for (var i=0;i<list.length;i++) {
            var listItem = document.createElement('li');
            listItem.classList.add('highscores-list-item');
            listItem.setAttribute('id', i);
            listItem.textContent = `${i}. ${list[i].initials} - ${list[i].score}`;
            scoresList.appendChild(listItem);
        }
    }
};

var clearHighScores = function() {
    localStorage.removeItem('scores');
    
};

var addToLocalStorage = function(score) {
    var list = JSON.parse(localStorage.getItem('scores')) || [];
    list.push({
            initials: 'name',
            score: score
    });
    localStorage.setItem('scores', JSON.stringify(list));
    displayHighScores();
};
var endGame = function(score) {
    quiz.classList.add('no-display');
    result.classList.add('no-display');
    endResult.classList.remove('no-display');
    scoreSubmit.onclick = function() {
        addToLocalStorage(score);
    }
};

// function takes in questions array
var displayQuestions = function(questions, count) {
    // displays the question  
    questionTitle.textContent = questions[count].question;
    // loops through each objects choices array
    for (var i=0;i<questions[count].choices.length;i++) {
        // display each choice inside of a li
        choiceList.querySelector(`.choice-list-item[data-choice='${i}']`).textContent = `${i}. ${questions[count].choices[i]}`;
    }
};
var startGame = function(score, count, time) {
    // game logic
    var timeCountdown = setInterval(function() {
        if (time < 1 || count >= questions.length) {
            // debugger;
            timer.textContent = `Time: Game over`;
            scoreDisplay.textContent = score;
            clearInterval(timeCountdown);
            endGame(score);
        } else {
            timer.textContent = `Time: ${time}`;
            time--;
        }
    }, 1000);
    displayQuestions(questions, count);
    choiceList.onclick = function(event) {
        var choice = event.target;
        if (choice.matches(`.choice-list-item`)) {
            var choiceNumber = parseInt(choice.getAttribute('data-choice'));
            if (choiceNumber === questions[count].answer) {
                score++;
                result.classList.add('border');
                result.textContent = `Correct! Score: ${score}`;
            } else {
                time -= (PENALTY - 1);
                result.classList.add('border');
                result.textContent = `Incorrect!`;
            }
        }
        clearInterval(timeCountdown);
        startGame(score, count+1, time);
    };
};


buttonReturn.addEventListener('click', goHome);
buttonClear.addEventListener('click', clearHighScores)
highscoresLink.addEventListener('click', displayHighScores);
startGameButton.addEventListener('click', function() {
    homePage.classList.add('no-display');
    quiz.classList.remove('no-display');
    result.classList.remove('no-display');
    startGame(score, count, time);
});