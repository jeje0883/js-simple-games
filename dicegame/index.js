// Function to roll a dice (random number between 1 and 6)
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Function to update the dice display for players
function displayDice(player1Roll, player2Roll) {
    document.getElementById('player1Dice').textContent = `🎲 ${player1Roll}`;
    document.getElementById('player2Dice').textContent = `🎲 ${player2Roll}`;
}

// Function to determine the winner
function determineWinner(player1Roll, player2Roll) {
    if (player1Roll > player2Roll) {
        return "Player 1 Wins!";
    } else if (player2Roll > player1Roll) {
        return "Player 2 Wins!";
    } else {
        return "It's a Draw!";
    }
}

// Event listener for the "Roll Dice" button
document.getElementById('rollDiceButton').addEventListener('click', function() {
    // Roll dice for both players
    const player1Roll = rollDice();
    const player2Roll = rollDice();

    // Update dice display
    displayDice(player1Roll, player2Roll);

    // Determine the winner
    const winner = determineWinner(player1Roll, player2Roll);

    // Display the winner
    document.getElementById('winner').textContent = winner;
});
