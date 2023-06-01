/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactElement } from 'react';
import { TableAdaptable } from '../../components/Table/TableAdaptable';

// ? TODO
//! FIX THE ERRORS THAT ESLINT SHOWS
// actions components
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { get_adapter_axios } from '../../../../../utils/AxiosAdapter/AxiosAdapter';
import { useEffect } from 'react';
import { COLUMNS, DATA } from './dataSimulation/data';
import { BuscadorAtomPORH } from '../../components/Buscador/Buscador';

export const ACTIONSTABLE = [
  {
    iconEdit: <EditIcon />,
    iconDelete: <DeleteIcon />
  }
];
export const PorhMain = (): ReactElement => {
  /*  const fetchData = async () => {
    const hola = await get_adapter_axios('estaciones/parametros/consultar-parametro')
    console.log(hola)
  }

  useEffect(() => {
    fetchData()
  },[]); */

  return (
    <div>
      <BuscadorAtomPORH/>
      <TableAdaptable
        data={DATA}
        columns={COLUMNS}
        actionIcons={ACTIONSTABLE}
      />
    </div>
  );
};
