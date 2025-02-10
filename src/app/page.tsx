import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { LoginForm, LoginData } from "./_components/auth";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <div className="temas flex min-h-screen flex-col lg:flex-row">
        {/* Mitad derecha con el formulario de login (arriba en móvil, derecha en desktop) */}
        <div className="order-1 flex flex-1 items-center justify-center p-8 lg:order-2">
          <div className="w-full max-w-md">
            {!session?.user && <LoginForm />}
            {session?.user && <LoginData userName={session?.user.name ?? ""} />}
          </div>
        </div>

        {/* Mitad izquierda con texto (abajo en móvil, izquierda en desktop) */}
        <div className="order-2 flex flex-1 flex-col bg-gray-200 p-8 lg:order-1">
          {/* Contenido principal de la mitad izquierda */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="max-w-lg">
              <h1 className="mb-4 text-center text-4xl font-bold">
                Bienvenido a T3 Test App
              </h1>
              <p className="texto-con-sangria mb-3 text-justify text-lg text-gray-800">
                Este desarrollo es un ejemplo de la utilización de diferentes
                tecnologías que se encuentran en el stack de T3.
              </p>
              <p className="texto-con-sangria mb-3 text-justify text-lg text-gray-800">
                T3 Test App está estilizado con Shadcn/ui y Tailwind CSS para
                mantener un diseño limpio, responsivo y con temas visuales.
              </p>
              <p className="texto-con-sangria mb-3 text-justify text-lg text-gray-800">
                El acceso a datos está orquestado con el ORM Drizzle y la
                tecnología de APIs tipadas de tRPC. Además, se aplica
                autenticación con NextAuth y protección de rutas.
              </p>
              <p className="texto-con-sangria mb-3 text-justify text-lg text-gray-800">
                En cuanto a la lógica interna, utiliza contextos por áreas para
                el manejo de los datos entre páginas y componentes relacionados.
              </p>
            </div>
          </div>

          {/* Span en la parte baja de la mitad izquierda */}
          <div className="p-4 text-end">
            <span className="text-gray-600">
              Creado por{" "}
              <span className="font-semibold">Daniel Fabian Zampini</span> para{" "}
              <span className="font-semibold">Codesud Chile SPA</span>
            </span>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
