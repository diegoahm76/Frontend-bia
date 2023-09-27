/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { AutorizacionesGenerales } from '../components/AutorizacionesGenerales/AutorizacionesGenerales';

export const AutorizacionesGeneralesScreen = (params: any): JSX.Element => {
  return <AutorizacionesGenerales 
    rowsControlInicial={params.rowsControlInicial}
    setRowsControlInicial={params.setRowsControlInicial}
  />;
};
