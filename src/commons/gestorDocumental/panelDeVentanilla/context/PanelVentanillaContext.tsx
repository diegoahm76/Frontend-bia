/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { ReactNode, createContext, useState } from 'react';

interface PanelVentanillaContextProps {
  radicado: string;
  setRadicado: React.Dispatch<React.SetStateAction<string>>;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
  expanded: string | boolean;
  setExpanded: React.Dispatch<React.SetStateAction<string | boolean>>;
}

export const PanelVentanillaContext =
  createContext<PanelVentanillaContextProps>({
    radicado: '',
    setRadicado: () => {},
    value: 0,
    setValue: () => {},
    handleChange: () => {},
    expanded: false,
    setExpanded: () => {},
  });

export const PanelVentanillaProvider = ({ children }: ReactNode | any) => {
  const [radicado, setRadicado] = useState('');
  //* value de los paneles
  const [value, setValue] = useState(0);
  //* expanded de los acordeones
  const [expanded, setExpanded] = useState<string | boolean>(false);


  //* almacenar informacion de los anexos
  const [anexos, setAnexos] = useState<any>([]);
  //* almacenar informacion de los metadatos
  const [metadatos, setMetadatos] = useState<any>([]);

  //? funciones actualizadoras

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  const valuesToUse = {
    radicado,
    setRadicado,
    value,
    setValue,
    handleChange,
    expanded,
    setExpanded,
    anexos,
    setAnexos,
    metadatos,
    setMetadatos,
  };

  return (
    <PanelVentanillaContext.Provider value={valuesToUse}>
      {children}
    </PanelVentanillaContext.Provider>
  );
};
