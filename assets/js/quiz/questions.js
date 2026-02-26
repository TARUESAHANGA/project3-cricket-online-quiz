// Stores quiz question data and helpers for question ordering.
const quizQuestions = {
    // schoolboy level questions, more basic and commonly known facts about cricket.
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

    // club level questions
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

    // professional level questions, more difficult and less commonly known facts about cricket.
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

function shuffleQuestionList(questionList) {
    // Fisher-Yates shuffle.
    for (let i = questionList.length - 1; i > 0; i--) {
        const randomPosition = Math.floor(Math.random() * (i + 1));
        [questionList[i], questionList[randomPosition]] = [questionList[randomPosition], questionList[i]];
    }
}

function shuffleAllQuizTopics() {
    // Shuffle each difficulty independently.
    Object.values(quizQuestions).forEach(topic => shuffleQuestionList(topic));
}

function getQuestionsByDifficulty(difficulty) {
    // Returns question array for the selected difficulty key.
    return quizQuestions[difficulty];
}

function getTotalQuestions(difficulty) {
    return quizQuestions[difficulty].length;
}

export {
    shuffleAllQuizTopics,
    getQuestionsByDifficulty,
    getTotalQuestions
};
