/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Modal } from '../state/initialState';

export const reducer = (state: any, { payload, type }: any): any => {
  switch (type) {
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
    default:
      return state;
  }
};
