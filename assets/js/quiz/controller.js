// Coordinates quiz gameplay flow between state, timer, and UI modules.
import { getQuestionsByDifficulty, getTotalQuestions } from "./questions.js";
import {
    QUICK_ANSWER_THRESHOLD_SECONDS,
    TIME_BONUS_SECONDS,
    resetQuizProgress
} from "./state.js";
import {
    showScreen,
    renderQuestion,
    markAnswerSelection,
    markAnswerFeedback,
    setLifelineDisabled,
    disableTwoWrongOptions,
    renderResults,
    resetLifelineButtons
} from "./ui.js";
import { startTimer, stopTimer, addExtraTime } from "./timer.js";

function startQuiz(state) {
    // Reset state and show quiz view.
    resetQuizProgress(state);
    showScreen({ showId: "quizScreen", hideId: "startScreen" });
    loadQuestion(state);
}

function loadQuestion(state) {
    // Render the current question and start its countdown.
    const questions = getQuestionsByDifficulty(state.currentDifficulty);
    const question = questions[state.currentQuestionIndex];

    renderQuestion({
        question,
        questionIndex: state.currentQuestionIndex,
        totalQuestions: questions.length,
        onOptionSelect: index => selectAnswer(state, index)
    });

    state.selectedAnswer = null;
    state.isCheckingAnswer = false;

    startTimer(state, () => checkAnswer(state));
}

function selectAnswer(state, index) {
    // Ignore clicks while answer feedback is already being processed.
    if (state.isCheckingAnswer) return;

    markAnswerSelection(index);
    state.selectedAnswer = index;
    stopTimer(state);
    checkAnswer(state);
}

function nextQuestion(state) {
    stopTimer(state);
    checkAnswer(state);
}

function checkAnswer(state) {
    // Prevent duplicate scoring from rapid clicks or timer overlap.
    if (state.isCheckingAnswer) return;
    state.isCheckingAnswer = true;

    const questions = getQuestionsByDifficulty(state.currentDifficulty);
    const question = questions[state.currentQuestionIndex];

    const isCorrect = state.selectedAnswer !== null && state.selectedAnswer === question.correct;

    if (isCorrect) {
        state.score += 10;
        if (state.timeLeft > QUICK_ANSWER_THRESHOLD_SECONDS) {
            state.score += 5;
        }
    }

    markAnswerFeedback({
        selectedAnswer: state.selectedAnswer,
        correctAnswer: question.correct
    });

    state.questionsAnswered.push({
        question: question.question,
        userAnswer: state.selectedAnswer !== null ? question.options[state.selectedAnswer] : "Not answered",
        correctAnswer: question.options[question.correct],
        isCorrect
    });

    setTimeout(() => {
        // Keep correct/wrong highlight visible briefly before advancing.
        state.currentQuestionIndex++;
        if (state.currentQuestionIndex < questions.length) {
            loadQuestion(state);
            return;
        }
        showResults(state);
    }, 2000);
}

function useFiftyFifty(state) {
    // Lifeline can only be used once and only while question is active.
    if (state.isCheckingAnswer || state.usedLifelines.fiftyFifty) return;

    const questions = getQuestionsByDifficulty(state.currentDifficulty);
    const question = questions[state.currentQuestionIndex];
    disableTwoWrongOptions(question.correct);

    state.usedLifelines.fiftyFifty = true;
    setLifelineDisabled("fiftyFifty", true);
}

function useExtraTime(state) {
    // Add one-time time bonus to current countdown.
    if (state.isCheckingAnswer || state.usedLifelines.extraTime) return;

    addExtraTime(state, TIME_BONUS_SECONDS);
    state.usedLifelines.extraTime = true;
    setLifelineDisabled("extraTime", true);
}

function useSkipQuestion(state) {
    // Record skip in review then advance without scoring.
    if (state.isCheckingAnswer || state.usedLifelines.skipQuestion) return;

    stopTimer(state);

    const questions = getQuestionsByDifficulty(state.currentDifficulty);
    const currentQuestion = questions[state.currentQuestionIndex];
    state.questionsAnswered.push({
        question: currentQuestion.question,
        userAnswer: "Skipped",
        correctAnswer: currentQuestion.options[currentQuestion.correct],
        isCorrect: false
    });

    state.currentQuestionIndex++;

    if (state.currentQuestionIndex < questions.length) {
        loadQuestion(state);
    } else {
        showResults(state);
    }

    state.usedLifelines.skipQuestion = true;
    setLifelineDisabled("skipQuestion", true);
}

function showResults(state) {
    stopTimer(state);
    renderResults({
        score: state.score,
        totalQuestions: getTotalQuestions(state.currentDifficulty),
        questionsAnswered: state.questionsAnswered
    });
}

function restartQuiz() {
    // Return to start view and re-enable lifeline buttons.
    showScreen({ showId: "startScreen", hideId: "resultScreen" });
    resetLifelineButtons();
}

function quitQuiz(state) {
    if (confirm("Are you sure you want to quit?")) {
        stopTimer(state);
        restartQuiz();
    }
}

function goHome() {
    // Resolve home path correctly from both root and /pages routes.
    const isInsidePagesDirectory = window.location.pathname.includes("/pages/");
    window.location.href = isInsidePagesDirectory ? "../index.html" : "index.html";
}

function setDifficulty(state, difficulty) {
    state.currentDifficulty = difficulty;
}

export {
    startQuiz,
    nextQuestion,
    useFiftyFifty,
    useExtraTime,
    useSkipQuestion,
    restartQuiz,
    quitQuiz,
    goHome,
    setDifficulty
};
