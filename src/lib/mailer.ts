// lib/mailer.ts
import nodemailer from "nodemailer";

// Configura el transporter de Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // Puedes usar otro servicio SMTP
  auth: {
    user: process.env.EMAIL_USER, // Tu correo electrónico
    pass: process.env.EMAIL_PASSWORD, // Tu contraseña o app password
  },
});

// Función para enviar correos
export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: `"T3Test App Soporte" <${process.env.EMAIL_USER}>`, // Remitente
      to, // Destinatario
      subject, // Asunto
      html, // Cuerpo del correo en HTML
    });
    return true;
  } catch (error) {
    console.error("Error enviando el correo:", error);
    return false;
  }
};
