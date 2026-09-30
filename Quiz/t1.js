const questions = [
	{
		topic: "ORIGENS",
		question: "Na Mesopotâmia, em que material eram gravados registros usando a escrita cuneiforme?",
		answers: ["Tábuas de argila", "Discos de vidro", "Cartões perfurados", "Fitas magnéticas"],
		correct: 0,
		explanation: "As tábuas de argila eram marcadas com escrita cuneiforme e ajudavam a preservar leis, histórias e registros comerciais."
	},
	{
		topic: "REGISTROS EM PAPEL",
		question: "Qual era uma das principais dificuldades de guardar muitos documentos em papel?",
		answers: ["Precisavam de energia elétrica", "Ocupavam muito espaço físico", "Só podiam ser lidos por máquinas", "Eram armazenados na internet"],
		correct: 1,
		explanation: "Livros e documentos exigiam arquivos, bibliotecas e salas cada vez maiores para serem guardados."
	},
	{
		topic: "AUTOMAÇÃO",
		question: "Como os cartões perfurados representavam informações para as máquinas?",
		answers: ["Com partículas magnéticas", "Com pequenos furos", "Com luz de laser", "Com arquivos na nuvem"],
		correct: 1,
		explanation: "A posição dos furos nos cartões codificava dados que podiam ser lidos e processados automaticamente."
	},
	{
		topic: "ARMAZENAMENTO MAGNÉTICO",
		question: "Para que as fitas magnéticas foram especialmente importantes?",
		answers: ["Para backup e grandes volumes de dados", "Para substituir a internet", "Para exibir filmes em alta definição", "Para guardar arquivos em celulares"],
		correct: 0,
		explanation: "As fitas armazenavam muitos dados e eram bastante usadas para cópias de segurança e armazenamento em grande escala."
	},
	{
		topic: "ACESSO AOS DADOS",
		question: "Qual vantagem dos discos rígidos ajudou a encontrar informações com mais rapidez?",
		answers: ["Usavam cartões removíveis", "Permitiram acesso aleatório aos dados", "Não precisavam de computadores", "Armazenavam tudo em papel"],
		correct: 1,
		explanation: "O acesso aleatório permitia chegar a diferentes partes dos dados sem percorrer todo o conteúdo em sequência."
	},
	{
		topic: "MÍDIA ÓPTICA",
		question: "Como um CD-ROM é lido?",
		answers: ["Por meio de um laser", "Por furos em um cartão", "Com uma agulha magnética", "Por conexão com a nuvem"],
		correct: 0,
		explanation: "CDs e DVDs usam tecnologia óptica: um laser lê as informações gravadas no disco."
	},
	{
		topic: "MEMÓRIA FLASH",
		question: "O que pendrives, cartões de memória e SSDs têm em comum?",
		answers: ["Todos usam discos magnéticos giratórios", "Todos dependem de cartões perfurados", "Usam memória flash e não precisam de partes móveis", "Só funcionam conectados à internet"],
		correct: 2,
		explanation: "A memória flash permite dispositivos compactos e portáteis sem discos magnéticos girando."
	},
	{
		topic: "NUVEM",
		question: "O que caracteriza o armazenamento em nuvem?",
		answers: ["Guardar dados apenas em um disquete", "Acessar arquivos em servidores pela internet", "Armazenar tudo em tábuas de argila", "Usar somente o disco rígido do computador"],
		correct: 1,
		explanation: "Serviços de nuvem mantêm arquivos em servidores conectados à internet, permitindo acessá-los de diferentes dispositivos."
	}
];

const questionCount = document.getElementById("question-count");
const progressPercent = document.getElementById("progress-percent");
const progressTrack = document.querySelector(".progress-track");
const progressFill = document.getElementById("progress-fill");
const questionTopic = document.getElementById("question-topic");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");
const nextButton = document.getElementById("next-button");
const hint = document.getElementById("hint");
const scoreDisplay = document.getElementById("score");
const topbarProgress = document.getElementById("topbar-progress");
const registrationPanel = document.getElementById("registration-panel");
const quizContent = document.getElementById("quiz-content");
const usernameInput = document.getElementById("username-input");
const startQuizButton = document.getElementById("start-quiz-button");

let currentQuestion = 0;
let score = 0;
let answered = false;
let username = "";

