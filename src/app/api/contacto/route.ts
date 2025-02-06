import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { useSession } from "next-auth/react";

export async function POST(request: Request) {
  const { name, email, mensaje } = await request.json(); // Obtiene el mensaje
  try {
    const subject = "Nuevo mensaje de contacto";
    const html = `
      <p><strong>Usuario:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Mensaje:</strong> ${mensaje}</p>
    `;

    // Remoitente y destinatario es el mismo [auto-mail] (desde las variables de entorno)
    const senderEmail = process.env.EMAIL_USER?.toString();

    const success = await sendEmail(senderEmail!, subject, html);

    if (success) {
      return NextResponse.json(
        { message: "Mensaje enviado correctamente" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { message: "Error al enviar el mensaje" },
        { status: 500 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error al enviar el mensaje" },
      { status: 500 },
    );
  }
}
