document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const resultContainer = document.getElementById('result-container');
    const resultMessage = document.getElementById('result-message');
    const newGameButton = document.getElementById('new-game-button');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function renderBoard() {
        board.innerHTML = '';
        gameBoard.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.dataset.index = index;
            cellElement.textContent = cell;
            cellElement.addEventListener('click', handleCellClick);
            board.appendChild(cellElement);
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            checkWinner();
            togglePlayer();
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                showResult(`Player ${currentPlayer} wins!`);
            }
        }

        if (!gameBoard.includes('') && gameActive) {
            gameActive = false;
            showResult('It\'s a draw!');
        }
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultContainer.style.display = 'block';
    }

    function resetGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        resultContainer.style.display = 'none';
        renderBoard();
    }

    newGameButton.addEventListener('click', resetGame);

    renderBoard();
});
