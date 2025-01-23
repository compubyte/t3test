CREATE TABLE IF NOT EXISTS "t3test_categorias" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_categorias_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "t3test_productos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "t3test_productos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(255) NOT NULL,
	"precioUnitario" numeric NOT NULL,
	"inventario" integer DEFAULT 0 NOT NULL,
	"categoriaId" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "t3test_productos" ADD CONSTRAINT "t3test_productos_categoriaId_t3test_categorias_id_fk" FOREIGN KEY ("categoriaId") REFERENCES "public"."t3test_categorias"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
