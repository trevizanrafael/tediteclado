// Setup keyboard event handlers
function setupKeyboardEvents() {
    const userInput = document.querySelector('.user-input-field');
    const targetText = document.querySelector('.target-text');
    const feedbackMessage = document.querySelector('.feedback-message');
    const nextButton = document.querySelector('.next-button');
    const restartButton = document.querySelector('.restart-button');
    const progressBar = document.querySelector('.progress-bar');
    const keys = document.querySelectorAll('.key');
    
    let currentLesson = 1;
    const config = {
        totalLessons: 5,
        lessons: [
            { text: "ola", description: "Digite: \"ola\"" },
            { text: "casa", description: "Digite: \"casa\"" },
            { text: "teclado", description: "Digite: \"teclado\"" },
            { text: "computador", description: "Digite: \"computador\"" },
            { text: "aprendendo a digitar", description: "Digite: \"aprendendo a digitar\"" }
        ],
        messages: {
            correct: "Muito bem! ",
            continue: "Continue digitando...",
            incorrect: "Ops! Verifique o que você digitou.",
            loading: "Carregando próxima lição...",
            completed: "Parabéns! Você completou todas as lições!",
            returnMsg: "Volte ao menu para mais atividades"
        },
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
    
    // Add event listener for input on mobile
    userInput.addEventListener('input', checkUserInput);
    
    // Virtual keyboard key press
    keys.forEach(keyElement => {
        keyElement.addEventListener('touchstart', function(e) {
            e.preventDefault();
            keyElement.classList.add('pressed');
            
            const keyValue = keyElement.getAttribute('data-key');
            simulateKeyPress(keyValue, userInput);
            
            setTimeout(() => {
                keyElement.classList.remove('pressed');
            }, 200);
        });
        
        keyElement.addEventListener('mousedown', function() {
            keyElement.classList.add('pressed');
            
            const keyValue = keyElement.getAttribute('data-key');
            simulateKeyPress(keyValue, userInput);
        });
        
        keyElement.addEventListener('mouseup', function() {
            keyElement.classList.remove('pressed');
        });
    });
    
    // Key highlight on physical keyboard press
    userInput.addEventListener('keydown', function(e) {
        const key = e.key.toLowerCase();
        highlightKey(key, true);
    });
    
    userInput.addEventListener('keyup', function(e) {
        const key = e.key.toLowerCase();
        highlightKey(key, false);
        checkUserInput();
    });
    
    function highlightKey(key, isPressed) {
        keys.forEach(keyElement => {
            const dataKey = keyElement.getAttribute('data-key').toLowerCase();
            if (dataKey === key || 
                (key === ' ' && dataKey === 'space') ||
                (key === 'enter' && dataKey === 'enter') ||
                (key === 'shift' && dataKey === 'shift') ||
                (key === 'backspace' && dataKey === 'backspace')) {
                if (isPressed) {
                    keyElement.classList.add('pressed');
                } else {
                    keyElement.classList.remove('pressed');
                }
            }
        });
    }
    
    function simulateKeyPress(keyValue, inputField) {
        let currentValue = inputField.value;
        
        switch(keyValue.toLowerCase()) {
            case 'space':
                inputField.value = currentValue + ' ';
                break;
            case 'backspace':
                inputField.value = currentValue.slice(0, -1);
                break;
            case 'shift':
                // Toggle case for future inputs, not implemented here
                break;
            default:
                inputField.value = currentValue + keyValue.toLowerCase();
        }
        
        // Trigger input event to check the result
        const event = new Event('input', { bubbles: true });
        inputField.dispatchEvent(event);
    }
    
    function checkUserInput() {
        // Check if input matches target text
        const currentTarget = config.lessons[currentLesson - 1].text;
        
        if (userInput.value.toLowerCase() === currentTarget.toLowerCase()) {
            feedbackMessage.textContent = config.messages.correct;
            feedbackMessage.className = "feedback-message feedback-correct";
            nextButton.disabled = false;
            
            // Vibrate on success for mobile feedback
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
        } else if (currentTarget.toLowerCase().startsWith(userInput.value.toLowerCase())) {
            feedbackMessage.textContent = config.messages.continue;
            feedbackMessage.className = "feedback-message";
            nextButton.disabled = true;
        } else {
            feedbackMessage.textContent = config.messages.incorrect;
            feedbackMessage.className = "feedback-message feedback-incorrect";
            nextButton.disabled = true;
            
            // Short vibration for mistake
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        }
    }
    
    // Restart button functionality
    restartButton.addEventListener('click', function() {
        currentLesson = 1;
        updateLesson();
        userInput.focus();
    });
    
    // Next button functionality
    nextButton.addEventListener('click', function() {
        if (currentLesson < config.totalLessons) {
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
            celebrateCompletion();
        }
    });
    
    // Update lesson content with enhanced visual transitions
    function updateLesson() {
        targetText.textContent = config.lessons[currentLesson - 1].description;
        userInput.value = '';
        userInput.style.display = 'block';
        userInput.focus();
        feedbackMessage.textContent = '';
        nextButton.disabled = true;
        
        // Update progress bar with better animation
        const progress = (currentLesson - 1) / config.totalLessons * 100;
        progressBar.style.width = `${progress}%`;
        
        // Highlight keys related to the current lesson
        highlightRelevantKeys(config.lessons[currentLesson - 1].text);
    }
    
    function highlightRelevantKeys(word) {
        // Reset any previous highlights
        keys.forEach(key => key.classList.remove('highlight'));
        
        // Get unique characters from the word
        const uniqueChars = [...new Set(word.toLowerCase())];
        
        // Highlight keys for each character
        uniqueChars.forEach(char => {
            if (char === ' ') char = 'space';
            
            keys.forEach(keyElement => {
                const dataKey = keyElement.getAttribute('data-key').toLowerCase();
                if (dataKey === char) {
                    keyElement.classList.add('highlight');
                }
            });
        });
        
        // After 3 seconds, remove the highlights
        setTimeout(() => {
            keys.forEach(key => key.classList.remove('highlight'));
        }, config.animationTimes.keyHighlight);
    }
    
    function celebrateCompletion() {
        // Create confetti effect
        for (let i = 0; i < 50; i++) {
            createConfetti();
        }
    }
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.borderRadius = '50%';
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.transform = 'scale(' + (Math.random() * 0.6 + 0.4) + ')';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { 
                top: '-10px', 
                transform: 'scale(' + (Math.random() * 0.6 + 0.4) + ') rotate(0deg)',
                opacity: 1 
            },
            { 
                top: document.body.offsetHeight + 'px', 
                transform: 'scale(' + (Math.random() * 0.6 + 0.4) + ') rotate(' + (Math.random() * 360) + 'deg)',
                opacity: 0 
            }
        ], {
            duration: Math.random() * 2000 + 1500,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        animation.onfinish = function() {
            confetti.remove();
        };
    }
    
    function getRandomColor() {
        const colors = ['#8EC6E6', '#a5d4ec', '#4CAF50', '#FFC107', '#E91E63', '#9C27B0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Initialize the first lesson
    updateLesson();
}
