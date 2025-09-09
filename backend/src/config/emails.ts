import nodemailer from "nodemailer";

// TODO: Remove hardcoded emails
const SENDER_EMAIL = "admin@comida.app.br";
const SENDER_PASS = process.env.ZOHO_PASSWORD;

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASS,
  },
});

export default transporter;
