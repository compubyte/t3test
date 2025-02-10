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
  ArchiveX,
  AtSign,
  BaggageClaim,
  Blocks,
  BriefcaseConveyorBelt,
  Coins,
  Combine,
  Factory,
  FileSpreadsheet,
  FolderClock,
  FolderCog,
  FolderGit2,
  FolderHeart,
  FolderSymlink,
  Forklift,
  HandCoins,
  Handshake,
  Info,
  LogOut,
  MapPin,
  Menu,
  Moon,
  Package,
  Package2,
  Receipt,
  Ruler,
  ScanBarcode,
  ScanLine,
  Settings,
  Settings2,
  ShoppingCart,
  Smile,
  SquareMinus,
  SquarePlus,
  Store,
  Sun,
  Tag,
  UserRound,
  UserRoundCog,
  Vault,
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
        <div className="max-h-[80vh] overflow-y-auto">
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
                    onClick={() =>
                      handleAction(() => router.push("/dashboard"))
                    }
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
                            onClick={() =>
                              handleAction(() => setTheme("light"))
                            }
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
                  {/* //// Inicio submenú Compras */}
                  <Accordion type="multiple" className="w-full pl-4">
                    <AccordionItem value="ventas">
                      <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Factory className="icono-menu-main" />
                        Compras
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
                            <BaggageClaim className="icono-menu-main" />
                            Registro de compras
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <BriefcaseConveyorBelt className="icono-menu-main" />
                            Anulación de compras
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* //// Fin submenú Compras */}
                  {/* //// Inicio submenú Productos */}
                  <Accordion type="multiple" className="w-full pl-4">
                    <AccordionItem value="ventas">
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
                            <ArchiveX className="icono-menu-main" />
                            Registro de mermas
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <Combine className="icono-menu-main" />
                            Unir y desglosar paquetes
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <Blocks className="icono-menu-main" />
                            Retoque de inventario
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <Forklift className="icono-menu-main" />
                            Traspaso entre sucursales
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* //// Fin submenú Productos */}
                  {/* //// Inicio submenú Cajas */}
                  <Accordion type="multiple" className="w-full pl-4">
                    <AccordionItem value="ventas">
                      <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Vault className="icono-menu-main" />
                        Cajas
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
                            <HandCoins className="icono-menu-main" />
                            Visor y cierre de caja
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <SquarePlus className="icono-menu-main" />
                            Registro de ingresos a caja
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <SquareMinus className="icono-menu-main" />
                            Registro de egresos de caja
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* //// Fin submenú Cajas */}
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* #### Fin menú Operaciones */}
            {/* #### Inicio menú Listados */}
            <AccordionItem value="listados">
              <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                <FolderClock className="icono-menu-main" />
                Listados
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
                            Ventas registradas
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/productos"),
                              )
                            }
                          >
                            <ScanLine className="icono-menu-main" />
                            Ventas anuladas
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* //// Fin submenú Ventas */}
                  {/* //// Inicio submenú Compras */}
                  <Accordion type="multiple" className="w-full pl-4">
                    <AccordionItem value="ventas">
                      <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Factory className="icono-menu-main" />
                        Compras
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
                            <BaggageClaim className="icono-menu-main" />
                            Compras registradas
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <BriefcaseConveyorBelt className="icono-menu-main" />
                            Compras anuladas
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* //// Fin submenú Compras */}
                  {/* //// Inicio submenú Productos */}
                  <Accordion type="multiple" className="w-full pl-4">
                    <AccordionItem value="ventas">
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
                            <ArchiveX className="icono-menu-main" />
                            Listado de mermas
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <Combine className="icono-menu-main" />
                            Listado de unión y desglose de paquetes
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <Blocks className="icono-menu-main" />
                            Listado de retoques de inventario
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <Forklift className="icono-menu-main" />
                            Listado de traspasos entre sucursales
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* //// Fin submenú Productos */}
                  {/* //// Inicio submenú Cajas */}
                  <Accordion type="multiple" className="w-full pl-4">
                    <AccordionItem value="ventas">
                      <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                        <Vault className="icono-menu-main" />
                        Cajas
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
                            <Coins className="icono-menu-main" />
                            Listado de cajas actuales
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <Receipt className="icono-menu-main" />
                            Listado de cierres de cajas
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <SquarePlus className="icono-menu-main" />
                            Listado de ingresos de caja
                          </div>
                          <div
                            className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={() =>
                              handleAction(() =>
                                router.push("/dashboard/unidades"),
                              )
                            }
                          >
                            <SquareMinus className="icono-menu-main" />
                            Listado de egresos de caja
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {/* //// Fin submenú Cajas */}
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* #### Fin menú Listados */}
            {/* #### Inicio menú Ayuda */}
            <AccordionItem value="ayuda">
              <AccordionTrigger className="flex items-center justify-start hover:bg-gray-100 dark:hover:bg-gray-800">
                <FolderHeart className="icono-menu-main" />
                Ayuda
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <div
                    className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() =>
                      handleAction(() => router.push("/dashboard"))
                    }
                  >
                    <Info className="icono-menu-main" />
                    Acerca de
                  </div>
                  <div
                    className="flex cursor-pointer items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() =>
                      handleAction(() => signOut({ callbackUrl: "/" }))
                    }
                  >
                    <AtSign className="icono-menu-main" />
                    Contacto
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* #### Fin menú Ayuda */}
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}
