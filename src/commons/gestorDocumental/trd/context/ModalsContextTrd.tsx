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
  modalAdministracionTipologiasDocumentales: false,
  openModalAdministracionTipologiasDocumentales: () => {},
  closeModalAdministracionTipologiasDocumentales: () => {},
  //* -------------------------------------> MODAL ADMINISTRACION TRD
  modalAdministracionTRD: false,
  openModalAdministracionTRD: () => {},
  closeModalAdministracionTRD: () => {},
  //* -------------------------------------> MODAL ESTABLECER TIPOLOGIAS DOCUMENTALES A TRD
  modalEstablecerTipologiaDocumentalATRD: false,
  openModalEstablecerTipologiaDocumentalATRD: () => {},
  closeModalEstablecerTipologiaDocumentalATRD: () => {},
  //* -----------------------------------> MODAL HISTORIAL DE CAMBIOS
  modalHistorialCambios: false,
  openModalHistorialCambios: () => {},
  closeModalHistorialCambios: () => {},

  // ! -------------------------------------> loading buttons
  // ? loading button create - update TRD
  createTRDLoadingButton: false,
  setCreateTRDLoadingButton: () => {},

  buttonAddNewTRDRelationActual: false,
  setButtonAddNewTRDRelationActual: () => {},

  buttonSpecialEditionActualTRD : false,
  setButtonSpecialEditionActualTRD : () => {}
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

  //* -------------------------------------> MODAL ADMINISTRACION TRD
  const openModalAdministracionTRD = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_ADMINISTRACION_TRD' });
  }, []);

  const closeModalAdministracionTRD = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_ADMINISTRACION_TRD' });
  }, []);

  //* -------------------------------------> MODAL ESTABLECER TIPOLOGIAS DOCUMENTALES A TRD
  const openModalEstablecerTipologiaDocumentalATRD = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_ESTABLECER_TIPOLOGIA_DOCUMENTAL_A_TRD' });
  }, []);

  const closeModalEstablecerTipologiaDocumentalATRD = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_ESTABLECER_TIPOLOGIA_DOCUMENTAL_A_TRD' });
  }, []);

  // * -----------------------------------> MODAL HISTORIAL DE CAMBIOS
  const openModalHistorialCambios = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_HISTORIAL_CAMBIOS' });
  }, []);

  const closeModalHistorialCambios = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_HISTORIAL_CAMBIOS' });
  }, []);

  //* -------------------------------------> loading button create TRD
  const setCreateTRDLoadingButton = useCallback((value: boolean) => {
    dispatch({ type: 'CREATE_TRD_LOADING_BUTTON', payload: value });
  }, []);

  const setButtonAddNewTRDRelationActual = useCallback((value: boolean) => {
    dispatch({ type: 'SET_BUTTON_ADD_NEW_TRD_RELATION_ACTUAL', payload: value });
  }, []);

  const setButtonSpecialEditionActualTRD = useCallback((value: boolean) => {
    dispatch({ type: 'SET_BUTTON_SPECIAL_EDITION_ACTUAL_TRD', payload: value });
  }
  , []);

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
        //* -------------------------------------> MODAL ADMINISTRACION TRD
        modalAdministracionTRD: state.modalAdministracionTRD,
        openModalAdministracionTRD,
        closeModalAdministracionTRD,
        //* -------------------------------------> MODAL ESTABLECER TIPOLOGIAS DOCUMENTALES A TRD
        modalEstablecerTipologiaDocumentalATRD:
          state.modalEstablecerTipologiaDocumentalATRD,
        openModalEstablecerTipologiaDocumentalATRD,
        closeModalEstablecerTipologiaDocumentalATRD,
        //* -----------------------------------> MODAL HISTORIAL DE CAMBIOS
        modalHistorialCambios: state.modalHistorialCambios,
        openModalHistorialCambios,
        closeModalHistorialCambios,

        //* -------------------------------------> loading button create TRD
        createTRDLoadingButton: state.createTRDLoadingButton,
        setCreateTRDLoadingButton,
        buttonAddNewTRDRelationActual: state.buttonAddNewTRDRelationActual,
        setButtonAddNewTRDRelationActual,
        buttonSpecialEditionActualTRD: state.buttonSpecialEditionActualTRD,
        setButtonSpecialEditionActualTRD,
      }}
    >
      {children}
    </ModalContextTRD.Provider>
  );
};

export { ModalContextTRD, ModalProviderTRD };
