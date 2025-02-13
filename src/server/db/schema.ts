import { sql } from "drizzle-orm";
import {
  boolean,
  //index,
  integer,
  numeric,
  pgTableCreator,
  //primaryKey,
  //text,
  //timestamp,
  varchar,
} from "drizzle-orm/pg-core";
//import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `t3test_${name}`);

// export const posts = createTable(
//   "post",
//   {
//     id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("created_by", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
//       () => new Date(),
//     ),
//   },
//   (example) => ({
//     createdByIdIdx: index("created_by_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   }),
// );

// export const users = createTable("user", {
//   id: varchar("id", { length: 255 })
//     .notNull()
//     .primaryKey()
//     .$defaultFn(() => crypto.randomUUID()),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).notNull(),
//   password: varchar("password", { length: 255 }).notNull().default("1234"),
//   emailVerified: timestamp("email_verified", {
//     mode: "date",
//     withTimezone: true,
//   }).default(sql`CURRENT_TIMESTAMP`),
//   image: varchar("image", { length: 255 }),
//   pPreferencias: boolean("p_preferencias").default(true).notNull(),
//   pProductos: boolean("p_productos").default(true).notNull(),
//   pListasPrecio: boolean("p_listas_precio").default(true).notNull(),
//   pUsuarios: boolean("p_usuarios").default(true).notNull(),
//   pSucursales: boolean("p_sucursales").default(true).notNull(),
//   pInventario: boolean("p_inventario").default(true).notNull(),
//   pVentas: boolean("p_ventas").default(true).notNull(),
//   pCompras: boolean("p_compras").default(true).notNull(),
//   pListados: boolean("p_listados").default(true).notNull(),
// });

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

// export const accounts = createTable(
//   "account",
//   {
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     type: varchar("type", { length: 255 })
//       .$type<AdapterAccount["type"]>()
//       .notNull(),
//     provider: varchar("provider", { length: 255 }).notNull(),
//     providerAccountId: varchar("provider_account_id", {
//       length: 255,
//     }).notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: varchar("token_type", { length: 255 }),
//     scope: varchar("scope", { length: 255 }),
//     id_token: text("id_token"),
//     session_state: varchar("session_state", { length: 255 }),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//     userIdIdx: index("account_user_id_idx").on(account.userId),
//   }),
// );

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

// export const sessions = createTable(
//   "session",
//   {
//     sessionToken: varchar("session_token", { length: 255 })
//       .notNull()
//       .primaryKey(),
//     userId: varchar("user_id", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (session) => ({
//     userIdIdx: index("session_user_id_idx").on(session.userId),
//   }),
// );

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

// export const verificationTokens = createTable(
//   "verification_token",
//   {
//     identifier: varchar("identifier", { length: 255 }).notNull(),
//     token: varchar("token", { length: 255 }).notNull(),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (vt) => ({
//     compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
//   }),
// );

// Tabla de Ciudades
export const tablaCiudades = createTable("ciudades", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 255 }).notNull().unique(),
});

// Tabla de Sucursales
export const tablaSucursales = createTable("sucursales", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 255 }).notNull().unique(),
  direccion: varchar("direccion", { length: 255 }).notNull(),
  ciudadId: integer("ciudadId")
    .notNull()
    .references(() => tablaCiudades.id), // Relación con la tabla ciudades
});

// Tabla de Usuarios
export const usuarios = createTable("usuarios", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  pPreferencias: boolean("pPreferencias").default(true).notNull(),
  pProductos: boolean("pProductos").default(true).notNull(),
  pListasPrecio: boolean("pListasPrecio").default(true).notNull(),
  pUsuarios: boolean("pUsuarios").default(true).notNull(),
  pSucursales: boolean("pSucursales").default(true).notNull(),
  pInventario: boolean("pInventario").default(true).notNull(),
  pVentas: boolean("pVentas").default(true).notNull(),
  pCompras: boolean("pCompras").default(true).notNull(),
  pListados: boolean("pListados").default(true).notNull(),
  activo: boolean("estado").default(true).notNull(),
  sucursalId: integer("sucursalId")
    .notNull()
    .references(() => tablaSucursales.id), // Relación con la tabla sucursales
});

// Tabla de Clientes
export const tablaClientes = createTable("clientes", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  docID: varchar("nombre", { length: 255 }).notNull().unique(),
  direccion: varchar("direccion", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  tieneCtaCte: boolean("tieneCtaCte").default(false).notNull(),
  limiteCtaCte: numeric("limiteCtaCte")
    .notNull()
    .default(sql`0`),
  ciudadId: integer("ciudadId")
    .notNull()
    .references(() => tablaCiudades.id), // Relación con la tabla ciudades
});

// Tabla de Proveedores
export const tablaProveedores = createTable("proveedores", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 255 }).notNull(),
  docID: varchar("nombre", { length: 255 }).notNull().unique(),
  direccion: varchar("direccion", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  tieneCtaCte: boolean("tieneCtaCte").default(false).notNull(),
  limiteCtaCte: numeric("limiteCtaCte")
    .notNull()
    .default(sql`0`),
  ciudadId: integer("ciudadId")
    .notNull()
    .references(() => tablaCiudades.id), // Relación con la tabla ciudades
});

// Tabla de Categorías
export const tablaCategorias = createTable("categorias", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 255 }).notNull().unique(),
});

// Tabla de UnidadesVenta
export const tablaUnidadesVenta = createTable("unidadesVenta", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 255 }).notNull().unique(),
});

// Tabla de ListasPrecio
export const tablaListasPrecio = createTable("listasPrecio", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar("nombre", { length: 255 }).notNull().unique(),
  cantidadActivacion: numeric("cantidadActivacion").notNull().unique(),
});

// Tabla de Productos
// export const tablaProductos = createTable("productos", {
//   id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
//   codigo: varchar("codigo", { length: 255 })
//     .notNull()
//     .unique()
//     .$defaultFn(() => crypto.randomUUID()),
//   nombre: varchar("nombre", { length: 255 }).notNull(),
//   costoUnitarioSinIVA: numeric("costoUnitarioSinIVA").notNull(),
//   porcentajeIVA: numeric("porcentajeIVA").notNull(),
//   inventario: numeric("inventario")
//     .default(sql`0`)
//     .notNull(),
//   image: varchar("image", { length: 255 }),
//   categoriaId: integer("categoriaId")
//     .notNull()
//     .references(() => tablaCategorias.id), // Relación con la tabla categorias
//   unidadVentaId: integer("unidadVentaId")
//     .notNull()
//     .references(() => tablaUnidadesVenta.id), // Relación con la tabla unidadesVenta
// });
