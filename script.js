// --- Bancos de Dados de Perguntas ---
const normalQuestions = [
    {
        question: "Qual setor consome a maior quantidade invisível (água oculta) de água doce do planeta?",
        options: ["A limpeza residencial urbana.", "A produção industrial e agropecuária em larga escala.", "O resfriamento de usinas de energia.", "O abastecimento de piscinas públicas."],
        correct: 1,
        explanation: "A agropecuária e a indústria respondem por cerca de 70% do consumo global através da água usada na produção de alimentos e mercadorias."
    },
    {
        question: "Qual o principal benefício climático de manter a terra (solo) rica em matéria orgânica?",
        options: ["Ela impede tremores continentais.", "Funciona como um poderoso depósito natural fixador de carbono.", "Gera oxigênio diretamente pelas raízes.", "Altera a gravidade local do ar."],
        correct: 1,
        explanation: "Solos saudáveis e equilibrados absorvem mais CO2 atmosférico do que toda a vegetação de superfície do planeta."
    },
    {
        question: "O que aconteceria se os polinizadores, como as abelhas, desaparecessem?",
        options: ["Haveria uma quebra massiva na reprodução de plantas e colheitas de alimentos.", "Apenas a produção de mel comercial cessaria.", "As plantas passariam a se autopolinizar instantaneamente.", "Não haveria impacto prático na sobrevivência humana."],
        correct: 0,
        explanation: "Perto de um terço de todas as plantações agrícolas essenciais para a dieta humana dependem exclusivamente da polinização."
    },
    {
        question: "O que caracteriza o preocupante processo de desertificação do solo?",
        options: ["A transformação natural do solo em dunas de lazer.", "A perda crônica de nutrientes e da capacidade de reter vida.", "O aumento da umidade subterrânea.", "A higienização química natural contra pragas."],
        correct: 1,
        explanation: "O desmatamento e o manejo predatório destroem os microrganismos protetores da terra, tornando-a estéril."
    },
    {
        question: "Como as grandes florestas influenciam o ciclo da água continental?",
        options: ["Elas barram a água e impedem seu avanço.", "Suas copas e raízes funcionam como esponjas que geram chuvas continentais.", "Reduzem drasticamente a evaporação marinha.", "Filtram o sal contido nos aquíferos profundos."],
        correct: 1,
        explanation: "Através da evapotranspiração, as florestas bombeiam umidade para o ar, formando os vitais 'rios voadores'."
    },
    {
        question: "Qual medida urbana ajuda a desacelerar a perda de biodiversidade local?",
        options: ["Substituir praças por concreto decorativo.", "Criar corredores ecológicos e plantar árvores nativas nas vias.", "Instalar relva artificial sintética em todos os parques.", "Bloquear a entrada de aves nas cidades."],
        correct: 1,
        explanation: "Os corredores ecológicos reconectam ecossistemas isolados dentro das cidades, permitindo que a microfauna sobreviva."
    }
];

// O SEGUNDO QUIZ INTERATIVO: DIFICULDADE EXTREMA
const hardQuestions = [
    {
        question: "Qual bactéria do solo oxida a amônia em nitrito na primeira etapa da nitrificação quimiolitoautotrófica?",
        options: ["Nitrobacter", "Nitrosomonas", "Rhizobium", "Clostridium pasteurianum"],
        correct: 1,
        explanation: "Crucial para a bio-fertilidade do solo! As bactérias do gênero Nitrosomonas convertem amônia (NH3) em nitrito (NO2-)."
    },
    {
        question: "No fenômeno hidrológico de capilaridade do solo, qual força molecular prevalece para mover a água contra a gravidade?",
        options: ["Tensão superficial decorrente da coesão e adesão molecular.", "Pressão osmótica induzida por micorrizas.", "Força centrífuga magnética dos polos terrestres.", "Gradiente de bombeamento ativo por ATP sintase."],
        correct: 0,
        explanation: "Física pura da água! A capilaridade ocorre graças à adesão nas paredes dos microporos do solo e à coesão entre moléculas de hidrogênio."
    },
    {
        question: "Em genética de ecossistemas, o que descreve com precisão o termo 'Efeito Gargalo' na biodiversidade?",
        options: ["O crescimento exponencial da fauna em áreas de preservação.", "A redução drástica da variabilidade genética de uma espécie após um desastre ambiental.", "O aumento do número de predadores topo de cadeia.", "A migração forçada de polinizadores para estufas fechadas."],
        correct: 1,
        explanation: "Gargalo evolutivo! Quando uma população cai bruscamente, os sobreviventes perdem genes cruciais, ameaçando a sobrevivência de longo prazo da espécie."
    }
];

// --- Controle de Estados ---
let currentQuestionsBank = normalQuestions;
let currentIndex = 0;
let userPoints = 0;
let baseFontSize = 16;
let modeHardUnlocked = false;
let isHardActive = false;

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
const hardModeBtn = document.getElementById("hard-mode-btn");
const leaderboardBoxArea = document.getElementById("leaderboard-box-area");

