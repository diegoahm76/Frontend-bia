export interface ModalContextState {
  //* -------------------------------------------> MODAL BUSQUEDA AVANZADA ORGANIGRAMA
  modalBusquedaAvanzadaOrganigrama: false;
  openModalBusquedaAvanzadaOrganigrama: () => void;
  closeModalBusquedaAvanzadaOrganigrama: () => void;

  //* -------------------------------------------> MODAL BUSQUEDA AVANZADA LIDERES
  modalBusquedaAvanzadaLideres: false;
  openModalBusquedaAvanzadaLideres: () => void;
  closeModalBusquedaAvanzadaLideres: () => void;

  //* LOAD BUTTONS
  loadingButton: boolean;
  setLoadingButton: (value: boolean) => void;
}
