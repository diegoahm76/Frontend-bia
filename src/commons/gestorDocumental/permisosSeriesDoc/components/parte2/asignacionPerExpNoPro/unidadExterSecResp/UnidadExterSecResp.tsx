/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import AddIcon from '@mui/icons-material/Add';
import { Button, Grid } from '@mui/material';

export const UnidadExterSecResp: FC<any> = (): JSX.Element => {
  return (
    <RenderDataGrid
      columns={[]}
      rows={[]}
      title="Unidades organizacionales actuales de la sección responsable"
      aditionalElement={
        <Grid
          item
          sx={{
            width: '100%',
            marginTop: '1rem'
          }}
        >
          <Button
            color="success"
            variant="contained"
            startIcon={<AddIcon />}
            // disabled={!tca_current}
          >
            AGREGAR UNIDADES EXTERNAS
          </Button>
        </Grid>
      }
    />
  );
};
