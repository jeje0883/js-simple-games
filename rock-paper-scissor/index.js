document.addEventListener('DOMContentLoaded', () => {
    const choices = ['ROCK', 'PAPER', 'SCISSOR'];
    const choiceButtons = document.querySelectorAll('.choice-button');
    const roundsSelect = document.getElementById('rounds');
    const goButton = document.getElementById('go-button');
    const userScoreSpan = document.getElementById('user-score');
    const computerScoreSpan = document.getElementById('computer-score');
    const userChoiceSpan = document.getElementById('user-choice');
    const computerChoiceSpan = document.getElementById('computer-choice');
    const resultText = document.getElementById('result');

    let userScore = 0;
    let computerScore = 0;
    let rounds = parseInt(roundsSelect.value);
    let currentRound = 0;
    let userChoice = '';

    // Update rounds when selection changes
    roundsSelect.addEventListener('change', () => {
        rounds = parseInt(roundsSelect.value);
        resetGame();
    });

    // Handle user choice
    choiceButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Highlight selected button
            choiceButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            userChoice = button.getAttribute('data-choice');
            userChoiceSpan.textContent = userChoice;
        });
    });

    // Start the game by attaching the playRound function to the Go button
    goButton.addEventListener('click', playRound);

    function playRound() {
        if (!userChoice) {
            resultText.textContent = 'Please make a choice!';
            return;
        }

        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        computerChoiceSpan.textContent = computerChoice;

        const winner = determineWinner(userChoice, computerChoice);
        updateScore(winner);

        currentRound++;

        // Display the result
        resultText.textContent = `Round ${currentRound} Result: ${winner}`;

        if (currentRound >= rounds) {
            declareFinalWinner();
            goButton.textContent = 'Restart Game';
            // Update the event listener
            goButton.removeEventListener('click', playRound);
            goButton.addEventListener('click', resetGame);
        } else {
            goButton.textContent = 'Next Round';
            // Update the event listener
            goButton.removeEventListener('click', playRound);
            goButton.addEventListener('click', nextRound);
        }
    }

    function nextRound() {
        // Reset for next round
        userChoice = '';
        userChoiceSpan.textContent = '-';
        computerChoiceSpan.textContent = '-';
        resultText.textContent = 'Make your move!';
        choiceButtons.forEach(btn => btn.classList.remove('selected'));
        goButton.textContent = 'Go';

        // Update the event listener
        goButton.removeEventListener('click', nextRound);
        goButton.addEventListener('click', playRound);
    }

    function determineWinner(user, computer) {
        if (user === computer) return "It's a Draw!";
        if (
            (user === 'ROCK' && computer === 'SCISSOR') ||
            (user === 'PAPER' && computer === 'ROCK') ||
            (user === 'SCISSOR' && computer === 'PAPER')
        ) {
            return 'You Win!';
        }
        return 'Computer Wins!';
    }

    function updateScore(winner) {
        if (winner === 'You Win!') {
            userScore++;
            userScoreSpan.textContent = userScore;
        } else if (winner === 'Computer Wins!') {
            computerScore++;
            computerScoreSpan.textContent = computerScore;
        }
    }

    function declareFinalWinner() {
        if (userScore > computerScore) {
            resultText.textContent = `Game Over: You are the Champion! 🏆`;
        } else if (computerScore > userScore) {
            resultText.textContent = `Game Over: Computer is the Champion! 🏆`;
        } else {
            resultText.textContent = `Game Over: It's a Tie!`;
        }
    }

    function resetGame() {
        userScore = 0;
        computerScore = 0;
        currentRound = 0;
        userChoice = '';
        userScoreSpan.textContent = userScore;
        computerScoreSpan.textContent = computerScore;
        userChoiceSpan.textContent = '-';
        computerChoiceSpan.textContent = '-';
        resultText.textContent = 'Make your move!';
        goButton.textContent = 'Go';
        choiceButtons.forEach(btn => btn.classList.remove('selected'));

        // Update the event listener
        goButton.removeEventListener('click', resetGame);
        goButton.addEventListener('click', playRound);
    }
});
