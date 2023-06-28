/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState, useCallback } from 'react';
import { type ModalContextState } from '../interfaces/ModalInterfaces/Modal.types';

const ModalContext = createContext<ModalContextState | any>({
  modalSeriesAndSubseries: false,
  openModalModalSeriesAndSubseries: () => {},
  closeModalModalSeriesAndSubseries: () => {},
  busquedaCreacionCCDModal: false,
  modal2: false,
  modal3: false,
  openModalBusquedaCreacionCCD: () => {},
  closeModalBusquedaCreacionCCD: () => {},
  openModal2: () => {},
  closeModal2: () => {},
  openModal3: () => {},
  closeModal3: () => {},
});

const ModalProvider: React.FC<any> = ({ children }: any) => {
  const [modalSeriesAndSubseries, setModalSeriesAndSubseries] = useState(false)

  // const [modalBusquedaCCD, setModalBusquedaCCD] = useState(false);

  const [busquedaCreacionCCDModal, setBusquedaCreacionCCDModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const openModalModalSeriesAndSubseries = useCallback(() => setModalSeriesAndSubseries(true), []);
  const closeModalModalSeriesAndSubseries = useCallback(() => setModalSeriesAndSubseries(false), []);

  const openModalBusquedaCreacionCCD = useCallback(() => setBusquedaCreacionCCDModal(true), []);
  const closeModalBusquedaCreacionCCD = useCallback(() => setBusquedaCreacionCCDModal(false), []);
  const openModal2 = useCallback(() => setModal2(true), []);
  const closeModal2 = useCallback(() => setModal2(false), []);
  const openModal3 = useCallback(() => setModal3(true), []);
  const closeModal3 = useCallback(() => setModal3(false), []);

  return (
    <ModalContext.Provider
      value={{
        modalSeriesAndSubseries,
        openModalModalSeriesAndSubseries,
        closeModalModalSeriesAndSubseries,
        busquedaCreacionCCDModal,
        modal2,
        modal3,
        openModalBusquedaCreacionCCD,
        closeModalBusquedaCreacionCCD,
        openModal2,
        closeModal2,
        openModal3,
        closeModal3,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
