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
  closeModalTcaTerminados: () => {}
});

const ModalProviderTCA: FC<any> = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);


  //* -------------------------------------------------------> MODAL BUSQUEDA TCA
  const openModalBusquedaTca = useCallback(() => {
    dispatch({ type: 'OPEN_MODAL_BUSQUEDA_TCA' });
  }
  , []);

  const closeModalBusquedaTca = useCallback(() => {
    dispatch({ type: 'CLOSE_MODAL_BUSQUEDA_TCA' });
  }
  , []);


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

      }}
    >
      {children}
    </ModalContextTCA.Provider>
  );
};

export { ModalContextTCA, ModalProviderTCA };
