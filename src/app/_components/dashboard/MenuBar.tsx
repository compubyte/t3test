"use client";

import { useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  FileIcon,
  Settings,
  LogOut,
  Layers,
  ShoppingCart,
  Users,
  ClipboardList,
  ShoppingBag,
  List,
  Mail,
  Info,
  LayoutDashboard,
  Cog,
} from "lucide-react";
import Link from "next/link";
import { MenuBarMobile } from "./MenuBarMobile";
import { ModeToggle } from "./ModeToogle";

export function MenuBar() {
  const menuItems = [
    {
      name: "archivo",
      icon: <FileIcon className="mr-2 h-4 w-4" />,
      label: "Archivo",
      items: [
        {
          href: "/dashboard",
          icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
          label: "Autogestión",
        },
        {
          href: "/dashboard",
          icon: <Cog className="mr-2 h-4 w-4" />,
          label: "Preferencias",
        },
        {
          href: "/dashboard",
          icon: <LogOut className="mr-2 h-4 w-4" />,
          label: "Cerrar Sesión",
        },
      ],
    },
    {
      name: "sistema",
      icon: <Settings className="mr-2 h-4 w-4" />,
      label: "Sistema",
      items: [
        {
          href: "/dashboard/categorias",
          icon: <Layers className="mr-2 h-4 w-4" />,
          label: "Manejo de Categorías",
        },
        {
          href: "/dashboard",
          icon: <ShoppingCart className="mr-2 h-4 w-4" />,
          label: "Manejo de Productos",
        },
        {
          href: "/dashboard",
          icon: <Users className="mr-2 h-4 w-4" />,
          label: "Manejo de Usuarios",
        },
      ],
    },
    {
      name: "operaciones",
      icon: <ClipboardList className="mr-2 h-4 w-4" />,
      label: "Operaciones",
      items: [
        {
          href: "/dashboard",
          icon: <ShoppingCart className="mr-2 h-4 w-4" />,
          label: "Registro de Ventas",
        },
        {
          href: "/dashboard",
          icon: <ShoppingBag className="mr-2 h-4 w-4" />,
          label: "Registro de Compras",
        },
      ],
    },
    {
      name: "listados",
      icon: <List className="mr-2 h-4 w-4" />,
      label: "Listados",
      items: [
        {
          href: "/dashboard",
          icon: <ShoppingCart className="mr-2 h-4 w-4" />,
          label: "Listado de Ventas",
        },
        {
          href: "/dashboard",
          icon: <ShoppingBag className="mr-2 h-4 w-4" />,
          label: "Listados de Compras",
        },
        {
          href: "/dashboard",
          icon: <ClipboardList className="mr-2 h-4 w-4" />,
          label: "Listados de Logs",
        },
      ],
    },
    {
      name: "informacion",
      icon: <Info className="mr-2 h-4 w-4" />,
      label: "Información",
      items: [
        {
          href: "/dashboard",
          icon: <Mail className="mr-2 h-4 w-4" />,
          label: "Contacto",
        },
        {
          href: "/dashboard",
          icon: <Info className="mr-2 h-4 w-4" />,
          label: "Acerca de nosotros",
        },
      ],
    },
  ];

  return (
    <div className="flex items-center">
      <MenuBarMobile />
      <Menubar className="hidden md:flex">
        {menuItems.map((menu) => (
          <MenubarMenu key={menu.name}>
            <MenubarTrigger>
              {menu.icon}
              {menu.label}
            </MenubarTrigger>
            <MenubarContent>
              {menu.items.map((item, index) => (
                <Link key={index} href={item.href} passHref legacyBehavior>
                  <MenubarItem>
                    {item.icon}
                    {item.label}
                  </MenubarItem>
                </Link>
              ))}
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>
      <ModeToggle />
    </div>
  );
}
