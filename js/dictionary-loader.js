// js/dictionary-loader.js

// Global array that will hold all word objects
window.tausugDictionary = [];

// Promise that resolves when the dictionary is fully loaded
window.dictionaryReady = new Promise((resolve, reject) => {
    fetch('https://raw.githubusercontent.com/ramy430/tausug-splitter-1/main/json/dictionary.json')
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => {
            // Store the words array globally
            window.tausugDictionary = data.words || [];

            // Dispatch a custom event so other scripts can react
            const event = new CustomEvent('dictionaryloaded', {
                detail: {
                    metadata: data.metadata || {},
                    wordCount: window.tausugDictionary.length
                }
            });
            window.dispatchEvent(event);

            console.log(`✅ Dictionary loaded: ${window.tausugDictionary.length} words`);
            resolve(window.tausugDictionary);
        })
        .catch(error => {
            console.error('❌ Dictionary failed to load:', error);
            // Dispatch an error event so UI can show a message
            window.dispatchEvent(new CustomEvent('dictionaryerror', { detail: error.message }));
            reject(error);
        });
});
