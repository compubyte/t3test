import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { z } from "zod";

// Define un esquema de validación
const RequestBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  mensaje: z.string(),
});

export async function POST(request: Request) {
  // Valida los datos
  const parsedData = RequestBodySchema.parse(await request.json());
  const { name, email, mensaje } = parsedData;
  //const { name, email, mensaje }: RequestBody = await request.json(); // Obtiene el mensaje
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
    console.error("Error al enviar el mensaje.", error);
    return NextResponse.json(
      { message: "Error al enviar el mensaje" },
      { status: 500 },
    );
  }
}
