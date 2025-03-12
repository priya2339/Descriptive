let questions = [];

async function loadQuestions() {
    let response = await fetch('questions.json');
    questions = await response.json();
}

async function startInterview() {
    await loadQuestions();
    let topic = document.getElementById('topic').value;
    
    let filteredQuestions = questions.filter(q => q.topic === topic);
    if (filteredQuestions.length === 0) return;
    
    let randomQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

    document.getElementById('question-box').style.display = 'block';
    document.getElementById('question').innerText = randomQuestion.question;
    document.getElementById('question').setAttribute('data-answer', randomQuestion.answer);
    document.getElementById('answer').value = '';
    document.getElementById('feedback').innerText = '';
}


function submitAnswer() {
    let userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    let correctAnswer = document.getElementById('question').getAttribute('data-answer').toLowerCase();

    let userWords = userAnswer.split(/\s+/);
    let correctWords = correctAnswer.split(/\s+/);

    let matchCount = userWords.filter(word => correctWords.includes(word)).length;
    let feedback = '';

    if (matchCount >= 3) {
        feedback = "Excellent! You captured the main idea and provided a strong response. Keep up the good work!";
    } else if (matchCount === 2) {
        feedback = "Great job! You included key points, but try to provide a bit more explanation or details.";
    } else if (matchCount === 1) {
        feedback = "Good attempt! You mentioned an important word, but your explanation is too brief. Try to elaborate.";
    } else {
        feedback = "Your answer needs improvement. It seems like you missed the key concepts. Review the topic and try again!";
    }

    document.getElementById('feedback').innerText = feedback;
}
