var startGameButton = document.querySelector('#startQuizGame');
var homePage = document.querySelector('#homepage');
var quiz = document.querySelector('#quiz');

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

var displayQuestions = function(question) {
    // create question div
    var questionEl = document.createElement('div');
    var h1El = document.createElement('h1');
    h1El.textContent = question.question;
    questionEl.appendChild(h1El);
    quiz.appendChild(questionEl);

    // create answer list div
    var answersEl = document.createElement('div');
    var answerList = document.createElement('ul');
    for (var i=0;i<4;i++) {
        var listEl = document.createElement('li');
        var choice = question.choices[i];
        listEl.textContent = choice;
        answerList.appendChild(listEl);
    }
    answersEl.appendChild(answerList);
    quiz.appendChild(answersEl);
}
var startGame = function() {
    homepage.classList.add('no-display');
    quiz.classList.remove('no-display');
    // game logic
    for (var i=0;i<questions.length;i++) {
        displayQuestions(questions[i]);
    }
};

startGameButton.addEventListener('click', startGame);