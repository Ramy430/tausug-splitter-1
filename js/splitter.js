// js/splitter.js

document.addEventListener('DOMContentLoaded', () => {
    const splitBtn = document.getElementById('splitBtn');
    if (splitBtn) {
        splitBtn.addEventListener('click', splitSentence);
    }
});

function splitSentence() {
    const input = document.getElementById('sentenceInput');
    const sentence = input.value.trim();
    const outputArea = document.getElementById('outputArea');

    if (!sentence) {
        alert('Please enter a sentence.');
        return;
    }

    // Clean: lowercase, remove punctuation except apostrophes
    let clean = sentence.toLowerCase();
    clean = clean.replace(/[^\w\s']/g, ' ');
    const words = clean.split(/\s+/).filter(w => w.length > 0);

    outputArea.innerHTML = '';
    words.forEach(word => {
        const box = document.createElement('div');
        box.className = 'word-box';

        const wordSpan = document.createElement('span');
        wordSpan.className = 'word-span';
        wordSpan.textContent = word;

        const meaningInput = document.createElement('input');
        meaningInput.type = 'text';
        meaningInput.placeholder = 'Meaning';
        meaningInput.className = 'meaning-input';

        const categoryInput = document.createElement('input');
        categoryInput.type = 'text';
        categoryInput.placeholder = 'Category (e.g., noun)';
        categoryInput.className = 'category-input';

        box.appendChild(wordSpan);
        box.appendChild(meaningInput);
        box.appendChild(categoryInput);
        outputArea.appendChild(box);
    });
}
