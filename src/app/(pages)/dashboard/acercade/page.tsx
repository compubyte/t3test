import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import WindowTitleBar from "@/app/_components/_generics/WindowsTitleBar";

export default function AcercaDe() {
  return (
    <div className="temas mb-4 flex items-center justify-normal space-x-4">
      <div className="temas-contenedor m-auto w-10/12 rounded border-2 p-4 shadow">
        <WindowTitleBar title="Acerca de" />
        <div className="container mx-auto px-4 py-4">
          <Card className="mx-auto max-w-4xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl font-bold">
                Acerca de T3Test App
              </CardTitle>
              <CardDescription className="mt-2 text-center text-base">
                Una aplicación moderna construida con las mejores tecnologías
                disponibles.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="texto-con-sangria text-justify text-lg">
                T3Test App es una aplicación de ejemplo diseñada para demostrar
                el uso de un stack tecnológico moderno y eficiente. A
                continuación, se detallan algunas de las tecnologías clave
                utilizadas en su desarrollo:
              </p>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    Next.js v15
                  </Badge>
                  <p>
                    El framework de React para la renderización del lado del
                    servidor (SSR) y la generación de sitios estáticos (SSG).
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    Tailwind CSS
                  </Badge>
                  <p>
                    Un framework de CSS utilitario para diseñar interfaces de
                    usuario de manera rápida y eficiente.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    shadcn/ui
                  </Badge>
                  <p>
                    Una librería de componentes UI altamente personalizable y
                    accesible.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    tRPC
                  </Badge>
                  <p>
                    Una herramienta para construir APIs tipo RPC (Remote
                    Procedure Call) de manera segura y eficiente.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    Drizzle ORM
                  </Badge>
                  <p>
                    Un ORM moderno y ligero para interactuar con bases de datos
                    SQL, como PostgreSQL.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    PostgreSQL
                  </Badge>
                  <p>Una base de datos relacional robusta y escalable.</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-sm">
                    NextAuth
                  </Badge>
                  <p>
                    Una solución de autenticación completa para aplicaciones
                    Next.js.
                  </p>
                </div>
              </div>

              <p className="texto-con-sangria text-justify text-lg">
                Este stack tecnológico permite construir aplicaciones rápidas,
                escalables y fáciles de mantener, siguiendo las mejores
                prácticas de desarrollo moderno.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
