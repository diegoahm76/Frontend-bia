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
  obligaciones_from_liquidacion: any[];
  set_obligaciones_from_liquidacion: (value: any[]) => void;
  is_from_liquidacion: boolean;
  set_is_from_liquidacion: (value: boolean) => void;
  id_deudor: number | null;
  set_id_deudor: (value: number | null) => void;
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
  obligaciones_from_liquidacion: [],
  set_obligaciones_from_liquidacion: () => { },
  is_from_liquidacion: false,
  set_is_from_liquidacion: () => { },
  id_deudor: null,
  set_id_deudor: () => { },
});

interface EtapaProcesoProviderProps {
  children: ReactNode;
}

export const EtapaProcesoProvider: React.FC<EtapaProcesoProviderProps> = ({ children }) => {
  const [etapa_proceso, set_etapa_proceso] = useState<Etapa>(initial_Etapa_valores);
  const [obligaciones_from_liquidacion, set_obligaciones_from_liquidacion] = useState<any[]>([]);
  const [is_from_liquidacion, set_is_from_liquidacion] = useState<boolean>(false);
  const [id_deudor, set_id_deudor] = useState<number | null>(null);
  console.log("etapa_proceso", etapa_proceso);
  const valores_etapa: EtapaContext = { etapa_proceso, set_etapa_proceso, obligaciones_from_liquidacion, set_obligaciones_from_liquidacion, is_from_liquidacion, set_is_from_liquidacion, id_deudor, set_id_deudor};

  return (
    <EtapaProcesoConext.Provider value={valores_etapa}>
      {children}
    </EtapaProcesoConext.Provider>
  );
};
