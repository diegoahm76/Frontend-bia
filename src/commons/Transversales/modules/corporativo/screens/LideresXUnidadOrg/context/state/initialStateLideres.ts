/* eslint-disable @typescript-eslint/naming-convention */
export enum Modal {
  //* modal busqueda avanzada organigrama
  OPEN_MODAL_BUSQUEDA_AVANZADA_ORGANIGRAMA = 'OPEN_MODAL_BUSQUEDA_AVANZADA_ORGANIGRAMA',
  CLOSE_MODAL_BUSQUEDA_AVANZADA_ORGANIGRAMA = 'CLOSE_MODAL_BUSQUEDA_AVANZADA_ORGANIGRAMA',

  //* modal busqueda avanzada lideres
  OPEN_MODAL_BUSQUEDA_AVANZADA_LIDERES = 'OPEN_MODAL_BUSQUEDA_AVANZADA_LIDERES',
  CLOSE_MODAL_BUSQUEDA_AVANZADA_LIDERES = 'CLOSE_MODAL_BUSQUEDA_AVANZADA_LIDERES',

  //* LOAD BUTTONS
  SET_LOADING_BUTTON = 'SET_LOADING_BUTTON'
}

export const initialState = {
  //* modal busqueda avanzada organigrama
  modalBusquedaAvanzadaOrganigrama: false,

  //* modal busqeda avanzada de lideres
  modalBusquedaAvanzadaLideres: false,

  //* LOAD BUTTONS
  loadingButton: false
};
