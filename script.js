// For simplicity, use local storage for user credentials
const users = {
    user1: 'password1',
    user2: 'password2'
};

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        sessionStorage.setItem('loggedInUser', username);
        window.location.href = 'test.html';
    } else {
        alert('Invalid username or password');
    }
});

// Function to load PDF pages (mockup function)
function loadTestPages(numPages) {
    const container = document.getElementById('test-container');
    for (let i = 1; i <= numPages; i++) {
        const pageDiv = document.createElement('div');
        pageDiv.className = 'test-page';
        pageDiv.innerHTML = `<h2>Page ${i}</h2><iframe src="pdf/page${i}.pdf" width="100%" height="500px"></iframe><br>`;
        const inputLabel = document.createElement('label');
        inputLabel.textContent = `Answer (Page ${i}):`;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.name = `answer-page-${i}`;
        pageDiv.appendChild(inputLabel);
        pageDiv.appendChild(inputField);
        container.appendChild(pageDiv);
    }
}

// Timer function
let totalPages = 60;
let timeLimit = 60; // in minutes
let currentTime = timeLimit * 60; // convert to seconds
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        currentTime--;
        let minutes = Math.floor(currentTime / 60);
        let seconds = currentTime % 60;
        document.getElementById('time').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            submitTest();
        }
    }, 1000);
}

// Function to submit the test (mockup function)
function submitTest() {
    alert('Time is up! Test submitted.');
    // Logic to save the answers in a database
}

// On page load
document.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('loggedInUser')) {
        window.location.href = 'index.html';
    } else {
        loadTestPages(totalPages);
        startTimer();
    }
});

document.getElementById('submit-test').addEventListener('click', submitTest);
