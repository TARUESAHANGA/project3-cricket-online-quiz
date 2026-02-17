const quizQuestions = {
    // school boy cricket quiz questions
    easy: [
        {
            question: "How many players are there in a cricket team?",
            options: ["9", "10", "11", "12"],
            correct: 2
        },
        {
            question: "What is the maximum number of overs in a One Day International (ODI) match?",
            options: ["20", "40", "50", "60"],
            correct: 2
        },
        {
            question: "How many stumps are there on each end of a cricket pitch?",
            options: ["2", "3", "4", "5"],
            correct: 1
        },
        {
            question: "What is a cricket ball traditionally made of?",
            options: ["Plastic", "Rubber", "Leather", "Wood"],
            correct: 2
        },
        {
            question: "How many runs are awarded for hitting the ball over the boundary without bouncing?",
            options: ["4", "5", "6", "8"],
            correct: 2
        },
        {
            question: "What does LBW stand for in cricket?",
            options: ["Leg Before Wicket", "Leg By Wicket", "Leg Behind Wicket", "Left Before Wicket"],
            correct: 0
        },
        {
            question: "How many bails are placed on top of the stumps?",
            options: ["1", "2", "3", "4"],
            correct: 1
        },
        {
            question: "What is the name of the two players batting at the same time called?",
            options: ["Partners", "Strikers", "Batsmen", "Team"],
            correct: 2
        },
        {
            question: "How many overs are in a T20 match per team?",
            options: ["10", "15", "20", "25"],
            correct: 2
        },
        {
            question: "What color is the cricket ball in Test cricket?",
            options: ["White", "Red", "Pink", "Yellow"],
            correct: 1
        }
    ],

    // club cricket quiz questions
    medium: [
        {
            question: "Who holds the record for the highest individual score in Test cricket?",
            options: ["Brian Lara", "Sachin Tendulkar", "Don Bradman", "Virat Kohli"],
            correct: 0
        },
        {
            question: "In which year was the first Cricket World Cup held?",
            options: ["1971", "1975", "1979", "1983"],
            correct: 1
        },
        {
            question: "What is the term for a bowler taking three wickets in three consecutive balls?",
            options: ["Double Hat-trick", "Hat-trick", "Triple", "Treble"],
            correct: 1
        },
        {
            question: "Which country won the first T20 World Cup in 2007?",
            options: ["Australia", "India", "Pakistan", "England"],
            correct: 1
        },
        {
            question: "What is the distance between the two sets of stumps on a cricket pitch?",
            options: ["18 yards", "20 yards", "22 yards", "24 yards"],
            correct: 2
        },
        {
            question: "Who is known as the 'God of Cricket'?",
            options: ["Ricky Ponting", "Sachin Tendulkar", "Brian Lara", "Jacques Kallis"],
            correct: 1
        },
        {
            question: "Which stadium is known as the 'Home of Cricket'?",
            options: ["MCG", "Lord's", "Eden Gardens", "The Oval"],
            correct: 1
        },
        {
            question: "What is a 'maiden over' in cricket?",
            options: ["First over of the match", "An over with no runs scored", "An over with a wicket", "Last over of the match"],
            correct: 1
        },
        {
            question: "Who holds the record for most wickets in Test cricket?",
            options: ["Shane Warne", "Muttiah Muralitharan", "James Anderson", "Anil Kumble"],
            correct: 1
        },
        {
            question: "What is the maximum width of a cricket bat according to the laws?",
            options: ["4.00 inches", "4.25 inches", "4.50 inches", "5.00 inches"],
            correct: 1
        }
    ],

    // international cricket quiz questions
    hard: [
        {
            question: "Who scored the fastest century in ODI cricket (in terms of balls faced)?",
            options: ["AB de Villiers", "Corey Anderson", "Shahid Afridi", "Chris Gayle"],
            correct: 0
        },
        {
            question: "Which bowler has the best bowling figures in a Test innings?",
            options: ["Jim Laker", "Anil Kumble", "Muttiah Muralitharan", "Bob Massie"],
            correct: 0
        },
        {
            question: "In which year did Don Bradman score his famous 99.94 Test batting average?",
            options: ["1948", "1950", "1952", "1946"],
            correct: 0
        },
        {
            question: "Who was the first cricketer to score 10,000 runs in Test cricket?",
            options: ["Sunil Gavaskar", "Allan Border", "Graham Gooch", "Viv Richards"],
            correct: 0
        },
        {
            question: "What is the maximum length allowed for a cricket bat according to the laws?",
            options: ["36 inches", "38 inches", "40 inches", "42 inches"],
            correct: 1
        },
        {
            question: "Who holds the record for the most consecutive Test matches played?",
            options: ["Allan Border", "Alastair Cook", "Sunil Gavaskar", "AB de Villiers"],
            correct: 0
        },
        {
            question: "Which team scored the highest team total in ODI cricket?",
            options: ["India", "Australia", "England", "South Africa"],
            correct: 2
        },
        {
            question: "Who was the first bowler to take 300 wickets in Test cricket?",
            options: ["Fred Trueman", "Dennis Lillee", "Ian Botham", "Richard Hadlee"],
            correct: 0
        },
        {
            question: "What is the highest successful run chase in Test cricket history?",
            options: ["414", "418", "423", "438"],
            correct: 2
        },
        {
            question: "Who holds the record for most runs in a single IPL season?",
            options: ["Chris Gayle", "David Warner", "Virat Kohli", "AB de Villiers"],
            correct: 2
        }
    ]
};

