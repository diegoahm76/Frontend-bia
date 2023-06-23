/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState, useCallback } from 'react';
import { type ModalContextState } from '../interfaces/ModalInterfaces/Modal.types';

const ModalContext = createContext<ModalContextState | any>({
  modalSeriesAndSubseries: false,
  openModalModalSeriesAndSubseries: () => {},
  closeModalModalSeriesAndSubseries: () => {},
  modal1: false,
  modal2: false,
  modal3: false,
  openModal1: () => {},
  closeModal1: () => {},
  openModal2: () => {},
  closeModal2: () => {},
  openModal3: () => {},
  closeModal3: () => {},
});

const ModalProvider: React.FC<any> = ({ children }: any) => {
  const [modalSeriesAndSubseries, setModalSeriesAndSubseries] = useState(false)

  // const [modalBusquedaCCD, setModalBusquedaCCD] = useState(false);

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);

  const openModalModalSeriesAndSubseries = useCallback(() => setModalSeriesAndSubseries(true), []);
  const closeModalModalSeriesAndSubseries = useCallback(() => setModalSeriesAndSubseries(false), []);

  const openModal1 = useCallback(() => setModal1(true), []);
  const closeModal1 = useCallback(() => setModal1(false), []);
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
        modal1,
        modal2,
        modal3,
        openModal1,
        closeModal1,
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
