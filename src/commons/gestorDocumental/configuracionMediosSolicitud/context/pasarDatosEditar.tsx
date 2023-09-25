/* eslint-disable @typescript-eslint/naming-convention */
import {useState,createContext,type SetStateAction} from "react";

interface IModalBusquedaMediosSolicitudContext {
datos_Editar:any[];
set_datos_editar:React.Dispatch<SetStateAction<any[]>>;

}

export const ModalBusquedaMediosSolicitudContext = createContext<IModalBusquedaMediosSolicitudContext>({
    datos_Editar:[],
    set_datos_editar:()=>{}  
} );

export const ModalBusquedaMediosSolicitudProvider = ({children}:any) => {

const [datos_Editar, set_datos_editar] = useState<any[]>([]);
console.log(datos_Editar);  
const variable_datos ={datos_Editar,set_datos_editar};
    return(
        <ModalBusquedaMediosSolicitudContext.Provider value={variable_datos}>
            {children}
        </ModalBusquedaMediosSolicitudContext.Provider>
    );

}