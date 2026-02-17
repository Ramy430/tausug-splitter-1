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
const pronunInput = document.createElement('input');
pronunInput.type = 'text';
pronunInput.placeholder = 'Pronunciation';
pronunInput.className = 'pronunciation-input';
}
