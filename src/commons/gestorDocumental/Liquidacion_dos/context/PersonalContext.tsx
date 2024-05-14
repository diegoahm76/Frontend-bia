/* eslint-disable @typescript-eslint/naming-convention */
import { useState, createContext, Dispatch, SetStateAction, ReactNode } from "react";
import { LiquidacionState, PrecioItem, UsuarioInfo, ValoresPos, ValoresProyectoPorcentajes, liquidacionValoresIniciales, valoresInicialesProyectoPorcentaje } from "../interfaces/InterfacesLiquidacion";

// Definición del tipo para el contexto de precios
interface PreciosTypes {
    precios: PrecioItem[];
    setPrecios: Dispatch<SetStateAction<PrecioItem[]>>;
    form: ValoresPos; // El formulario tiene la forma de ValoresPos
    setForm: Dispatch<SetStateAction<ValoresPos>>; // Función para actualizar el formulario
    usuario: UsuarioInfo;
    setUsuario: Dispatch<SetStateAction<UsuarioInfo>>;
    logs: ValoresProyectoPorcentajes;
    setLogs: Dispatch<SetStateAction<ValoresProyectoPorcentajes>>;
    liquidacionState: LiquidacionState;
    setLiquidacionState: Dispatch<SetStateAction<LiquidacionState>>;
}

// Creación del contexto para manejar los precios y el formulario
export const PreciosContext = createContext<PreciosTypes>({
    precios: [], // Inicialmente, el array de precios está vacío
    setPrecios: () => { }, // Función por defecto para actualizar precios
    form: { id_expediente: '', Email: '', telefono_cliente: '' }, // Formulario inicializado con valores vacíos
    setForm: () => { }, // Función por defecto para actualizar el formulario
    usuario: { identificacion: '', nombres: '', apellidos: '', telefono: '', email: '', nombreCategoria: '', direccion: '' },
    setUsuario: () => { },
    logs: valoresInicialesProyectoPorcentaje,
    setLogs: () => { },
    liquidacionState: liquidacionValoresIniciales,
    setLiquidacionState: () => { }
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
    // Estado para almacenar la información del usuario
    const [usuario, setUsuario] = useState<UsuarioInfo>({ identificacion: '', nombres: '', apellidos: '', telefono: '', email: '', nombreCategoria: '', direccion: '' });
    // Estado para almacenar los valores relacionados con el proyecto y los porcentajes
    const [logs, setLogs] = useState<ValoresProyectoPorcentajes>(valoresInicialesProyectoPorcentaje);
    // Estado para almacenar los valores relacionados con la liquidación
    const [liquidacionState, setLiquidacionState] = useState<LiquidacionState>(liquidacionValoresIniciales);

    console.log( "liquidacionState", liquidacionState);

    // Valor del contexto que se proporcionará a los componentes hijos
    const value: PreciosTypes = {
        precios,
        setPrecios,
        form,
        setForm,
        usuario,
        setUsuario,
        logs,
        setLogs,
        liquidacionState,
        setLiquidacionState
    };

    return (
        // Proveedor de contexto que envuelve a los componentes hijos y les proporciona el estado de los precios y el formulario
        <PreciosContext.Provider value={value}>
            {children}
        </PreciosContext.Provider>
    );
};

