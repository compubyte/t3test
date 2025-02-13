CREATE TABLE IF NOT EXISTS "t3test_categorias" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_categorias_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	CONSTRAINT "t3test_categorias_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3test_ciudades" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_ciudades_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	CONSTRAINT "t3test_ciudades_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3test_listasPrecio" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_listasPrecio_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"cantidadActivacion" numeric NOT NULL,
	CONSTRAINT "t3test_listasPrecio_nombre_unique" UNIQUE("nombre"),
	CONSTRAINT "t3test_listasPrecio_cantidadActivacion_unique" UNIQUE("cantidadActivacion")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3test_sucursales" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_sucursales_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"direccion" varchar(255) NOT NULL,
	"ciudadId" integer NOT NULL,
	CONSTRAINT "t3test_sucursales_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3test_unidadesVenta" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_unidadesVenta_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	CONSTRAINT "t3test_unidadesVenta_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3test_usuarios" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_usuarios_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"pPreferencias" boolean DEFAULT true NOT NULL,
	"pProductos" boolean DEFAULT true NOT NULL,
	"pListasPrecio" boolean DEFAULT true NOT NULL,
	"pUsuarios" boolean DEFAULT true NOT NULL,
	"pSucursales" boolean DEFAULT true NOT NULL,
	"pInventario" boolean DEFAULT true NOT NULL,
	"pVentas" boolean DEFAULT true NOT NULL,
	"pCompras" boolean DEFAULT true NOT NULL,
	"pListados" boolean DEFAULT true NOT NULL,
	"estado" boolean DEFAULT true NOT NULL,
	"sucursalId" integer NOT NULL,
	CONSTRAINT "t3test_usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3test_sucursales" ADD CONSTRAINT "t3test_sucursales_ciudadId_t3test_ciudades_id_fk" FOREIGN KEY ("ciudadId") REFERENCES "public"."t3test_ciudades"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3test_usuarios" ADD CONSTRAINT "t3test_usuarios_sucursalId_t3test_sucursales_id_fk" FOREIGN KEY ("sucursalId") REFERENCES "public"."t3test_sucursales"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
