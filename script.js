'use strict';

// Generate a random secret number between 1 and 30
let secretNumber = Math.trunc(Math.random() * 30) + 1;
let score = 15; // Initial score
let highscore = 0; // Initial highscore
console.log(secretNumber); // Debugging purpose

// Event listener for the "Check" button
document.querySelector('.check').addEventListener('click', function () {
	// Get the guessed number from the input field
	const guess = Number(document.querySelector('.guess').value);

	// If no guess is entered
	if (!guess) {
		document.querySelector('.message').textContent = 'Please enter a number!';
	}
	// If the guess is correct
	else if (guess === secretNumber) {
		document.querySelector('.message').textContent =
			'Congratulations, you won!';
		document.querySelector('.number').textContent = secretNumber;
		showBalloons(); // Show balloons when the game is won

		// Update highscore if necessary
		if (score > highscore) {
			highscore = score;
			document.querySelector('.highscore').textContent = highscore;
		}
	}
	// If the guess is incorrect
	else {
		if (score > 1) {
			document.querySelector('.message').textContent =
				guess > secretNumber ? 'Too high!' : 'Too low!';
			score--;
			document.querySelector('.score').textContent = score;
		} else {
			document.querySelector('.message').textContent = 'You lost!';
			document.querySelector('.score').textContent = 0;
		}
	}
});

// Function to show floating balloons when the player wins
function showBalloons() {
	const balloonContainer = document.querySelector('.balloon-container');
	balloonContainer.classList.remove('hidden');
	for (let i = 0; i < 20; i++) {
		const balloon = document.createElement('div');
		balloon.className = 'balloon';
		balloon.style.left = `${Math.random() * 100}%`;
		balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
		balloonContainer.appendChild(balloon);
		// Remove balloon after animation
		balloon.addEventListener('animationend', () => balloon.remove());
	}
	// Hide balloon container after 4 seconds
	setTimeout(() => {
		balloonContainer.classList.add('hidden');
	}, 4000);
}

// Event listener for the "Again" button to reset the game
document.querySelector('.again').addEventListener('click', function () {
	// Reset score and secret number
	score = 15;
	secretNumber = Math.trunc(Math.random() * 30) + 1;
	document.querySelector('.message').textContent = 'Guess the number!';
	document.querySelector('.score').textContent = score;
	document.querySelector('.number').textContent = '?';
	document.querySelector('.guess').value = '';
	document.querySelector('.balloon-container').innerHTML = '';
});
