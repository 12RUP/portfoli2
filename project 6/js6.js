document.addEventListener('DOMContentLoaded', () => {
    let score = 0;
    let timeLeft = 30;
    let timerId;
    let showMoleTimeout;

    const scoreElement = document.getElementById('score');
    const timeLeftElement = document.getElementById('timeLeft');
    const startButton = document.getElementById('startButton');
    const timeButtons = document.querySelectorAll('.time-button');
    const moles = document.querySelectorAll('.mole');

    const modal = document.getElementById('gameOverModal');
    const closeModal = document.querySelector('.close');
    const finalScoreElement = document.getElementById('finalScore');
    const playAgainButton = document.getElementById('playAgainButton');

    // Initialize event listeners
    startButton.addEventListener('click', startGame);
    timeButtons.forEach(button => button.addEventListener('click', handleTimeSelection));
    closeModal.addEventListener('click', closeModalWindow);
    playAgainButton.addEventListener('click', closeModalWindow);

    function startGame() {
        resetGame();
        updateScore();
        updateTimeLeft();

        timerId = setInterval(countdown, 1000);
        showMole();
    }

    function resetGame() {
        score = 0;
        timeLeft = parseInt(document.querySelector('.time-button.active').dataset.time, 10);
        clearInterval(timerId);
        clearTimeout(showMoleTimeout);
        moles.forEach(mole => mole.classList.remove('show'));
        closeModalWindow();
    }

    function handleTimeSelection(event) {
        timeButtons.forEach(button => button.classList.remove('active'));
        event.target.classList.add('active');
        timeLeft = parseInt(event.target.dataset.time, 10);
        updateTimeLeft();
    }

    function updateScore() {
        scoreElement.textContent = `Score: ${score}`;
    }

    function updateTimeLeft() {
        timeLeftElement.textContent = `Time left: ${timeLeft}s`;
    }

    function countdown() {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimeLeft();
        } else {
            endGame();
        }
    }

    function endGame() {
        clearInterval(timerId);
        clearTimeout(showMoleTimeout);
        finalScoreElement.textContent = `Your score is ${score}`;
        showModal();
    }

    function showModal() {
        modal.style.display = 'flex';
    }

    function closeModalWindow() {
        modal.style.display = 'none';
    }

    function showMole() {
        const randomMole = getRandomMole();
        randomMole.classList.add('show');
        randomMole.addEventListener('click', hitMole, { once: true });

        showMoleTimeout = setTimeout(() => {
            randomMole.classList.remove('show');
            if (timeLeft > 0) showMole();
        }, getRandomTime(600, 1200));
    }

    function hitMole(event) {
        if (!event.target.classList.contains('show')) return;

        score++;
        updateScore();
        event.target.classList.remove('show');
    }

    function getRandomMole() {
        const index = Math.floor(Math.random() * moles.length);
        return moles[index];
    }

    function getRandomTime(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});
