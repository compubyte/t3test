// import NextAuth from "next-auth";

// declare module "next-auth" {
//   /**
//    * Extiende la interfaz User para incluir propiedades.
//    */
//   interface User {
//     permisos?: {
//       pPreferencias: boolean;
//       pProductos: boolean;
//       pListasPrecio: boolean;
//       pUsuarios: boolean;
//       pSucursales: boolean;
//       pInventario: boolean;
//       pVentas: boolean;
//       pCompras: boolean;
//       pListados: boolean;
//     };
//   }

//   /**
//    * Extiende la interfaz Session para incluir propiedades.
//    */
//   interface Session {
//     user?: {
//       permisos?: {
//         pPreferencias: boolean;
//         pProductos: boolean;
//         pListasPrecio: boolean;
//         pUsuarios: boolean;
//         pSucursales: boolean;
//         pInventario: boolean;
//         pVentas: boolean;
//         pCompras: boolean;
//         pListados: boolean;
//       };
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   /**
//    * Extiende la interfaz JWT para incluir las propiedades.
//    */
//   interface JWT {
//     permisos?: {
//       pPreferencias: boolean;
//       pProductos: boolean;
//       pListasPrecio: boolean;
//       pUsuarios: boolean;
//       pSucursales: boolean;
//       pInventario: boolean;
//       pVentas: boolean;
//       pCompras: boolean;
//       pListados: boolean;
//     };
//   }
// }
