var startGameButton = document.querySelector('#startQuizGame');
var homePage = document.querySelector('#homepage');
var quiz = document.querySelector('#quiz');

var startGame = function() {
    homepage.classList.add('no-display');
    quiz.classList.remove('no-display');
    // game logic
};

startGameButton.addEventListener('click', startGame);