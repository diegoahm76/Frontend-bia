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

  //* MODAL HISTORIAL DE CAMBIOS
  modalHistorialCambios: boolean;
  openModalHistorialCambios: () => void;
  closeModalHistorialCambios: () => void;


  //* MODAL TRD RELACION TCA ACTUAL
  modalTrdRelacionTcaActual: boolean;
  openModalTrdRelacionTcaActual: () => void;
  closeModalTrdRelacionTcaActual: () => void;


  //* LOAD BUTTONS
  loadingButton: boolean;
  setLoadingButton: (value: boolean) => void;
}
