/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState, useCallback } from 'react';
import { type ModalContextState } from '../interfaces/ModalInterfaces/Modal.types';

const ModalContext = createContext<ModalContextState | any>({
  modalSeriesAndSubseries: false,
  openModalModalSeriesAndSubseries: () => {},
  closeModalModalSeriesAndSubseries: () => {},
  // modal3: false,
  busquedaCreacionCCDModal: false,
  openModalBusquedaCreacionCCD: () => {},
  closeModalBusquedaCreacionCCD: () => {},
  loadingButton: false,
  activateLoadingButton: () => {},
  desactivateLoadingButton: () => {}
  // openModal3: () => {},
  // closeModal3: () => {},
});

const ModalProvider: React.FC<any> = ({ children }: any) => {
  const [modalSeriesAndSubseries, setModalSeriesAndSubseries] = useState(false);
  const [busquedaCreacionCCDModal, setBusquedaCreacionCCDModal] =
    useState(false);
  const [loadingButton, setLoadingButton] = useState(false);

  const openModalModalSeriesAndSubseries = useCallback(
    () => setModalSeriesAndSubseries(true),
    []
  );
  const closeModalModalSeriesAndSubseries = useCallback(
    () => setModalSeriesAndSubseries(false),
    []
  );

  const openModalBusquedaCreacionCCD = useCallback(
    () => setBusquedaCreacionCCDModal(true),
    []
  );
  const closeModalBusquedaCreacionCCD = useCallback(
    () => setBusquedaCreacionCCDModal(false),
    []
  );
  const activateLoadingButton = useCallback(() => setLoadingButton(true), []);
  const desactivateLoadingButton = useCallback(
    () => setLoadingButton(false),
    []
  );

  // states loading button
  const [loadingButtonBusquedaCCD, setLoadingButtonBusquedaCCD] =
    useState(false);

  const activateLoadingButtonBusquedaCCD = useCallback(
    () => setLoadingButtonBusquedaCCD(true),
    []
  );
  const desactivateLoadingButtonBusquedaCCD = useCallback(
    () => setLoadingButtonBusquedaCCD(false),
    []
  );

  return (
    <ModalContext.Provider
      value={{
        modalSeriesAndSubseries,
        openModalModalSeriesAndSubseries,
        closeModalModalSeriesAndSubseries,
        busquedaCreacionCCDModal,
        loadingButton,
        openModalBusquedaCreacionCCD,
        closeModalBusquedaCreacionCCD,
        activateLoadingButton,
        desactivateLoadingButton,

        //* loading busqueda
        loadingButtonBusquedaCCD,
        activateLoadingButtonBusquedaCCD,
        desactivateLoadingButtonBusquedaCCD
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
