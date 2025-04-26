let currentLevel = parseInt(localStorage.getItem('currentLevel')) || 1;
let earnings = parseFloat(localStorage.getItem('earnings')) || 0;
let timer;
let timeLeft = 30;

let puzzles = [
    { question: "What is 2 + 2?", answer: "4" },
    { question: "What color is the sky?", answer: "blue" },
    { question: "Spell 'DOG' backwards.", answer: "god" },
    { question: "What is 6 x 7?", answer: "42" },
    { question: "What comes after Sunday?", answer: "monday" },
    { question: "How many legs does a spider have?", answer: "8" },
    { question: "Find the missing number: 2, 4, 6, ?", answer: "8" },
    { question: "First letter of English alphabet?", answer: "a" },
    { question: "Opposite of 'hot'?", answer: "cold" },
    { question: "5 + 10?", answer: "15" }
];

// Auto-generate puzzles till 50
while (puzzles.length < 50) {
    let rand = Math.floor(Math.random() * 50) + 1;
    puzzles.push({ question: `What is ${rand} + ${rand}?`, answer: (rand + rand).toString() });
}

puzzles = puzzles.sort(() => Math.random() - 0.5);

function loadPuzzle() {
    if (currentLevel > 50) {
        document.getElementById('puzzle-container').innerHTML = "<h2>Congratulations! You've completed all levels!</h2>";
        document.getElementById('submit-btn').style.display = "none";
        document.getElementById('timer').style.display = "none";
        return;
    }

    document.getElementById('level-info').innerText = `Level: ${currentLevel} | Earnings: $${earnings}`;
    document.getElementById('puzzle-container').innerHTML = `
        <h2>${puzzles[currentLevel - 1].question}</h2>
        <input type="text" id="answer" placeholder="Enter your answer">
    `;
    startTimer();
}

function checkAnswer() {
    let userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    if (userAnswer === puzzles[currentLevel - 1].answer.toLowerCase()) {
        clearInterval(timer);

        let bonus = timeLeft > 15 ? 0.5 : 0; // Bonus for fast answers
        earnings += 1 + bonus;
        earnings = Math.round(earnings * 100) / 100;
        currentLevel += 1;

        saveProgress();
        showAd();
    } else {
        alert("Incorrect! Try again.");
    }
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Try again.");
            loadPuzzle();
        }
    }, 1000);
}

function saveProgress() {
    localStorage.setItem('currentLevel', currentLevel);
    localStorage.setItem('earnings', earnings);
}

function showAd() {
    document.getElementById('ad-popup').classList.remove('hidden');
}

function closeAd() {
    document.getElementById('ad-popup').classList.add('hidden');
    setTimeout(() => {
        loadPuzzle();
    }, 200);
}

// Start game
loadPuzzle();
