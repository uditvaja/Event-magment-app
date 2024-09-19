const nodemailer = require('nodemailer');

const sendEmail = async (recipient, subject, text) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail', // or use your preferred email service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent to ' + recipient);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendEmail };
