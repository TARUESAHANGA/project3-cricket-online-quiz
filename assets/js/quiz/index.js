// Initializes quiz state and exposes handlers used by inline HTML callbacks.
import { shuffleAllQuizTopics } from "./questions.js";
import { createInitialState } from "./state.js";
import {
    startQuiz,
    nextQuestion,
    useFiftyFifty,
    useExtraTime,
    useSkipQuestion,
    restartQuiz,
    quitQuiz,
    goHome,
    setDifficulty
} from "./controller.js";

const state = createInitialState();
// Shuffle questions on each page load for replay variety.
shuffleAllQuizTopics();

// Keep compatibility with existing inline onclick attributes.
window.startQuiz = () => startQuiz(state);
window.nextQuestion = () => nextQuestion(state);
window.useFiftyFifty = () => useFiftyFifty(state);
window.useExtraTime = () => useExtraTime(state);
window.useSkipQuestion = () => useSkipQuestion(state);
window.restartQuiz = () => restartQuiz(state);
window.quitQuiz = () => quitQuiz(state);
window.goHome = goHome;

// Update active difficulty button and selected quiz level.
document.querySelectorAll(".difficulty-btn").forEach(button => {
    button.addEventListener("click", function () {
        document.querySelectorAll(".difficulty-btn").forEach(item => {
            item.classList.remove("active");
        });
        this.classList.add("active");
        setDifficulty(state, this.dataset.difficulty);
    });
});
