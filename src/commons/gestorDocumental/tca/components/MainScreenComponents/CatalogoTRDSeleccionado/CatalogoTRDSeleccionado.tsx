/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';

import { RenderDataGrid } from '../../../Atom/RenderDataGrid/RenderDataGrid';
import { Chip } from '@mui/material';

export const CatalogoTRDSeleccionado: FC<any> = ({
  rows,
  columns,
  title
}: any): JSX.Element => {

  const newColums = [
    ...columns,
    {
      headerName: 'Fecha registro',
      field: 'fecha_registro',
      width: 180,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={params.row.fecha_registro}
            color="success"
            variant="outlined"
          />
        );
      }
    },
    {
      headerName: 'Digitalización',
      field: 'digitalizacion',
      width: 160,
      renderCell: (params: any) => {
        return params.row.digitalizacion ? (
          <Chip size="small" label="SI" color="primary" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="error" variant="outlined" />
        );
      }
    }
  ];

  return (
    <>
      <RenderDataGrid rows={rows} columns={newColums} title={title} />
    </>
  );
};
