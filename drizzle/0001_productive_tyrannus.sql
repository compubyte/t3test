CREATE TABLE IF NOT EXISTS "t3test_clientes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_clientes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"direccion" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"tieneCtaCte" boolean DEFAULT false NOT NULL,
	"limiteCtaCte" numeric DEFAULT 0 NOT NULL,
	"ciudadId" integer NOT NULL,
	CONSTRAINT "t3test_clientes_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3test_proveedores" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_proveedores_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"direccion" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"tieneCtaCte" boolean DEFAULT false NOT NULL,
	"limiteCtaCte" numeric DEFAULT 0 NOT NULL,
	"ciudadId" integer NOT NULL,
	CONSTRAINT "t3test_proveedores_nombre_unique" UNIQUE("nombre")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3test_clientes" ADD CONSTRAINT "t3test_clientes_ciudadId_t3test_ciudades_id_fk" FOREIGN KEY ("ciudadId") REFERENCES "public"."t3test_ciudades"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3test_proveedores" ADD CONSTRAINT "t3test_proveedores_ciudadId_t3test_ciudades_id_fk" FOREIGN KEY ("ciudadId") REFERENCES "public"."t3test_ciudades"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
