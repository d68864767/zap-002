```javascript
// Importing necessary libraries
const nodemailer = require('nodemailer');
const fs = require('fs');

// Function to distribute text
function distributeText(formattedText) {
    // Define the list of recipients
    let recipients = ['team1@example.com', 'team2@example.com', 'team3@example.com']; // Replace with your actual email addresses

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail', // You can use any other email service
        auth: {
            user: 'your-email@example.com', // Replace with your actual email
            pass: 'your-password' // Replace with your actual password
        }
    });

    // Email options
    let mailOptions = {
        from: 'your-email@example.com', // sender address
        to: recipients, // list of receivers
        subject: 'Meeting Notes', // Subject line
        text: formattedText, // plain text body
    };

    // Send email with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    // Save the formatted text to a file
    fs.writeFile('MeetingNotes.txt', formattedText, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 
}

module.exports = {
    distributeText: distributeText
};
```
