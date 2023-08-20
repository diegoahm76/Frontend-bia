/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState, type FC, type ReactNode } from 'react';
import { type ModalContextInterface } from './types/context.types';

interface ContextProps {
  children: ReactNode;
}

const ContextUnidadxEntidad = createContext<ModalContextInterface>({
  modalHistoricos: false,
  handleModalHistoricos: () => {}
});

const ContextUnidadxEntidadProvider: FC<ContextProps> = ({
  children
}): JSX.Element => {
  const [modalHistoricos, setmodalHistoricos] = useState(false);

  const handleModalHistoricos = (): void =>
    setmodalHistoricos(!modalHistoricos);

  const modalContextValues = {
    modalHistoricos,
    handleModalHistoricos
  };

  return (
    <ContextUnidadxEntidad.Provider value={modalContextValues}>
      {children}
    </ContextUnidadxEntidad.Provider>
  );
};

export { ContextUnidadxEntidad, ContextUnidadxEntidadProvider };
