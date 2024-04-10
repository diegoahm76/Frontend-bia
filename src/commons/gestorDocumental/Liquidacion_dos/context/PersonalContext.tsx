/* eslint-disable @typescript-eslint/naming-convention */
import { useState, createContext, Dispatch, SetStateAction, ReactNode } from "react";

// Definición del tipo para los elementos del array de precios
interface PrecioItem {
    descripcion: string;
    valor: number;
}

// Definición del tipo para el contexto de precios
interface PreciosTypes {
    precios: PrecioItem[]; // Ahora es un array de elementos de tipo PrecioItem
    setPrecios: Dispatch<SetStateAction<PrecioItem[]>>; // La función para actualizar precios toma un array de PrecioItem
}

// Contexto para manejar los precios
export const PreciosContext = createContext<PreciosTypes>({
    precios: [], // Inicialmente el array de precios está vacío
    setPrecios: () => { } // Función por defecto para actualizar precios
});

// Props para el componente PreciosProvider
interface PreciosProps {
    children: ReactNode;
}

// Componente que provee el contexto para los precios
export const PreciosProvider = ({ children }: PreciosProps): JSX.Element => {
    // Estado para almacenar el array de precios
    const [precios, setPrecios] = useState<PrecioItem[]>([]); // Inicialmente el array de precios está vacío

    // Valor del contexto que se proporcionará a los componentes hijos
    const value = {
        precios,
        setPrecios
    };

    return (
        // Proveedor de contexto que envuelve a los componentes hijos y les proporciona el estado de los precios
        <PreciosContext.Provider value={value}>
            {children}
        </PreciosContext.Provider>
    );
};
