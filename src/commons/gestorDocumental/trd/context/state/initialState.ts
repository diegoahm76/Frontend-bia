/* eslint-disable @typescript-eslint/naming-convention */


export enum Modal {
  OPEN_MODAL_SEARCH_TRD = 'OPEN_MODAL_SEARCH_TRD',
  CLOSE_MODAL_SEARCH_TRD = 'CLOSE_MODAL_SEARCH_TRD',
  //*
  OPEN_MODAL_CCD_USADOS = 'OPEN_MODAL_CCD_USADOS',
  CLOSE_MODAL_CCD_USADOS = 'CLOSE_MODAL_CCD_USADOS',
  //*
  OPEN_MODAL_CREACION_FORMATO_TIPO = 'OPEN_MODAL_CREACION_FORMATO_TIPO',
  CLOSE_MODAL_CREACION_FORMATO_TIPO = 'CLOSE_MODAL_CREACION_FORMATO_TIPO',
  //*
  OPEN_MODAL_BUSQUEDA_TIPOLOGIAS_DOCUMENTALES = 'OPEN_MODAL_BUSQUEDA_TIPOLOGIAS_DOCUMENTALES',
  CLOSE_MODAL_BUSQUEDA_TIPOLOGIAS_DOCUMENTALES = 'CLOSE_MODAL_BUSQUEDA_TIPOLOGIAS_DOCUMENTALES',
  // ? buttons, loading, etc
  CREATE_TRD_LOADING_BUTTON = 'CREATE_TRD_LOADING_BUTTON',
  // busquedaCreacionCCDModal = 'busquedaCreacionCCDModal',
  // loadingButton = 'loadingButton',
}

export const initialState = {
  modalSearchTRD: false,
  modalCCDUsados: false,
  modalCreacionFormatoTipo: false,
  modalBusquedaTipologiasDocumentales: false,
  // ? buttons, loading, etc
  createTRDLoadingButton: false,
};