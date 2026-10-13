import nodemailer from "nodemailer";

const port = Number(process.env.EMAIL_PORT) || 587;

const emailTransporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default emailTransporter;