/* eslint-disable @typescript-eslint/naming-convention */

import { useState, createContext } from "react"
import { Formulario, FormularioConfiguracionTipologuiaproviderProps, Inicial_Formulario, TipodeCeaccionInterfaz, VariablesCreacionPlantilla, valores_defecto_plantilla } from "../interfaces/ConfiguracionTipologuias";


export const TipodeCeaccionContext = createContext<TipodeCeaccionInterfaz>
  ({
    Formulario_Empresa: [],
    Set_Formulario_Empresa: () => { },
    Set_Datos_Return: () => { },
    Datos_Return: [],
    form: [],
    set_form: () => { },
  });



export const FormularioConfiguracionTipologuiaprovider
  = ({ children }: FormularioConfiguracionTipologuiaproviderProps): JSX.Element => {

    const [Datos_Return, Set_Datos_Return] = useState<any>([]);
    const [Formulario_Empresa, Set_Formulario_Empresa] = useState<Formulario>(Inicial_Formulario);
    const [form, set_form] = useState<VariablesCreacionPlantilla>(valores_defecto_plantilla);
    //  console.log('')(form);
    //  console.log('')(Formulario_Empresa);


    const Valores_Formulario_Empresa_tipologia = { Formulario_Empresa, Set_Formulario_Empresa, Set_Datos_Return, Datos_Return, form, set_form };

    return (
      <TipodeCeaccionContext.Provider value={Valores_Formulario_Empresa_tipologia}>
        {children}
      </TipodeCeaccionContext.Provider>
    );
  };
