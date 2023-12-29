/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';

interface CreacionFormulario {
  id_PQRSDF: number;
  
}
const valoresIniciales: CreacionFormulario = {
  id_PQRSDF: 0,
 
};
export const CrearFormularioContext = createContext<any>({

  CreacionFormulario: {},
  setCreacionFormulario: () => {},
});

export const CrearFormularioProvider = ({ children }: any): JSX.Element => {




    const [CreacionFormulario, setCreacionFormulario] = useState<CreacionFormulario>(valoresIniciales);

console.log('creacion de formulario', CreacionFormulario)


  const value = {
    CreacionFormulario,
    setCreacionFormulario
  };

  return (
    <CrearFormularioContext.Provider value={value}>
      {children}
    </CrearFormularioContext.Provider>
  );
};
