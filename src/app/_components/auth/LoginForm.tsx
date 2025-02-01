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
import { useRouter } from "next/navigation";
import CustomAlertDialog from "../_generics/CustomAlertDialog";
import { GitBranch, Mail, SquareUserRound, UserRound } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // Hooks para Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Hook para AlertMail
  const [isDialogAuthCredentials, setIsDialogAuthCredentials] = useState(false);

  const router = useRouter();

  const handleConfirmDialogAuthCredentials = () => {
    setIsDialogAuthCredentials(false); // Cierra el diálogo
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //setIsDialogAuthCredentials(true);
    // Validaciones

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("-----------", result);

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard"); // Redirige al dashboard si el inicio de sesión es exitoso
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@example.com"
                  onChange={(e) => setEmail(e.target.value)}
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
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <Button className="w-full" type="submit">
                <UserRound className="mr-2 h-4 w-4" />
                Iniciar sesión
              </Button>
            </div>
          </form>
          {/* Start OR separator */}
          <div className="my-3 inline-flex w-full items-center justify-center">
            <hr className="my-4 h-px w-32 border-0 bg-gray-700/10 dark:bg-gray-100/10" />
            <span className="min-w-10 bg-transparent px-3 text-sm font-medium text-gray-900 dark:text-white">
              o
            </span>
            <hr className="my-4 h-px w-32 border-0 bg-gray-700/10 dark:bg-gray-100/10" />
          </div>
          {/* End OR separator */}
          <div className="flex flex-col gap-6">
            {/* <Label className="mt-6 text-center">----- o -----</Label> */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <Mail className="mr-2 h-4 w-4" />
              Iniciar sesión con Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <GitBranch className="mr-2 h-4 w-4" />
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

      {/* Mensaje de Credentials sin funcionar aún */}
      <CustomAlertDialog
        isOpen={isDialogAuthCredentials}
        onOpenChange={setIsDialogAuthCredentials}
        title="Esta opción aún no está habilitada."
        description="Por el momento solo podrá acceder con cuentas de Google y GitHub."
        onConfirm={handleConfirmDialogAuthCredentials}
        //onCancel={handleCancelDialogAuthCredentials} // Pasa la función de cancelar
        confirmText="Aceptar"
        //cancelText="Cerrar" // Personaliza el texto del botón de cancelar
      />
    </div>
  );
}
