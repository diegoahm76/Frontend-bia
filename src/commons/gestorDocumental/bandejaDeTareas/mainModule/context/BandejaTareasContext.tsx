/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { ReactNode, createContext, useState } from 'react';

export const BandejaTareasContext =
  createContext<any>({
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

export const BandejaTareasProvider = ({ children }: ReactNode | any) => {
  //* almacenar informacion de los anexos
  const [anexos, setAnexos] = useState<any>([]);
  //* archivo anexos
  const [archivoAnexos, setArchivoAnexos] = useState<any>(null);
  //* almacenar informacion de los metadatos
  const [metadatos, setMetadatos] = useState<any>([]);
  // ! -- MANEJO DE DATA DE LA ENTREGA 99 -- ! //

  //* estados para el stepper de la entrega 99
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const valuesToUse = {
    anexos,
    setAnexos,
    archivoAnexos,
    setArchivoAnexos,
    metadatos,
    setMetadatos,
    activeStep,
    setActiveStep,
    skipped,
    setSkipped,
  };

  return (
    <BandejaTareasContext.Provider value={valuesToUse}>
      {children}
    </BandejaTareasContext.Provider>
  );
};
