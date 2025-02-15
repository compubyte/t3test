import { Suspense } from "react";
import { ContextCategorias } from "./context";
import ListadoCategorias from "@/app/(pages)/dashboard/(sistema)/(productos)/categorias/list";
import WindowTitleBar from "@/app/_components/_generics/WindowsTitleBar";
import { LoadingSpinner } from "@/app/_components/_generics/LoadingSpinner";
import ErrorBoundary from "@/app/_components/ErrorBoundary";

export default function Categorias() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <ContextCategorias>
          <div className="temas mb-4 flex items-center justify-normal space-x-4">
            <div className="temas-contenedor m-auto w-10/12 rounded border-2 p-4 shadow">
              <WindowTitleBar title="Manejo de categorías" />
              <ListadoCategorias />
            </div>
          </div>
        </ContextCategorias>
      </Suspense>
    </ErrorBoundary>
  );
}
