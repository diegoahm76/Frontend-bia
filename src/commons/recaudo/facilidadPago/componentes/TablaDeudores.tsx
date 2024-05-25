import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined, Article } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { TablaObligacionesUsuarioConsulta } from './TablaObligacionesUsuarioConsulta';
import { type event, type ObligacionesUsuario, type Contribuyente } from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { get_obligaciones_id } from '../slices/ObligacionesSlice';
import { get_filtro_deudores, get_deudores } from '../slices/DeudoresSlice';
import { Title } from '../../../../components';
import { control_error } from '../../../../helpers';

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
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_contribuyente',
      headerName: 'Nombre Contribuyente',
      width: 400,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acción',
      width: 150,
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
//  console.log('')(visible_rows)
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
        <Title title='Listado de deudores'/>
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
              <FormControl sx={{ minWidth: 130 }}>
                <InputLabel>Filtrar por: </InputLabel>
                  <Select
                    label="Filtrar por: "
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_filter(value)
                    }}
                    defaultValue={''}
                  >
                    <MenuItem value='identificacion'>Número Identificación</MenuItem>
                    <MenuItem value='nombre_contribuyente'>Nombre Contribuyente</MenuItem>
                  </Select>
              </FormControl>
              <TextField
                required
                label="Búsqueda"
                size="medium"
                onChange={(event: event)=>{
                  const { value } = event.target
                  set_search(value)
                }}
              />
              <Button
                color='primary'
                variant='contained'
                startIcon={<SearchOutlined />}
                onClick={() => {
                  try {
                    void dispatch(get_filtro_deudores({parametro: filter, valor: search}));
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
                  <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    rows={visible_rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.identificacion}
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
            // background: '#FAFAFA',
            borderRadius: '15px',
            mb: '20px',
            mt: '20px',
            p: '20px',
            // boxShadow: '0px 3px 6px #042F4A26',
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

                    {/* <TablaObligacionesUsuarioConsulta  is_modal_active={is_modal_active}  set_is_modal_active={set_is_buscar}/> */}
                  </>
                ): <p>.</p>
              }
            </Box>
          </Grid>
        </Grid>
        ) : null
      }
    </>
  );
}
