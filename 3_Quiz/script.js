const questions = [
    {
        question: "Which is the best football player in the world?",
        answers: [
            { text: "Lionel Messi", correct: true },
            { text: "Cristiano Ronaldo", correct: false },
            { text: "Neymar jr", correct: false },
            { text: "Lamine Yamal", correct: false },
        ]
    },
    {
        question: "Which country has won the most FIFA World Cups?",
        answers: [
            { text: "Germany", correct: false },
            { text: "Italy", correct: false },
            { text: "Brazil", correct: true },
            { text: "Argentina", correct: false },
        ]
    },
    {
        question: "Who won the Ballon d'Or in 2023?",
        answers: [
            { text: "Erling Haaland", correct: false },
            { text: "Lionel Messi", correct: true },
            { text: "Kylian Mbappé", correct: false },
            { text: "Robert Lewandowski", correct: false },
        ]
    },
    {
        question: "Which football club has the most UEFA Champions League titles?",
        answers: [
            { text: "Barcelona", correct: false },
            { text: "AC Milan", correct: false },
            { text: "Manchester United", correct: false },
            { text: "Real Madrid", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    questionElement.style.display = "block";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Start Quiz" || nextButton.innerHTML === "Play Again!") {
        startQuiz();
    } else {
        handleNextButton();
    }
});
