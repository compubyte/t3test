"use client";

import { useState } from "react";
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
  FileSpreadsheet,
  FolderCog,
  FolderGit2,
  FolderSymlink,
  Handshake,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Package,
  Package2,
  Ruler,
  ScanBarcode,
  ScanLine,
  Settings,
  Settings2,
  ShoppingCart,
  Smile,
  Store,
  Sun,
  Tag,
  UserRound,
  UserRoundCog,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export function MenuBarAccordion() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [accordionValues, setAccordionValues] = useState<string[]>([]);

  // Función para manejar la navegación y cerrar el Accordion
  const handleAction = (action: () => void | Promise<void>) => {
    void action(); // Ejecuta la acción (navegación, cambio de tema, etc.)
    setAccordionValues([]); // Cierra todos los ítems del Accordion
    setIsSheetOpen(false); // Cierra el menú
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="tam-900:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription>{/* Aquí iría una descripción */}</SheetDescription>
        </SheetHeader>
        <Accordion
          type="multiple"
          value={accordionValues}
          onValueChange={(values) => setAccordionValues(values)}
          className="w-full"
        >
          {/* #### Inicio menú Archivo */}
          <AccordionItem value="archivo">
            <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
              <FolderCog className="icono-menu-main" />
              Archivo
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => handleAction(() => router.push("/dashboard"))}
                >
                  <UserRoundCog className="icono-menu-main" />
                  Autogestión
                </div>
                {/* //// Inicio submenú Configuración */}
                <Accordion type="multiple" className="w-full pl-4">
                  <AccordionItem value="configuracion">
                    <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Settings className="icono-menu-main" />
                      Configuración
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() =>
                            handleAction(() => router.push("/settings"))
                          }
                        >
                          <Settings2 className="icono-menu-main" />
                          Preferencias del sistema
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => handleAction(() => setTheme("light"))}
                        >
                          <Sun className="icono-menu-main" />
                          Tema claro
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() => handleAction(() => setTheme("dark"))}
                        >
                          <Moon className="icono-menu-main" />
                          Tema oscuro
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* //// Fin submenú Configuración */}
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() =>
                    handleAction(() => signOut({ callbackUrl: "/" }))
                  }
                >
                  <LogOut className="icono-menu-main" />
                  Cerrar sesión
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* #### Fin menú Archivo */}

          {/* #### Inicio menú Sistema */}
          <AccordionItem value="sistema">
            <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
              <FolderGit2 className="icono-menu-main" />
              Sistema
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {/* //// Inicio submenú Producto */}
                <Accordion type="multiple" className="w-full pl-4">
                  <AccordionItem value="productos">
                    <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                      <Package className="icono-menu-main" />
                      Productos
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() =>
                            handleAction(() =>
                              router.push("/dashboard/productos"),
                            )
                          }
                        >
                          <Package2 className="icono-menu-main" />
                          Manejo de productos
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() =>
                            handleAction(() =>
                              router.push("/dashboard/unidades"),
                            )
                          }
                        >
                          <Ruler className="icono-menu-main" />
                          Manejo de unidades de venta
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() =>
                            handleAction(() =>
                              router.push("/dashboard/categorias"),
                            )
                          }
                        >
                          <Tag className="icono-menu-main" />
                          Manejo de categorías
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() =>
                            handleAction(() =>
                              router.push("/dashboard/listas-precio"),
                            )
                          }
                        >
                          <FileSpreadsheet className="icono-menu-main" />
                          Manejo de listas de precio
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* //// Fin submenú Producto */}
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() =>
                    handleAction(() => router.push("/dashboard/clientes"))
                  }
                >
                  <Smile className="icono-menu-main" />
                  Manejo de clientes
                </div>
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() =>
                    handleAction(() => router.push("/dashboard/clientes"))
                  }
                >
                  <Handshake className="icono-menu-main" />
                  Manejo de proveedores
                </div>
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() =>
                    handleAction(() => router.push("/dashboard/clientes"))
                  }
                >
                  <MapPin className="icono-menu-main" />
                  Manejo de ciudades
                </div>
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() =>
                    handleAction(() => router.push("/dashboard/clientes"))
                  }
                >
                  <Store className="icono-menu-main" />
                  Manejo de sucursales
                </div>
                <div
                  className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() =>
                    handleAction(() => router.push("/dashboard/clientes"))
                  }
                >
                  <UserRound className="icono-menu-main" />
                  Manejo de usuarios
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* #### Fin menú Sistema */}

          {/* #### Inicio menú Operaciones */}
          <AccordionItem value="operaciones">
            <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
              <FolderSymlink className="icono-menu-main" />
              Operaciones
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {/* //// Inicio submenú Ventas */}
                <Accordion type="multiple" className="w-full pl-4">
                  <AccordionItem value="ventas">
                    <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                      <ShoppingCart className="icono-menu-main" />
                      Ventas
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() =>
                            handleAction(() =>
                              router.push("/dashboard/productos"),
                            )
                          }
                        >
                          <ScanBarcode className="icono-menu-main" />
                          Registro de ventas
                        </div>
                        <div
                          className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                          onClick={() =>
                            handleAction(() =>
                              router.push("/dashboard/unidades"),
                            )
                          }
                        >
                          <ScanLine className="icono-menu-main" />
                          Anulación de ventas
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                {/* //// Fin submenú Ventas */}
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* #### Fin menú Operaciones */}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
