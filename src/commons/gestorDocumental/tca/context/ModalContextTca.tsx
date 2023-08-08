/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useReducer, useCallback, type FC } from 'react';
import { type ModalContextState } from './types/modal.types';
import { initialState } from './state/initialState';
import { reducer } from './reducer/reducerContext';

const ModalContextTCA = createContext<ModalContextState>({
  //* -------------------------------------------> MODAL BUSQUEDA TCA
  modalBusquedaTca: false,
  openModalBusquedaTca: () => {},
  closeModalBusquedaTca: () => {},

  //* -------------------------------------------> MODAL TRD TERMINADOS
  modalTrdsUsados: false,
  openModalTrdsUsados: () => {},
  closeModalTrdsUsados: () => {},

  //* -------------------------------------------> MODAL TCA TERMINADOS
  modalTcaTerminados: false,
  openModalTcaTerminados: () => {},
  closeModalTcaTerminados: () => {},

  // -------------------------------------------> MODAL ADMINISTRACION TCA
  modalAdministracionTca: false,
  openModalAdministracionTca: () => {},
  closeModalAdministracionTca: () => {},

  // -------------------------------------------> MODAL HISTORIAL DE CAMBIOS
  modalHistorialCambios: false,
  openModalHistorialCambios: () => {},
  closeModalHistorialCambios: () => {},


  //* MODAL TRD RELACION TCA ACTUAL
  modalTrdRelacionTcaActual: false,
  openModalTrdRelacionTcaActual: () => {},
  closeModalTrdRelacionTcaActual: () => {},


  // ? ----- | LOAD BUTTONS | -----
  loadingButton: false,
  setLoadingButton: () => {}
});

const ModalProviderTCA: FC<any> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //* -------------------------------------------------------> MODAL BUSQUEDA TCA
  const openModalBusquedaTca = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_BUSQUEDA_TCA' });
  }, []);

  const closeModalBusquedaTca = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_BUSQUEDA_TCA' });
  }, []);

  //* -------------------------------------------------------> MODAL TRDS USADOS
  const openModalTrdsUsados = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_TRDS_USADOS' });
  }, []);

  const closeModalTrdsUsados = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_TRDS_USADOS' });
  }, []);
  //* -------------------------------------------------------> MODAL TCA TERMINADOS
  const openModalTcaTerminados = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_TCA_TERMINADOS' });
  }, []);

  const closeModalTcaTerminados = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_TCA_TERMINADOS' });
  }, []);

  // * -------------------------------------------------------> MODAL ADMINISTRACION TCA
  const openModalAdministracionTca = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_ADMINISTRACION_TCA' });
  }, []);

  const closeModalAdministracionTca = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_ADMINISTRACION_TCA' });
  }, []);

  // * -------------------------------------------------------> MODAL HISTORIAL DE CAMBIOS
  const openModalHistorialCambios = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_HISTORIAL_CAMBIOS' });
  }, []);

  const closeModalHistorialCambios = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_HISTORIAL_CAMBIOS' });
  }, []);

  //* MODAL TRD RELACION TCA ACTUAL
  const openModalTrdRelacionTcaActual = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_TRD_RELACION_TCA_ACTUAL' });
  }
  , []);

  const closeModalTrdRelacionTcaActual = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_TRD_RELACION_TCA_ACTUAL' });
  }
  , []);


  // ? ----- | LOAD BUTTONS | -----
  const setLoadingButton = useCallback((value: boolean) => {
    dispatch({ type: 'SET_LOADING_BUTTON', payload: value });
  }, []);

  return (
    <ModalContextTCA.Provider
      value={{
        //* -------------------------------------------> MODAL BUSQUEDA TCA
        modalBusquedaTca: state.modalBusquedaTca,
        openModalBusquedaTca,
        closeModalBusquedaTca,

        //* -------------------------------------------> MODAL TRD USADOS
        modalTrdsUsados: state.modalTrdsUsados,
        openModalTrdsUsados,
        closeModalTrdsUsados,
        //* -------------------------------------------> MODAL TCA TERMINADOS
        modalTcaTerminados: state.modalTcaTerminados,
        openModalTcaTerminados,
        closeModalTcaTerminados,

        //* -------------------------------------------> MODAL ADMINISTRACION TCA
        modalAdministracionTca: state.modalAdministracionTca,
        openModalAdministracionTca,
        closeModalAdministracionTca,

        //* -------------------------------------------> MODAL HISTORIAL DE CAMBIOS
        modalHistorialCambios: state.modalHistorialCambios,
        openModalHistorialCambios,
        closeModalHistorialCambios,


        //* MODAL TRD RELACION TCA ACTUAL
        modalTrdRelacionTcaActual: state.modalTrdRelacionTcaActual,
        openModalTrdRelacionTcaActual,
        closeModalTrdRelacionTcaActual,
        


        // ? ----- | LOAD BUTTONS | -----
        loadingButton: state.loadingButton,
        setLoadingButton
      }}
    >
      {children}
    </ModalContextTCA.Provider>
  );
};

export { ModalContextTCA, ModalProviderTCA };
