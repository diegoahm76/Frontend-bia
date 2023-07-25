/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';

import { RenderDataGrid } from '../../../Atom/RenderDataGrid/RenderDataGrid';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const CatalogoTCASeleccionado: FC<any> = ({
  rows,
  columns,
  title
}: any): JSX.Element => {
  return (
    <>
      <RenderDataGrid
        rows={rows}
        columns={columns}
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
