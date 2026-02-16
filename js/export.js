// js/export.js

document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportJSON);
    }
});

function exportJSON() {
    const boxes = document.querySelectorAll('.word-box');
    if (!boxes.length) {
        alert('No words to export. Split a sentence first.');
        return;
    }

    // Build a categorized dictionary
    const dict = {};

    boxes.forEach(box => {
        const word = box.querySelector('.word-span').textContent.trim();
        const meaning = box.querySelector('.meaning-input').value.trim();
        const category = box.querySelector('.category-select').value; // already lowercase

        if (word && meaning) {
            if (!dict[category]) {
                dict[category] = {};
            }
            dict[category][word] = meaning;
        }
    });

    if (Object.keys(dict).length === 0) {
        alert('No valid word–meaning pairs to export.');
        return;
    }

    // Add metadata (optional, like the translator's dictionary)
    const output = {
        metadata: {
            version: "1.0",
            generated: new Date().toISOString(),
            totalWords: Object.values(dict).reduce((acc, cat) => acc + Object.keys(cat).length, 0)
        },
        ...dict
    };

    const jsonString = JSON.stringify(output, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dictionary.json';
    a.click();
    URL.revokeObjectURL(url);
}
