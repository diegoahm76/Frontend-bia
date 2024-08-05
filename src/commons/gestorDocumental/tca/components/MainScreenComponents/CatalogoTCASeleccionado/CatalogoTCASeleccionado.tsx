/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';

import { RenderDataGrid } from '../../../Atom/RenderDataGrid/RenderDataGrid';
import { Button, Chip, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAppSelector } from '../../../../../../hooks';
import type { dataGridTypes } from '../../../types/tca.types';

export const CatalogoTCASeleccionado: FC<dataGridTypes> = ({
  rows,
  columns,
  title
}: dataGridTypes): JSX.Element => {
  const { tca_current } = useAppSelector((state: any) => state.tca_slice);

  const newColums = [
    ...columns,
    {
      headerName: 'Fecha registro',
      field: 'fecha_registro',
      width: 240,
      renderCell: (params: any) => {
        return (
          <Chip
            size="small"
            label={
              params.row.fecha_registro
                ? new Date(params.row.fecha_registro).toLocaleString()
                : ''
            }
            color="success"
            variant="outlined"
          />
        );
      }
    }
  ];

  return (
    <>
      <RenderDataGrid
        rows={rows}
        columns={newColums}
        title={title}
        aditionalElement={
          <Grid
            item
            sx={{
              width: '100%',
              marginTop: '1rem'
            }}
          >
            <Link to="/app/gestor_documental/tca/administrar-tca/">
              <Button
                color="warning"
                variant="contained"
                startIcon={<AdminPanelSettingsIcon />}
                disabled={!tca_current}
              >
                ADMINISTRAR CATÁLOGO TCA
              </Button>
            </Link>
          </Grid>
        }
      />
    </>
  );
};
