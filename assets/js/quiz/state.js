// Shared quiz constants and initial/reset state helpers.
const QUIZ_TIMER_SECONDS = 30;
const QUICK_ANSWER_THRESHOLD_SECONDS = 15;
const TIME_BONUS_SECONDS = 15;

function createInitialState() {
    // Returns a new mutable state object for one quiz session.
    return {
        currentDifficulty: "easy",
        currentQuestionIndex: 0,
        score: 0,
        timeLeft: QUIZ_TIMER_SECONDS,
        timerInterval: null,
        selectedAnswer: null,
        isCheckingAnswer: false,
        usedLifelines: {
            fiftyFifty: false,
            extraTime: false,
            skipQuestion: false
        },
        questionsAnswered: []
    };
}

function resetQuizProgress(state) {
    // Resets session values while keeping selected difficulty.
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.questionsAnswered = [];
    state.selectedAnswer = null;
    state.isCheckingAnswer = false;
    state.timeLeft = QUIZ_TIMER_SECONDS;
    state.usedLifelines = {
        fiftyFifty: false,
        extraTime: false,
        skipQuestion: false
    };
}

export {
    QUIZ_TIMER_SECONDS,
    QUICK_ANSWER_THRESHOLD_SECONDS,
    TIME_BONUS_SECONDS,
    createInitialState,
    resetQuizProgress
};
