// import ListadoCategorias from "@/app/_components/categorias/ListadoCategorias";
// import WindowTitleBar from "@/app/_components/_generics/WindowsTitleBar";
// import { CategoriasProvider } from "@/app/(contexts)/CategoriasContext";
// import { Suspense } from "react";
// import { LoadingSpinner } from "@/app/_components/_generics/LoadingSpinner";
// import ErrorBoundary from "@/app/_components/ErrorBoundary";

// export default function Usuarios() {
//   return (
//     <ErrorBoundary>
//       <Suspense fallback={<LoadingSpinner />}>
//         <CategoriasProvider>
//           <div className="temas mb-4 flex items-center justify-normal space-x-4">
//             <div className="temas-contenedor m-auto w-10/12 rounded border-2 p-4 shadow">
//               <WindowTitleBar title="Manejo de usuarios" />
//               <ListadoUsuarios />
//             </div>
//           </div>
//         </CategoriasProvider>
//       </Suspense>
//     </ErrorBoundary>
//   );
// }
