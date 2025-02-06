"use client"; // Marca el componente como del lado del cliente

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import CustomAlertDialog from "@/app/_components/_generics/CustomAlertDialog";
import WindowTitleBar from "@/app/_components/_generics/WindowsTitleBar";
import {
  CustomToasterError,
  CustomToasterSuccess,
  CustomToasterValidation,
} from "@/app/_components/_generics/CustomToaster";

export default function Contacto() {
  const { data: session } = useSession(); // Obtiene la sesión del usuario
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje
  const [isLoading, setIsLoading] = useState(false); // Estado para el loading del botón
  const [isDialogSendMessage, setIsDialogSendMessage] = useState(false);

  const handleCancelDialogSendMessage = () => {
    setIsDialogSendMessage(false); // Cierra el diálogo
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensaje.trim()) {
      CustomToasterValidation("El mensaje no puede quedar vacío.");
      return;
    }
    setIsDialogSendMessage(true);
  };

  const handleConfirmDialogSendMessage = () => {
    setIsLoading(true); // Activa el estado de carga
    SendMail();
  };

  const SendMail = async () => {
    try {
      console.log("Intento");

      const response = await fetch("../api/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: session?.user?.name, // Envía el correo del usuario autenticado
          email: session?.user?.email, // Envía el correo del usuario autenticado
          mensaje,
        }),
      });
      console.log("Pasó", response);
      if (response.ok) {
        CustomToasterSuccess("El mensaje fue enviado correctamente.");
        setMensaje(""); // Limpia el campo del mensaje
      } else {
        CustomToasterError("Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      CustomToasterError("Hubo un error al enviar el mensaje.");
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
      setIsDialogSendMessage(false); // Cierra el diálogo
    }
  };

  return (
    <div className="temas mb-4 flex items-center justify-normal space-x-4">
      <div className="temas-contenedor m-auto w-10/12 rounded border-2 p-4 shadow">
        <WindowTitleBar title="Contacto" />
        <div className="container mx-auto px-4 py-8">
          <Card className="mx-auto max-w-2xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">
                Contacto
              </CardTitle>
              <CardDescription className="mt-2 text-center text-base">
                ¿Necesitas ayuda? Envía un mensaje y te responderemos a tu
                correo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOnSubmit} className="space-y-4">
                <div>
                  <Textarea
                    id="mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="min-h-[150px]"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar mensaje"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* AlertDialog: SendMessage */}
          <CustomAlertDialog
            isOpen={isDialogSendMessage}
            onOpenChange={setIsDialogSendMessage}
            title="¿Está seguro de enviar este mensaje?"
            description="Revisa tu mensaje antes de enviarlo. Una vez enviado, no podrás
              editarlo."
            onConfirm={handleConfirmDialogSendMessage}
            onCancel={handleCancelDialogSendMessage} // Pasa la función de cancelar
            confirmText="Si"
            cancelText="No" // Personaliza el texto del botón de cancelar
          />
        </div>
      </div>
    </div>
  );
}
