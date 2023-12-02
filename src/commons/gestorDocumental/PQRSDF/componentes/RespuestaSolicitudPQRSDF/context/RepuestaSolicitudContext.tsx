/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { ReactNode, createContext, useState } from 'react';

export const RespuestaSolicitudContext =
  createContext<any>({
    radicado: '',
    setRadicado: () => {},
    value: 0,
    setValue: () => {},
    handleChange: () => {},
    skipped: new Set<number>(),
    setSkipped: () => {},
    activeStep: 0,
    setActiveStep: () => {},
  });

export const RespuestaSolicitudProvider: any = ({ children }: ReactNode | any) => {
  const [radicado, setRadicado] = useState('');
  //* value de los paneles
  const [value, setValue] = useState(0);
  //* expanded de los acordeones
  const [expanded, setExpanded] = useState<string | boolean>(false);

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
    // ? entrega 104
    activeStep,
    setActiveStep,
    skipped,
    setSkipped,
  };

  return (
    <RespuestaSolicitudContext.Provider value={valuesToUse}>
      {children}
    </RespuestaSolicitudContext.Provider>
  );
};
