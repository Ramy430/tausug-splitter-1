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

    // Build a nested dictionary: category -> word -> { meaning, pronunciation }
    const dict = {};

    boxes.forEach(box => {
        const word = box.querySelector('.word-span').textContent.trim();
        const meaning = box.querySelector('.meaning-input').value.trim();
        let category = box.querySelector('.category-input').value.trim();
        const pronunciation = box.querySelector('.pronunciation-input').value.trim();

        if (!category) category = 'uncategorized';
        category = category.toLowerCase();

        if (word && meaning) {
            if (!dict[category]) {
                dict[category] = {};
            }
            // Store as an object with meaning and optional pronunciation
            dict[category][word] = {
                meaning: meaning,
                ...(pronunciation && { pronunciation: pronunciation })
            };
        }
    });

    if (Object.keys(dict).length === 0) {
        alert('No valid word–meaning pairs to export.');
        return;
    }

    // Calculate total words
    const totalWords = Object.values(dict).reduce(
        (sum, catObj) => sum + Object.keys(catObj).length, 0
    );

    // Build final object with metadata
    const output = {
        metadata: {
            version: "1.0",
            generated: new Date().toISOString().split('T')[0],
            totalWords: totalWords,
            categories: Object.keys(dict)
        },
        ...dict
    };

    const jsonStr = JSON.stringify(output, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `tausug-export-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert(`Exported ${totalWords} word(s) to JSON.`);
}
