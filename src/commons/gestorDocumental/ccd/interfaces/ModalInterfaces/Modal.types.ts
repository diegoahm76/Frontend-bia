export interface ModalContextState {
  modalSeriesAndSubseries: boolean;
  modal1: boolean;
  modal2: boolean;
  modal3: boolean;
  openModalModalSeriesAndSubseries: () => void;
  closeModalModalSeriesAndSubseries: () => void;
  openModal1: () => void;
  closeModal1: () => void;
  openModal2: () => void;
  closeModal2: () => void;
  openModal3: () => void;
  closeModal3: () => void;
}
