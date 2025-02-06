import { Check, TriangleAlert, X } from "lucide-react";
import { toast } from "sonner";

const tiempo = 4000; // ⏳ 4 segundos (+1 / +2)

export function CustomToasterSuccess(mensaje: string) {
  toast("¡Excelente!", {
    description: mensaje,
    duration: tiempo,
    icon: <Check className="text-green-500" />,
    action: {
      label: "Aceptar",
      onClick: () => void 0, // cerrar antes de tiempo sin hacer nada
    },
    className: "bg-green-100 border border-green-500 text-green-900",
  });
}

export function CustomToasterError(mensaje: string) {
  toast("¡Ups, Error!", {
    description: mensaje,
    duration: tiempo + 1000, // Errores duran 1seg más
    icon: <X className="text-red-500" />,
    action: {
      label: "Aceptar",
      onClick: () => void 0, // cerrar antes de tiempo sin hacer nada
    },
    className: "bg-red-100 border border-red-500 text-red-900",
  });
}

export function CustomToasterValidation(mensaje: string) {
  toast("¡Atención!", {
    description: mensaje,
    duration: tiempo + 2000, // Advertencias duran 2seg más
    icon: <TriangleAlert className="text-amber-500" />,
    action: {
      label: "Aceptar",
      onClick: () => void 0, // cerrar antes de tiempo sin hacer nada
    },
    className: "bg-amber-100 border border-amber-500 text-amber-900",
  });
}
