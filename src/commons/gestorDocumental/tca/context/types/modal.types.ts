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
  //*
}
