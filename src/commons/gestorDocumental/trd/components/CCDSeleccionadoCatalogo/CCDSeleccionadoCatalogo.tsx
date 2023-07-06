/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid } from '@mui/x-data-grid';
import {
  Grid,
  Box,
  Divider,
  // TextField,
  // Stack,
  // ButtonGroup,
  // Button,
} from '@mui/material';
import { useAppSelector } from '../../../../../hooks';
import { Title } from '../../../../../components';
import { columns_catalogo } from './colums/colums';

// import { Avatar, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";


export const CCDSeleccionadoCatalogo = (): JSX.Element => {
  // ? this is the neccesary state to show the "catalogo by unidad organizacional"
  const { catalado_series_subseries_unidad_organizacional } = useAppSelector(
    (state: any) => state.trd_slice
  );

  return (
    <>
      <Grid item
        sx={{
          width: '100%',
          marginTop: '1rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Divider />
          <Title title="Cuadro de clasificación documental Seleccionado" />
          <DataGrid
            sx={{
              marginTop: '.5rem',
            }}
            density="compact"
            autoHeight
            rows={catalado_series_subseries_unidad_organizacional}
            columns={columns_catalogo}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_cat_serie_und}
          />
        </Box>
      </Grid>
    </>
  );
};
