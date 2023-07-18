/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useReducer, useCallback, type FC } from 'react';
import { type ModalContextState } from './types/modal.types';
import { initialState } from './state/initialState';
import { reducer } from './reducer/reducerContext';

const ModalContextTRD = createContext<ModalContextState>({
  //*
  modalSearchTRD: false,
  openModalModalSearchTRD: () => {},
  closeModalModalSearchTRD: () => {},
  //*
  modalCCDUsados: false,
  openModalCCDUsados: () => {},
  closeModalCCDUsados: () => {},
  //*
  modalCreacionFormatoTipo: false,
  openModalCreacionFormatoTipo: () => {},
  closeModalCreacionFormatoTipo: () => {},
  //*
  modalBusquedaTipologiasDocumentales: false,
  openModalBusquedaTipologiasDocumentales: () => {},
  closeModalBusquedaTipologiasDocumentales: () => {},
  //*
  createTRDLoadingButton: false,
  setCreateTRDLoadingButton: () => {},
  //*
  modalAdministracionTipologiasDocumentales: false,
  openModalAdministracionTipologiasDocumentales: () => {},
  closeModalAdministracionTipologiasDocumentales: () => {}
});

const ModalProviderTRD: FC<any> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //* -------------------------------------------------------> MODAL SEARCH TRD
  const openModalModalSearchTRD = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_SEARCH_TRD' });
  }, []);

  const closeModalModalSearchTRD = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_SEARCH_TRD' });
  }, []);

  //* -------------------------------------------------------> MODAL CCD USADOS
  const openModalCCDUsados = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_CCD_USADOS' });
  }, []);

  const closeModalCCDUsados = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_CCD_USADOS' });
  }, []);

  //* -------------------------------------------------------> MODAL CREACION FORMATO TIPO
  const openModalCreacionFormatoTipo = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_CREACION_FORMATO_TIPO' });
  }, []);

  const closeModalCreacionFormatoTipo = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_CREACION_FORMATO_TIPO' });
  }, []);
  //* ----------------------------------------> MODAL BUSQUEDA TIPOLOGIAS DOCUMENTALES
  const openModalBusquedaTipologiasDocumentales = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_BUSQUEDA_TIPOLOGIAS_DOCUMENTALES' });
  }, []);

  const closeModalBusquedaTipologiasDocumentales = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_BUSQUEDA_TIPOLOGIAS_DOCUMENTALES' });
  }, []);

  //* -------------------------------------> MODAL ADMINISTRACION TIPOLOGIAS DOCUMENTALES
  const openModalAdministracionTipologiasDocumentales = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_ADMINISTRACION_TIPOLOGIAS_DOCUMENTALES' });
  }, []);

  const closeModalAdministracionTipologiasDocumentales = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_ADMINISTRACION_TIPOLOGIAS_DOCUMENTALES' });
  }, []);

  //* -------------------------------------> loading button create TRD
  const setCreateTRDLoadingButton = useCallback((value: boolean) => {
    dispatch({ type: 'SET_CREATE_TRD_LOADING_BUTTON', payload: value });
  }, []);

  return (
    <ModalContextTRD.Provider
      value={{
        //* -------------------------------------------> MODAL SEARCH TRD
        modalSearchTRD: state.modalSearchTRD,
        openModalModalSearchTRD,
        closeModalModalSearchTRD,
        //* -------------------------------------------------------> MODAL CCD USADOS
        modalCCDUsados: state.modalCCDUsados,
        openModalCCDUsados,
        closeModalCCDUsados,
        //* -------------------------------------------------------> MODAL CREACION FORMATO TIPO
        modalCreacionFormatoTipo: state.modalCreacionFormatoTipo,
        openModalCreacionFormatoTipo,
        closeModalCreacionFormatoTipo,
        //* ----------------------------------------> MODAL BUSQUEDA TIPOLOGIAS DOCUMENTALES
        modalBusquedaTipologiasDocumentales:
          state.modalBusquedaTipologiasDocumentales,
        openModalBusquedaTipologiasDocumentales,
        closeModalBusquedaTipologiasDocumentales,
        //* -------------------------------------> MODAL ADMINISTRACION TIPOLOGIAS DOCUMENTALES
        modalAdministracionTipologiasDocumentales:
          state.modalAdministracionTipologiasDocumentales,
        openModalAdministracionTipologiasDocumentales,
        closeModalAdministracionTipologiasDocumentales,

        //* -------------------------------------> loading button create TRD
        createTRDLoadingButton: state.createTRDLoadingButton,
        setCreateTRDLoadingButton
      }}
    >
      {children}
    </ModalContextTRD.Provider>
  );
};

export { ModalContextTRD, ModalProviderTRD };
