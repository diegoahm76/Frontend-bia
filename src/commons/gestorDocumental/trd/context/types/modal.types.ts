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

  // ? booleans to admins buttons, loading, etc
  createTRDLoadingButton: boolean;
  setCreateTRDLoadingButton: (value: boolean) => void;
}
