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
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: ''
    },{
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: ''  
    },{
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: ''
    },{
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: ''
    },{
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: ''
    },{
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: ''
    },{
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: ''
    },{
        question: '',
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: ''
    }];
// console.log(questions[0].answer);
var startGame = function() {
    homepage.classList.add('no-display');
    quiz.classList.remove('no-display');
    // game logic
    
};

startGameButton.addEventListener('click', startGame);