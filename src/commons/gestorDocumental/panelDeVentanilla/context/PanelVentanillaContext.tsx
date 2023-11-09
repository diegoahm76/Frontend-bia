/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { ReactNode, createContext, useState } from 'react';

interface PanelVentanillaContextProps {
  radicado: string;
  setRadicado: React.Dispatch<React.SetStateAction<string>>;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
}

export const PanelVentanillaContext =
  createContext<PanelVentanillaContextProps>({
    radicado: '',
    setRadicado: () => {},
    value: 0,
    setValue: () => {},
    handleChange: () => {},
  });

export const PanelVentanillaProvider = ({ children }: ReactNode | any) => {
  const [radicado, setRadicado] = useState('');
  //* value de los paneles
  const [value, setValue] = useState(0);

  //? funciones actualizadoras

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <PanelVentanillaContext.Provider
      value={{ radicado, setRadicado, value, setValue, handleChange }}
    >
      {children}
    </PanelVentanillaContext.Provider>
  );
};
