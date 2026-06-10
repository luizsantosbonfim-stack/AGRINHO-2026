# AGRINHO-2026
meu projeto é um **aplicativo web educacional e interativo** focado na conscientização ambiental (sustentabilidade, preservação da água, solo e biodiversidade) que utiliza fortes elementos de **gamificação** e mecânicas inspiradas em jogos digitais.

Aqui está a descrição detalhada de como o meu projeto está estruturado e funciona:

---

## 1. Proposta Central e Temática

O objetivo principal é ensinar pilares ecológicos essenciais (Água, Terra e Vida) de forma leve e engajadora. O projeto transita de uma plataforma informativa tradicional para um ambiente de "desafio extremo", testando o conhecimento do usuário através de camadas progressivas de dificuldade.

---

## 2. Funcionalidades Principais e Interações

* **Filtros de Conteúdo Dinâmicos:** Na tela inicial, o usuário pode filtrar os cards informativos por categorias (💧 Água, 🌱 Terra, 🐝 Vida). A interface responde ocultando ou exibindo as informações com transições suaves.
* **Fundo Dinâmico de Partículas:** O site conta com um sistema de partículas flutuantes em JavaScript que mudam de estilo visual dependendo do estado do jogo (folhas/orvalho no modo normal e caveiras no modo secreto).
* **Barra de Acessibilidade:** Controles nativos para ativar o modo de Alto Contraste e ajustar o tamanho da fonte (A+/A-), garantindo uma experiência inclusiva.

---

## 3. O Sistema de Gamificação (Dois Níveis)

### Etapa 1: A Missão Ecológica (Modo Normal)

* **Banco de Dados:** Composto por 6 perguntas sobre biologia, ecossistemas e geografia urbana.
* **Sistema de Pontuação Revalida:** Cada resposta correta soma **+100 pontos** e cada erro subtrai **-50 pontos** (com piso mínimo de 0 para evitar pontuações negativas).
* **Barra de Experiência (XP):** Uma barra gráfica que se expande em tempo real conforme o usuário pontua.
* **Placar de Líderes (Leaderboard) Dinâmico:** Ao final, o JavaScript organiza dinamicamente um placar real do maior para o menor pontuador, posicionando o usuário entre competidores fictícios de forma justa.

### Etapa 2: O Submundo do Solo (Modo HARD Secreto)

* **Gatilho de Ativação:** O botão para este modo só se manifesta se o usuário alcançar o score perfeito de **600 pontos** no primeiro quiz.
* **Mutação Visual do Tema:** Ao ser clicado, o site sofre uma transformação visual completa. O design limpo e esverdeado dá lugar a uma estética sombria em tons de **roxo escuro, rosa neon e caveiras flutuantes**.
* **Regra de Morte Súbita:** Não há margem para erros. Se o usuário errar uma única pergunta, um alerta é disparado e o sistema executa um *hard reset*, mandando o jogador de volta para o topo da página inicial com os pontos zerados.
* **Multiplicador de Pontos:** Cada pergunta correta neste modo vale exatamente **333 pontos**, totalizando **999 pontos** ao final.
* **Solidão do Campeão:** A tabela de oponentes é completamente eliminada para enfatizar que o usuário está enfrentando o desafio sozinho.

---

## 4. Condição de Vitória Absoluta

Ao gabaritar com sucesso o Modo HARD, o usuário quebra o ciclo de resets e desbloqueia a tela de conquista máxima, sendo condecorado com:

1. O título honorário de **"REI ABSOLUTO"**.
2. A recompensa mítica e visual da **"Espada Sagrada de Poder Infinito 🗡️✨"** como símbolo de que ele dominou completamente a ciência e a proteção dos ecossistemas do planeta.

---

### Tecnologias Utilizadas

* **HTML5:** Para a marcação semântica e estruturação dos blocos de quiz e acessibilidade.
* **CSS3:** Responsável pelas animações (`@keyframes`), transições de layout, responsividade e variáveis nativas (`:root`) que permitem a troca instantânea de temas.
* **JavaScript (Vanilla):** Responsável por toda a lógica de manipulação da árvore de elementos (DOM), controle dos bancos de perguntas, cálculo matemático de pontos, filtros de cards e gerenciamento de estados do jogo.

* meu creditos vam para a gemine IA que me ajudou a fazer tudo.
