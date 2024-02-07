/* eslint-disable @typescript-eslint/naming-convention */
// En el archivo donde defines el contexto (StepperContext.tsx o similar)
import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

interface StepperContextProps {
    activeStep: number;
    setActiveStep: Dispatch<SetStateAction<number>>; 
  }

export const StepperContext = createContext<StepperContextProps >({activeStep: 0,
    setActiveStep: () => { }});

 interface StepperProviderProps {
  children: ReactNode;
}

export const StepperProvider = ({ children }: StepperProviderProps): JSX.Element => {
    
  const [activeStep, setActiveStep] = useState<number>(0);

  const valuee = {
    activeStep,
    setActiveStep,
  };

  return (
    <StepperContext.Provider value={valuee}>
      {children}
    </StepperContext.Provider>
  );
};
