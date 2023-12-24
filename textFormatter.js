```javascript
// Importing necessary libraries
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();

// Function to format text
function formatText(transcriptionText) {
    // Tokenize the text
    let tokens = tokenizer.tokenize(transcriptionText);

    // Remove unnecessary words (like 'uh', 'um', etc.)
    let filteredTokens = tokens.filter(token => {
        return !['uh', 'um', 'like', 'so', 'and', 'the', 'a', 'an'].includes(token);
    });

    // Join the tokens back into a string
    let formattedText = filteredTokens.join(' ');

    // Add headers and segment into topics
    // This is a simple example and may need to be adjusted based on your specific needs
    formattedText = formattedText.replace(/(action items:)/i, '\n## Action Items:\n')
        .replace(/(discussion:)/i, '\n## Discussion:\n')
        .replace(/(next steps:)/i, '\n## Next Steps:\n');

    // Pass the formatted text to the distribution service
    const distributionService = require('./distributionService');
    distributionService.distributeText(formattedText);
}

module.exports = {
    formatText: formatText
};
```
