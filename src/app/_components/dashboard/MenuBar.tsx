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
import { Cog, FileIcon, LayoutDashboard, LogOut, Settings } from "lucide-react";
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
      <Menubar className="hidden rounded-none border-b border-none px-4 tam-700:flex lg:px-6">
        {/* #### Inicio menú Archivo */}
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <FileIcon className="mr-2 h-4 w-4" />
            Archivo
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Autogestión
            </MenubarItem>
            {/* //// Inicio submenú Configuración */}
            <MenubarSub>
              <MenubarSubTrigger>
                <Settings className="mr-2 h-4 w-4" />
                Configuración
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <Cog className="mr-2 h-4 w-4" />
                  Preferencias del sistema
                </MenubarItem>
                <MenubarItem onClick={() => setTheme("light")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Activar tema claro
                </MenubarItem>
                <MenubarItem onClick={() => setTheme("dark")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Activar tema oscuro
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Configuración */}
            <MenubarItem onClick={() => signOut({ callbackUrl: "/" })}>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {/* #### Fin menú Archivo */}
        {/* #### Inicio menú Sistema */}
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            Sistema
          </MenubarTrigger>
          <MenubarContent>
            {/* //// Inicio submenú Producto */}
            <MenubarSub>
              <MenubarSubTrigger>
                <Settings className="mr-2 h-4 w-4" />
                Productos
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Manejo de productos
                </MenubarItem>
                <MenubarItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Manejo de unidades de venta
                </MenubarItem>
                <MenubarItem
                  onClick={() => router.push("/dashboard/categorias")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Manejo de categorías
                </MenubarItem>
                <MenubarItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Manejo de listas de precio
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            {/* //// Fin submenú Producto */}
            <MenubarItem>
              <LogOut className="mr-2 h-4 w-4" />
              Manejo de clientes
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        {/* #### Fin menú Sistema */}
        {/* #### Inicio menú Operaciones */}
      </Menubar>
    </div>
  );
}
