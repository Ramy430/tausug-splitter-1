// js/submit.js

let dictionary = [];

// Load dictionary with metadata
fetch('https://raw.githubusercontent.com/ramy430/tausug-splitter-1/main/json/dictionary.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load dictionary');
    return response.json();
  })
  .then(data => {
    dictionary = data.words;               // the word array inside metadata
    displayDictionaryStats(data.metadata);  // show stats on page
    console.log(`Dictionary loaded: ${dictionary.length} words`);
  })
  .catch(error => {
    console.error('Dictionary error:', error);
    document.getElementById('dictionaryStats').innerHTML = 
      '<span>⚠️ Dictionary failed to load</span>';
  });

// Show dictionary stats in the stats bar
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

// Lookup a word in the dictionary (optional helper)
function getWordInfo(tausugWord) {
    return dictionary.find(entry => entry.tausug === tausugWord);
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

// Wait for DOM before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitToGitHub);
    }
    
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToJSON);
    }
});

// Submit each word as a separate GitHub issue
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
        category = normalizeCategory(category);   // ensure plural form
        
        if (word && meaning) {
            submissions.push({ tausug: word, english: meaning, category });
        }
    });

    if (submissions.length === 0) {
        alert('No valid word–meaning pairs to submit.');
        return;
    }

    const REPO_OWNER = 'Ramy430';
    const REPO_NAME = 'tausug-splitter-1';   // change if needed

    submissions.forEach(item => {
        const title = `New Word: ${item.tausug} = ${item.english}`;
        const body = `Tausug: ${item.tausug}\nEnglish: ${item.english}\nCategory: ${item.category}`;
        const url = `https://github.com/${REPO_OWNER}/${REPO_NAME}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=word-submission`;
        window.open(url, '_blank');
    });

    setTimeout(() => {
        alert(`${submissions.length} issue(s) opened. Please review and submit each on GitHub.`);
    }, 1000);
}

// Export the current words as a JSON file
function exportToJSON() {
    const boxes = document.querySelectorAll('.word-box');
    if (!boxes.length) {
        alert('No words to export. Split a sentence first.');
        return;
    }

    const words = [];
    boxes.forEach(box => {
        const word = box.querySelector('.word-span').textContent.trim();
        const meaning = box.querySelector('.meaning-input').value.trim();
        const category = box.querySelector('.category-input').value.trim() || 'uncategorized';
        
        // Only include valid pairs
        if (word && meaning) {
            words.push({
                tausug: word,
                english: meaning,
                category: category
                // pronunciation can be added later if collected
            });
        }
    });

    if (words.length === 0) {
        alert('No valid word–meaning pairs to export.');
        return;
    }

    // Create downloadable JSON
    const jsonStr = JSON.stringify(words, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `tausug-words-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Exported ${words.length} word(s) to JSON.`);
}
