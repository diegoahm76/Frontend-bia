/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Modal } from '../state/initialStateLideres';

export const reducer = (state: any, { payload, type }: any): any => {
  switch (type) {
    //* modal busqueda avanzada organigrama

    case Modal.OPEN_MODAL_BUSQUEDA_AVANZADA_ORGANIGRAMA:
      return {
        ...state,
        modalBusquedaAvanzadaOrganigrama: payload || true
      };

    case Modal.CLOSE_MODAL_BUSQUEDA_AVANZADA_ORGANIGRAMA:
      return {
        ...state,
        modalBusquedaAvanzadaOrganigrama: payload || false
      };

    //* modal busqueda avanzada lideres
    case Modal.OPEN_MODAL_BUSQUEDA_AVANZADA_LIDERES:
      return {
        ...state,
        modalBusquedaAvanzadaLideres: payload || true
      };

    case Modal.CLOSE_MODAL_BUSQUEDA_AVANZADA_LIDERES:
      return {
        ...state,
        modalBusquedaAvanzadaLideres: payload || false
      };

    //* modal busqueda persona
    case Modal.OPEN_MODAL_BUSQUEDA_PERSONA:
      return {
        ...state,
        modalBusquedaPersona: payload || true
      };

    case Modal.CLOSE_MODAL_BUSQUEDA_PERSONA:
      return {
        ...state,
        modalBusquedaPersona: payload || false
      };

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
