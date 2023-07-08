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
  closeModalCreacionFormatoTipo: () => {}
});

const ModalProviderTRD: FC<any> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //*
  const openModalModalSearchTRD = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_SEARCH_TRD' });
  }, []);

  const closeModalModalSearchTRD = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_SEARCH_TRD' });
  }, []);

  //*
  const openModalCCDUsados = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_CCD_USADOS' });
  }, []);

  const closeModalCCDUsados = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_CCD_USADOS' });
  }, []);

  //*
  const openModalCreacionFormatoTipo = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_CREACION_FORMATO_TIPO' });
  }, []);

  const closeModalCreacionFormatoTipo = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_CREACION_FORMATO_TIPO' });
  }, []);

  return (
    <ModalContextTRD.Provider
      value={{
        //*
        modalSearchTRD: state.modalSearchTRD,
        openModalModalSearchTRD,
        closeModalModalSearchTRD,
        //*
        modalCCDUsados: state.modalCCDUsados,
        openModalCCDUsados,
        closeModalCCDUsados,
        //*
        modalCreacionFormatoTipo: state.modalCreacionFormatoTipo,
        openModalCreacionFormatoTipo,
        closeModalCreacionFormatoTipo
      }}
    >
      {children}
    </ModalContextTRD.Provider>
  );
};

export { ModalContextTRD, ModalProviderTRD };
