/* eslint-disable @typescript-eslint/naming-convention */


export enum Modal {
  OPEN_MODAL_SEARCH_TRD = 'OPEN_MODAL_SEARCH_TRD',
  CLOSE_MODAL_SEARCH_TRD = 'CLOSE_MODAL_SEARCH_TRD',
  OPEN_MODAL_CCD_USADOS = 'OPEN_MODAL_CCD_USADOS',
  CLOSE_MODAL_CCD_USADOS = 'CLOSE_MODAL_CCD_USADOS',
  // busquedaCreacionCCDModal = 'busquedaCreacionCCDModal',
  // loadingButton = 'loadingButton',
}

export const initialState = {
  modalSearchTRD: false,
  modalCCDUsados: false,
  // busquedaCreacionCCDModal: false,
  // loadingButton: false,
};