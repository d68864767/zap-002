```javascript
const otterai = require('otterai-node');

// Initialize Otter.ai client
let client = otterai.createClient({
    apiKey: 'your_api_key',
    apiSecret: 'your_api_secret'
});

// Function to start transcription
function startTranscription() {
    // Assuming the meeting recording is a .wav file
    const filePath = './meeting_recording.wav';

    // Start transcription
    client.transcribe({
        path: filePath,
        speakerCount: 1, // Adjust this based on the number of speakers in your meeting
        language: 'en' // Set this to the language spoken in your meeting
    })
    .then(response => {
        console.log('Transcription started');
        // Save the transcription ID for later use
        let transcriptionId = response.id;

        // Check the status of the transcription every 30 seconds
        let intervalId = setInterval(() => {
            client.getTranscription(transcriptionId)
            .then(transcription => {
                if (transcription.status === 'completed') {
                    clearInterval(intervalId);
                    console.log('Transcription completed');
                    // Pass the transcription text to the text formatter
                    const textFormatter = require('./textFormatter');
                    textFormatter.formatText(transcription.text);
                } else if (transcription.status === 'failed') {
                    clearInterval(intervalId);
                    console.error('Transcription failed');
                }
            })
            .catch(error => {
                clearInterval(intervalId);
                console.error('Failed to get transcription status:', error);
            });
        }, 30000);
    })
    .catch(error => {
        console.error('Failed to start transcription:', error);
    });
}

module.exports = {
    startTranscription: startTranscription
};
```
