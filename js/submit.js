        alert('No words to submit. Split a sentence first.');
        return;
    }

    const submissions = [];
    boxes.forEach(box => {
        const word = box.querySelector('.word-span').textContent.trim();
        const meaning = box.querySelector('.meaning-input').value.trim();
        const category = box.querySelector('.category-input').value.trim() || 'uncategorized';
        if (word && meaning) {
            submissions.push({ tausug: word, english: meaning, category });
        }
    });

    if (submissions.length === 0) {
        alert('No valid word–meaning pairs to submit.');
        return;
    }

    // 🔁 Update with your repository details
    const REPO_OWNER = 'Ramy430';
    const REPO_NAME = 'tausug-splitter-1'; // change if needed

    submissions.forEach(item => {
        const title = `New Word: ${item.tausug} = ${item.english}`;
        const body = `Tausug: ${item.tausug}\nEnglish: ${item.english}\nCategory: ${item.category}`;
        const url = `https://github.com/${REPO_OWNER}/${REPO_NAME}/issues/new?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}&labels=word-submission`;
        window.open(url, '_blank');
    });
  const category = box.querySelector('.category-input').value.trim() || 'uncategorized';

    setTimeout(() => {
        alert(`${submissions.length} issue(s) opened. Please review and submit each on GitHub.`);
    }, 1000);

}// After dictionary is loaded
fetch('...')
  .then(response => response.json())
  .then(data => {
    dictionary = data.words;
    displayDictionaryStats(data.metadata);
    console.log(`Dictionary loaded: ${dictionary.length} words`);
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
        document.getElementById('exportBtn').addEventListener('click', exportToJSON);

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
        
        // Only include words that have both word and meaning
        if (word && meaning) {
            words.push({
                tausug: word,
                english: meaning,
                category: category
                // pronunciation is not collected from user input; you can add a field later if needed
            });
        }
    });

    if (words.length === 0) {
        alert('No valid word–meaning pairs to export.');
        return;
    }

    // Create JSON string
    const jsonStr = JSON.stringify(words, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `tausug-words-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Exported ${words.length} word(s) to JSON.`);
}
}