document.addEventListener("DOMContentLoaded", () => {
    initQuiz();
    initParticles();
    initFilters();
    initAccessibility();
    
    hardModeBtn.addEventListener("click", activateHardModeLogic);
});

// Partículas Ambientais Dinâmicas
function initParticles() {
    const pContainer = document.getElementById("particle-container");
    pContainer.innerHTML = ""; 
    
    if (!isHardActive) {
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
    } else {
        for (let i = 0; i < 15; i++) {
            const skull = document.createElement("div");
            skull.classList.add("skull-particle");
            skull.textContent = "💀";
            skull.style.left = `${Math.random() * 100}vw`;
            skull.style.animationDelay = `${Math.random() * 4}s`;
            skull.style.animationDuration = `${Math.random() * 3 + 4}s`;
            pContainer.appendChild(skull);
        }
    }
}

// Renderizar Pergunta
function initQuiz() {
    buttonNext.classList.add("hidden");
    feedBox.classList.add("hidden");
    feedBox.className = "feedback-box";
    optContainer.innerHTML = "";

    const activeQ = currentQuestionsBank[currentIndex];
    qText.textContent = activeQ.question;
    progText.textContent = `Desafio ${currentIndex + 1} de ${currentQuestionsBank.length}`;

    activeQ.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.classList.add("option-btn");
        btn.addEventListener("click", () => verifySelection(idx, btn));
        optContainer.appendChild(btn);
    });
}

// Verificação com Regras Customizadas
function verifySelection(chosenIdx, clickedBtn) {
    const activeQ = currentQuestionsBank[currentIndex];
    const allButtons = optContainer.querySelectorAll(".option-btn");

    allButtons.forEach(b => b.setAttribute("disabled", "true"));

    if (chosenIdx === activeQ.correct) {
        clickedBtn.classList.add("correct");
        feedBox.textContent = `🎉 Perfeito! ${activeQ.explanation}`;
        feedBox.classList.add("correct");
        
        // Regra de Pontos: +333 se for HARD, senão +100
        userPoints += isHardActive ? 333 : 100;
        
        scoreCount.textContent = userPoints;
        const maxPossiblePoints = isHardActive ? 999 : 600;
        const percentage = Math.min((userPoints / maxPossiblePoints) * 100, 100);
        xpFill.style.width = `${percentage}%`;

        feedBox.classList.remove("hidden");
        buttonNext.classList.remove("hidden");
        buttonNext.focus();
    } else {
        clickedBtn.classList.add("wrong");
        allButtons[activeQ.correct].classList.add("correct");
        
        if (isHardActive) {
            // REGRA ATUALIZADA: Errou no modo HARD, volta IMEDIATAMENTE ao início do site
            alert("💀 ERRO FATAL NO MODO HARD! Você falhou e foi banido de volta ao início!");
            resetToStartGame();
        } else {
            // Sistema normal de penalidade
            feedBox.textContent = `💡 Errado! Foco na explicação: ${activeQ.explanation}`;
            feedBox.classList.add("wrong");
            userPoints -= 50;
            if (userPoints < 0) userPoints = 0;
            
            scoreCount.textContent = userPoints;
            const percentage = Math.min((userPoints / 600) * 100, 100);
            xpFill.style.width = `${percentage}%`;

            feedBox.classList.remove("hidden");
            buttonNext.classList.remove("hidden");
            buttonNext.focus();
        }
    }
}

buttonNext.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < currentQuestionsBank.length) {
        initQuiz();
    } else {
        finishQuiz();
    }
});

// Finalização da Etapa
function finishQuiz() {
    boxQuiz.classList.add("hidden");
    boxResult.classList.remove("hidden");
    
    if (!isHardActive) {
        leaderboardBoxArea.classList.remove("hidden"); // Exibe leaderboard no normal
        let icon = "🌱";
        let message = "Continue estudando e praticando a sustentabilidade para melhorar seu placar!";
        
        if (userPoints === 600) {
            icon = "🔥";
            message = "Incrível! Você atingiu a perfeição ecológica. Um portal misterioso se abriu abaixo...";
            modeHardUnlocked = true;
            hardModeBtn.classList.remove("hidden");
        } else if (userPoints >= 300) {
            icon = "💧";
            message = "Excelente resultado! Seus hábitos estão em ótimo caminho para o amanhã.";
        }
        
        iconMedal.textContent = icon;
        textResult.innerHTML = `Você encerrou sua missão acumulando <strong>${userPoints} pontos</strong>.<br>${message}`;
        renderLeaderboard("Você (Normal)");
    } else {
        // Lógica do Quiz HARD Finalizado com Sucesso
        hardModeBtn.classList.add("hidden");
        leaderboardBoxArea.classList.add("hidden"); // REGRA ATUALIZADA: Esconde a tabela de oponentes no HARD
        
        // Se acertou as 3 perguntas (333 * 3 = 999)
        if (userPoints === 999) {
            iconMedal.textContent = "⚔️";
            iconMedal.style.fontSize = "5.5rem";
            document.getElementById("result-title-text").textContent = "👑 TRIONFO SOLITÁRIO SUPREMO 👑";
            textResult.innerHTML = `<span style="color:#b800ff; font-weight:900; font-size:1.5rem;">REI ABSOLUTO!</span><br><br>Sua mente superou os mistérios mais profundos. Como recompensa por gabaritar o Submundo sem oponentes à sua altura, você empunha agora a <strong>Espada Sagrada de Poder Infinito 🗡️✨</strong>! O ecossistema está salvo sob seu comando absoluto.`;
        }
    }
}

