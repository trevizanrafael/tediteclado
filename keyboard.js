// Import necessary modules
import config from './config.js';
import { highlightRelevantKeys, celebrateCompletion } from './keyboardEffects.js';
import { createKeyboardLayout, adjustKeyboardForMobile } from './keyboardUI.js';

// Main function to initialize the keyboard application
document.addEventListener('DOMContentLoaded', function() {
    // Add keyboard layout to container
    const keyboardContainer = document.getElementById('keyboard-learning-container');
    keyboardContainer.innerHTML = createKeyboardLayout();
    
    // Adjust keyboard for mobile
    adjustKeyboardForMobile();
    
    // Setup keyboard events
    setupKeyboardEvents();
    
    // Resize handler for responsive adjustments
    window.addEventListener('resize', adjustKeyboardForMobile);
});

// Function to setup keyboard event handlers
function setupKeyboardEvents() {
    const userInput = document.querySelector('.user-input-field');
    const targetText = document.querySelector('.target-text');
    const feedbackMessage = document.querySelector('.feedback-message');
    const nextButton = document.querySelector('.next-button');
    const restartButton = document.querySelector('.restart-button');
    const progressBar = document.querySelector('.progress-bar');
    const keys = document.querySelectorAll('.key');
    
    let currentLesson = 1;
    const totalLessons = 5;
    const lessons = [
        { text: "ola", description: "Digite: \"ola\"" },
        { text: "casa", description: "Digite: \"casa\"" },
        { text: "teclado", description: "Digite: \"teclado\"" },
        { text: "computador", description: "Digite: \"computador\"" },
        { text: "aprendendo a digitar", description: "Digite: \"aprendendo a digitar\"" }
    ];
    
    const config = {
        totalLessons: totalLessons,
        lessons: lessons,
        messages: {
            correct: "Muito bem! ",
            continue: "Continue digitando...",
            incorrect: "Ops! Verifique o que você digitou.",
            loading: "Carregando próxima lição...",
            completed: "Parabéns! Você completou todas as lições!",
            returnMsg: "Volte ao menu para mais atividades"
        },
        confettiCount: 50,
        animationTimes: {
            confettiDuration: { min: 1500, max: 2000 },
            lessonTransition: 400,
            keyHighlight: 3000
        }
    };
    
    // Focus input when clicking anywhere in practice area
    document.querySelector('.practice-area').addEventListener('click', function() {
        userInput.focus();
    });
    
    // Key highlight on keyboard press
    userInput.addEventListener('keydown', function(e) {
        const key = e.key.toLowerCase();
        
        // Find and highlight pressed key
        keys.forEach(keyElement => {
            const dataKey = keyElement.getAttribute('data-key').toLowerCase();
            if (dataKey === key || 
                (key === ' ' && dataKey === 'space') ||
                (key === 'enter' && dataKey === 'enter') ||
                (key === 'shift' && dataKey === 'shift') ||
                (key === 'backspace' && dataKey === 'backspace')) {
                keyElement.classList.add('pressed');
            }
        });
    });
    
    userInput.addEventListener('keyup', function(e) {
        const key = e.key.toLowerCase();
        
        // Remove highlight from released key
        keys.forEach(keyElement => {
            const dataKey = keyElement.getAttribute('data-key').toLowerCase();
            if (dataKey === key || 
                (key === ' ' && dataKey === 'space') ||
                (key === 'enter' && dataKey === 'enter') ||
                (key === 'shift' && dataKey === 'shift') ||
                (key === 'backspace' && dataKey === 'backspace')) {
                keyElement.classList.remove('pressed');
            }
        });
        
        // Check if input matches target text
        const currentTarget = lessons[currentLesson - 1].text;
        if (userInput.value.toLowerCase() === currentTarget.toLowerCase()) {
            feedbackMessage.textContent = config.messages.correct;
            feedbackMessage.className = "feedback-message feedback-correct";
            nextButton.disabled = false;
        } else if (currentTarget.toLowerCase().startsWith(userInput.value.toLowerCase())) {
            feedbackMessage.textContent = config.messages.continue;
            feedbackMessage.className = "feedback-message";
            nextButton.disabled = true;
        } else {
            feedbackMessage.textContent = config.messages.incorrect;
            feedbackMessage.className = "feedback-message feedback-incorrect";
            nextButton.disabled = true;
        }
    });
    
    // Restart button functionality
    restartButton.addEventListener('click', function() {
        currentLesson = 1;
        updateLesson();
        userInput.focus();
    });
    
    // Next button functionality
    nextButton.addEventListener('click', function() {
        if (currentLesson < totalLessons) {
            currentLesson++;
            updateLesson();
            
            // Add a nice visual effect when moving to next lesson
            feedbackMessage.textContent = config.messages.loading;
            feedbackMessage.className = "feedback-message";
            
            // Animated highlight effect for target text
            targetText.style.transform = "scale(1.05)";
            setTimeout(() => {
                targetText.style.transform = "";
            }, config.animationTimes.lessonTransition);
        } else {
            // Completed all lessons with celebration effect
            targetText.textContent = config.messages.completed;
            targetText.style.color = "#4CAF50";
            targetText.style.textShadow = "0 0 10px rgba(76, 175, 80, 0.5)";
            
            userInput.style.display = 'none';
            feedbackMessage.textContent = config.messages.returnMsg;
            feedbackMessage.className = "feedback-message feedback-correct";
            nextButton.disabled = true;
            
            // Update progress bar to 100% when all lessons are completed
            progressBar.style.width = "100%";
            
            // Add celebration effect
            celebrateCompletion(document);
        }
    });
    
    // Update lesson content with enhanced visual transitions
    function updateLesson() {
        targetText.textContent = lessons[currentLesson - 1].description;
        userInput.value = '';
        userInput.focus();
        feedbackMessage.textContent = '';
        nextButton.disabled = true;
        
        // Update progress bar with better animation
        const progress = (currentLesson - 1) / totalLessons * 100;
        progressBar.style.width = `${progress}%`;
        
        // Highlight keys related to the current lesson
        highlightRelevantKeys(lessons[currentLesson - 1].text);
    }
    
    // Initialize the first lesson with enhanced visual cues
    updateLesson();
}
