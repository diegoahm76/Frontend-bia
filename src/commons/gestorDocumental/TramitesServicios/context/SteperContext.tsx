/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

interface StepperContextProps {
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  id: number ;
  set_id: Dispatch<SetStateAction<number >>;
  set_nombre_proyecto: Dispatch<SetStateAction<string>>;
  nombre_proyecto: string;
  activeDocuments: { name: string, observation: string, aprobado: boolean }[];
  setActiveDocuments: Dispatch<SetStateAction<{ name: string, observation: string, aprobado: boolean }[]>>;
}

export const StepperContext = createContext<StepperContextProps>({ 
  activeStep: 0,
  setActiveStep: () => {},
  id: 0,
  set_id: () => {},
  set_nombre_proyecto: () => {},
  nombre_proyecto: "",
  activeDocuments:[],
  setActiveDocuments:() => {},

});

interface StepperProviderProps {
  children: ReactNode;
}

export const StepperProvider = ({ children }: StepperProviderProps): JSX.Element => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [id, set_id] = useState<number>(0);
  const [nombre_proyecto, set_nombre_proyecto] = useState<string>("");
  const [activeDocuments, setActiveDocuments] = useState<{ name: string, observation: string, aprobado: boolean }[]>([]);


  const value = {
    activeDocuments,
    setActiveDocuments,
    set_nombre_proyecto,
    nombre_proyecto,
    set_id,
    id,
    setActiveStep,
    activeStep,
  };

  return (
    <StepperContext.Provider value={value}>
      {children}
    </StepperContext.Provider>
  );
};
