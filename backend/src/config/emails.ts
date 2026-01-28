import nodemailer from "nodemailer";

export default function configureEmails() {
  const SENDER_EMAIL = process.env.EMAIL_USER;
  const SENDER_PASS = process.env.EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return transporter;
}
