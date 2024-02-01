/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { ReactNode, createContext, useState } from 'react';

export const ResContext =
  createContext<any>({
    radicado: '',
    setRadicado: () => {},
    value: 0,
    setValue: () => {},
    handleChange: () => {},
    expanded: false,
    setExpanded: () => {},
    anexos: [],
    setAnexos: () => {},
    archivoAnexos: null,
    setArchivoAnexos: () => {},
    metadatos: [],
    setMetadatos: () => {},
    skipped: new Set<number>(),
    setSkipped: () => {},
    activeStep: 0,
    setActiveStep: () => {},
  });

export const ResProvider = ({ children }: ReactNode | any) => {
  const [radicado, setRadicado] = useState('');
  //* value de los paneles
  const [value, setValue] = useState(0);
  //* expanded de los acordeones
  const [expanded, setExpanded] = useState<string | boolean>(false);

  //* almacenar informacion de los anexos
  const [anexos, setAnexos] = useState<any>([]);
  //* archivo anexos
  const [archivoAnexos, setArchivoAnexos] = useState<any>(null);
  //* almacenar informacion de los metadatos
  const [metadatos, setMetadatos] = useState<any>([]);

  //? funciones actualizadoras

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  // ! -- MANEJO DE DATA DE LA ENTREGA 99 -- ! //

  //* estados para el stepper de la entrega 99
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const valuesToUse = {
    // ? entrega 104
    radicado,
    setRadicado,
    value,
    setValue,
    handleChange,
    expanded,
    setExpanded,
    anexos,
    setAnexos,
    archivoAnexos,
    setArchivoAnexos,
    metadatos,
    setMetadatos,
    // ? entrega 99
    activeStep,
    setActiveStep,
    skipped,
    setSkipped,
  };

  return (
    <ResContext.Provider value={valuesToUse}>
      {children}
    </ResContext.Provider>
  );
};
