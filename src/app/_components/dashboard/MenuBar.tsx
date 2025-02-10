"use client";

import {
  Menubar,
  // MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  // MenubarRadioGroup,
  // MenubarRadioItem,
  // MenubarSeparator,
  // MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { MenuBarAccordion } from "./MenuBarAccordion";
import { signOut } from "next-auth/react";

export function MenuBar() {
  const { setTheme } = useTheme();
  const router = useRouter();

  return (
    <div className="mb-4 flex items-center">
      <MenuBarAccordion />
      <Menubar className="hidden rounded-none border-b border-none px-4 tam-900:flex lg:px-6">
        {/* #### Inicio menú Archivo */}
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <FolderCog className="icono-menu-main" />
            Archivo {/* Archivo */}
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem className="text-base">
              <UserRoundCog className="icono-menu" />
              Autogestión {/* Archivo -> Autogestión */}
            </MenubarItem>
            {/* //// Inicio submenú Configuración */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <Settings className="icono-menu" />
                Configuración {/* Archivo -> (Configuración) */}
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <Settings2 className="icono-menu" />
                  Preferencias del sistema{" "}
                  {/* Archivo -> (Configuración) -> Preferencias del sistema */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <Sun className="icono-menu" />
                  Tema claro {/* Archivo -> (Configuración) -> Tema claro */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("dark")}
                >
                  <Moon className="icono-menu" />
                  Tema oscuro {/* Archivo -> (Configuración) -> Tema oscuro */}
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Configuración */}
            <MenubarItem
              className="text-base"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <LogOut className="icono-menu" />
              Cerrar sesión {/* Archivo -> Cerrar sesión */}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {/* #### Fin menú Archivo */}

        {/* #### Inicio menú Sistema */}
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <FolderGit2 className="icono-menu-main" />
            Sistema
          </MenubarTrigger>
          <MenubarContent>
            {/* //// Inicio submenú Producto */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <Package className="icono-menu" />
                Productos
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <Package2 className="icono-menu" />
                  Manejo de productos
                </MenubarItem>
                <MenubarItem className="text-base">
                  <Ruler className="icono-menu" />
                  Manejo de unidades de venta
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => router.push("/dashboard/categorias")}
                >
                  <Tag className="icono-menu" />
                  Manejo de categorías
                </MenubarItem>
                <MenubarItem className="text-base">
                  <FileSpreadsheet className="icono-menu" />
                  Manejo de listas de precio
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Producto */}
            <MenubarItem className="text-base">
              <Smile className="icono-menu" />
              Manejo de clientes
            </MenubarItem>
            <MenubarItem className="text-base">
              <Handshake className="icono-menu" />
              Manejo de proveedores
            </MenubarItem>
            <MenubarItem className="text-base">
              <MapPin className="icono-menu" />
              Manejo de ciudades
            </MenubarItem>
            <MenubarItem className="text-base">
              <Store className="icono-menu" />
              Manejo de sucursales
            </MenubarItem>
            <MenubarItem className="text-base">
              <UserRound className="icono-menu" />
              Manejo de usuarios
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {/* #### Fin menú Sistema */}

        {/* #### Inicio menú Operaciones */}
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <FolderSymlink className="icono-menu-main" />
            Operaciones {/* Operaciones */}
          </MenubarTrigger>
          <MenubarContent>
            {/* //// Inicio submenú Ventas */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <ShoppingCart className="icono-menu" />
                Ventas {/* Operaciones -> (Ventas) */}
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <ScanBarcode className="icono-menu" />
                  Registro de ventas{" "}
                  {/* Operaciones -> (Ventas) -> Registro de ventas */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <ScanLine className="icono-menu" />
                  Anulación de ventas{" "}
                  {/* Operaciones -> (Ventas) -> Anulación de ventas */}
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Ventas */}
            {/* //// Inicio submenú Compras */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <Factory className="icono-menu" />
                Compras {/* Operaciones -> (Compras) */}
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <BaggageClaim className="icono-menu" />
                  Registro de compras{" "}
                  {/* Operaciones -> (Compras) -> Registro de compras */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <BriefcaseConveyorBelt className="icono-menu" />
                  Anulación de compras{" "}
                  {/* Operaciones -> (Compras) -> Anulación de compras */}
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Compras */}

            {/* //// Inicio submenú Producto */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <Package className="icono-menu" />
                Productos
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <ArchiveX className="icono-menu" />
                  Registro de mermas
                </MenubarItem>
                <MenubarItem className="text-base">
                  <Combine className="icono-menu" />
                  Unir y desglosar paquetes
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => router.push("/dashboard/categorias")}
                >
                  <Blocks className="icono-menu" />
                  Retoque de inventario
                </MenubarItem>
                <MenubarItem className="text-base">
                  <Forklift className="icono-menu" />
                  Traspaso entre sucursales
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Producto */}

            {/* //// Inicio submenú Cajas */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <Vault className="icono-menu" />
                Cajas {/* Operaciones -> (Cajas) */}
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <HandCoins className="icono-menu" />
                  Visor y cierre de caja
                  {/* Operaciones -> (Cajas) -> Visor y cierre de caja */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <SquarePlus className="icono-menu" />
                  Registro de ingresos a caja{" "}
                  {/* Operaciones -> (Cajas) -> Registro de ingresos a caja */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <SquareMinus className="icono-menu" />
                  Registro de egresos de caja{" "}
                  {/* Operaciones -> (Cajas) ->  Registro de egresos de caja */}
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Cajas */}
          </MenubarContent>
        </MenubarMenu>
        {/* #### Fin menú Operaciones */}

        {/* #### Inicio menú Listados */}
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <FolderClock className="icono-menu-main" />
            Listados {/* Listados */}
          </MenubarTrigger>
          <MenubarContent>
            {/* //// Inicio submenú Ventas */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <ShoppingCart className="icono-menu" />
                Ventas {/* Listados -> (Ventas) */}
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <ScanBarcode className="icono-menu" />
                  Ventas registradas{" "}
                  {/* Listados -> (Ventas) -> Registro de ventas */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <ScanLine className="icono-menu" />
                  Ventas anuladas{" "}
                  {/* Listados -> (Ventas) -> Anulación de ventas */}
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Ventas */}
            {/* //// Inicio submenú Compras */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <Factory className="icono-menu" />
                Compras {/* Listados -> (Compras) */}
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <BaggageClaim className="icono-menu" />
                  Compras registradas{" "}
                  {/* Listados -> (Compras) -> Registro de compras */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <BriefcaseConveyorBelt className="icono-menu" />
                  Compras anuladas{" "}
                  {/* Listados -> (Compras) -> Anulación de compras */}
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Compras */}

            {/* //// Inicio submenú Producto */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <Package className="icono-menu" />
                Productos
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <ArchiveX className="icono-menu" />
                  Listado de mermas
                </MenubarItem>
                <MenubarItem className="text-base">
                  <Combine className="icono-menu" />
                  Listado de unión y desglose de paquetes
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => router.push("/dashboard/categorias")}
                >
                  <Blocks className="icono-menu" />
                  Listado de retoques de inventario
                </MenubarItem>
                <MenubarItem className="text-base">
                  <Forklift className="icono-menu" />
                  Listado de traspasos entre sucursales
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Producto */}

            {/* //// Inicio submenú Cajas */}
            <MenubarSub>
              <MenubarSubTrigger className="cursor-pointer text-base">
                <Vault className="icono-menu" />
                Cajas {/* Listados -> (Cajas) */}
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem className="text-base">
                  <Coins className="icono-menu" />
                  Listado de cajas actuales{" "}
                  {/* Listados -> (Cajas) -> Listado de cajas actuales */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <Receipt className="icono-menu" />
                  Listado de cierres de cajas{" "}
                  {/* Listados -> (Cajas) -> Listado de cierres de cajas */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <SquarePlus className="icono-menu" />
                  Listado de ingresos de caja{" "}
                  {/* Listados -> (Cajas) -> Listado de cierres de cajas */}
                </MenubarItem>
                <MenubarItem
                  className="text-base"
                  onClick={() => setTheme("light")}
                >
                  <SquareMinus className="icono-menu" />
                  Listado de egresos de caja{" "}
                  {/* Listados -> (Cajas) -> Listado de cierres de cajas */}
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Cajas */}
          </MenubarContent>
        </MenubarMenu>
        {/* #### Fin menú Listados */}

        {/* #### Inicio menú Ayuda */}
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <FolderHeart className="icono-menu-main" />
            Ayuda {/* Ayuda */}
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              className="text-base"
              onClick={() => router.push("/dashboard/acercade")}
            >
              <Info className="icono-menu" />
              Acerca de {/* Ayuda -> Acerca de */}
            </MenubarItem>
            <MenubarItem
              className="text-base"
              onClick={() => router.push("/dashboard/contacto")}
            >
              <AtSign className="icono-menu" />
              Contacto {/* Ayuda -> Contacto */}
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {/* #### Fin menú Ayuda */}
      </Menubar>
    </div>
  );
}
