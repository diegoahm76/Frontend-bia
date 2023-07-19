/* eslint-disable @typescript-eslint/naming-convention */
import { DataGrid } from '@mui/x-data-grid';
import {
  Grid,
  Box,
  IconButton,
  // Divider,
  // TextField,
  // Stack,
  // ButtonGroup,
  // Button,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { Title } from '../../../../../components';
import { columns } from './colums/colums';

// import { Avatar, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import  AdminPanelSettingsIcon  from '@mui/icons-material/AdminPanelSettings';
import { get_ccd_current_catalogo_ser_sub_unid } from '../../toolkit/TRDResources/slice/TRDResourcesSlice';


export const CCDSeleccionadoCatalogo = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch()

  // ? this is the neccesary state to show the "catalogo by unidad organizacional"
  const { catalado_series_subseries_unidad_organizacional } = useAppSelector(
    (state: any) => state.trd_slice
  );

  const columns_catalogo = [
    ...columns,
    {
      headerName: 'Acciones',
      field: 'acciones',
      width: 180,
      renderCell: (params: { row: { id_cat_serie_und: string } }) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              size="large"
              title='Administrar catalogo TRD'
              onClick={() => {
                // ? this is the function to delete the ccd
                // delete_ccd(params.row.id_cat_serie_und);
                dispatch(get_ccd_current_catalogo_ser_sub_unid(params.row))
                console.log(params.row);
              }}
            >
              <AdminPanelSettingsIcon />
            </IconButton>
          </>
        );
      }
    },
  ]

  return (
    <>
      <Grid item
        sx={{
          width: '100%',
          marginTop: '1rem',
        }}
      >
        <Box sx={{ width: '100%' }}>
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
