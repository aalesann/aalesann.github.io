const questions = [
    {
        question: "¿Qué significa las siglas CIA en seguridad de la información?",
        answers: [
            { text: "Central Intelligence Agency", correct: false },
            { text: "Confidentiality, Integrity, Availability", correct: true },
            { text: "Control, Inspection, Audit", correct: false },
            { text: "Computer Internet Access", correct: false }
        ]
    },
    {
        question: "¿Cuál de las siguientes es una buena práctica para contraseñas?",
        answers: [
            { text: "Usar la misma contraseña en todos los sitios", correct: false },
            { text: "Escribirla en un post-it en el monitor", correct: false },
            { text: "Usar un gestor de contraseñas y MFA", correct: true },
            { text: "Cambiarla solo cuando sea hackeada", correct: false }
        ]
    },
    {
        question: "¿Qué es el Phishing?",
        answers: [
            { text: "Un tipo de pez digital", correct: false },
            { text: "Técnica de ingeniería social para robar credenciales", correct: true },
            { text: "Un virus que borra el disco duro", correct: false },
            { text: "Un ataque de denegación de servicio", correct: false }
        ]
    },
    {
        question: "¿Qué puerto usa HTTPS por defecto?",
        answers: [
            { text: "80", correct: false },
            { text: "21", correct: false },
            { text: "443", correct: true },
            { text: "22", correct: false }
        ]
    },
    {
        question: "¿Qué es un ataque DDoS?",
        answers: [
            { text: "Distributed Denial of Service", correct: true },
            { text: "Direct Download of Software", correct: false },
            { text: "Data Destruction on Server", correct: false },
            { text: "Digital Defense of Systems", correct: false }
        ]
    },
    {
        question: "¿Qué herramienta se usa comúnmente para escaneo de puertos?",
        answers: [
            { text: "Photoshop", correct: false },
            { text: "Nmap", correct: true },
            { text: "Word", correct: false },
            { text: "Excel", correct: false }
        ]
    },
    {
        question: "¿Qué es SQL Injection?",
        answers: [
            { text: "Instalar una base de datos SQL", correct: false },
            { text: "Insertar código malicioso en una consulta a base de datos", correct: true },
            { text: "Optimizar una consulta lenta", correct: false },
            { text: "Borrar tablas accidentalmente", correct: false }
        ]
    },
    {
        question: "¿Qué significa VPN?",
        answers: [
            { text: "Very Private Network", correct: false },
            { text: "Virtual Private Network", correct: true },
            { text: "Visual Protocol Node", correct: false },
            { text: "Verified Public Network", correct: false }
        ]
    },
    {
        question: "¿Qué es un Firewall?",
        answers: [
            { text: "Un antivirus", correct: false },
            { text: "Un sistema que controla el tráfico de red entrante y saliente", correct: true },
            { text: "Un programa para quemar CDs", correct: false },
            { text: "Un tipo de malware", correct: false }
        ]
    },
    {
        question: "¿Qué es un Zero-Day?",
        answers: [
            { text: "Un día festivo para hackers", correct: false },
            { text: "Una vulnerabilidad recién descubierta sin parche disponible", correct: true },
            { text: "El primer día de un proyecto", correct: false },
            { text: "Un ataque que dura 0 días", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const progressText = document.getElementById('progress');
const scoreDisplay = document.getElementById('score-display');
const restartBtn = document.getElementById('restart-btn');
const quizContent = document.getElementById('quiz-content');
const finalResult = document.getElementById('final-result');
const finalScoreText = document.getElementById('final-score-text');
const finalMessage = document.getElementById('final-message');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreDisplay.innerText = `Puntaje: ${score}`;
    quizContent.style.display = 'block';
    finalResult.style.display = 'none';
    restartBtn.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionText.innerText = currentQuestion.question;
    progressText.innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answersContainer.appendChild(button);
    });
}

function resetState() {
    while (answersContainer.firstChild) {
        answersContainer.removeChild(answersContainer.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
        scoreDisplay.innerText = `Puntaje: ${score}`;
    } else {
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }, 1500);
}

function showScore() {
    quizContent.style.display = 'none';
    finalResult.style.display = 'block';
    restartBtn.style.display = 'block';

    finalScoreText.innerText = `Tu puntaje final es ${score} de ${questions.length}`;

    if (score === 10) {
        finalMessage.innerText = "¡Excelente! Eres un experto en seguridad.";
        finalMessage.style.color = "var(--accent)";
    } else if (score >= 7) {
        finalMessage.innerText = "¡Muy bien! Tienes buenos conocimientos.";
        finalMessage.style.color = "var(--primary)";
    } else {
        finalMessage.innerText = "Sigue practicando. ¡No te rindas!";
        finalMessage.style.color = "var(--danger)";
    }
}

restartBtn.addEventListener('click', startQuiz);

startQuiz();
