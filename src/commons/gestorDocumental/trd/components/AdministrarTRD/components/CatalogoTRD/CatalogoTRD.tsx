/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Grid,
  Box,
  Button,
  // Divider,
  // TextField,
  Stack,
  ButtonGroup
  // IconButton
  // ButtonGroup,
  // Button,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Title } from '../../../../../../../components';
import { DataGrid } from '@mui/x-data-grid';
import {
  // useAppDispatch,
  /* useAppDispatch, */ useAppSelector
} from '../../../../../../../hooks';
import { columns } from './utils/columsCatalogoTRD';
import { Link } from 'react-router-dom';
import { download_xls } from '../../../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../../../documentos-descargar/PDF_descargar';

// import { Avatar, IconButton } from "@mui/material";
/* import DeleteIcon from '@mui/icons-material/Delete';
import { delete_item_catalogo_trd, get_catalogo_trd } from '../../../../toolkit/TRDResources/thunks/TRDResourcesThunks'; */

export const CatalogoTRD = (): JSX.Element => {
  //* dispatch element
  // const dispatch = useAppDispatch();

  // ? useSelector declaration, states from store
  const { catalogo_trd, trd_current } = useAppSelector(
    (state: any) => state.trd_slice
  );

  const columns_catalogo_trd = [
    ...columns,
    {
      field: 'tiempo_retencion_ag',
      headerName: 'Tiempo retención AG',
      width: 180
    },
    {
      field: 'tiempo_retencion_ac',
      headerName: 'Tiempo retención AC',
      width: 180
    },
    {
      field: 'descripcion_procedimiento',
      headerName: 'Descripción Procedimiento',
      width: 240
    }
    /* {
      field: 'acciones',
      headerName: 'Acciones',
      width: 180,
      renderCell: (params: any) =>
        !trd_current.fecha_terminado ? (
          <>
            <IconButton
              aria-label="delete"
              size="large"
              title="Eliminar relación TRD"
              onClick={() => {
                dispatch(delete_item_catalogo_trd(params.row.id_catserie_unidadorg)).then(
                  () => {
                    dispatch(get_catalogo_trd(trd_current.id_trd));
                  }
                );
                //  console.log('')(params.row);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <></>
        )
    } */
  ];

  return (
    <>
      <Grid
        item
        sx={{
          width: '100%',
          marginTop: '1rem'
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Title title="Catálogo TRD - Tabla de retención documental" />
          <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

            {download_xls({ nurseries: catalogo_trd, columns: columns_catalogo_trd })}
            {download_pdf({ nurseries: catalogo_trd, columns: columns_catalogo_trd, title: 'Catálogo TRD' })}

          </ButtonGroup>
          <DataGrid
            sx={{
              marginTop: '.5rem'
            }}
            density="compact"
            autoHeight
            rows={catalogo_trd || []}
            columns={columns_catalogo_trd}
            pageSize={10}
            rowsPerPageOptions={[10]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_catserie_unidadorg ?? 0}
          />

          <Stack
            direction="row"
            justifyContent="flex-start"
            spacing={2}
            sx={{ m: '20px 0' }}
          >
            {/* buttons start */}
            <Link
              to="/app/gestor_documental/trd/administrar-trd/"
            >
              <Button
                // color="info"
                color="warning"
                variant="contained"
                disabled={!trd_current}
                startIcon={<AdminPanelSettingsIcon />}
              >
                ADMINISTRAR CATÁLOGO TRD
              </Button>
            </Link>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};
