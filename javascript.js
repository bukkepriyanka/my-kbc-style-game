// JavaScript for KBC Style Game
console.log("KBC Style Game Loaded!"); // This will log a message in the console when the page loads

// Initialize state variables
const questions = [
    {
        question: "What is the capital of France?",
        options: { a: "Berlin", b: "Madrid", c: "Paris", d: "Rome" },
        answer: "c"
    },
    {
        question: "What is 2 + 2?",
        options: { a: "3", b: "4", c: "5", d: "6" },
        answer: "b"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: { a: "Earth", b: "Mars", c: "Jupiter", d: "Saturn" },
        answer: "b"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: { a: "Atlantic", b: "Indian", c: "Arctic", d: "Pacific" },
        answer: "d"
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: { a: "Charles Dickens", b: "William Shakespeare", c: "Leo Tolstoy", d: "Mark Twain" },
        answer: "b"
    }
];

let currentQuestionIndex = 0;
let playerName = localStorage.getItem('playerName') || '';
let correctAnswers = 0; // Track the number of correct answers

// Check for player's name in localStorage and update UI
if (playerName) {
    document.getElementById('message').innerHTML = `Welcome back to the KBC Style Game, ${playerName}! Good luck!`;
    document.getElementById('joinGame').style.display = 'block'; // Show join button
}

// Player submits their name
document.getElementById('submitName').addEventListener('click', function() {
    const enteredName = document.getElementById('playerName').value.trim();
    const messageElement = document.getElementById('message');

    if (enteredName) {
        localStorage.setItem('playerName', enteredName); // Store player's name in localStorage
        playerName = enteredName; // Update playerName
        messageElement.innerHTML = `Welcome to the KBC Style Game, ${playerName}! Good luck!`;
        document.getElementById('playerName').value = ''; // Clear the input field
        document.getElementById('joinGame').style.display = 'block'; // Show join button
    } else {
        messageElement.innerHTML = 'Please enter your name!';
    }
});

// Show the question section when the game is joined
document.getElementById('joinGame').addEventListener('click', function() {
    document.getElementById('questionSection').style.display = 'block'; // Show question section
    displayQuestion(); // Display the first question
});

// Function to display the next question
function displayQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        document.getElementById('question').innerText = currentQuestion.question;

        const optionsElement = document.getElementById('options');
        optionsElement.innerHTML = ''; // Clear previous options

        for (const [key, value] of Object.entries(currentQuestion.options)) {
            const optionButton = document.createElement('button');
            optionButton.innerText = `${key}: ${value}`;
            optionButton.onclick = function() {
                validateAnswer(key); // Validate the selected answer
            };
            optionsElement.appendChild(optionButton);
        }
        document.getElementById('nextQuestion').style.display = 'none'; // Hide the next button
    } else {
        endGame(); // End the game if there are no more questions
    }
}

// Validate the selected answer
function validateAnswer(selected) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selected === currentQuestion.answer) {
        correctAnswers++;
        document.getElementById('message').innerHTML = `Congratulations ${playerName}, your answer is correct!`;
        setTimeout(() => {
            currentQuestionIndex++;
            displayQuestion(); // Move to next question
        }, 2000); // Delay before moving to next question
    } else {
        alert("Wrong answer. The correct answer was " + currentQuestion.answer + ".");
    }
}

// End the game and show completion message
function endGame() {
    document.getElementById('questionSection').style.display = 'none'; // Hide question section
    alert(`Game Over! ${playerName}, you answered ${correctAnswers} questions correctly.`);
}
