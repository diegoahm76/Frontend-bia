/* eslint-disable @typescript-eslint/naming-convention */
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface FormValues {
  categoriaArchivo: string;
  asunto: string;
  tieneReplicaFisica: boolean;
  origenArchivo: string;
  tieneTipologiaRelacionada: boolean;
  tipologiaRelacionada: string;
  tipologiaRelacionadaotra: string;
  descripcion: string;
  CodCategoriaArchivo: string;
  keywords: string;
  nro_folios_documento: number;
}

// Define la variable form con los valores iniciales del formulario
const initialFormValues: FormValues = {
  categoriaArchivo: '',
  asunto: '',
  tieneReplicaFisica: false,
  origenArchivo: '',
  tieneTipologiaRelacionada: false,
  tipologiaRelacionada: '',
  tipologiaRelacionadaotra: '',
  descripcion: '',
  CodCategoriaArchivo: '',
  keywords: '',
  nro_folios_documento:0,
};

interface FormContextMetadatosType {
  form: FormValues;
  setForm: Dispatch<SetStateAction<FormValues>>;
}

export const FormContextMetadatos = createContext<FormContextMetadatosType>({
  form: initialFormValues,
  setForm: () => {},
});

interface FormProviderProps {
  children: ReactNode;
}

export const FormProviderMetadatos = ({ children }: FormProviderProps): JSX.Element => {
  const [form, setForm] = useState<FormValues>(initialFormValues);

  const value = {
    form,
    setForm,
  };

  return (
    <FormContextMetadatos.Provider value={value}>
      {children}
    </FormContextMetadatos.Provider>
  );
};
