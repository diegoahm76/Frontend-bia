/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface PorcentajeData {
  porcentaje: { fecha_radicado_desde: string; fecha_radicado_hasta: string };
  setPorcentaje: Dispatch<SetStateAction<{ fecha_radicado_desde: string; fecha_radicado_hasta: string }>>;
}

export const PorcentajeContext = createContext<PorcentajeData>({
  porcentaje: { fecha_radicado_desde: "", fecha_radicado_hasta: "" },
  setPorcentaje: () => { },
});

interface PorcentajeProviderProps {
  children: ReactNode;
}

export const PorcentajeProvider: React.FC<PorcentajeProviderProps> = ({ children }) => {
  const initialPorcentajeData = { fecha_radicado_desde: "", fecha_radicado_hasta: "" };

  const [porcentaje, setPorcentaje] = useState<{ fecha_radicado_desde: string; fecha_radicado_hasta: string }>(initialPorcentajeData);
console.log("porcentaje",porcentaje)
  const value: PorcentajeData = {
    porcentaje,
    setPorcentaje,
  };

  return (
    <PorcentajeContext.Provider value={value}>
      {children}
    </PorcentajeContext.Provider>
  );
};
