/* eslint-disable @typescript-eslint/naming-convention */

import { useState, createContext, Dispatch, SetStateAction, ReactNode } from "react";
import { LiquidacionState, PrecioItem, UsuarioInfo, ValoresPos, ValoresProyectoPorcentajes, liquidacionValoresIniciales, valoresInicialesProyectoPorcentaje } from "../interfaces/InterfacesLiquidacion";

// Define el tipo para el contexto de precios
interface PreciosTypes {
    precios: PrecioItem[]; // Array de precios
    setPrecios: Dispatch<SetStateAction<PrecioItem[]>>; // Función para actualizar el array de precios
    form: ValoresPos; // Formulario
    setForm: Dispatch<SetStateAction<ValoresPos>>; // Función para actualizar el formulario
    usuario: UsuarioInfo; // Información del usuario
    setUsuario: Dispatch<SetStateAction<UsuarioInfo>>; // Función para actualizar la información del usuario
    logs: ValoresProyectoPorcentajes; // Valores relacionados con el proyecto y porcentajes
    setLogs: Dispatch<SetStateAction<ValoresProyectoPorcentajes>>; // Función para actualizar los valores del proyecto y porcentajes
    liquidacionState: LiquidacionState; // Valores relacionados con la liquidación
    setLiquidacionState: Dispatch<SetStateAction<LiquidacionState>>; // Función para actualizar los valores de liquidación
}

// Crea el contexto para manejar los precios y el formulario
export const PreciosContext = createContext<PreciosTypes>({
    precios: [], // Inicialmente, el array de precios está vacío
    setPrecios: () => {}, // Función por defecto para actualizar precios
    form: { id_expediente: '', Email: '', telefono_cliente: '' }, // Formulario inicializado con valores vacíos
    setForm: () => {}, // Función por defecto para actualizar el formulario
    usuario: { identificacion: '', nombres: '', apellidos: '', telefono: '', email: '', nombreCategoria: '', direccion: '' }, // Información del usuario inicializada con valores vacíos
    setUsuario: () => {}, // Función por defecto para actualizar la información del usuario
    logs: valoresInicialesProyectoPorcentaje, // Valores de proyecto y porcentajes inicializados
    setLogs: () => {}, // Función por defecto para actualizar los valores de proyecto y porcentajes
    liquidacionState: liquidacionValoresIniciales, // Valores de liquidación inicializados
    setLiquidacionState: () => {} // Función por defecto para actualizar los valores de liquidación
});

// Props para el componente PreciosProvider
interface PreciosProviderProps {
    children: ReactNode; // Componentes hijos
}

// Componente que provee el contexto para los precios
export const PreciosProvider = ({ children }: PreciosProviderProps): JSX.Element => {
    // Estado para almacenar el array de precios
    const [precios, setPrecios] = useState<PrecioItem[]>([]); // Inicialmente el array de precios está vacío
    // Estado para almacenar el formulario
    const [form, setForm] = useState<ValoresPos>({ id_expediente: '', Email: '', telefono_cliente: '' }); // Inicialmente el formulario tiene valores vacíos
    // Estado para almacenar la información del usuario
    const [usuario, setUsuario] = useState<UsuarioInfo>({ identificacion: '', nombres: '', apellidos: '', telefono: '', email: '', nombreCategoria: '', direccion: '' }); // Información del usuario inicializada con valores vacíos
    // Estado para almacenar los valores relacionados con el proyecto y los porcentajes
    const [logs, setLogs] = useState<ValoresProyectoPorcentajes>(valoresInicialesProyectoPorcentaje); // Valores de proyecto y porcentajes inicializados
    // Estado para almacenar los valores relacionados con la liquidación
    const [liquidacionState, setLiquidacionState] = useState<LiquidacionState>(liquidacionValoresIniciales); // Valores de liquidación inicializados

    // Crea el valor del contexto que se proporcionará a los componentes hijos
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
