// Timer controls for question countdown behavior.
import { QUIZ_TIMER_SECONDS } from "./state.js";
import { setTimerDisplay } from "./ui.js";

function resetTimer(state) {
    // Reset countdown to default question duration.
    state.timeLeft = QUIZ_TIMER_SECONDS;
    setTimerDisplay(state.timeLeft);
}

function stopTimer(state) {
    // Stop current timer interval if running.
    clearInterval(state.timerInterval);
}

function startTimer(state, onTimerFinished) {
    // Start fresh interval and invoke callback when time expires.
    resetTimer(state);
    stopTimer(state);

    state.timerInterval = setInterval(() => {
        state.timeLeft--;
        setTimerDisplay(state.timeLeft);

        if (state.timeLeft <= 0) {
            stopTimer(state);
            onTimerFinished();
        }
    }, 1000);
}

function addExtraTime(state, seconds) {
    // Apply extra-time lifeline immediately.
    state.timeLeft += seconds;
    setTimerDisplay(state.timeLeft);
}

export {
    startTimer,
    stopTimer,
    addExtraTime
};
