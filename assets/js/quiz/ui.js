// DOM rendering helpers for quiz screens, question states, and results.
function showScreen({ showId, hideId }) {
    const showElement = document.getElementById(showId);
    const hideElement = document.getElementById(hideId);

    hideElement.style.display = "none";
    showElement.style.display = "block";
}

function renderQuestion({ question, questionIndex, totalQuestions, onOptionSelect }) {
    // Paint question text, options, and progress.
    document.getElementById("questionText").textContent = question.question;
    document.getElementById("currentQuestion").textContent = questionIndex + 1;
    document.getElementById("totalQuestions").textContent = totalQuestions;

    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement("div");
        optionDiv.className = "option";
        optionDiv.textContent = option;
        optionDiv.onclick = () => onOptionSelect(index);
        optionsContainer.appendChild(optionDiv);
    });

    const progressFill = document.getElementById("progressFill");
    progressFill.style.width = `${((questionIndex + 1) / totalQuestions) * 100}%`;
    document.getElementById("nextBtn").disabled = true;
}

function setTimerDisplay(timeLeft) {
    document.getElementById("timer").textContent = `${timeLeft}s`;
}

function markAnswerSelection(index) {
    // Keep only one selected option at a time.
    const options = document.querySelectorAll(".option");
    options.forEach(opt => opt.classList.remove("selected"));
    options[index].classList.add("selected");
}

function markAnswerFeedback({ selectedAnswer, correctAnswer }) {
    // Lock options and style selected/correct answers.
    const options = document.querySelectorAll(".option");
    options.forEach(opt => opt.classList.add("disabled"));

    if (selectedAnswer !== null) {
        const className = selectedAnswer === correctAnswer ? "correct" : "wrong";
        options[selectedAnswer].classList.add(className);
    }

    options[correctAnswer].classList.add("correct");
}

function setLifelineDisabled(lifelineId, isDisabled) {
    document.getElementById(lifelineId).disabled = isDisabled;
}

function disableTwoWrongOptions(correctAnswer) {
    // Hide two incorrect options for 50:50 lifeline.
    const options = document.querySelectorAll(".option");
    let removed = 0;

    options.forEach((option, index) => {
        if (index !== correctAnswer && removed < 2) {
            option.style.opacity = "0.3";
            option.style.pointerEvents = "none";
            removed++;
        }
    });
}

function renderResults({ score, totalQuestions, questionsAnswered }) {
    // Populate score summary and per-question review list.
    showScreen({ showId: "resultScreen", hideId: "quizScreen" });

    const correctCount = questionsAnswered.filter(q => q.isCorrect).length;
    const wrongCount = totalQuestions - correctCount;
    const accuracy = Math.round((correctCount / totalQuestions) * 100);

    document.getElementById("finalScore").textContent = score;
    document.getElementById("correctAnswers").textContent = correctCount;
    document.getElementById("wrongAnswers").textContent = wrongCount;
    document.getElementById("accuracy").textContent = `${accuracy}%`;
    document.getElementById("timeBonus").textContent = Math.max(0, score - (correctCount * 10));

    const { resultIcon, resultMessage } = getResultMessage({ score, accuracy });
    document.getElementById("resultIcon").textContent = resultIcon;
    document.getElementById("resultMessage").textContent = resultMessage;

    const reviewContainer = document.getElementById("reviewContainer");
    reviewContainer.innerHTML = "";

    questionsAnswered.forEach((qa, index) => {
        const reviewItem = document.createElement("div");
        reviewItem.className = `review-item ${qa.isCorrect ? "correct" : "wrong"}`;
        reviewItem.innerHTML = `
            <div class="review-question">${index + 1}. ${qa.question}</div>
            <div class="review-answer ${qa.isCorrect ? "correct" : "wrong"}">
                Your answer: ${qa.userAnswer}
            </div>
            ${!qa.isCorrect ? `<div class="review-answer correct">Correct answer: ${qa.correctAnswer}</div>` : ""}
        `;
        reviewContainer.appendChild(reviewItem);
    });
}

function getResultMessage({ score, accuracy }) {
    // Choose icon/message based on final accuracy and score.
    if (score === 0) {
        return { resultIcon: "🦆", resultMessage: "Golden duck" };
    }

    if (accuracy < 40) {
        return { resultIcon: "😞", resultMessage: "Keep practicing!" };
    }

    if (accuracy < 70) {
        return { resultIcon: "👍", resultMessage: "Good effort!" };
    }

    if (accuracy < 90) {
        return { resultIcon: "🎉", resultMessage: "Great job!" };
    }

    return { resultIcon: "🏆", resultMessage: "Excellent!" };
}

function resetLifelineButtons() {
    // Re-enable all lifelines for a fresh run.
    ["fiftyFifty", "extraTime", "skipQuestion"].forEach(id => {
        setLifelineDisabled(id, false);
    });
}

export {
    showScreen,
    renderQuestion,
    setTimerDisplay,
    markAnswerSelection,
    markAnswerFeedback,
    setLifelineDisabled,
    disableTwoWrongOptions,
    renderResults,
    resetLifelineButtons
};
