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
}