// Mutação para o Modo Hard
function activateHardModeLogic() {
    isHardActive = true;
    currentIndex = 0;
    userPoints = 0; 
    currentQuestionsBank = hardQuestions;
    
    document.body.classList.add("hard-mode");
    
    document.getElementById("info-section-area").style.display = "none";
    document.getElementById("section-divider").style.display = "none";
    
    document.getElementById("main-title").textContent = "MODO HARD: O SUBMUNDO DO SOLO";
    document.getElementById("main-subtitle").textContent = "Morte súbita ativada. Um erro te manda para o início.";
    document.getElementById("quiz-title").textContent = "Desafio do Submundo 💀";
    document.getElementById("quiz-desc").textContent = "Cada acerto confere +333 pontos. Não há espaço para oponentes.";
    document.getElementById("score-text-label").innerHTML = "Pontos HARD Atuais: <span id=\"score-counter\">0</span> Pts";
    
    scoreCount.textContent = "0";
    xpFill.style.width = "0%";
    boxResult.classList.add("hidden");
    boxQuiz.classList.remove("hidden");
    
    initParticles();
    initQuiz();
}

function renderLeaderboard(userName) {
    leaderboardList.innerHTML = "";
    
    // Oponentes existem apenas no modo normal
    const competitors = [
        { name: "EcoGuardião_Alpha", points: 550 },
        { name: "GaiaProtetor_99", points: 400 },
        { name: "SustentaMundo", points: 150 },
        { name: userName, points: userPoints, isUser: true }
    ];

    competitors.sort((a, b) => b.points - a.points);

    competitors.forEach((player, index) => {
        const li = document.createElement("li");
        let prefix = `${index + 1}.`;
        if (index === 0) prefix = "🥇 1º";
        if (index === 1) prefix = "🥈 2º";
        if (index === competitors.length - 1) prefix = "🥉 Último";

        if (player.isUser) li.classList.add("user-highlight");

        li.innerHTML = `<span>${prefix} ${player.name}</span> <span>${player.points} pts</span>`;
        leaderboardList.appendChild(li);
    });
}

// Filtros dos cards normais
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
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

// Função Unificada para Resetar e Voltar para a estaca zero
function resetToStartGame() {
    currentIndex = 0;
    userPoints = 0;
    isHardActive = false;
    currentQuestionsBank = normalQuestions;
    
    document.body.classList.remove("hard-mode");
    document.getElementById("info-section-area").style.display = "block";
    document.getElementById("section-divider").style.display = "block";
    document.getElementById("main-title").textContent = "Cultivando o Amanhã";
    document.getElementById("main-subtitle").textContent = "Água, Terra e Vida em Equilíbrio";
    document.getElementById("quiz-title").textContent = "Missão Ecológica Dinâmica 🎮";
    document.getElementById("quiz-desc").textContent = "Regras: Acertou = +100pts | Errou = -50pts";
    document.getElementById("result-title-text").textContent = "Painel de Conquistas";
    document.getElementById("score-text-label").innerHTML = "Sua Pontuação Atual: <span id=\"score-counter\">0</span> Pontos";
    iconMedal.style.fontSize = "4rem";
    
    scoreCount.textContent = "0";
    xpFill.style.width = "0%";
    hardModeBtn.classList.add("hidden");
    boxResult.classList.add("hidden");
    boxQuiz.classList.remove("hidden");
    
    initParticles();
    initQuiz();
    
    // Faz o navegador rolar suavemente para o topo (início do site)
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.getElementById("restart-btn").addEventListener("click", resetToStartGame);

function initAccessibility() {
    document.getElementById("toggle-contrast").addEventListener("click", () => document.body.classList.toggle("high-contrast"));
    document.getElementById("increase-font").addEventListener("click", () => { if (baseFontSize < 24) { baseFontSize += 2; document.body.style.fontSize = `${baseFontSize}px`; } });
    document.getElementById("decrease-font").addEventListener("click", () => { if (baseFontSize > 13) { baseFontSize -= 2; document.body.style.fontSize = `${baseFontSize}px`; } });
}