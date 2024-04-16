/* eslint-disable @typescript-eslint/naming-convention */
import { useState, createContext, Dispatch, SetStateAction, ReactNode } from "react";

// Definición del tipo para los elementos del array de precios
interface PrecioItem {
    nivel: number;
    valor: string;
    nombre: string;
    descripcion: string;
}

// Definición del tipo para el objeto de valores adicionales
interface ValoresPos {
    id_expediente: string;
    Email: string;
    telefono_cliente: string;
}

// Definición del tipo para el contexto de precios
interface PreciosTypes {
    precios: PrecioItem[];
    setPrecios: Dispatch<SetStateAction<PrecioItem[]>>;
    form: ValoresPos; // El formulario tiene la forma de ValoresPos
    setForm: Dispatch<SetStateAction<ValoresPos>>; // Función para actualizar el formulario
}

// Creación del contexto para manejar los precios y el formulario
export const PreciosContext = createContext<PreciosTypes>({
    precios: [], // Inicialmente, el array de precios está vacío
    setPrecios: () => { }, // Función por defecto para actualizar precios
    form: { id_expediente: '', Email: '', telefono_cliente: '' }, // Formulario inicializado con valores vacíos
    setForm: () => { } // Función por defecto para actualizar el formulario
});

// Props para el componente PreciosProvider
interface PreciosProviderProps {
    children: ReactNode;
}

// Componente que provee el contexto para los precios
export const PreciosProvider = ({ children }: PreciosProviderProps): JSX.Element => {
    // Estado para almacenar el array de precios
    const [precios, setPrecios] = useState<PrecioItem[]>([]); // Inicialmente el array de precios está vacío
    // Estado para almacenar el formulario
    const [form, setForm] = useState<ValoresPos>({ id_expediente: '', Email: '', telefono_cliente: '' }); // Inicialmente el formulario tiene valores vacíos

    // Valor del contexto que se proporcionará a los componentes hijos
    const value: PreciosTypes = {
        precios,
        setPrecios,
        form,
        setForm
    };

    return (
        // Proveedor de contexto que envuelve a los componentes hijos y les proporciona el estado de los precios y el formulario
        <PreciosContext.Provider value={value}>
            {children}
        </PreciosContext.Provider>
    );
};
