const hrQuestions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "What are your strengths?"
];

const techQuestions = [
  "Explain JavaScript closures.",
  "What is a loop?",
  "Difference between var, let, const?"
];

let questions = [];
let current = 0;
let score = 0;
let time = 30;
let timer;

function startInterview(type) {
  questions = type === "hr" ? hrQuestions : techQuestions;

  document.getElementById("categoryBox").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");

  loadQuestion();
}

function loadQuestion() {
  document.getElementById("answer").value = "";
  document.getElementById("question").innerText = questions[current];

  startTimer();
}

function startTimer() {
  time = 30;
  document.getElementById("timer").innerText = time;

  clearInterval(timer);
  timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = time;

    if (time === 0) nextQuestion();
  }, 1000);
}

function nextQuestion() {
  clearInterval(timer);

  let answer = document.getElementById("answer").value.trim();

  // SMART FEEDBACK LOGIC 🧠
  if (answer.length > 30) {
    score++;
  }

  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quizBox").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("score").innerText =
    `Score: ${score}/${questions.length}`;

  let feedback = "";

  if (score === questions.length) {
    feedback = "Excellent performance! 💯";
  } else if (score >= 2) {
    feedback = "Good, but can improve 👍";
  } else {
    feedback = "Need more practice ⚠️";
  }

  document.getElementById("feedback").innerText = feedback;

  saveAttempt(score);
}

// Save to localStorage 💾
function saveAttempt(score) {
  let data = JSON.parse(localStorage.getItem("attempts")) || [];
  data.push(score);
  localStorage.setItem("attempts", JSON.stringify(data));
}





