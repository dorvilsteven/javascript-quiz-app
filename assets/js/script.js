var startGameButton = document.querySelector('#startQuizGame');
var homePage = document.querySelector('#homepage');
var quiz = document.querySelector('#quiz');
var questionEl = document.querySelector('#question-div');
var questionTitle = questionEl.querySelector('.question-title');
var choicesEl = document.querySelector('#choices-div');
var choiceList = choicesEl.querySelector('.choice-list');

var score = 0;
var time = 90;
 

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
        question: 'What is the value of "z" in the following code? \n var x = "3";\nvar y = "3";\n var z = x + y;',
        choices: ['undefined','9','6','33'],
        answer: 3
    },{
        type: 'HTML',
        question: 'Which element is an inline HTML element?',
        choices: ['<div>','<form>','<img>','<nav>'],
        asnwer: 2
    },{
        type: 'JavaScript',
        question: 'Which is not a object in JavaScript?',
        choices: ['window','for','MATH','document'],
        asnwer: 1
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

var startTimer = function() {
    
}

// function takes in questions array
var displayQuestions = function(questions, count) {
    // displays the question  
    questionTitle.textContent = questions[count].question;
    // loops through each objects choices array
    for (var i=0;i<questions[count].choices.length;i++) {
        // display each choice inside of a li
        choiceList.querySelector(`.choice-list-item[data-choice='${i}']`).textContent = questions[count].choices[i];
    }
    choiceList.addEventListener('click', function(event) {
        var choice = event.target;
        if (choice.matches(`.choice-list-item`)) {
            var choiceNumber = choice.getAttribute('data-choice');
            if (choiceNumber === questions[count].answer.toString()) {
                console.log('correct');
                score += 1;
                displayQuestions(questions, count+1);
            } else {
                console.log('incorrect');
            }
        }
    });
}

var startGame = function() {
    homePage.classList.add('no-display');
    quiz.classList.remove('no-display');
    // game logic
    // startTimer();
    // display each question
    displayQuestions(questions, 0);


};

startGameButton.addEventListener('click', startGame);