// Import config
import config from './config.js';

// Function to highlight keys relevant to the current word
function highlightRelevantKeys(word) {
    const keys = document.querySelectorAll('.key');
    
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

// Function to celebrate completion
function celebrateCompletion() {
    // Create confetti effect
    for (let i = 0; i < config.confettiCount; i++) {
        createConfetti();
    }
    
    // Vibrate in celebration pattern on mobile
    if (navigator.vibrate) {
        navigator.vibrate([100, 30, 100, 30, 300]);
    }
}

function createConfetti() {
    const container = document.querySelector('.keyboard-learning-container');
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
    container.appendChild(confetti);
    
    // Animate confetti
    const animation = confetti.animate([
        { 
            top: '-10px', 
            transform: 'scale(' + (Math.random() * 0.6 + 0.4) + ') rotate(0deg)',
            opacity: 1 
        },
        { 
            top: container.offsetHeight + 'px', 
            transform: 'scale(' + (Math.random() * 0.6 + 0.4) + ') rotate(' + (Math.random() * 360) + 'deg)',
            opacity: 0 
        }
    ], {
        duration: Math.random() * config.animationTimes.confettiDuration.max + config.animationTimes.confettiDuration.min,
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

export { highlightRelevantKeys, celebrateCompletion };
