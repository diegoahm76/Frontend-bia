/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState, type FC, useCallback } from 'react';
import {
  type ContextProps,
  type ModalContextInterface
} from './types/context.types';

const ContextUnidadxEntidad = createContext<ModalContextInterface>({
  modalHistoricos: false,
  handleModalHistoricos: () => {},
  loadingConsultaT026: false,
  setloadingConsultaT026: (value: boolean) => {}
});

const ContextUnidadxEntidadProvider: FC<ContextProps> = ({
  children
}): JSX.Element => {
  //! --- modal historicos ---
  const [modalHistoricos, setmodalHistoricos] = useState(false);

  // ! carga inicial consulta de tabla de datos temporales
  const [loadingConsultaT026, setLoadingConsultaT026] = useState(false);

  const handleModalHistoricos = useCallback(() => {
    setmodalHistoricos((prevState) => !prevState);
  }, []);

  const setloadingConsultaT026 = useCallback((value: boolean) => {
    setLoadingConsultaT026(value);
  }, []);

  const modalContextValues = {
    //* --- modal historicos ---
    modalHistoricos,
    handleModalHistoricos,

    //* --- carga inicial consulta tabla de datos temporales
    loadingConsultaT026,
    setloadingConsultaT026
  };

  return (
    <ContextUnidadxEntidad.Provider value={modalContextValues}>
      {children}
    </ContextUnidadxEntidad.Provider>
  );
};

export { ContextUnidadxEntidad, ContextUnidadxEntidadProvider };
