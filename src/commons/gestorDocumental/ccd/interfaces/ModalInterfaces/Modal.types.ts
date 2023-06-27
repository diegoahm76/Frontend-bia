export interface ModalContextState {
  modalSeriesAndSubseries: boolean;
  busquedaCreacionCCDModal: boolean;
  // modal2: boolean;
  // modal3: boolean;
  openModalModalSeriesAndSubseries: () => void;
  closeModalModalSeriesAndSubseries: () => void;
  openModalBusquedaCreacionCCD: () => void;
  closeModalBusquedaCreacionCCD: () => void;
  // openModal2: () => void;
  // closeModal2: () => void;
  // openModal3: () => void;
  // closeModal3: () => void;
}
