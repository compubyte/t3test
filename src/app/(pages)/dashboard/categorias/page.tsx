import { ListadoCategorias } from "@/app/_components/categorias";
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
