/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, type FC, useState } from 'react';
import { type ModalContextPSDInterface } from './types/ModalContextPSD.types';

interface ModalProviderPSDProps {
  children: React.ReactNode;
}

export const ModalContextPSD = createContext<ModalContextPSDInterface>({
  modalSeleccionCCD_PSD: false,
  handleSeleccionCCD_PSD: () => {},
  loadingButtonPSD: false,
  setLoadingButtonPSD: () => {},
  loadingSeriesSubseries: false,
  setloadingSeriesSubseries: () => {},
  loadingRestricciones: false,
  setLoadingRestricciones: () => {}
});

export const ModalProviderPSD: FC<ModalProviderPSDProps> = ({ children }) => {
  const [modalSeleccionCCD, setModalSeleccionCCD] = useState<boolean>(false);
  const [loadingButtonPSD, setLoadingButtonPSD] = useState<boolean>(false);
  const [loadingSeriesSubseries, setloadingSeriesSubseries] = useState<boolean>(false);
  const [loadingRestricciones, setLoadingRestricciones] = useState<boolean>(false)


  const handleSeleccionCCD_PSD = (value: boolean) => {
    setModalSeleccionCCD(value);
  };

  const modalContextValue: ModalContextPSDInterface = {
    modalSeleccionCCD_PSD: modalSeleccionCCD,
    handleSeleccionCCD_PSD,
    loadingButtonPSD,
    setLoadingButtonPSD,
    loadingSeriesSubseries,
    setloadingSeriesSubseries,
    loadingRestricciones,
    setLoadingRestricciones,
  };

  return (
    <ModalContextPSD.Provider value={modalContextValue}>
      {children}
    </ModalContextPSD.Provider>
  );
};
