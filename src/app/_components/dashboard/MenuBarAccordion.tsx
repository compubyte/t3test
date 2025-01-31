"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Cog,
  FileIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export function MenuBarAccordion() {
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="tam-700:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          {/* <SheetDescription>
            Navegue por las diferentes secciones de la aplicación.
          </SheetDescription> */}
        </SheetHeader>
        <Accordion type="multiple" className="w-full">
          {/* #### Inicio menú Archivo */}
          <AccordionItem value="archivo">
            <AccordionTrigger className="flex items-center justify-start">
              <FileIcon className="mr-2 h-4 w-4" />
              Archivo
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => router.push("/dashboard")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Autogestión
                </div>
                {/* //// Inicio submenú Configuración */}
                <Accordion type="multiple" className="w-full pl-4">
                  <AccordionItem value="configuracion">
                    <AccordionTrigger className="flex items-center justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Configuración
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => router.push("/settings")}
                        >
                          <Cog className="mr-2 h-4 w-4" />
                          Preferencias del sistema
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setTheme("light")}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Activar tema claro
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => setTheme("dark")}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Activar tema oscuro
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* //// Fin submenú Configuración */}
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* #### Fin menú Archivo */}

          {/* #### Inicio menú Sistema */}
          <AccordionItem value="sistema">
            <AccordionTrigger className="flex items-center justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Sistema
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {/* //// Inicio submenú Producto */}
                <Accordion type="multiple" className="w-full pl-4">
                  <AccordionItem value="productos">
                    <AccordionTrigger className="flex items-center justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Productos
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => router.push("/dashboard/productos")}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Manejo de productos
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => router.push("/dashboard/unidades")}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Manejo de unidades de venta
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => router.push("/dashboard/categorias")}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Manejo de categorías
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() =>
                            router.push("/dashboard/listas-precio")
                          }
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Manejo de listas de precio
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* //// Fin submenú Producto */}
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => router.push("/dashboard/clientes")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Manejo de clientes
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* #### Fin menú Sistema */}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}

// import * as React from "react";
// import Link from "next/link";
// import {
//   FileIcon,
//   Settings,
//   LogOut,
//   Layers,
//   ShoppingCart,
//   Users,
//   ClipboardList,
//   ShoppingBag,
//   List,
//   Mail,
//   Info,
//   LayoutDashboard,
//   Cog,
//   Menu,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { ModeToggle } from "./ModeToogle";

// const menuItems = [
//   {
//     title: "Archivo",
//     icon: <FileIcon className="h-4 w-4" />,
//     items: [
//       {
//         title: "Autogestión",
//         icon: <LayoutDashboard className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//       {
//         title: "Preferencias",
//         icon: <Cog className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//       {
//         title: "Cerrar Sesión",
//         icon: <LogOut className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//     ],
//   },
//   {
//     title: "Sistema",
//     icon: <Settings className="h-4 w-4" />,
//     items: [
//       {
//         title: "Manejo de Categorías",
//         icon: <Layers className="h-4 w-4" />,
//         href: "/dashboard/categorias",
//       },
//       {
//         title: "Manejo de Productos",
//         icon: <ShoppingCart className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//       {
//         title: "Manejo de Usuarios",
//         icon: <Users className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//     ],
//   },
//   {
//     title: "Operaciones",
//     icon: <ClipboardList className="h-4 w-4" />,
//     items: [
//       {
//         title: "Registro de Ventas",
//         icon: <ShoppingBag className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//       {
//         title: "Registro de Compras",
//         icon: <ShoppingCart className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//     ],
//   },
//   {
//     title: "Listados",
//     icon: <List className="h-4 w-4" />,
//     items: [
//       {
//         title: "Listado de Ventas",
//         icon: <ShoppingBag className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//       {
//         title: "Listados de Compras",
//         icon: <ShoppingCart className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//       {
//         title: "Listados de Logs",
//         icon: <ClipboardList className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//     ],
//   },
//   {
//     title: "Acerca de...",
//     icon: <Info className="h-4 w-4" />,
//     items: [
//       {
//         title: "Contacto",
//         icon: <Mail className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//       {
//         title: "Acerca de nosotros",
//         icon: <Info className="h-4 w-4" />,
//         href: "/dashboard",
//       },
//     ],
//   },
// ];

// export function MenuBarMobile() {
//   return (
// <Sheet>
//   <SheetTrigger asChild>
//     <Button variant="outline" size="icon" className="tam-700:hidden">
//       <Menu className="h-4 w-4" />
//       <span className="sr-only">Abrir menú</span>
//     </Button>
//   </SheetTrigger>
//   <SheetContent side="left" className="w-[300px] sm:w-[400px]">
//     <SheetHeader>
//       <SheetTitle>Menú</SheetTitle>
//       <SheetDescription>
//         Navegue por las diferentes secciones de la aplicación.
//       </SheetDescription>
//     </SheetHeader>
//         <Accordion type="single" collapsible className="w-full">
//           {menuItems.map((section, index) => (
//             <AccordionItem value={`item-${index}`} key={index}>
//               <AccordionTrigger>
//                 <span className="flex items-center">
//                   {section.icon}
//                   <span className="ml-2">{section.title}</span>
//                 </span>
//               </AccordionTrigger>
//               <AccordionContent>
//                 <div className="flex flex-col space-y-2">
//                   {section.items.map((item, itemIndex) => (
//                     <Link
//                       href={item.href}
//                       key={itemIndex}
//                       className="flex items-center rounded-md p-2 hover:bg-accent"
//                     >
//                       {item.icon}
//                       <span className="ml-2">{item.title}</span>
//                     </Link>
//                   ))}
//                 </div>
//               </AccordionContent>
//             </AccordionItem>
//           ))}
//         </Accordion>
//       </SheetContent>
//     </Sheet>
//   );
// }
