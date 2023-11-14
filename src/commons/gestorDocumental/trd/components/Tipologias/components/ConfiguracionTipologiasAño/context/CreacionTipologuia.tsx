/* eslint-disable @typescript-eslint/naming-convention */

import { useState, createContext, type SetStateAction, ReactNode } from "react"



interface TipodeCeaccionInterfaz {
  Formulario_Empresa: any,
  Set_Formulario_Empresa: React.Dispatch<SetStateAction<any>>,


}

export interface ConfiguracionPorUnidad {
  valor_inicio: any;
  cantidad_digitos: any;
  prefijo_consecutivo: any;
  id_unidad_organizacional: any;
}

interface FormularioConfiguracionTipologuiaproviderProps {
  children: ReactNode;
}


interface Formulario {

  id_tipologia_documental: number,
  opcion_seleccionada: string,
  valor_inicial: number,
  cantidad_digitos: number,
  maneja_consecutivo: boolean,
  configuracion_por_unidad: ConfiguracionPorUnidad[],



}

export const TipodeCeaccionContext = createContext<TipodeCeaccionInterfaz>
  ({ Formulario_Empresa: [], Set_Formulario_Empresa: () => { } });




export const Inicial_Formulario: Formulario = {
  id_tipologia_documental: 0,
  opcion_seleccionada: "",
  valor_inicial: 1,
  cantidad_digitos: 0,
  maneja_consecutivo: false,
  configuracion_por_unidad: [],
}



export const FormularioConfiguracionTipologuiaprovider
  = ({ children }: FormularioConfiguracionTipologuiaproviderProps): JSX.Element => {

const [Datos_Return, Set_Datos_Return] = useState<any>([]);
    const [Formulario_Empresa, Set_Formulario_Empresa] = useState<Formulario>(Inicial_Formulario);

console.log(Datos_Return);
  


    const Valores_Formulario_Empresa_tipologia = { Formulario_Empresa, Set_Formulario_Empresa };

    return (
      <TipodeCeaccionContext.Provider value={Valores_Formulario_Empresa_tipologia}>
        {children}
      </TipodeCeaccionContext.Provider>
    );
  };
