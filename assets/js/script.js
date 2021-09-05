var PENALTY = 10;
var startGameButton = document.querySelector('#startQuizGame');
var homePage = document.querySelector('#homepage');
var quiz = document.querySelector('#quiz');
var questionEl = document.querySelector('#question-div');
var questionTitle = questionEl.querySelector('.question-title');
var choicesEl = document.querySelector('#choices-div');
var choiceList = choicesEl.querySelector('.choice-list');
var choiceItem = choiceList.querySelectorAll('.choice-list-item');
var timer = document.querySelector('#timerText');
var result = document.querySelector('#choiceResult');
var highscoresLink = document.querySelector('#highscores-link');
var score = 0;
var count = 0;
var time = 60;

// questions array
var questions = [
    {   
        type: 'HTML',
        question: 'Which of the following is not considered an HTML semantic tag?',
        choices: ['<article>','<part>','<section>','<nav>'],
        answer: 1
    },{
        type: 'HTML',
        question: 'Which of the following is an HTML tag attribute?',
        choices: ['display','style','meta','color'],
        answer: 1
    },{
        type: 'CSS',
        question: 'A container is given a display of flex, which is not a valid value for the justify-content property?',
        choices: ['center','space-between','flex-end','flex-around'],
        answer: 3
    },{
        type: 'JavaScript',
        question: 'What is the syntax for a comment is JavaScript?',
        choices: ['//, /**/','<!-- -->','document.comment()','var comment ='],
        answer: 0  
    },{
        type: 'CSS',
        question: 'How can we select this tag "<h2 id="header2" class="article-title">Title of Artitle</h2>"?',
        choices: ['#TitleofArticle','.h2','.article-title','header2'],
        answer: 2
    },{
        type: 'JavaScript',
        question: 'What is the value of "z" in the following code? var x = "3"; var y = "3"; var z = x + y;',
        choices: ['undefined','9','6','33'],
        answer: 3
    },{
        type: 'HTML',
        question: 'Which element is an inline HTML element?',
        choices: ['<div>','<form>','<img>','<nav>'],
        answer: 2
    },{
        type: 'JavaScript',
        question: 'Which is not a object in JavaScript?',
        choices: ['window','for','MATH','document'],
        answer: 1
    },{
        type: 'HTML',
        question: 'Where should you link your external stylesheet in your HTML file?',
        choices: ['at the bottom of the <body> tag','at the very top of the file','at the top of the <body> tag','at the bottom of the <head> tag'],
        answer: 3
    },{
        type: 'CSS',
        question: 'How do you reference a variable in CSS?',
        choices: ['var(--variable-name)','variable-name','.variable-name','#variable-name'],
        answer: 0
}];

var endGame = function(score) {
    quiz.classList.add('no-display');
    var initials;
    result.innerHTML = `<div>
                            <h4>Thanks for playing!</h4>
                            <h6>Your final Score is <span>${score}</span></h6>
                        </div>
                        <div>
                            <form id='resultForm'>
                                <label for="initials">Enter Your Initials</label>
                                <input id="initialValue" type="text" name="initials" />
                                <button type="Submit">Submit</button>
                            </form>
                        </div>`;
    var form = document.querySelector('#resultForm');
    initials = form.querySelector('#initialValue').value;

    console.log(initials);
    result.addEventListener('submit', function(event) {
        event.preventDefault();
        var list = JSON.parse(localStorage.getItem('scores')) || [];
        list.push({
            initials: initials,
            score: score
        });
        console.log(initials, list);
        localStorage.setItem('scores', JSON.stringify(list));
    });
};

// function takes in questions array
var displayQuestions = function(questions, count) {
    // displays the question  
    questionTitle.textContent = questions[count].question;
    // loops through each objects choices array
    for (var i=0;i<questions[count].choices.length;i++) {
        // display each choice inside of a li
        choiceList.querySelector(`.choice-list-item[data-choice='${i}']`).textContent = questions[count].choices[i];
    }
};
var startGame = function(score, count) {
    // game logic
    if (count < questions.length && time > 0) {
        displayQuestions(questions, count);
        choiceList.addEventListener('click', function(event) {
            // event.preventDefault();
            var choice = event.target;
            console.log(choice);
            if (choice.matches(`.choice-list-item`)) {
                var choiceNumber = parseInt(choice.getAttribute('data-choice'));
                if (choiceNumber === questions[count].answer) {
                    score++;
                    result.classList.add('border');
                    result.textContent = `Correct! Score: ${score}`;
                } else {
                    // time -= PENALTY;
                    result.classList.add('border');
                    result.textContent = `Incorrect!`;
                }
            }
            startGame(score, count+1);
        });
    } else {
        endGame(score);
    }
};

var displayHighScores = function() {
    
};

highscoresLink.addEventListener('click', displayHighScores);
startGameButton.addEventListener('click', function() {
    homePage.classList.add('no-display');
    quiz.classList.remove('no-display');
    startGame(score, count);
    var timeCountdown = setInterval(function() {
        if (time > 0) {
            timer.textContent = `Time: ${time}`;
            time--;
        } else {
            timer.textContent = `Time: ${time}`;
            endGame(score);
            clearInterval(timeCountdown);
        }
    }, 1000);
});