export interface ModalContextState {
  //* -------------------------------------------> MODAL BUSQUEDA AVANZADA ORGANIGRAMA
  modalBusquedaAvanzadaOrganigrama: false;
  openModalBusquedaAvanzadaOrganigrama: () => void;
  closeModalBusquedaAvanzadaOrganigrama: () => void;

  //* LOAD BUTTONS
  loadingButton: boolean;
  setLoadingButton: (value: boolean) => void;
}
