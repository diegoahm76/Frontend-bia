export interface ModalContextState {
  //*
  modalSearchTRD: boolean;
  openModalModalSearchTRD: () => void;
  closeModalModalSearchTRD: () => void;
  //*
  modalCCDUsados: boolean;
  openModalCCDUsados: () => void;
  closeModalCCDUsados: () => void;
  //*
  modalCreacionFormatoTipo: boolean;
  openModalCreacionFormatoTipo: () => void;
  closeModalCreacionFormatoTipo: () => void;
  //*
  modalBusquedaTipologiasDocumentales: boolean;
  openModalBusquedaTipologiasDocumentales: () => void;
  closeModalBusquedaTipologiasDocumentales: () => void;
  //*
  modalAdministracionTipologiasDocumentales: boolean;
  openModalAdministracionTipologiasDocumentales: () => void;
  closeModalAdministracionTipologiasDocumentales: () => void;
  //* modal administracion de TRD
  modalAdministracionTRD: boolean;
  openModalAdministracionTRD: () => void;
  closeModalAdministracionTRD: () => void;
  //* modal establecer tipologia documental a TRD
  modalEstablecerTipologiaDocumentalATRD: boolean;
  openModalEstablecerTipologiaDocumentalATRD: () => void;
  closeModalEstablecerTipologiaDocumentalATRD: () => void;
  //* historial de cambios
  modalHistorialCambios: boolean;
  openModalHistorialCambios: () => void;
  closeModalHistorialCambios: () => void;
  // ? booleans to admins buttons, loading, etc
  createTRDLoadingButton: boolean;
  setCreateTRDLoadingButton: (value: boolean) => void;

  buttonAddNewTRDRelationActual: boolean;
  setButtonAddNewTRDRelationActual: (value: boolean) => void;
}
