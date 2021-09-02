var startGameButton = document.querySelector('#startQuizGame');
var homePage = document.querySelector('#homepage');
var quiz = document.querySelector('#quiz');

// questions array
var questions = [
    {   
        type: 'HTML',
        question: 'Which of the following is not considered an HTML semantic tag?',
        choice1: '<article>',
        choice2: '<part>',
        choice3: '<section>',
        choice4: '<nav>',
    },{
        type: 'HTML',
        question: 'Which of the following is an HTML tag attribute?',   
        choice1: 'display',
        choice2: 'style',
        choice3: 'meta',
        choice4: 'color'
    },{
        type: 'CSS',
        question: 'A container is given a display of flex, which is not a valid value for the justify-content property?',
        choice1: 'center',
        choice2: 'space-between',
        choice3: 'flex-end',
        choice4: 'flex-around'
    },{
        type: 'JavaScript',
        question: 'What is the syntax for a comment is JavaScript?',
        choice1: '//, /**/',
        choice2: '<!-- -->',
        choice3: 'document.comment()',
        choice4: 'var comment = '  
    },{
        type: 'CSS',
        question: 'How can we select this tag "<h2 id="header2" class="article-title">Title of Artitle</h2>"?',
        choice1: '#TitleofArticle',
        choice2: '.h2',
        choice3: '.article-title',
        choice4: 'header2'
    },{
        type: 'JavaScript',
        question: 'What is the value of "z" in the following code? \n var x = "3";\nvar y = "3";\n var z = x + y;',
        choice1: 'undefined',
        choice2: '9',
        choice3: '6',
        choice4: '33'
    },{
        type: 'HTML',
        question: 'Which element is an inline HTML element?',
        choice1: '<div>',
        choice2: '<form>',
        choice3: '<img>',
        choice4: '<nav>'
    },{
        type: 'JavaScript',
        question: 'Which is not a object in JavaScript?',
        choice1: 'window',
        choice2: 'for',
        choice3: 'MATH',
        choice4: 'document'
    },{
        type: 'HTML',
        question: 'Where should you link your external stylesheet in your HTML file?',
        choice1: 'at the bottom of the <body> tag',
        choice2: 'at the very top of the file',
        choice3: 'at the top of the <body> tag',
        choice4: 'at the bottom of the <head> tag'
    },{
        type: 'CSS',
        question: 'How do you reference a variable in CSS?',
        choice1: 'var(--variable-name)',
        choice2: 'variable-name',
        choice3: '.variable-name',
        choice4: '#variable-name'
    }];


var startGame = function() {
    homepage.classList.add('no-display');
    quiz.classList.remove('no-display');
    // game logic
    for (var i=0;i<questions.length;i++) {
        console.log(questions[i]);
    }
};

startGameButton.addEventListener('click', startGame);