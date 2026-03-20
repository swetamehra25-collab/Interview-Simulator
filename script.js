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

// Start Interview
function startInterview(type) {
  questions = type === "hr" ? hrQuestions : techQuestions;

  document.getElementById("categoryBox").classList.add("hidden");
  document.getElementById("quizBox").classList.remove("hidden");

  loadQuestion();
}

// Load Question
function loadQuestion() {
  document.getElementById("answer").value = "";
  document.getElementById("question").innerText = questions[current];
  startTimer();
}

// Timer
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

// Next Question
function nextQuestion() {
  clearInterval(timer);

  let answer = document.getElementById("answer").value.toLowerCase().trim();

  // Smart scoring
  let keywords = ["experience", "skill", "project", "team", "learn"];
  let hasKeyword = keywords.some(k => answer.includes(k));

  if (answer.length > 30 && hasKeyword) {
    score++;
  }

  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Show Result
function showResult() {
  document.getElementById("quizBox").classList.add("hidden");
  document.getElementById("resultBox").classList.remove("hidden");

  document.getElementById("score").innerText =
    `Score: ${score}/${questions.length}`;

  let feedback = "";

  if (score === questions.length) {
    feedback = "🔥 Outstanding! Your answers were detailed and structured.";
  } else if (score >= 2) {
    feedback = "👍 Good, try adding more examples.";
  } else {
    feedback = "⚠️ Improve by giving detailed answers.";
  }

  document.getElementById("feedback").innerText = feedback;

  saveAttempt(score);
  showHistory();
  drawChart();
}

// Save Attempts
function saveAttempt(score) {
  let data = JSON.parse(localStorage.getItem("attempts")) || [];
  data.push(score);
  localStorage.setItem("attempts", JSON.stringify(data));
}

// Show History
function showHistory() {
  let data = JSON.parse(localStorage.getItem("attempts")) || [];
  let history = document.getElementById("history");

  history.innerHTML = "<h3>📊 Recent Scores</h3>";

  data.slice(-5).reverse().forEach(s => {
    history.innerHTML += `<p>${s}</p>`;
  });
}

// Draw Chart
function drawChart() {
  let data = JSON.parse(localStorage.getItem("attempts")) || [];

  new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels: data.map((_, i) => "Attempt " + (i + 1)),
      datasets: [{
        label: "Score",
        data: data,
        borderWidth: 2
      }]
    }
  });
}

// Voice Input
function startVoice() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = function(event) {
    document.getElementById("answer").value = event.results[0][0].transcript;
  };
}