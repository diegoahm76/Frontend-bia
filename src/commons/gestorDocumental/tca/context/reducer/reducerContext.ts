/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Modal } from '../state/initialState';

export const reducer = (state: any, { payload, type }: any): any => {
  switch (type) {
    //* MODAL BUSQUEDA TCA
    case Modal.OPEN_MODAL_BUSQUEDA_TCA:
      return {
        ...state,
        modalBusquedaTca: payload || true
      };
    case Modal.CLOSE_MODAL_BUSQUEDA_TCA:
      return {
        ...state,
        modalBusquedaTca: payload || false
      };
    //* MODAL TRDS USADOS
    case Modal.OPEN_MODAL_TRDS_USADOS:
      return {
        ...state,
        modalTrdsUsados: payload || true
      };
    case Modal.CLOSE_MODAL_TRDS_USADOS:
      return {
        ...state,
        modalTrdsUsados: payload || false
      };

    //* MODAL TCA TERMINADOS
    case Modal.OPEN_MODAL_TCA_TERMINADOS:
      return {
        ...state,
        modalTcaTerminados: payload || true
      };
    case Modal.CLOSE_MODAL_TCA_TERMINADOS:
      return {
        ...state,
        modalTcaTerminados: payload || false
      };

    // ? ----------------- |LOAD BUTTONS| -----------------
    //* LOAD BUTTONS
    case Modal.SET_LOADING_BUTTON:
      return {
        ...state,
        loadingButton: payload || false
      };

    default:
      return state;
  }
};
