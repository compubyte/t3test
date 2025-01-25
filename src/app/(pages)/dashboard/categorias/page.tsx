"use client";
export const dynamic = "force-dynamic";

import { ListadoCategorias } from "@/app/_components/categorias/ListadoCategorias";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Categorias() {
  return (
    <>
      <h1>CATEGORIAS PAGE</h1>
      <Button>Volver</Button>
      <ListadoCategorias />
      <Button asChild>
        <Link href="/dashboard">Volver</Link>
      </Button>
    </>
  );
}
