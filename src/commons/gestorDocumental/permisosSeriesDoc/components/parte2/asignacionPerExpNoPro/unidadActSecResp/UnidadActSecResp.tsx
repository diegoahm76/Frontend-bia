/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
import { RenderDataGrid } from '../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// componente unidades organizacionales actuales de la sección responsable
export const UnidadActSecResp: FC<any> = (): JSX.Element => {
  //* get states from redux store
  const { unidadActuales } = useAppSelector((state) => state.PsdSlice);
  return (
    <RenderDataGrid
      columns={[]}
      rows={unidadActuales || []}
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
            AGREGAR UNIDADES PROPIAS
          </Button>
        </Grid>
      }
    />
  );
};
