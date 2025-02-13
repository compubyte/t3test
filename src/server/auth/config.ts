//import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm/expressions";
import { db } from "@/server/db";
import {
  //accounts,
  //sessions,
  //users,
  usuarios,
  //verificationTokens,
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
      permisos: {
        pPreferencias: boolean;
        pProductos: boolean;
        pListasPrecio: boolean;
        pUsuarios: boolean;
        pSucursales: boolean;
        pInventario: boolean;
        pVentas: boolean;
        pCompras: boolean;
        pListados: boolean;
      };
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    permisos: {
      pPreferencias: boolean;
      pProductos: boolean;
      pListasPrecio: boolean;
      pUsuarios: boolean;
      pSucursales: boolean;
      pInventario: boolean;
      pVentas: boolean;
      pCompras: boolean;
      pListados: boolean;
    };
    // ...other properties
    // role: UserRole;
  }
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
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password", value: "" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos.");
        }
        // Buscar el usuario en la base de datos usando Drizzle
        const [usuarioLogin] = await db
          .select()
          .from(usuarios)
          .where(eq(usuarios.email, credentials.email as string))
          .limit(1);
        if (!usuarioLogin) {
          throw new Error("Error en credenciales. Usuario no encontrado.");
        }
        if (typeof credentials.password !== "string") {
          throw new Error("credentials.password debe ser una cadena de texto.");
        }
        // Verificar la contraseña
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          usuarioLogin.password,
        );
        if (!isValidPassword) {
          throw new Error("Error en credenciales. Usuario no encontrado.");
        }
        // Retornar el objeto de usuario (sin la contraseña)
        return {
          id: usuarioLogin.id.toString(), // Asegúrate de que el ID sea una cadena
          name: usuarioLogin.nombre,
          email: usuarioLogin.email,
          permisos: {
            pPreferencias: usuarioLogin.pPreferencias,
            pProductos: usuarioLogin.pProductos,
            pListasPrecio: usuarioLogin.pListasPrecio,
            pUsuarios: usuarioLogin.pUsuarios,
            pSucursales: usuarioLogin.pSucursales,
            pInventario: usuarioLogin.pInventario,
            pVentas: usuarioLogin.pVentas,
            pCompras: usuarioLogin.pCompras,
            pListados: usuarioLogin.pListados,
          },
        };
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
  // adapter: DrizzleAdapter(db, {
  //   usersTable: users,
  //   accountsTable: accounts,
  //   sessionsTable: sessions,
  //   verificationTokensTable: verificationTokens,
  // }),
  pages: {
    //error: "/auth/notsession", // Ruta personalizada para la página de sesión no iniciada
    error: "/auth/notuserexist", // Ruta personalizada para la página usuario no cargado
  },
  session: {
    strategy: "jwt", // database
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        // Buscar si el usuario existe en la base de datos
        const [existeUsuario] = await db
          .select()
          .from(usuarios)
          .where(eq(usuarios.email, user.email!))
          .limit(1);

        if (!existeUsuario) {
          return false; // Bloquea el acceso si no existe en la base de datos
        }
      }
      return true; // Permite el inicio de sesión si el email existe
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.permisos = user.permisos;
        //token.permissions = user.permisos; // Agregar permisos al token
      }
      return token;
    },

    async session({ session, token }) {
      if (token.email) {
        session.user.email = token.email;
        session.user.permisos = token.permisos as {
          pPreferencias: boolean;
          pProductos: boolean;
          pListasPrecio: boolean;
          pUsuarios: boolean;
          pSucursales: boolean;
          pInventario: boolean;
          pVentas: boolean;
          pCompras: boolean;
          pListados: boolean;
        };
        //session.user.permisos = token.permisos; // Agregar permisos a la sesión
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;
