import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { UserX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotUserExist() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 text-center sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              <UserX className="mx-auto mb-2 h-16 w-16" />
              Usuario sin acceso
            </CardTitle>
            <CardDescription>
              No está registrado para utilizar la App.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <Button asChild>
                <Link href="/">Aceptar</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
