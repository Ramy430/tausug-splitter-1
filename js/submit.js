// js/submit.js

// Show dictionary stats when loaded
window.addEventListener('dictionaryloaded', (event) => {
    displayDictionaryStats(event.detail.metadata);
});

function displayDictionaryStats(metadata) {
    const statsDiv = document.getElementById('dictionaryStats');
    if (statsDiv) {
        statsDiv.innerHTML = `
            <span>📚 ${metadata.totalWords} words</span>
            <span>🕒 Last updated: ${metadata.lastUpdated}</span>
            <span>📁 Categories: ${metadata.categories.join(', ')}</span>
        `;
    }
}

// Normalize category to plural form (for GitHub issues)
function normalizeCategory(cat) {
    const map = {
        'noun': 'nouns',
        'verb': 'verbs',
        'adjective': 'adjectives',
        'pronoun': 'pronouns',
        'number': 'numbers',
        'phrase': 'phrases'
    };
    return map[cat.toLowerCase()] || cat;
}

document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitToGitHub);
    }
});

function submitToGitHub() {
    const boxes = document.querySelectorAll('.word-box');
    if (!boxes.length) {
        alert('No words to submit. Split a sentence first.');
        return;
    }

    const submissions = [];
    boxes.forEach(box => {
        const word = box.querySelector('.word-span').textContent.trim();
        const meaning = box.querySelector('.meaning-input').value.trim();
        let category = box.querySelector('.category-input').value.trim() || 'uncategorized';
        const pronunciation = box.querySelector('.pronunciation-input').value.trim();

        category = normalizeCategory(category);
        
        if (word && meaning) {
            submissions.push({
                tausug: word,
                english: meaning,
                category: category,
                pronunciation: pronunciation || ''
            });
        }
    });

    if (submissions.length === 0) {
        alert('No valid word–meaning pairs to submit.');
        return;
    }

    const REPO_OWNER = 'Ramy430';
    const REPO_NAME = 'tausug-splitter-1';

    submissions.forEach(item => {
        // Build issue body, include pronunciation if provided
        let body = `Tausug: ${item.tausug}\nEnglish: ${item.english}\nCategory: ${item.category}`;
        if (item.pronunciation) {
            body += `\nPronunciation: ${item.pronunciation}`;
        }
        const title = `New Word: ${item.tausug} = ${item.english}`;
        const url = `https://github.com/${REPO_OWNER}/${REPO_NAME}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=word-submission`;
        window.open(url, '_blank');
    });

    setTimeout(() => {
        alert(`${submissions.length} issue(s) opened. Please review and submit each on GitHub.`);
    }, 1000);
}
