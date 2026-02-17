// js/splitter.js

const splitBtn = document.getElementById('splitBtn');
const outputArea = document.getElementById('outputArea');

// Disable Split button until dictionary is loaded
if (splitBtn) {
    splitBtn.disabled = true;
    splitBtn.textContent = 'Loading dictionary...';
}

// Listen for dictionary ready event
window.addEventListener('dictionaryloaded', () => {
    if (splitBtn) {
        splitBtn.disabled = false;
        splitBtn.textContent = 'Split';
    }
    console.log('splitter.js: dictionary ready, split enabled');
});

// Also handle error case
window.addEventListener('dictionaryerror', () => {
    if (splitBtn) {
        splitBtn.disabled = false;
        splitBtn.textContent = 'Split (no dictionary)';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (splitBtn) {
        splitBtn.addEventListener('click', splitSentence);
    }
});

function splitSentence() {
    const input = document.getElementById('sentenceInput');
    const sentence = input.value.trim();

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

        const pronunInput = document.createElement('input');
        pronunInput.type = 'text';
        pronunInput.placeholder = 'Pronunciation';
        pronunInput.className = 'pronunciation-input';

        // Auto-fill if word exists in global dictionary
        const entry = window.tausugDictionary?.find(e => e.tausug === word);
        if (entry) {
            meaningInput.value = entry.english || '';
            categoryInput.value = entry.category || '';
            pronunInput.value = entry.pronunciation || '';
        }

        box.appendChild(wordSpan);
        box.appendChild(meaningInput);
        box.appendChild(categoryInput);
        box.appendChild(pronunInput);
        outputArea.appendChild(box);
    });
}
