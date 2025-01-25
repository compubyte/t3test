import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  ReactNode,
} from "react";

// Crea el contexto
interface RowClickContextType {
  selectedRow: number;
  handleRowClick: (id: number) => void;
}

// Crea el contexto con un valor por defecto
const RowClickContext = createContext<RowClickContextType>({
  selectedRow: 0,
  handleRowClick: () => undefined, // Función vacía por defecto
});

// Exporta un hook personalizado para usar el contexto fácilmente
export const useRowClick = () => {
  return useContext(RowClickContext);
};

// Proveedor del contexto
export const RowClickProvider = ({ children }: { children: ReactNode }) => {
  // Estado para almacenar la fila seleccionada
  const [selectedRow, setSelectedRow] = useState<number>(0);

  // Función para manejar el clic en una fila
  const handleRowClick = useCallback((id: number) => {
    setSelectedRow(id); // Actualiza el estado de la fila seleccionada
    console.log("Row clicked:", id);
  }, []);

  // Valor que se pasa a través del contexto
  const contextValue: RowClickContextType = {
    selectedRow,
    handleRowClick,
  };

  return (
    <RowClickContext.Provider value={contextValue}>
      {children}
    </RowClickContext.Provider>
  );
};
