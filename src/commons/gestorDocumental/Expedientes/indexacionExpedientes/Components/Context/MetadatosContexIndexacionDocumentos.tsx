/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, createContext, type ReactNode, type SetStateAction } from "react";
import { FormInitialValues, form_initial } from "../../interfaces/InterfacesIndexacion";

// Define the type for the context state
interface FormValuesTypes {
    formValues: FormInitialValues;
    setFormValues: React.Dispatch<SetStateAction<FormInitialValues>>;
}



export const MetadatosContexIndexacionDocumentos = createContext<FormValuesTypes>({
    formValues: form_initial,
    setFormValues: () => { }
});

// Define the type for the provider props
interface MetadatosProviderProps {
    children: ReactNode;
}

// Create the provider component
export const MetadatosIndexacionProvider = ({ children }: MetadatosProviderProps): JSX.Element => {
    const [formValues, setFormValues] = useState<FormInitialValues>(form_initial);

    const value = {
        formValues,
        setFormValues
    };

    return (
        <MetadatosContexIndexacionDocumentos.Provider value={value}>
            {children}
        </MetadatosContexIndexacionDocumentos.Provider>
    );
};

