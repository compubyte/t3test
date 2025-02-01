import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "@/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "@/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

async function verifyUser(email: string, password: string) {
  if (!email || !password) {
    return null;
  }
  return { id: "U2", email: "pepe@latinchat.com", name: "Pepe" };
  // Aquí debes consultar tu base de datos o sistema de autenticación
  // const user = await findUserByEmail(email); // Función ficticia para buscar un usuario por correo

  // if (user && (await comparePasswords(password, user.password))) {
  //   // Retorna el objeto de usuario sin la contraseña
  //   return { id: user.id, email: user.email, name: user.name };
  // }

  return null;
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Correo y Contraseña",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        console.log("*************Credentials recibidas:", credentials); // Depuración
        // Aquí debes implementar la lógica para verificar el correo y la contraseña
        const user = await verifyUser(
          credentials?.email as string,
          credentials?.password as string,
        );
        console.log("##########################", user);

        if (user) {
          console.log("************Exito", user);
          return user; // Retorna el objeto de usuario si la autenticación es exitosa
        } else {
          console.log("Fail");
          return null; // Retorna null si la autenticación falla
        }
        //return { id: "U2", email: "pepe@latinchat.com", name: "Pepe" };
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  pages: {
    error: "/auth/notsession", // Ruta personalizada para la página de sesión no iniciada
  },
  // callbacks: {
  //   session: ({ session, user }) => ({
  //     ...session,
  //     user: {
  //       ...session.user,
  //       id: user.id,
  //     },
  //   }),
  // },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Agrega el ID del usuario al token
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && typeof token.id === "string") {
        session.user = session.user || {}; // Asegurar que session.user existe
        session.user.id = token.id; // Agregar el ID del usuario
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // database
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