let currentDifficulty = 'easy';
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let selectedAnswer = null;
let usedLifelines = {
    fiftyFifty: false,
    extraTime: false,
    skipQuestion: false
};
let questionsAnswered = [];

function startQuiz() {
    const startScreen = document.getElementById('startScreen');
    const quizScreen = document.getElementById('quizScreen');
    
    currentQuestionIndex = 0;
    score = 0;
    questionsAnswered = [];
    usedLifelines = {
        fiftyFifty: false,
        extraTime: false,
        skipQuestion: false
    };
    
    startScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    
    loadQuestion();
}

function loadQuestion() {
    const questions = quizQuestions[currentDifficulty];
    const question = questions[currentQuestionIndex];
    
    document.getElementById('questionText').textContent = question.question;
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = questions.length;
    
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = ((currentQuestionIndex + 1) / questions.length * 100) + '%';
    
    selectedAnswer = null;
    document.getElementById('nextBtn').disabled = true;
    
    startTimer();
}

function selectAnswer(index) {
    const options = document.querySelectorAll('.option');
    
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');
    
    selectedAnswer = index;
    document.getElementById('nextBtn').disabled = false;
}

function startTimer() {
    timeLeft = 30;
    document.getElementById('timer').textContent = timeLeft + 's';
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft + 's';
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer();
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timerInterval);
    checkAnswer();
}

function checkAnswer() {
    const questions = quizQuestions[currentDifficulty];
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    let isCorrect = false;
    
    options.forEach(opt => opt.classList.add('disabled'));
    
    if (selectedAnswer !== null && selectedAnswer === question.correct) {
        options[selectedAnswer].classList.add('correct');
        score += 10;
        if (timeLeft > 15) {
            score += 5;
        }
        isCorrect = true;
    } else {
        if (selectedAnswer !== null) {
            options[selectedAnswer].classList.add('wrong');
        }
        options[question.correct].classList.add('correct');
    }
    
    questionsAnswered.push({
        question: question.question,
        userAnswer: selectedAnswer !== null ? question.options[selectedAnswer] : 'Not answered',
        correctAnswer: question.options[question.correct],
        isCorrect: isCorrect
    });
    
    setTimeout(() => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000);
}

