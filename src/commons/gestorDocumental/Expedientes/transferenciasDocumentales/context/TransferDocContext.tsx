/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { ReactNode, createContext, useState } from 'react';

export const TransferDocContext =
  createContext<any>({
    skipped: new Set<number>(),
    setSkipped: () => {},
    activeStep: 0,
    setActiveStep: () => {},
  });

export const TransferDocProvider = ({ children }: ReactNode | any) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const valuesToUse = {
    activeStep,
    setActiveStep,
    skipped,
    setSkipped,
  };

  return (
    <TransferDocContext.Provider value={valuesToUse}>
      {children}
    </TransferDocContext.Provider>
  );
};
