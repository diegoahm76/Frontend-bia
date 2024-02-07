/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useState, ReactNode } from "react";

interface Idigitalizacion {
    data: number;
    set_data: React.Dispatch<React.SetStateAction<number>>;
}

const inicial_digitalizacion: Idigitalizacion = {
    data: 0,
    set_data: () => { }
}

export const CentralDigitalizacionContex = createContext<Idigitalizacion>(inicial_digitalizacion);

interface CentralDigitalizacionProviderProps {
    children: ReactNode;
}

export const CentralDigitalizacionProvider = ({ children }: CentralDigitalizacionProviderProps) => {
    const [data, set_data] = useState(0);
    const digitalizacion_value = { data, set_data };

    // Asegúrate de añadir el return aquí
    return (
        <CentralDigitalizacionContex.Provider value={digitalizacion_value}>
            {children}
        </CentralDigitalizacionContex.Provider>
    );
};