function useFiftyFifty() {
    if (usedLifelines.fiftyFifty) return;
    
    const questions = quizQuestions[currentDifficulty];
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    let removed = 0;
    options.forEach((opt, index) => {
        if (index !== question.correct && removed < 2) {
            opt.style.opacity = '0.3';
            opt.style.pointerEvents = 'none';
            removed++;
        }
    });
    
    usedLifelines.fiftyFifty = true;
    document.getElementById('fiftyFifty').disabled = true;
}

function useExtraTime() {
    if (usedLifelines.extraTime) return;
    
    timeLeft += 15;
    document.getElementById('timer').textContent = timeLeft + 's';
    
    usedLifelines.extraTime = true;
    document.getElementById('extraTime').disabled = true;
}

function useSkipQuestion() {
    if (usedLifelines.skipQuestion) return;
    
    clearInterval(timerInterval);
    
    questionsAnswered.push({
        question: quizQuestions[currentDifficulty][currentQuestionIndex].question,
        userAnswer: 'Skipped',
        correctAnswer: quizQuestions[currentDifficulty][currentQuestionIndex].options[quizQuestions[currentDifficulty][currentQuestionIndex].correct],
        isCorrect: false
    });
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions[currentDifficulty].length) {
        loadQuestion();
    } else {
        showResults();
    }
    
    usedLifelines.skipQuestion = true;
    document.getElementById('skipQuestion').disabled = true;
}

function showResults() {
    clearInterval(timerInterval);
    
    const quizScreen = document.getElementById('quizScreen');
    const resultScreen = document.getElementById('resultScreen');
    
    quizScreen.style.display = 'none';
    resultScreen.style.display = 'block';
    
    const totalQuestions = quizQuestions[currentDifficulty].length;
    const correctCount = questionsAnswered.filter(q => q.isCorrect).length;
    const wrongCount = totalQuestions - correctCount;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);
    
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent = correctCount;
    document.getElementById('wrongAnswers').textContent = wrongCount;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('timeBonus').textContent = Math.max(0, score - (correctCount * 10));
    
    let resultIcon = '🏆';
    let resultMessage = 'Excellent!';
    
    if (accuracy < 40) {
        resultIcon = '😞';
        resultMessage = 'Keep practicing!';
    } else if (accuracy < 70) {
        resultIcon = '👍';
        resultMessage = 'Good effort!';
    } else if (accuracy < 90) {
        resultIcon = '🎉';
        resultMessage = 'Great job!';
    }
    
    document.getElementById('resultIcon').textContent = resultIcon;
    document.getElementById('resultMessage').textContent = resultMessage;
    
    const reviewContainer = document.getElementById('reviewContainer');
    reviewContainer.innerHTML = '';
    
    questionsAnswered.forEach((qa, index) => {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item ' + (qa.isCorrect ? 'correct' : 'wrong');
        reviewItem.innerHTML = `
            <div class="review-question">${index + 1}. ${qa.question}</div>
            <div class="review-answer ${qa.isCorrect ? 'correct' : 'wrong'}">
                Your answer: ${qa.userAnswer}
            </div>
            ${!qa.isCorrect ? `<div class="review-answer correct">Correct answer: ${qa.correctAnswer}</div>` : ''}
        `;
        reviewContainer.appendChild(reviewItem);
    });
}

function restartQuiz() {
    const resultScreen = document.getElementById('resultScreen');
    const startScreen = document.getElementById('startScreen');
    
    resultScreen.style.display = 'none';
    startScreen.style.display = 'block';
    
    document.getElementById('fiftyFifty').disabled = false;
    document.getElementById('extraTime').disabled = false;
    document.getElementById('skipQuestion').disabled = false;
}

function quitQuiz() {
    if (confirm('Are you sure you want to quit?')) {
        clearInterval(timerInterval);
        restartQuiz();
    }
}

function goHome() {
    window.location.href = '../index.html';
}

document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentDifficulty = this.dataset.difficulty;
    });
});
