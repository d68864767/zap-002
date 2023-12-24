```javascript
const Flic = require('flic-lib');

// Create Flic client
let client = new Flic.Client();

// Listen for new button
client.once('ready', function() {
    console.log('Flic client is ready');
});

// Event handler for button press
client.on('ButtonClick', function(clickType, wasQueued, timeDiff) {
    if (clickType === 'ButtonDown') {
        console.log('Button was pressed');
        triggerTranscription();
    }
});

// Function to trigger transcription service
function triggerTranscription() {
    const transcriptionService = require('./transcriptionService');
    transcriptionService.startTranscription();
}

// Connect to Flic
client.connect();

module.exports = client;
```
