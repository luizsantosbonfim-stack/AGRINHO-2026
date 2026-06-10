// --- Banco de Dados Ampliado (6 Perguntas) ---
const quizQuestions = [
    {
        question: "Qual setor consome a maior quantidade invisível (água oculta) de água doce do planeta?",
        options: [
            "A limpeza residencial urbana.",
            "A produção industrial e agropecuária em larga escala.",
            "O resfriamento de usinas de energia comercial.",
            "O abastecimento público de piscinas e parques aquáticos."
        ],
        correct: 1,
        explanation: "A agropecuária e a indústria respondem por cerca de 70% do consumo global através da água embutida em alimentos e produtos de consumo."
    },
    {
        question: "Qual o principal benefício climático de manter a terra (solo) rica em matéria orgânica?",
        options: [
            "Ela impede a atividade sísmica e terremotos continentais.",
            "Funciona como um poderoso depósito natural fixador de carbono.",
            "Ela gera oxigênio diretamente através das suas raízes internas.",
            "Ela altera a gravidade local do ar ao redor."
        ],
        correct: 1,
        explanation: "Solos saudáveis funcionam como drenos de carbono, absorvendo mais CO2 da atmosfera do que toda a vegetação aérea junta."
    },
    {
        question: "O que aconteceria se a vida dos polinizadores, como as abelhas, desaparecesse?",
        options: [
            "Haveria uma quebra catastrófica na reprodução de plantas e produção de alimentos.",
            "Apenas a produção de mel comercial cessaria.",
            "As plantas se adaptariam instantaneamente a se autopolinizar por radiação.",
            "Não haveria impacto prático na sobrevivência alimentar humana."
        ],
        correct: 0,
        explanation: "Cerca de 1/3 de todos os cultivos agrícolas que alimentam a humanidade dependem do trabalho contínuo desses pequenos animais."
    },
    {
        question: "O que caracteriza o processo de desertificação do solo?",
        options: [
            "A transformação do solo em praias de lazer.",
            "A perda total dos nutrientes e da capacidade de reter vida vegetal.",
            "O aumento controlado da umidade do subsolo.",
            "A limpeza química natural contra pragas rasteiras."
        ],
        correct: 1,
        explanation: "A desertificação ocorre quando o uso predatório e as secas destroem a cobertura orgânica, tornando a terra estéril."
    },
    {
        question: "Como as florestas ajudam no ciclo e na preservação da água?",
        options: [
            "Elas absorvem a água e a eliminam permanentemente do planeta.",
            "Suas raízes e folhas funcionam como esponjas que regulam rios e geram chuvas.",
            "As árvores reduzem a evaporação dos oceanos.",
            "Elas criam barreiras que impedem a água doce de chegar ao mar."
        ],
        correct: 1,
        explanation: "As árvores realizam a evapotranspiração, alimentando os 'rios voadores' de umidade que geram as chuvas continentais."
    },
    {
        question: "Qual é uma forma prática e eficiente de combater a perda de biodiversidade nas cidades?",
        options: [
            "Cobrir todas as áreas verdes urbanas com grama sintética.",
            "Criar corredores ecológicos, plantar árvores nativas e cultivar jardins polinizadores.",
            "Substituir árvores reais por esculturas de concreto decorativas.",
            "Banir totalmente a entrada de pássaros migratórios nas áreas urbanas."
        ],
        correct: 1,
        explanation: "Trazer plantas nativas de volta às cidades reconecta ecossistemas fragmentados, servindo de refúgio e alimento para a fauna local."
    }
];

// --- Variáveis de Controle ---
let currentIndex = 0;
let userPoints = 0;
let baseFontSize = 16;

// --- Seleção de Elementos ---
const qText = document.getElementById("question-text");
const optContainer = document.getElementById("options-container");
const feedBox = document.getElementById("feedback");
const buttonNext = document.getElementById("next-btn");
const progText = document.getElementById("progress");
const scoreCount = document.getElementById("score-counter");
const xpFill = document.getElementById("xp-bar-fill");

const boxQuiz = document.getElementById("quiz-container");
const boxResult = document.getElementById("result-container");
const textResult = document.getElementById("result-text");
const iconMedal = document.getElementById("medal-icon");
const leaderboardList = document.getElementById("leaderboard-list");

// --- Inicialização ---
document.addEventListener("DOMContentLoaded", () => {
    initQuiz();
    initParticles();
    initFilters();
    initAccessibility();
});

// Filtro dos Cards Informativos
function initFilters() {
    const filterButtons = document.querySelectorAll(".btn-filter");
    const cards = document.querySelectorAll("#cards-directory .card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelector(".btn-filter.active").classList.remove("active");
            btn.classList.add("active");
            const filterValue = btn.getAttribute("data-filter");

            cards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "block";
                    setTimeout(() => card.style.opacity = "1", 50);
                } else {
                    card.style.opacity = "0";
                    setTimeout(() => card.style.display = "none", 200);
                }
            });
        });
    });
}

