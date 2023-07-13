/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Grid,
  Box,
  Button,
  // Divider,
  // TextField,
  Stack
  // ButtonGroup,
  // Button,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Title } from '../../../../../../../components';
import { DataGrid } from '@mui/x-data-grid';
// import { useAppSelector } from '../../../../../hooks';
// import { Title } from '../../../../../components';
// import { columns_catalogo } from './colums/colums';

// import { Avatar, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

export const CatalogoTRD = (): JSX.Element => {
  // ? this is the neccesary state to show the "catalogo by unidad organizacional"
  /* const { catalado_series_subseries_unidad_organizacional } = useAppSelector(
    (state: any) => state.trd_slice
  ); */

  const columns_catalogo = [
    {
      field: 'nombre_unidad',
      headerName: 'Nombre de la Unidad',
      width: 200
    },
    {
      field: 'cod_unidad_org',
      headerName: 'Código de la Unidad',
      width: 200
    },
    {
      field: 'nombre_serie',
      headerName: 'Nombre de la Serie',
      width: 200
    },
    {
      field: 'cod_serie',
      headerName: 'Código de la Serie',
      width: 200
    },
    {
      field: 'nombre_subserie',
      headerName: 'Nombre de la Subserie',
      width: 200
    },
    {
      field: 'cod_subserie',
      headerName: 'Código de la Subserie',
      width: 200
    },
    {
      field: 'disposicion_final',
      headerName: 'Disposición Final',
      width: 200
    },
    {
      field: 'digitalizacion_dis_final',
      headerName: 'Digitalización Disposición Final',
      width: 200
    },
    {
      field: 'tiempo_retencion_ag',
      headerName: 'Tiempo de Retención AG',
      width: 200
    },
    {
      field: 'tiempo_retencion_ac',
      headerName: 'Tiempo de Retención AC',
      width: 200
    },
    {
      field: 'descripcion_procedimiento',
      headerName: 'Descripción del Procedimiento',
      width: 200
    }
  ];

  const rows_catalogo = [
    {
      id_catserie_unidadorg: 1,
      nombre_unidad: 'Unidad 2.1',
      cod_unidad_org: 830,
      nombre_serie: 'Serie 1',
      cod_serie: '1',
      nombre_subserie: 'Subserie 1 - Serie 1 - CCD Prueba',
      cod_subserie: '1',
      disposicion_final: 'C',
      digitalizacion_dis_final: true,
      tiempo_retencion_ag: 1,
      tiempo_retencion_ac: 2,
      descripcion_procedimiento: 'PRUEBA TRIPLETA 02-05-2023',
      fecha_registro: '2023-05-24T20:01:01.553194',
      justificacion_cambio: null,
      ruta_archivo_cambio: null,
      id_trd: 11,
      id_cat_serie_und: 6,
      cod_disposicion_final: 'C'
    },
    {
      id_catserie_unidadorg: 2,
      nombre_unidad: 'unidad 3.0',
      cod_unidad_org: 831,
      nombre_serie: 'Serie 2',
      cod_serie: '2',
      nombre_subserie: 'Subserie 1 - Serie 2 - CCD Prueba',
      cod_subserie: '1',
      disposicion_final: 'C',
      digitalizacion_dis_final: true,
      tiempo_retencion_ag: 1,
      tiempo_retencion_ac: 2,
      descripcion_procedimiento: 'PRUEBA TRIPLETA 02-05-2023',
      fecha_registro: '2023-05-24T20:01:08.635931',
      justificacion_cambio: null,
      ruta_archivo_cambio: null,
      id_trd: 11,
      id_cat_serie_und: 7,
      cod_disposicion_final: 'C'
    },
    {
      id_catserie_unidadorg: 3,
      nombre_unidad: 'unidad 3.1',
      cod_unidad_org: 832,
      nombre_serie: 'Serie 3',
      cod_serie: '3',
      nombre_subserie: null,
      cod_subserie: null,
      disposicion_final: 'C',
      digitalizacion_dis_final: true,
      tiempo_retencion_ag: 1,
      tiempo_retencion_ac: 2,
      descripcion_procedimiento: 'PRUEBA TRIPLETA 02-05-2023',
      fecha_registro: '2023-05-24T20:01:15.894303',
      justificacion_cambio: null,
      ruta_archivo_cambio: null,
      id_trd: 11,
      id_cat_serie_und: 8,
      cod_disposicion_final: 'C'
    }
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
          <DataGrid
            sx={{
              marginTop: '.5rem'
            }}
            density="compact"
            autoHeight
            rows={rows_catalogo}
            columns={columns_catalogo}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_catserie_unidadorg}
          />

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ m: '20px 0' }}
          >
            {/* buttons start */}
            <Button
              // color="info"
              color="primary"
              variant="outlined"
              disabled
              startIcon={<AdminPanelSettingsIcon />}
              onClick={() => console.log('ABRIR ADMINISTRACIÓN DE TRD')}
            >
              {/* this button must be part of the TRD administration */}
              ADMINISTRAR CATÁLOGO TRD
            </Button>
          </Stack>
        </Box>
      </Grid>
    </>
  );
};
