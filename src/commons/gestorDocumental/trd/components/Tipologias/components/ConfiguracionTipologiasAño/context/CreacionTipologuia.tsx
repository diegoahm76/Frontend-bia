/* eslint-disable @typescript-eslint/naming-convention */

import { useState, createContext} from "react"
import { Formulario, FormularioConfiguracionTipologuiaproviderProps, Inicial_Formulario, TipodeCeaccionInterfaz } from "../interfaces/ConfiguracionTipologuias";


export const TipodeCeaccionContext = createContext<TipodeCeaccionInterfaz>
  ({ Formulario_Empresa: [], Set_Formulario_Empresa: () => { }, Set_Datos_Return: () => { }, Datos_Return: [] });



export const FormularioConfiguracionTipologuiaprovider
  = ({ children }: FormularioConfiguracionTipologuiaproviderProps): JSX.Element => {

    const [Datos_Return, Set_Datos_Return] = useState<any>([]);
    const [Formulario_Empresa, Set_Formulario_Empresa] = useState<Formulario>(Inicial_Formulario);
    console.log(Formulario_Empresa);


    const Valores_Formulario_Empresa_tipologia = { Formulario_Empresa, Set_Formulario_Empresa, Set_Datos_Return, Datos_Return };

    return (
      <TipodeCeaccionContext.Provider value={Valores_Formulario_Empresa_tipologia}>
        {children}
      </TipodeCeaccionContext.Provider>
    );
  };