// Partículas Ambientais
function initParticles() {
    const pContainer = document.getElementById("particle-container");
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.width = `${Math.random() * 12 + 6}px`;
        particle.style.height = particle.style.width;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 4 + 5}s`;
        if(Math.random() > 0.5) particle.style.backgroundColor = "rgba(64, 145, 108, 0.25)";
        pContainer.appendChild(particle);
    }
}

// Renderizar Pergunta Atual
function initQuiz() {
    buttonNext.classList.add("hidden");
    feedBox.classList.add("hidden");
    feedBox.className = "feedback-box";
    optContainer.innerHTML = "";

    const activeQ = quizQuestions[currentIndex];
    qText.textContent = activeQ.question;
    progText.textContent = `Desafio ${currentIndex + 1} de ${quizQuestions.length}`;

    activeQ.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("option-btn");
        btn.addEventListener("click", () => verifySelection(idx, btn));
        optContainer.appendChild(btn);
    });
}

// Verificar Resposta e Atribuir Pontuação (+100 ou -50)
function verifySelection(chosenIdx, clickedBtn) {
    const activeQ = quizQuestions[currentIndex];
    const allButtons = optContainer.querySelectorAll(".option-btn");

    allButtons.forEach(b => b.setAttribute("disabled", "true"));

    if (chosenIdx === activeQ.correct) {
        clickedBtn.classList.add("correct");
        feedBox.textContent = `🎉 Perfeito! ${activeQ.explanation}`;
        feedBox.classList.add("correct");
        userPoints += 100;
    } else {
        clickedBtn.classList.add("wrong");
        allButtons[activeQ.correct].classList.add("correct");
        feedBox.textContent = `💡 Conhecimento é evolução: ${activeQ.explanation}`;
        feedBox.classList.add("wrong");
        userPoints -= 50;
        if (userPoints < 0) userPoints = 0; // Impede pontuação negativa abaixo de zero
    }

    // Atualiza Painel de Controle e Barra
    scoreCount.textContent = userPoints;
    const maxPossiblePoints = quizQuestions.length * 100;
    const percentage = Math.min((userPoints / maxPossiblePoints) * 100, 100);
    xpFill.style.width = `${percentage}%`;

    feedBox.classList.remove("hidden");
    buttonNext.classList.remove("hidden");
    buttonNext.focus();
}

buttonNext.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < quizQuestions.length) {
        initQuiz();
    } else {
        finishQuiz();
    }
});

// --- SISTEMA CORRIGIDO: Ordenação e Posicionamento Real no Leaderboard ---
function finishQuiz() {
    boxQuiz.classList.add("hidden");
    boxResult.classList.remove("hidden");
    
    let icon = "🌱";
    let message = "Continue estudando e praticando a sustentabilidade para melhorar seu placar!";

    if (userPoints >= 500) {
        icon = "👑";
        message = "Impressionante! Sua pontuação é digna de um Guardião Supremo da Natureza!";
    } else if (userPoints >= 300) {
        icon = "💧";
        message = "Excelente resultado! Seus hábitos estão em ótimo caminho para o amanhã.";
    }

    iconMedal.textContent = icon;
    textResult.innerHTML = `Você encerrou sua missão acumulando <strong>${userPoints} pontos</strong>.<br>${message}`;
    
    renderLeaderboard();
}

function renderLeaderboard() {
    leaderboardList.innerHTML = "";

    // Jogadores virtuais e a inserção do resultado real do usuário
    const competitors = [
        { name: "EcoGuardião_Alpha", points: 550 },
        { name: "GaiaProtetor_99", points: 400 },
        { name: "PlanetaVivo_Verde", points: 200 },
        { name: "SustentaMundo", points: 50 },
        { name: "Você (Atual)", points: userPoints, isUser: true }
    ];

    // ORDENAÇÃO REAL: Organiza do maior para o menor com base na chave .points
    competitors.sort((a, b) => b.points - a.points);

    // Renderização dos elementos na tela com tratamento de primeiro, segundo e último lugar
    competitors.forEach((player, index) => {
        const li = document.createElement("li");
        
        // Identificadores de pódio
        let prefix = `${index + 1}.`;
        if (index === 0) prefix = "🥇 1º";
        if (index === 1) prefix = "🥈 2º";
        if (index === competitors.length - 1) prefix = "🥉 Último";

        if (player.isUser) {
            li.classList.add("user-highlight");
        }

        li.innerHTML = `<span>${prefix} ${player.name}</span> <span>${player.points} pts</span>`;
        leaderboardList.appendChild(li);
    });
}

// Reset do Game
document.getElementById("restart-btn").addEventListener("click", () => {
    currentIndex = 0;
    userPoints = 0;
    scoreCount.textContent = "0";
    xpFill.style.width = "0%";
    boxResult.classList.add("hidden");
    boxQuiz.classList.remove("hidden");
    initQuiz();
});

// Acessibilidade
function initAccessibility() {
    document.getElementById("toggle-contrast").addEventListener("click", () => document.body.classList.toggle("high-contrast"));
    document.getElementById("increase-font").addEventListener("click", () => { if (baseFontSize < 24) { baseFontSize += 2; document.body.style.fontSize = `${baseFontSize}px`; } });
    document.getElementById("decrease-font").addEventListener("click", () => { if (baseFontSize > 13) { baseFontSize -= 2; document.body.style.fontSize = `${baseFontSize}px`; } });
}