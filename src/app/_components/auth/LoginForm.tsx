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
import { GitBranch, Mail, UserRound, Eye, EyeClosed } from "lucide-react";
import { LoadingSpinner } from "../_generics/LoadingSpinner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // Hooks para Credentials
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");
  // Hook para AlertDialogAuthCredentials
  const [isDialogAuthCredentials, setIsDialogAuthCredentials] = useState(false);
  // Loading
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleConfirmDialogAuthCredentials = () => {
    setLoading(false);
    setIsDialogAuthCredentials(false); // Cierra el diálogo
  };

  const handleSignInGitHub = async () => {
    setLoading(true);
    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setIsDialogAuthCredentials(true);
      setLoading(false);
    }
  };

  const handleSignInGoogle = async () => {
    setLoading(true);
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setIsDialogAuthCredentials(true);
      setLoading(false);
    }
  };

  const handleSignInCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/dashboard"); // Redirige al dashboard si el inicio de sesión es exitoso
    }
    setLoading(false);
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
          {/* OJO CON MENSAJE PROVISORIO */}
          <p className="text-red-600">
            Por ahora está dejando pasar cualquier mail y contraseña
          </p>
          {/* OJO CON MENSAJE PROVISORIO */}
          <form onSubmit={handleSignInCredentials}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Correo</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    ¿Olvidó su contraseña?
                  </a>
                </div>
                <div className="flex items-center">
                  <Input
                    id="password"
                    type={isVisible ? "text" : "password"}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="outline"
                    type="button"
                    className="ml-2 flex items-center px-2"
                    onMouseDown={() => setIsVisible(true)}
                    onMouseUp={() => setIsVisible(false)}
                    onMouseLeave={() => setIsVisible(false)}
                  >
                    {isVisible ? <Eye size={20} /> : <EyeClosed size={20} />}
                  </Button>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <Button
                variant="outline"
                className="w-full bg-slate-700 text-base text-white hover:bg-black hover:text-white"
                type="submit"
                disabled={loading}
              >
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
            {/* GOOGLE ----------------------------------------- */}
            <Button
              variant="outline"
              className="w-full bg-slate-400 text-base hover:bg-black hover:text-white"
              onClick={handleSignInGoogle}
              disabled={loading}
            >
              <Mail className="mr-2 h-4 w-4" />
              Iniciar sesión con Google
            </Button>
            {/* GITHUB ----------------------------------------- */}
            <Button
              variant="outline"
              className="w-full bg-slate-400 text-base hover:bg-black hover:text-white"
              onClick={handleSignInGitHub}
              disabled={loading}
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
          {loading && <LoadingSpinner />}
        </CardContent>
      </Card>

      {/* Mensaje de Credentials sin funcionar aún */}
      <CustomAlertDialog
        isOpen={isDialogAuthCredentials}
        onOpenChange={setIsDialogAuthCredentials}
        title="Error al iniciar sesión."
        description="Asegúrese de que sus credenciales sean correctas y reintente."
        onConfirm={handleConfirmDialogAuthCredentials}
        //onCancel={handleCancelDialogAuthCredentials} // Pasa la función de cancelar
        confirmText="Aceptar"
        //cancelText="Cerrar" // Personaliza el texto del botón de cancelar
      />
    </div>
  );
}
