import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { LoginForm, LoginData } from "./_components/auth";

export default async function Home() {
  //const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

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
              <h1 className="mb-4 text-4xl font-bold">
                Bienvenido a T3 Test App
              </h1>
              <p className="text-lg text-gray-800">
                Este desarrollo es un ejemplo de la utilización de diferentes
                tecnologías que se encuentran en el atack de T3.
              </p>
              <p className="text-lg text-gray-800">
                T3 Test App está estilizado con Shadcn/ui y Tailwind CSS para
                mantener un diseño limpio y responsivo.
              </p>
              <p className="text-lg text-gray-800">
                El acceso a datos está orquestado con el ORM Drizzle y la
                tecnología de APIs tipadas de tRPC. Además, se aplica
                autenticación con NextAuth y protección de rutas.
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

      {/* <LoginForm />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#c2d6be] to-[#667d66] text-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-[3rem]">
            Bienvenido a <span className="text-blue-500">T3Test</span> App
          </h1>
          <p className="text-center text-2xl sm:text-[2rem]">
            {session
              ? `Hola, ${session.user.name}`
              : "Inicia sesión para continuar"}
          </p>
          <div className="flex space-x-4">
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-blue-200 px-10 py-3 font-semibold no-underline transition hover:bg-blue-300"
            >
              {session ? "Cerrar sesión" : "Login"}
            </Link>
            {session?.user && (
              <Link
                href="/dashboard"
                className="rounded-full bg-violet-200 px-10 py-3 font-semibold no-underline transition hover:bg-violet-300"
              >
                Volver al dashboard
              </Link>
            )}
          </div>
        </div>
      </main> */}
    </HydrateClient>
  );
}
