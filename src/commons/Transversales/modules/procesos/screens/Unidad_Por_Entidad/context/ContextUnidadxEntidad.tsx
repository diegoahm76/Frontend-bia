/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState } from 'react';
import { type ModalContextInterface } from './types/context.types';

const ContextUnidadxEntidad = createContext<ModalContextInterface>({
  modalHistoricos: false,
  handleModalHistoricos: () => {}
});

const ContextUnidadxEntidadProvider = ({ children }: any): JSX.Element => {
  const [modalHistoricos, setmodalHistoricos] = useState(false);

  const handleModalHistoricos = (): void => setmodalHistoricos(!modalHistoricos);

  const values = {
    modalHistoricos,
    handleModalHistoricos,
  };

  return (
    <ContextUnidadxEntidad.Provider value={values}>
      {children}
    </ContextUnidadxEntidad.Provider>
  );
};

export { ContextUnidadxEntidad, ContextUnidadxEntidadProvider };
