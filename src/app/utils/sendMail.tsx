// utils/sendMail.ts
import axios from 'axios';

export async function sendMail(from: string, to: string, subject: string, text: string) {
  try {
    const payload = { from, to, subject, text };
    await axios.post('/api/sendLeaveEmail', payload);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
