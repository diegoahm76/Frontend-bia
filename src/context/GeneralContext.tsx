/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, useState, type FC } from 'react';
import { useModalAndLoading } from '../hooks/useModalAndLoading/useModalAndLoading';

export const ModalAndLoadingContext = createContext<any>({});

export const ModalAndLoadingProvider: FC<any> = ({
  children,
}: any): JSX.Element => {
  // ? hook to manage the loader for the section / sub section selection
  const [showAsignaciones, setShowAsignaciones] = useState(false);
  const { isLoading: isLoadingSeccionSub, handleLoading: handleModalSecSub } =
    useModalAndLoading('', 'isLoading');
  const {
    isLoading: isLoadingSerieSubserie,
    handleLoading: handleSerieSubserie,
  } = useModalAndLoading('', 'isLoading');
  const { isLoading: generalLoading, handleLoading: handleGeneralLoading } =
    useModalAndLoading('', 'isLoading');
  const { isLoading: secondLoading, handleLoading: handleSecondLoading } =
    useModalAndLoading('', 'isLoading');

  const { isLoading: thirdLoading, handleLoading: handleThirdLoading } =
    useModalAndLoading('', 'isLoading');

  const { isLoading: fourthLoading, handleLoading: handleFourthLoading } =
    useModalAndLoading('', 'isLoading');

  const { isLoading: fifthLoading, handleLoading: handleFifthLoading } =
    useModalAndLoading('', 'isLoading');

  const { isLoading: sixthLoading, handleLoading: handleSixthLoading } =
    useModalAndLoading('', 'isLoading');

  const { isLoading: openModalOne, handleLoading: handleOpenModalOne } =
    useModalAndLoading('', 'isLoading');

  const { isLoading: openModalTwo, handleLoading: handleOpenModalTwo } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: openModalNuevo, handleLoading: handleOpenModalNuevo } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: openModalNuevoNumero2, handleLoading: handleOpenModalNuevoNumero2 } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: sevenLoading, handleLoading: handleSevenLoading } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: eigthLoading, handleLoading: handleEigthLoading } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: nineLoading, handleLoading: handleNineLoading } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: tenLoading, handleLoading: handleTenLoading } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: ElevenLoading, handleLoading: handleElevenLoading } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: TwelveLoading, handleLoading: handleTwelveLoading } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: treceLoading, handleLoading: handleTreceLoading } =
    useModalAndLoading('', 'isLoading');

    const { isLoading: catorceLoading, handleLoading: handleCatorceLoading } =
    useModalAndLoading('', 'isLoading');
  // ? ----- modales para la entrega 99 -----
  const {
    isLoading: modalAgregarMetadatos,
    handleLoading: handleModalAgregarMetadatos,
  } = useModalAndLoading('', 'isLoading');

  //! you can add more call to hook if needed...
  // ? value object to return the data
  const value = {
    showAsignaciones,
    setShowAsignaciones,
    //* carga de seccion / subseccion
    isLoadingSeccionSub,
    handleModalSecSub,
    //* carga de serie / subserie
    isLoadingSerieSubserie,
    handleSerieSubserie,
    //* carga general
    generalLoading,
    handleGeneralLoading,

    //* second loading
    secondLoading,
    handleSecondLoading,
    //* third loading
    thirdLoading,
    handleThirdLoading,
    //* fourth loading
    fourthLoading,
    handleFourthLoading,
    //* fifth loading
    fifthLoading,
    handleFifthLoading,
    //* sixth loading

    sixthLoading,
    handleSixthLoading,

    //* open modal one
    openModalOne,
    handleOpenModalOne,
    //* open modal two
    openModalTwo,
    handleOpenModalTwo,

    //* open modal nuevo
    openModalNuevo,
    handleOpenModalNuevo,
    //* open modal nuevo numero 2
    openModalNuevoNumero2,
    handleOpenModalNuevoNumero2,

    //* seven loading
    sevenLoading,
    handleSevenLoading,
    //* eigth loading
    eigthLoading,
    handleEigthLoading,

    //* nine loading
    nineLoading,
    handleNineLoading,
    //* ten loading
    tenLoading,
    handleTenLoading,
    //* Eleven loading
    ElevenLoading,
    handleElevenLoading,
    //* Twelve loading
    TwelveLoading,
    handleTwelveLoading,

    //* trece loading
    treceLoading,
    handleTreceLoading,
    //* catorce loading
    catorceLoading,
    handleCatorceLoading,

    // ? ----- modales para la entrega 99 -----
    //* modal agregar metadatos
    modalAgregarMetadatos,
    handleModalAgregarMetadatos,
  };
  return (
    <ModalAndLoadingContext.Provider value={value}>
      {children}
    </ModalAndLoadingContext.Provider>
  );
};