startQuizButton.addEventListener("click", () => {
	username = usernameInput.value.trim();
	if (username === "") {
		alert("Por favor, insira seu nome para continuar.");
		usernameInput.focus();
		return;
	}
	
	registrationPanel.hidden = true;
	quizContent.hidden = false;
	renderQuestion();
});

function renderQuestion() {
	const item = questions[currentQuestion];
	const number = currentQuestion + 1;
	const percent = Math.round((number / questions.length) * 100);

	topbarProgress.textContent = `${number > 9 ? number : '0' + number}—${questions.length}`;
	questionCount.textContent = `PERGUNTA ${number} DE ${questions.length}`;
	progressPercent.textContent = `${percent}%`;
	progressTrack.setAttribute("aria-valuemax", questions.length);
	progressTrack.setAttribute("aria-valuenow", number);
	progressFill.style.width = `${percent}%`;
	questionTopic.textContent = item.topic;
	questionText.textContent = item.question;
	answerList.replaceChildren();
	feedback.hidden = true;
	feedback.classList.remove("is-wrong");
	nextButton.disabled = true;
	nextButton.innerHTML = 'Próxima <span aria-hidden="true">→</span>';
	hint.textContent = "Escolha uma resposta para continuar.";
	answered = false;

	item.answers.forEach((answer, index) => {
		const button = document.createElement("button");
		const letter = document.createElement("span");
		const text = document.createElement("span");

		button.type = "button";
		button.className = "answer-button";
		letter.className = "answer-letter";
		letter.setAttribute("aria-hidden", "true");
		letter.textContent = String.fromCharCode(65 + index);
		text.textContent = answer;
		button.append(letter, text);
		button.addEventListener("click", () => selectAnswer(index));
		answerList.append(button);
	});
}

function selectAnswer(selectedIndex) {
	if (answered) return;

	answered = true;
	const item = questions[currentQuestion];
	const isCorrect = selectedIndex === item.correct;
	const buttons = answerList.querySelectorAll(".answer-button");

	buttons.forEach((button, index) => {
		button.disabled = true;
		if (index === item.correct) button.classList.add("is-correct");
		if (index === selectedIndex && !isCorrect) button.classList.add("is-wrong");
	});

	if (isCorrect) {
		score += 1;
		scoreDisplay.textContent = score;
		feedbackTitle.textContent = "Isso mesmo!";
		hint.textContent = "Resposta certa. Vamos em frente.";
	} else {
		feedbackTitle.textContent = "Quase!";
		hint.textContent = "Confira a resposta correta acima.";
		feedback.classList.add("is-wrong");
	}

	feedbackText.textContent = item.explanation;
	feedback.hidden = false;
	nextButton.disabled = false;
	if (currentQuestion === questions.length - 1) {
		nextButton.innerHTML = 'Ver resultado <span aria-hidden="true">→</span>';
	}
}

function showResults() {
	const percentage = Math.round((score / questions.length) * 100);
	const message = percentage === 100
		? "Memória excelente. Você percorreu toda essa história com precisão."
		: percentage >= 60
			? "Bom trabalho. Você já conhece bem essa jornada tecnológica."
			: "Toda tecnologia tem uma história. Agora você conhece mais um pedaço dela.";

	questionCount.textContent = "FIM DO DESAFIO";
	progressPercent.textContent = "100%";
	progressFill.style.width = "100%";
	progressTrack.setAttribute("aria-valuenow", questions.length);
	questionTopic.textContent = "SEU RESULTADO";
	questionText.textContent = `${score} de ${questions.length} respostas corretas`;
	answerList.replaceChildren();
	feedback.hidden = false;
	feedback.classList.remove("is-wrong");
	feedbackTitle.textContent = `${percentage}% de acerto`;
	feedbackText.textContent = message;
	hint.textContent = "Seu resultado foi salvo no ranking.";
	nextButton.disabled = false;
	nextButton.innerHTML = 'Ver Ranking <span aria-hidden="true">→</span>';
	nextButton.dataset.goToRanking = "true";

	// Salvar no localStorage
	const ranking = JSON.parse(localStorage.getItem('quizRanking') || '[]');
	ranking.push({ name: username, score: score, total: questions.length, percent: percentage });
	localStorage.setItem('quizRanking', JSON.stringify(ranking));
}

nextButton.addEventListener("click", () => {
	if (nextButton.dataset.goToRanking === "true") {
		window.location.href = "ranking.html";
		return;
	}

	if (currentQuestion < questions.length - 1) {
		currentQuestion += 1;
		renderQuestion();
	} else {
		showResults();
	}
});
