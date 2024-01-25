/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface PorcentajeData {
  porcentaje: number;
  setPorcentaje: Dispatch<SetStateAction<number>>;
}

export const PorcentajeContext = createContext<PorcentajeData>({
  porcentaje: 0,
  setPorcentaje: () => {},
});

interface PorcentajeProviderProps {
  children: ReactNode;
}


export const PorcentajeProvider: React.FC<PorcentajeProviderProps> = ({ children }) => {
  const [porcentaje, setPorcentaje] = useState<number>(0);

  const value: PorcentajeData = {
    porcentaje,
    setPorcentaje,
  };

  return <PorcentajeContext.Provider value={value}>{children}</PorcentajeContext.Provider>;
};
