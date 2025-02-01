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
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserCheck } from "lucide-react";

interface LoginDataProps extends React.ComponentPropsWithoutRef<"div"> {
  userName: string; // Define el prop userName
}

export function LoginData({ className, userName, ...props }: LoginDataProps) {
  const router = useRouter();

  return (
    <div
      className={cn("flex flex-col gap-6 text-center", className)}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            <UserCheck className="mx-auto h-16 w-16" />
            Sesión iniciada
          </CardTitle>
          <CardDescription>
            El usuario <span className="font-semibold">{userName}</span>{" "}
            mantiene abierta su sesión.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <Button
              className="w-full"
              onClick={() => router.push("/dashboard")}
            >
              Regresar al dashboard
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Cerrar sesión
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
