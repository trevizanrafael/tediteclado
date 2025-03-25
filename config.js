// Configuration settings for the keyboard learning module
const config = {
    // Lessons data
    lessons: [
        { text: "ola", description: "Digite: \"ola\"" },
        { text: "casa", description: "Digite: \"casa\"" },
        { text: "teclado", description: "Digite: \"teclado\"" },
        { text: "computador", description: "Digite: \"computador\"" },
        { text: "aprendendo a digitar", description: "Digite: \"aprendendo a digitar\"" }
    ],
    
    // Total number of lessons
    totalLessons: 5,
    
    // Animation durations
    animationTimes: {
        keyHighlight: 3000,
        lessonTransition: 400,
        confettiDuration: {
            min: 1500,
            max: 2000
        }
    },
    
    // UI text
    messages: {
        correct: "Muito bem! ",
        continue: "Continue digitando...",
        incorrect: "Ops! Verifique o que você digitou.",
        loading: "Carregando próxima lição...",
        completed: "Parabéns! Você completou todas as lições!",
        returnMsg: "Volte ao menu para mais atividades"
    },
    
    // Celebration confetti count
    confettiCount: 50
};

export default config;
