"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // Hook para AlertMail
  const [isDialogNoServiceOpen, setIsDialogNoServiceOpen] = useState(false);

  // Funciones para AlertNoService
  const handleConfirmDialogNoService = () => {
    // Aquí la funcionalidad de aceptar/si
    setIsDialogNoServiceOpen(false); // Cierra el diálogo
  };

  // const handleCancelDialogNoService = () => {
  //   // Aquí la funcionalidad de cancelar/no
  //   setIsDialogNoServiceOpen(false); // Cierra el diálogo
  // };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Inicio de sesión</CardTitle>
          <CardDescription>
            Ingrese sus credenciales para ingresar a su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => setIsDialogNoServiceOpen(true)}
              >
                Iniciar sesión
              </Button>
            </div>
          </form>
          <div className="flex flex-col gap-6">
            <Label className="mt-6 text-center">----- o -----</Label>
            <Button variant="outline" className="w-full">
              Iniciar sesión con Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              Iniciar sesión con GitHub
            </Button>
            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
          </div>
        </CardContent>
      </Card>
      {/* Alerta de mail sin funcionar aún */}
      <AlertDialog
        open={isDialogNoServiceOpen}
        onOpenChange={setIsDialogNoServiceOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Esta opción aún no está habilitada.
            </AlertDialogTitle>
            <AlertDialogDescription>
              Por el momento sólo podrá acceder con una cuenta de GitHub.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel onClick={handleDialogMail}>
                      Cancelar
                    </AlertDialogCancel> */}
            <AlertDialogAction onClick={handleConfirmDialogNoService}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
