// Function to create keyboard layout HTML
function createKeyboardLayout() {
    return `
        <div class="keyboard-learning-header">
            <h2>Aprendendo o Teclado</h2>
            <p>Pratique a digitação seguindo as instruções</p>
        </div>
        
        <div class="keyboard-container">
            <div class="keyboard">
                <div class="keyboard-row">
                    <div class="key" data-key="q">Q</div>
                    <div class="key" data-key="w">W</div>
                    <div class="key" data-key="e">E</div>
                    <div class="key" data-key="r">R</div>
                    <div class="key" data-key="t">T</div>
                    <div class="key" data-key="y">Y</div>
                    <div class="key" data-key="u">U</div>
                    <div class="key" data-key="i">I</div>
                    <div class="key" data-key="o">O</div>
                    <div class="key" data-key="p">P</div>
                </div>
                <div class="keyboard-row">
                    <div class="key" data-key="a">A</div>
                    <div class="key" data-key="s">S</div>
                    <div class="key" data-key="d">D</div>
                    <div class="key" data-key="f">F</div>
                    <div class="key" data-key="g">G</div>
                    <div class="key" data-key="h">H</div>
                    <div class="key" data-key="j">J</div>
                    <div class="key" data-key="k">K</div>
                    <div class="key" data-key="l">L</div>
                </div>
                <div class="keyboard-row">
                    <div class="key" data-key="Shift">⇧</div>
                    <div class="key" data-key="z">Z</div>
                    <div class="key" data-key="x">X</div>
                    <div class="key" data-key="c">C</div>
                    <div class="key" data-key="v">V</div>
                    <div class="key" data-key="b">B</div>
                    <div class="key" data-key="n">N</div>
                    <div class="key" data-key="m">M</div>
                    <div class="key" data-key="Backspace">⌫</div>
                </div>
                <div class="keyboard-row">
                    <div class="key" data-key="Space">Espaço</div>
                </div>
            </div>
        </div>
        
        <div class="practice-area">
            <div class="target-text">Digite: "ola"</div>
            <input type="text" class="user-input-field" placeholder="Digite aqui" autocomplete="off">
            <div class="feedback-message"></div>
        </div>
        
        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
        
        <div class="lesson-controls">
            <button class="lesson-button restart-button">Reiniciar</button>
            <button class="lesson-button next-button" disabled>Próximo</button>
        </div>
    `;
}

// Function to adjust keyboard for mobile screens
function adjustKeyboardForMobile() {
    const keys = document.querySelectorAll('.key');
    const keyboard = document.querySelector('.keyboard');
    
    // Calculate optimal key size based on screen width
    const keyboardWidth = keyboard.offsetWidth;
    const rowLength = Math.max(...Array.from(document.querySelectorAll('.keyboard-row')).map(row => row.children.length));
    const optimalKeyWidth = (keyboardWidth / rowLength) - 6; // 6px for gap
    
    // Apply optimal size to all keys
    keys.forEach(key => {
        key.style.width = `${optimalKeyWidth}px`;
        key.style.height = `${optimalKeyWidth * 1.2}px`;
        
        // Make space key wider
        if (key.getAttribute('data-key') === 'Space') {
            key.style.width = `${optimalKeyWidth * 5}px`;
        }
    });
    
    // Adjust font size based on key size
    const fontSize = Math.max(12, Math.min(18, optimalKeyWidth / 2.2));
    document.documentElement.style.setProperty('--key-font-size', `${fontSize}px`);
}

export { createKeyboardLayout, adjustKeyboardForMobile };
