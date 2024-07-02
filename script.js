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
        sessionStorage.setItem('currentPage', 1);
        window.location.href = 'test.html';
    } else {
        alert('Invalid username or password');
    }
});

function loadTestPage(pageNumber) {
    const container = document.getElementById('test-container');
    container.innerHTML = ''; // Clear previous content

    const pageDiv = document.createElement('div');
    pageDiv.className = 'test-page';
    pageDiv.innerHTML = `<h2>Page ${pageNumber}</h2><iframe src="pdf/page${pageNumber}.pdf" width="100%" height="500px"></iframe><br>`;
    
    const inputLabel = document.createElement('label');
    inputLabel.textContent = `Answer (Page ${pageNumber}):`;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.name = `answer-page-${pageNumber}`;
    
    pageDiv.appendChild(inputLabel);
    pageDiv.appendChild(inputField);
    container.appendChild(pageDiv);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', () => {
        const answer = inputField.value;
        sessionStorage.setItem(`answer-page-${pageNumber}`, answer);
        const nextPageNumber = pageNumber + 1;
        if (nextPageNumber <= totalPages) {
            sessionStorage.setItem('currentPage', nextPageNumber);
            loadTestPage(nextPageNumber);
        } else {
            submitTest();
        }
    });
    container.appendChild(nextButton);
}

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

function submitTest() {
    alert('Time is up! Test submitted.');
    const answers = {};
    for (let i = 1; i <= totalPages; i++) {
        answers[`page-${i}`] = sessionStorage.getItem(`answer-page-${i}`);
    }
    console.log('Answers:', answers);
    // Logic to save the answers in a database
}

document.addEventListener('DOMContentLoaded', function() {
    if (!sessionStorage.getItem('loggedInUser')) {
        window.location.href = 'index.html';
    } else {
        const currentPage = parseInt(sessionStorage.getItem('currentPage')) || 1;
        loadTestPage(currentPage);
        startTimer();
    }
});
