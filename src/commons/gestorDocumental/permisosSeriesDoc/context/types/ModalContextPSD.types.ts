export interface ModalContextPSDInterface {
  //* MODAL BUSQUEDA TCA
  modalSeleccionCCD_PSD: boolean;
  handleSeleccionCCD_PSD: (value: boolean) => void;

  //* LOAD BUTTONS
  loadingButtonPSD: boolean;
  setLoadingButtonPSD: (value: boolean) => void;

  loadingSeriesSubseries: boolean;
  setloadingSeriesSubseries: (value: boolean) => void;
}