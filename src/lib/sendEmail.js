const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

// const gmailEmail = functions.config().gmail.email;
// const gmailPassword = functions.config().gmail.password;

const gmailEmail = "hariharancbt28@gmail.com";
const gmailPassword = "@R26#fgXbW8hrC7#@3#";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword
    }
});

exports.sendLeaveEmail = functions.https.onCall(async (data, context) => {
    try {
        const mailOptions = {
            from: `Leave Management System <${gmailEmail}>`,
            to: data.recipientEmail,
            subject: 'New Leave Application Submitted',
            html: `
        <h2>New Leave Application Notification</h2>
        <p><strong>Employee ID:</strong> ${data.empID}</p>
        <p><strong>Leave Type:</strong> ${data.leaveType}</p>
        <p><strong>Start Date:</strong> ${data.startDate}</p>
        <p><strong>End Date:</strong> ${data.endDate}</p>
        <p><strong>Reason:</strong> ${data.leaveReason}</p>
        <p>Please review this application in the system.</p>
        <br>
        <p>This is an automated message. Please do not reply.</p>
      `
        };

        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        throw new functions.https.HttpsError('internal', 'Error sending email');
    }
});