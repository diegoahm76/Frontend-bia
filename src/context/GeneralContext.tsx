/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, type FC } from 'react';
import { useModalAndLoading } from '../hooks/useModalAndLoading/useModalAndLoading';

export const ModalAndLoadingContext = createContext<any>({});

export const ModalAndLoadingProvider: FC<any> = ({
  children,
}: any): JSX.Element => {
  // ? hook to manage the loader for the section / sub section selection
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

  const {isLoading: openModalOne, handleLoading: handleOpenModalOne} = useModalAndLoading('', 'isLoading');

  const {isLoading: openModalTwo, handleLoading: handleOpenModalTwo} = useModalAndLoading('', 'isLoading');


  //! you can add more call to hook if needed...
  // ? value object to return the data
  const value = {
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
    //* open modal one
    openModalOne,
    handleOpenModalOne,
    //* open modal two
    openModalTwo,
    handleOpenModalTwo,
  };
  return (
    <ModalAndLoadingContext.Provider value={value}>
      {children}
    </ModalAndLoadingContext.Provider>
  );
};
