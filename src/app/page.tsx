import Link from "next/link";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  //const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
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
      </main>
    </HydrateClient>
  );
}
