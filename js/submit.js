// js/submit.js

// In submit.js (or your main JS file)
let dictionary = []; // will hold the word objects

// Load dictionary when the page loads
fetch('https://raw.githubusercontent.com/ramy430/tausug-splitter-1/main/json/dictionary.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load dictionary');
    return response.json();
  })
  .then(data => {
    dictionary = data;
    console.log(`Dictionary loaded: ${dictionary.length} words`);
    // Now you can enable the annotation features
  })
  .catch(error => {
    console.error('Dictionary error:', error);
    // Optionally show a message to the user
  });

// Example function to get word info
function getWordInfo(tausugWord) {
  return dictionary.find(entry => entry.tausug === tausugWord);
}
document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', submitToGitHub);
    }
});

// Submit to GitHub – one issue per word
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
}
