/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

interface Etapa {
  data_complement: any[];
  telefono: string;
  nombres: string;
  email: string;
  mostrar_modal: boolean;
  disable: boolean;
  apellidos: string;
  identificacion: string;
  tipo_cambio: string;
  nuevo_proceso:string 
}

interface EtapaContext {
  etapa_proceso: Etapa;
  set_etapa_proceso: Dispatch<SetStateAction<Etapa>>;
}

export const initial_Etapa_valores: Etapa = {
  data_complement: [],
  telefono: "",
  nombres: "",
  email: "",
  mostrar_modal: false,
  disable: true,
  apellidos: "",
  identificacion: "",
  tipo_cambio: "",
  nuevo_proceso:""
};

export const EtapaProcesoConext = createContext<EtapaContext>({
  etapa_proceso: initial_Etapa_valores,
  set_etapa_proceso: () => { },
});

interface EtapaProcesoProviderProps {
  children: ReactNode;
}

export const EtapaProcesoProvider: React.FC<EtapaProcesoProviderProps> = ({ children }) => {
  const [etapa_proceso, set_etapa_proceso] = useState<Etapa>(initial_Etapa_valores);
  console.log("etapa_proceso", etapa_proceso);
  const valores_etapa: EtapaContext = { etapa_proceso, set_etapa_proceso };

  return (
    <EtapaProcesoConext.Provider value={valores_etapa}>
      {children}
    </EtapaProcesoConext.Provider>
  );
};
