/* eslint-disable @typescript-eslint/naming-convention */
import { createContext, type FC } from 'react';
import { useModalAndLoading } from '../hooks/useModalAndLoading/useModalAndLoading';

export const ModalAndLoadingContext = createContext<any>({});

export const ModalAndLoadingProvider: FC<any> = ({ children }: any) : JSX.Element => {
    // ? hook to manage the loader for the section / sub section selection
    const { isLoading: isLoadingSeccionSub , handleLoading: handleModalSecSub } = useModalAndLoading('', 'isLoading');

  //! you can add more call to hook if needed...
  // ? value object to return the data
  const value = {
    //* carga de seccion / subseccion
    isLoadingSeccionSub,
    handleModalSecSub,
  }
  return (
    <ModalAndLoadingContext.Provider value={value}>
      {children}
    </ModalAndLoadingContext.Provider>
  );
};