const boardSize = 10; // Number of tiles in one row/column
const board = document.getElementById('board');
const status = document.getElementById('status');
const playerCoins = { 1: document.getElementById('coin1'), 2: document.getElementById('coin2'), 3: document.getElementById('coin3') };
const playerPositions = { 1: 1, 2: 1, 3: 1 }; // Start positions are 1
let currentPlayer = 1; // Track the current player
let isRolling = false; // Prevent multiple rolls during a turn
const player1 = document.getElementById('player1RollBtn');
const player2 = document.getElementById('player2RollBtn');
const player3 = document.getElementById('player3RollBtn');
player1.disabled = true;
player2.disabled = true;
player3.disabled = true;

// Snakes and Ladders positions
const snakesAndLadders = {
    // Snakes: Start -> End
    27: 5,
    40: 3,
    43: 18,
    54: 31,
    66: 45,
    76: 58,
    89: 53,
    99: 41,

    // Ladders: Start -> End
    4: 25,
    13: 46,
    42: 63,
    50: 69,
    62: 81,
    74: 92
};

// Generate the board tiles
for (let i = 1; i <= boardSize * boardSize; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    board.appendChild(tile);
}

// Dice face mappings
const diceFaces = {
    1: [4],                 // Center dot
    2: [0, 8],              // Top-left and bottom-right
    3: [0, 4, 8],           // Diagonal
    4: [0, 2, 6, 8],        // Corners
    5: [0, 2, 4, 6, 8],     // Corners + Center
    6: [0, 1, 2, 6, 7, 8]   // Two rows of dots
};

// Render dice dots
function renderDice(number) {
    const dice = document.getElementById('dice');
    dice.innerHTML = ''; // Clear existing dots

    // Create the 3x3 grid for dice dots
    for (let i = 0; i < 9; i++) {
        const dotContainer = document.createElement('div');
        dotContainer.className = 'dot-container'; // Ensure alignment
        if (diceFaces[number].includes(i)) {
            const dot = document.createElement('div');
            dot.className = 'dot'; // Add dot only for valid indices
            dotContainer.appendChild(dot);
        }
        dice.appendChild(dotContainer);
    }
}

// Roll the dice and update the player's position
function rollDice(player) {
    if (player !== currentPlayer || isRolling) {
        status.innerText = `It's Player ${currentPlayer}'s turn!`;
        return;
    }

    isRolling = true; // Lock the roll action

    const dice = document.getElementById('dice');
    dice.classList.add('rolling'); // Add rolling animation

    setTimeout(() => {
        const result = Math.floor(Math.random() * 6) + 1; // Random dice roll
        renderDice(result); // Render dice face
        dice.classList.remove('rolling');

        let newPosition = playerPositions[player] + result;

        // Check if the player moves beyond the last tile
        if (newPosition > boardSize * boardSize) {
            newPosition = playerPositions[player]; // Stay in the same position
        }

        // Check for snakes or ladders
        const finalPosition = snakesAndLadders[newPosition] || newPosition;
        if (snakesAndLadders[newPosition]) {
            const type = finalPosition > newPosition ? 'ladder' : 'snake';
            status.innerText = `Player ${player} rolled ${result}, moved to ${newPosition}, and took a ${type} to ${finalPosition}.`;
        } else {
            status.innerText = `Player ${player} rolled ${result} and moved to position ${newPosition}.`;
        }

        moveCoin(player, finalPosition); // Move the player's coin
        playerPositions[player] = finalPosition; // Update the player's position

        // Check for win condition
        if (finalPosition === 100) {
            status.innerText = `Player ${player} wins! Game over.`;
            isRolling = false; // Unlock roll action
            return; // Stop the game
        }

        // Switch to the next player
        currentPlayer = currentPlayer === 3 ? 1 : currentPlayer + 1;
        status.innerText += ` Player ${currentPlayer}'s turn.`;
        isRolling = false; // Unlock roll action
    }, 500);
}

// Move the coin to a specific position on the board
function moveCoin(player, newPosition) {
    const coin = playerCoins[player];

    // Calculate row and column based on board size
    const row = Math.floor((newPosition - 1) / boardSize);
    const col = (newPosition - 1) % boardSize;

    // Adjust for alternating direction rows
    const x = (row % 2 === 0) ? col : boardSize - 1 - col;
    const y = boardSize - 1 - row;

    // Translate coin position using CSS transform
    coin.style.transform = `translate(${x * 40}px, ${y * 40}px)`; // Tiles are 40px wide
}

// Add event listeners for player rolls
player1.addEventListener('click', () => rollDice(1));
player2.addEventListener('click', () => rollDice(2));
player3.addEventListener('click', () => rollDice(3));

// Start game functionality
document.getElementById('startGameBtn').addEventListener('click', () => {
	player1.disabled = false;
	player2.disabled = false;
	player3.disabled = false;
    status.innerText = "Game started! Player 1's turn.";
    playerPositions[1] = 1;
    playerPositions[2] = 1;
    playerPositions[3] = 1;
    currentPlayer = 1; // Reset to Player 1's turn
    moveCoin(1, 1); // Reset player 1 position
    moveCoin(2, 1); // Reset player 2 position
    moveCoin(3, 1); // Reset player 3 position
    renderDice(1); // Initialize dice with face 1
});

// Initialize dice with a random face on page load
document.addEventListener('DOMContentLoaded', () => {
    renderDice(1); // Render dice face 1 initially
});
