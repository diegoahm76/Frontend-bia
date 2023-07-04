/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Modal } from '../state/initialState';

export const reducer = (state: any, { payload, type }: any): any => {
  switch (type) {
    case Modal.OPEN_MODAL_SEARCH_TRD:
      return {
        ...state,
        modalSearchTRD: payload || true
      };
    case Modal.CLOSE_MODAL_SEARCH_TRD:
      return {
        ...state,
        modalSearchTRD: payload || false
      };
    case Modal.OPEN_MODAL_CCD_USADOS:
      return {
        ...state,
        modalCCDUsados: payload || true
      };
    case Modal.CLOSE_MODAL_CCD_USADOS:
      return {
        ...state,
        modalCCDUsados: payload || false
      };
    default:
      return state;
  }
};
