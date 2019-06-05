const Questions = [{
    question: "An astrocyte is a type of _____ cell.",
    answers: ["Glial", "Neuronal", "Skin", "Muscle"],
    correctAnswer: "Glial"
  },
  {
    question: "What is a tripartite synapse is composed of?",
    answers: ["Two astrocytes and one neuron", "An astrocyte, a neuron, and a microglial cell", "Two neurons and one astrocyte ", "Two neurons and an interneuron"],
    correctAnswer: "Two neurons and an interneuron"
  },
  {
    question: "Neuroscientists historically ignored astrocytes as being active players in brain communication for what reason?",
    answers: ["We didn't discover the existence of astrocytes until centuries later","Neurons don't communicate with astrocytes","Astrocytes are only support cells","Astrocytes are not electrically excitable like neurons"],
    correctAnswer: "Astrocytes are not electrically excitable like neurons"
  },
  {
    question: "Neurons have many ______ that astrocytes don't have.",
    answers: ["voltage-gated channels","neurotransmitter receptors","neurotransmitter transporters","volume-regulated channels"],
    correctAnswer: "voltage-gated channels"
  },
  {
    question: "An astrocyte's form of activation is through intracellular _______ variations.",
    answers: ["potassium","sodium","calcium","chloride"],
    correctAnswer: "calcium"
  },
  {
    question: "The extensions of an astrocyte that contact blood vessels is called a ______.",
    answers: ["endfeet","toefeet","fingerfeet","headfeat"],
    correctAnswer: "endfeet"
  },
  {
    question: "The advent of _____ has been revolutionary for astrocyte researchers.",
    answers: ["transgenic mice","DREADDs","optogenetics","all of the above"],
    correctAnswer: "all of the above"
  },
  {
    question: "Astrocytes listen in on neuronal communication using mostly what type of receptor?",
    answers: ["ion channels","G protein-couple receptors","ionotropic receptors","TRK receptors"],
    correctAnswer: "G protein-couple receptors"
  },
   {
    question: "Astrocytes have been found to release _______.",
    answers: ["ATP","glutamate","D-serine","all of the above"],
    correctAnswer: "all of the above"
  },
   {
    question: " Astrocytes have receptors for __________.",
    answers: ["ATP","glutamate","acetylcholine","all of the above"],
    correctAnswer: "all of the above"
  },
]


//question number
let questionNumber = 0;
//track total points
let score = 0;

//generate question
function generateQuestion() {
  if (questionNumber < Questions.length) {
    return `<div class="question-${questionNumber}">
      <form>
      <fieldset>
      <legend>
        <h2>${Questions[questionNumber].question}</h2></legend>
        <label class="answerOption">
        <input type="radio" value="${Questions[questionNumber].answers[0]}" name="answer" required>
        <span>${Questions[questionNumber].answers[0]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${Questions[questionNumber].answers[1]}" name="answer" required>
        <span>${Questions[questionNumber].answers[1]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${Questions[questionNumber].answers[2]}" name="answer" required>
        <span>${Questions[questionNumber].answers[2]}</span>
        </label>
        <label class="answerOption">
        <input type="radio" value="${Questions[questionNumber].answers[3]}" name="answer" required>
        <span>${Questions[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" class="submitButton">Submit</button>
        </fieldset>
        </form>
        </div>`;
  } else {
    quizResults();
    restartQuiz();
    $('.questionNumber').text(10);
  }
}


//question number increment
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//increment score
function scoreUpdate() {
  score++;
  $('.scoreCount').text(score);
}

//start the quiz
function startQuiz() {
  $('.startButton').on("click", function (event) {
    $('.startScreen').css('display', 'none')
    $('.questionScreen').css('display', 'block')
    $('.questionNumber').text(1);
  });
}


//render question in DOM
function renderQuiz() {
  $('#questionForm').html(generateQuestion());
}

//select answer
function checkAnswer() {
  $('#questionForm').on("submit", function (event) {
    event.preventDefault();
    $('.questionScreen').css('display', 'none')
    $('.feedbackScreen').css('display', 'block')
  });
}


// answer feedback
function selectAnswer() {
  $("form").on("submit", function (event) {
    event.preventDefault();
    let selected = $("input:checked");
    let answer = selected.val();
    let correctAnswer = `${Questions[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      whenAnswerCorrect();
    } else {
      selected.parent().addClass('incorrect');
      whenAnswerIncorrect();
    }
  });
}


function whenAnswerCorrect() {
  correctAnswerFeedback();
  $('#questionForm').unbind('submit');
  scoreUpdate();
}

function whenAnswerIncorrect() {
  incorrectAnswerFeedback();
}

//correct answer feedback
function correctAnswerFeedback() {
  let correctAnswer = `${Questions[questionNumber].correctAnswer}`;
  $("#questionForm").html(`<div class="correct"><h1>You got it!!</h1><h2>'${correctAnswer}' is the right answer!</h2><button type=button class="nextButton">Next</div>`);
}

//incorrect answer feedback
function incorrectAnswerFeedback() {
  let correctAnswer = `${Questions[questionNumber].correctAnswer}`;
  $("#questionForm").html(`<div class="incorrect"><h2>Nope!</h2><h3>'${correctAnswer}' is the correct answer!</h3><button type=button class="nextButton">Next</button></div>`);
}

function trackScore() {
  scoreUpdate();
  $('scoreUpdate').text(score);
}

//results
function quizResults() {
  $(".main").empty().html(`
        <div class="resultsPage">
          <h2>Well done!</h2>
          <h3>You have an honorary PhD in Neuroscience!!</h3>
          <main role="main">
            <div class="completionForm">
              <button class="button">Restart Quiz?</button>
            </div>
          </main>
        </div>
      `);
}

//next question****************
function nextQuestion() {
  $('main').on('click', '.nextButton',
    function (event) {
      updateQuestionNumber();
      renderQuiz();
      selectAnswer();
    });
}

//take quiz again/restart button
function restartQuiz() {
  $('main').on('click', '.button', function (event) {
    location.reload();
  });
}

function callQuiz() {
  startQuiz();
  renderQuiz();
  selectAnswer();
  nextQuestion();
}

$(callQuiz)