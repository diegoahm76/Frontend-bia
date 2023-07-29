/* eslint-disable @typescript-eslint/naming-convention */
export enum Modal {

 // ? modal busqueda tca
  OPEN_MODAL_BUSQUEDA_TCA = 'OPEN_MODAL_BUSQUEDA_TCA',
  CLOSE_MODAL_BUSQUEDA_TCA = 'CLOSE_MODAL_BUSQUEDA_TCA',

  // ? modal trds usados
  OPEN_MODAL_TRDS_USADOS = 'OPEN_MODAL_TRDS_USADOS',
  CLOSE_MODAL_TRDS_USADOS = 'CLOSE_MODAL_TRDS_USADOS',

  // ? modal tca terminados
  OPEN_MODAL_TCA_TERMINADOS = 'OPEN_MODAL_TCA_TERMINADOS',
  CLOSE_MODAL_TCA_TERMINADOS = 'CLOSE_MODAL_TCA_TERMINADOS',

  // ? MODAL ADMINISTRACION TCA
  OPEN_MODAL_ADMINISTRACION_TCA = 'OPEN_MODAL_ADMINISTRACION_TCA',
  CLOSE_MODAL_ADMINISTRACION_TCA = 'CLOSE_MODAL_ADMINISTRACION_TCA',



  //* LOAD BUTTONS
  SET_LOADING_BUTTON = 'SET_LOADING_BUTTON',
}

export const initialState = {

  // ? modal busqueda tca
  modalBusquedaTca: false,

  // ? modal trds usados
  modalTrdsUsados: false,

  // ? modal tca terminados
  modalTcaTerminados: false,

  // ? MODAL ADMINISTRACION TCA
  modalAdministracionTca: false,



  //* LOAD BUTTONS
  loadingButton: false,

};
