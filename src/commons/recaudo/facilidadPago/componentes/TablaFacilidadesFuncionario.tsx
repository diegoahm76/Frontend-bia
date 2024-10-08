import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined, Article } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type event, type FacilidadPago } from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { get_facilidad_solicitud } from '../slices/SolicitudSlice';
import { get_filtro_fac_pago_asignadas, get_facilidades_asignadas } from '../slices/FacilidadesSlice';
import { get_validacion_plan_pagos } from '../slices/PlanPagosSlice';
import { get_validacion_resolucion } from '../slices/ResolucionSlice';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

interface RootState {
  facilidades: {
    facilidades: FacilidadPago[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaFacilidadesFuncionario: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<FacilidadPago>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const { facilidades } = useSelector((state: RootState) => state.facilidades);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'nombre_de_usuario',
      headerName: 'Nombre Usuario',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'identificacion',
      headerName: 'Identificación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_radicacion',
      headerName: 'Número Radicación F.P.',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_generacion',
      headerName: 'Fecha Radicación',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {dayjs(params.value.slice(0, 10)).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acción',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  try {
                    void dispatch(get_facilidad_solicitud(params.row.id_facilidad));
                    void dispatch(get_validacion_plan_pagos(params.row.id_facilidad));
                    void dispatch(get_validacion_resolucion(params.row.id_facilidad));
                    navigate('../solicitud');
                  } catch (error: any) {
                    throw new Error(error)
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

  useEffect(()=>{
    set_visible_rows(facilidades)
  }, [facilidades])

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="left"
        spacing={2}
        sx={{ mb: '20px' }}
      >
        <FormControl sx={{ minWidth: 130 }}>
          <InputLabel>Filtrar por: </InputLabel>
            <Select
              label="Filtrar por: "
              defaultValue={''}
              onChange={(event: event)=>{
                const { value } = event.target
                set_filter(value)
              }}
            >
              <MenuItem value='nombre_de_usuario'>Nombre Usuario</MenuItem>
              <MenuItem value='identificacion'>Identificación</MenuItem>
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
              void dispatch(get_filtro_fac_pago_asignadas({parametro: filter, valor: search}));
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
              void dispatch(get_facilidades_asignadas());
            } catch (error: any) {
              throw new Error(error);
            }
          }}
        >
          Mostrar Todo
        </Button>
      </Stack>
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
                    getRowId={(row) => faker.database.mongodbObjectId()}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : null
      }
    </Box>
  )
}
