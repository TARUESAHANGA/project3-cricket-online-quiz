# Cricket Online Quiz

A modern, interactive cricket quiz web application that tests your cricket knowledge across different difficulty levels.

## Features

- **Three Difficulty Levels**
![difficulty level selection](./assets/images/screenshots/difficulty%20level%20selection.png)
  - School Boy Cricket (Easy)
  - Club Cricket (Medium)
  - Professional Cricket (Hard)

- **Interactive Quiz Interface**
  - Real-time timer (30 seconds per question)
  - Progress bar to track completion
  - Visual feedback for correct/wrong answers

- **Lifelines**
  - 50:50 - Remove two incorrect options
  ![fiftyfifty in action](./assets/images/screenshots/fiftyfifty%20in%20action.png)
  - Extra Time - Add 15 seconds to the timer
  ![extra time](./assets/images/screenshots/extra%20time%20button.png)
  - Skip Question - Skip to the next question

- **Scoring System**
  - 10 points per correct answer
  - 5 bonus points for quick answers (answered within 15 seconds)
  - Detailed performance statistics

- **Results & Review**
  - Final score display
  - Accuracy percentage
  - Complete answer review with correct answers

- **Responsive Design**
  - Mobile-friendly interface
  - Works on all screen sizes

## Technologies Used

- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript
- Font Awesome icons

## File Structure

```
online quiz/
|-- assets/
|   |-- css/
|   |   |-- styles.css              # Base styles and navigation
|   |   |-- quizStyles.css          # Quiz-specific styles
|   |   `-- mediaQueries.css        # Responsive design
|   `-- js/
|       |-- main.js                 # Navigation functionality
|       |-- quiz.js                 # Quiz entry point
|       `-- quiz/
|           |-- index.js            # Bootstrap and global handlers
|           |-- controller.js       # Quiz flow and scoring
|           |-- questions.js        # Question bank and shuffle helpers
|           |-- state.js            # Runtime state and constants
|           |-- timer.js            # Timer behavior
|           `-- ui.js               # DOM rendering helpers
|-- pages/
|   |-- play.html                   # Quiz page
|   `-- about.html                  # How to play page
|-- index.html                      # Home page
`-- README.md
```
## How to Run

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Click "Play Quiz" to start
4. Select your difficulty level
5. Start the quiz and answer questions
6. Live Demo [Cricket online quiz](https://taruesahanga.github.io/project3-cricket-online-quiz/)

## Quiz Questions

- **Schoolboy cricket** (easy) : 10 questions about basic cricket rules and fundamentals
- **Club cricket** (medium): 10 questions about cricket history, records, and notable players
- **Professional cricket** (hard): 10 questions about advanced statistics, records, and cricket trivia

## Quiz Modules

- `assets/js/quiz.js` - module entry point
- `assets/js/quiz/index.js` - bootstrap and global handlers for inline button callbacks
- `assets/js/quiz/controller.js` - quiz flow, scoring, lifelines, and transitions
- `assets/js/quiz/questions.js` - question bank and shuffle helpers
- `assets/js/quiz/state.js` - state shape and quiz constants
- `assets/js/quiz/timer.js` - timer start/stop and extra-time updates
- `assets/js/quiz/ui.js` - DOM rendering and view helpers

## Validation

### HTML
#### Home Page
![home page](./assets/images/validation/HTML/Home%20page.png)

#### How to play Page
![how to play page](./assets/images/validation/HTML/how%20to%20play%20html.png)

#### Play quiz Page
![Play Quiz page](./assets/images/validation/HTML/Play%20html.png)

### CSS
#### styles.css 
![main styles](./assets/images/validation/CSS/main%20styles%20for%20the%20site.png)
#### quizStyles.css
![quiz styles](./assets/images/validation/CSS/quiz%20styles%20.png)
#### mediaQueries.css
![mediaQueries](./assets/images/validation/CSS/mediaQueries.png)

### JAVASCRIPT
#### main.js
![main js](./assets/images/validation/JS/main%20js.png)
#### quiz.js
![quiz js](./assets/images/validation/JS/quiz%20js.png)
#### controller.js
![controller js](./assets/images/validation/JS/controller%20js.png)
#### index.js
![index js](./assets/images/validation/JS/index%20js.png)
#### questions.js
![questions js](./assets/images/validation/JS/question%20js.png)
#### state.js
![state js](./assets/images/validation/JS/state%20js.png)
#### timer.js
![timer js](./assets/images/validation/JS/state%20js.png)
#### ui.js
![ui js](./assets/images/validation/JS/ui%20js.png)
