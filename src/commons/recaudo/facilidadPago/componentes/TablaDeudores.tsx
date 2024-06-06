/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField, CircularProgress, ButtonGroup } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined, Article } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { type event, type ObligacionesUsuario, type Contribuyente } from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { get_obligaciones_id } from '../slices/ObligacionesSlice';
import { get_filtro_deudores, get_deudores } from '../slices/DeudoresSlice';
import { Title } from '../../../../components';
import { control_error } from '../../../../helpers';
import { ModalVerObligaciones } from './ModalVerObligaciones/ModalVerObligaciones';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

interface RootStateDeudores {
  deudores: {
    deudores: Contribuyente[];
  }
}

interface RootStateObligaciones {
  obligaciones: {
    obligaciones: ObligacionesUsuario[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaDeudores: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<Contribuyente>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const [obligaciones_module, set_obligaciones_module] = useState(false);
  const { deudores } = useSelector((state: RootStateDeudores) => state.deudores);
  const { obligaciones } = useSelector((state: RootStateObligaciones) => state.obligaciones);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const columns: GridColDef[] = [
    {
      field: 'identificacion',
      headerName: 'Número Identificación',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_contribuyente',
      headerName: 'Nombre Contribuyente',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'monto_total',
      headerName: 'Monto Total',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'monto_total_con_intereses',
      headerName: 'Monto Total Con Interes',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acción',
      flex: 1,
      renderCell: (params) => {
        // Verificar si 'obligaciones' es false
        if (!params.row.obligaciones) {
          // No renderizar IconButton si 'obligaciones' es false
          return null;
        }

        // Renderizar IconButton si 'obligaciones' no es false
        return (
          <>
            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  try {
                    void dispatch(get_obligaciones_id(params.row.identificacion));
                    set_obligaciones_module(true);
                    set_is_buscar(true);
                  } catch (error: any) {
                    // Manejo del error
                    control_error(error.response.data.detail);
                  }
                }}
              >
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    background: '#fff',
                    border: '2px solid',
                  }}
                  variant="rounded"
                >
                  <Article
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        )
      },
    },
  ];

  useEffect(() => {
    set_visible_rows(deudores)
  }, [deudores])

  const [is_modal_active, set_is_buscar] = useState<boolean>(false);

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Title title='Listado de deudores' />
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Stack
              direction="row"
              justifyContent="left"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              <TextField
                required
                label="Búsqueda por Número Identificación"
                size="medium"
                onChange={(event: event) => {
                  const { value } = event.target
                  set_search(value)
                  set_filter('identificacion')
                }}
                sx={{ width: '300px' }} // Ajusta el ancho aquí
              />
              <TextField
                required
                label="Búsqueda por Nombre Contribuyente"
                size="medium"
                onChange={(event: event) => {
                  const { value } = event.target
                  set_search(value)
                  set_filter('nombre_contribuyente')
                }}
                sx={{ width: '300px' }} // Ajusta el ancho aquí
              />
              <Button
                color='primary'
                variant='contained'
                startIcon={<SearchOutlined />}
                onClick={() => {
                  try {
                    void dispatch(get_filtro_deudores({ parametro: filter, valor: search }));
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                Buscar
              </Button>
              <Button
                color='primary'
                variant='outlined'
                startIcon={<FilterAltOffOutlined />}
                onClick={() => {
                  try {
                    void dispatch(get_deudores());
                  } catch (error: any) {
                    throw new Error(error);
                  }
                }}
              >
                Mostrar Todo
              </Button>
            </Stack>

          </Box>
        </Grid>
      </Grid>

      {
        visible_rows.length !== 0 ? (
          <Grid
            container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Grid item xs={12}>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <ButtonGroup
                    style={{
                      margin: 7,
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {download_xls({ nurseries: visible_rows, columns })}
                    {download_pdf({
                      nurseries: visible_rows,
                      columns,
                      title: 'Listado de proyectos',
                    })}
                  </ButtonGroup>
                  <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    rows={visible_rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.identificacion}
                    loading={visible_rows.length === 0} // Muestra un loader mientras se cargan los datos
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : null
      }
      {
        obligaciones_module ? (
          <Grid
            container
            sx={{
              position: 'relative',
              borderRadius: '15px',
              mb: '20px',
              mt: '20px',
              p: '20px',
            }}
          >
            <Grid item xs={12}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                {
                  obligaciones.length !== 0 ? (
                    <>
                      <ModalVerObligaciones
                        is_modal_active={is_modal_active}
                        set_is_modal_active={set_is_buscar}

                      />
                    </>
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      minHeight={200}
                    >
                      <CircularProgress /> {/* Agrega un Circular Progress como loader */}
                    </Box>
                  )
                }
              </Box>
            </Grid>
          </Grid>
        ) : null
      }
    </>
  );
}