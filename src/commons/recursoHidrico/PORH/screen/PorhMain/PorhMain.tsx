/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import type { ReactElement } from 'react';
import { TableAdaptable } from '../../components/Table/TableAdaptable';

// ? TODO
//! FIX THE ERRORS THAT ESLINT SHOWS

// actions components
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const PorhMain = (): ReactElement => {
  const DATA = [
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Bob', age: 35 }
  ];

  const COLUMNS = ['ID', 'Name', 'Age', 'Actions'];

  const ACTIONSTABLE = [
    {
      iconEdit: <EditIcon />,
      iconDelete: <DeleteIcon />
    }
  ];

  return (
    <div>
      <TableAdaptable
        data={DATA}
        columns={COLUMNS}
        actionIcons={ACTIONSTABLE}
      />
    </div>
  );
};
