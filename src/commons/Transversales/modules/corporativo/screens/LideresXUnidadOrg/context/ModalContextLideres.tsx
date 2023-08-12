/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useReducer, useCallback, type FC } from 'react';

import type { ModalContextState } from './types/ModalContextLideres.types';
import { reducer } from './reducer/reducerContextLideres';
import { initialState } from './state/initialStateLideres';

const ModalContextLideres = createContext<ModalContextState>({
  //* -------------------------------------------> MODAL BUSQUEDA AVANZADA ORGANIGRAMA
  modalBusquedaAvanzadaOrganigrama: false,
  openModalBusquedaAvanzadaOrganigrama: () => {},
  closeModalBusquedaAvanzadaOrganigrama: () => {},

  // * -------------------------------------------> MODAL BUSQUEDA AVANZADA LIDERES
  modalBusquedaAvanzadaLideres: false,
  openModalBusquedaAvanzadaLideres: () => {},
  closeModalBusquedaAvanzadaLideres: () => {},

  //* -------------------------------------------> MODAL BUSQUEDA PERSONA
  modalBusquedaPersona: false,
  openModalBusquedaPersona: () => {},
  closeModalBusquedaPersona: () => {},

  // ? ----- | LOAD BUTTONS | -----
  loadingButton: false,
  setLoadingButton: () => {}
});

const ModalProviderLideres: FC<any> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //* -------------------------------------------> MODAL BUSQUEDA AVANZADA ORGANIGRAMA
  const openModalBusquedaAvanzadaOrganigrama = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_BUSQUEDA_AVANZADA_ORGANIGRAMA' });
  }, []);

  const closeModalBusquedaAvanzadaOrganigrama = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_BUSQUEDA_AVANZADA_ORGANIGRAMA' });
  }, []);

  // * -------------------------------------------> MODAL BUSQUEDA AVANZADA LIDERES
  const openModalBusquedaAvanzadaLideres = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_BUSQUEDA_AVANZADA_LIDERES' });
  }, []);

  const closeModalBusquedaAvanzadaLideres = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_BUSQUEDA_AVANZADA_LIDERES' });
  }, []);

  //* -------------------------------------------> MODAL BUSQUEDA PERSONA
  const openModalBusquedaPersona = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_BUSQUEDA_PERSONA' });
  }, []);

  const closeModalBusquedaPersona = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_BUSQUEDA_PERSONA' });
  }, []);

  // ? ----- | LOAD BUTTONS | -----
  const setLoadingButton = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING_BUTTON', payload: loading });
  }, []);

  return (
    <ModalContextLideres.Provider
      value={{
        //* -------------------------------------------> MODAL BUSQUEDA AVANZADA ORGANIGRAMA
        modalBusquedaAvanzadaOrganigrama:
          state.modalBusquedaAvanzadaOrganigrama,
        openModalBusquedaAvanzadaOrganigrama,
        closeModalBusquedaAvanzadaOrganigrama,

        // * -------------------------------------------> MODAL BUSQUEDA AVANZADA LIDERES
        modalBusquedaAvanzadaLideres: state.modalBusquedaAvanzadaLideres,
        openModalBusquedaAvanzadaLideres,
        closeModalBusquedaAvanzadaLideres,

        //* -------------------------------------------> MODAL BUSQUEDA PERSONA
        modalBusquedaPersona: state.modalBusquedaPersona,
        openModalBusquedaPersona,
        closeModalBusquedaPersona,

        // ? ----- | LOAD BUTTONS | -----
        loadingButton: state.loadingButton,
        setLoadingButton
      }}
    >
      {children}
    </ModalContextLideres.Provider>
  );
};

export { ModalContextLideres, ModalProviderLideres };
