export interface ModalContextState {
  modalSeriesAndSubseries: boolean;
  busquedaCreacionCCDModal: boolean;
  loadingButton: boolean;
  // modal3: boolean;
  openModalModalSeriesAndSubseries: () => void;
  closeModalModalSeriesAndSubseries: () => void;
  openModalBusquedaCreacionCCD: () => void;
  closeModalBusquedaCreacionCCD: () => void;
  activateLoadingButton: () => void;
  desactivateLoadingButton: () => void;
  // openModal3: () => void;
  // closeModal3: () => void;
}
