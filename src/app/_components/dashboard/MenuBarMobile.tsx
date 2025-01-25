import * as React from "react";
import Link from "next/link";
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
  Menu,
} from "lucide-react";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ModeToggle } from "./ModeToogle";

const menuItems = [
  {
    title: "Archivo",
    icon: <FileIcon className="h-4 w-4" />,
    items: [
      {
        title: "Autogestión",
        icon: <LayoutDashboard className="h-4 w-4" />,
        href: "/dashboard",
      },
      {
        title: "Preferencias",
        icon: <Cog className="h-4 w-4" />,
        href: "/dashboard",
      },
      {
        title: "Cerrar Sesión",
        icon: <LogOut className="h-4 w-4" />,
        href: "/dashboard",
      },
    ],
  },
  {
    title: "Sistema",
    icon: <Settings className="h-4 w-4" />,
    items: [
      {
        title: "Manejo de Categorías",
        icon: <Layers className="h-4 w-4" />,
        href: "/dashboard/categorias",
      },
      {
        title: "Manejo de Productos",
        icon: <ShoppingCart className="h-4 w-4" />,
        href: "/dashboard",
      },
      {
        title: "Manejo de Usuarios",
        icon: <Users className="h-4 w-4" />,
        href: "/dashboard",
      },
    ],
  },
  {
    title: "Operaciones",
    icon: <ClipboardList className="h-4 w-4" />,
    items: [
      {
        title: "Registro de Ventas",
        icon: <ShoppingBag className="h-4 w-4" />,
        href: "/dashboard",
      },
      {
        title: "Registro de Compras",
        icon: <ShoppingCart className="h-4 w-4" />,
        href: "/dashboard",
      },
    ],
  },
  {
    title: "Listados",
    icon: <List className="h-4 w-4" />,
    items: [
      {
        title: "Listado de Ventas",
        icon: <ShoppingBag className="h-4 w-4" />,
        href: "/dashboard",
      },
      {
        title: "Listados de Compras",
        icon: <ShoppingCart className="h-4 w-4" />,
        href: "/dashboard",
      },
      {
        title: "Listados de Logs",
        icon: <ClipboardList className="h-4 w-4" />,
        href: "/dashboard",
      },
    ],
  },
  {
    title: "Acerca de...",
    icon: <Info className="h-4 w-4" />,
    items: [
      {
        title: "Contacto",
        icon: <Mail className="h-4 w-4" />,
        href: "/dashboard",
      },
      {
        title: "Acerca de nosotros",
        icon: <Info className="h-4 w-4" />,
        href: "/dashboard",
      },
    ],
  },
];

export function MenuBarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-4 w-4" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Menú</SheetTitle>
          <SheetDescription>
            Navegue por las diferentes secciones de la aplicación.
          </SheetDescription>
        </SheetHeader>
        <Accordion type="single" collapsible className="w-full">
          {menuItems.map((section, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>
                <span className="flex items-center">
                  {section.icon}
                  <span className="ml-2">{section.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      href={item.href}
                      key={itemIndex}
                      className="flex items-center rounded-md p-2 hover:bg-accent"
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
