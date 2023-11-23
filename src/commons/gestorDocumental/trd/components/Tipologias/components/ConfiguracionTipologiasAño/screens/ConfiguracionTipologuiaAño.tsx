/* eslint-disable @typescript-eslint/naming-convention */

import { BotonesActionsFormulario } from "../components/BotonesActions.tsx/BotonesActionsFOrmulario"
import { AñoConfiguracionn } from "../components/ConfiguracionInicial/AñoConfiguracionn"
import { FormularioConfiguracionTipologuiaprovider}  from "../context/CreacionTipologuia"


export const ConfiguracionTipologuiaAño = () => {
  return (
    <>
    <FormularioConfiguracionTipologuiaprovider>
    <AñoConfiguracionn/>
    <BotonesActionsFormulario/>
    </FormularioConfiguracionTipologuiaprovider>
    </>

  )
} 


