/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Modal } from '../state/initialState';

export const reducer = (state: any, { payload, type }: any): any => {
  switch (type) {
    //* MODAL SEARCH TRD
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
    //* MODAL CCD USADOS
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
    //* MODAL CREACION FORMATO TIPO
    case Modal.OPEN_MODAL_CREACION_FORMATO_TIPO:
      return {
        ...state,
        modalCreacionFormatoTipo: payload || true
      };
    case Modal.CLOSE_MODAL_CREACION_FORMATO_TIPO:
      return {
        ...state,
        modalCreacionFormatoTipo: payload || false
      };
    //* MODAL BUSQUEDA TIPOLOGIAS DOCUMENTALES
    case Modal.OPEN_MODAL_BUSQUEDA_TIPOLOGIAS_DOCUMENTALES:
      return {
        ...state,
        modalBusquedaTipologiasDocumentales: payload || true
      };
    case Modal.CLOSE_MODAL_BUSQUEDA_TIPOLOGIAS_DOCUMENTALES:
      return {
        ...state,
        modalBusquedaTipologiasDocumentales: payload || false
      };
    // ? buttons, loading, etc
    case Modal.CREATE_TRD_LOADING_BUTTON:
      return {
        ...state,
        createTRDLoadingButton: payload || false
      };
    default:
      return state;
  }
};
