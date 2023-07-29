export interface ModalContextState {


  //* MODAL BUSQUEDA TCA
  modalBusquedaTca: boolean;
  openModalBusquedaTca: () => void;
  closeModalBusquedaTca: () => void;

  //* MODAL TRDS USADOS
  modalTrdsUsados: boolean;
  openModalTrdsUsados: () => void;
  closeModalTrdsUsados: () => void;

  //* TCAS TERMINADOS
  modalTcaTerminados: boolean;
  openModalTcaTerminados: () => void;
  closeModalTcaTerminados: () => void;

  //* MODAL ADMINISTRACION TCA
  modalAdministracionTca: boolean;
  openModalAdministracionTca: () => void;
  closeModalAdministracionTca: () => void;

  //* LOAD BUTTONS
  loadingButton: boolean;
  setLoadingButton: (value: boolean) => void;
}
