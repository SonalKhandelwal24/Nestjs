import * as nodemailer from 'nodemailer';

export type EmailData = {
  from: string;
  email: string;
  subject: string;
  message: string;
  html: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[]; // Array of attachments
};
export type EmailResponse = {
  status: string;
};

export async function EmailService(data: EmailData): Promise<EmailResponse> {
  const { email, subject, message, from, html, replyTo, attachments } = data;
  const config = {
    host: 'testing.fwmspl.com',
    port: parseInt("465", 10),
    secure: true, // true for 465, false for other portsac
    auth: {
      user: "testing@testing.fwmspl.com",
      pass: "Achal@820",
    },
    tls: {
      rejectUnauthorized: false,
    },
  };
  
  const transporter = nodemailer.createTransport(config);
  try {
    await transporter.sendMail({
      from: from,
      to: email,
      subject: subject,
      text: message,
      html: html,
      replyTo: replyTo,
      attachments: attachments?.map(att => ({
        filename: att.filename,
        content: att.content,
        encoding: 'base64',
      })),
    });
    return { status: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error.message, error.stack);
    throw new Error('Error sending email');
  }
}