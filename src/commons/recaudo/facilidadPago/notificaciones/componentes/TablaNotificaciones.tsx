/* eslint-disable @typescript-eslint/no-unused-vars */
import { Grid, Box, Avatar, IconButton, Tooltip, Button, Stack, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { Article, FilterAltOffOutlined, SearchOutlined  } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { type event } from '../../interfaces/interfaces';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaNotificaciones: React.FC = () => {
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');

  const visible_rows = [
    {
      id: 1,
      nombre_usuario: 'Kock and Sons',
      identificacion: '392403230',
      numero_radicacion: 'FP30300000',
      fecha_creacion: '2022-11-04',
      medio: 'e-Mail'
    },
    {
      id: 2,
      nombre_usuario: 'Harber Inc',
      identificacion: '2040060603',
      numero_radicacion: 'FP1200000',
      fecha_creacion: '2022-11-04',
      medio: 'e-Mail'
    },
    {
      id: 3,
      nombre_usuario: 'Harber Inc',
      identificacion: '192043206',
      numero_radicacion: 'FP75000000',
      fecha_creacion: '2022-11-04',
      medio: 'Edicto'
    },
    {
      id: 4,
      nombre_usuario: 'Steuber LLC',
      identificacion: '5940330202',
      numero_radicacion: 'FP13400000',
      fecha_creacion: '2022-11-04',
      medio: 'Dirección Física'
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'nombre_usuario',
      headerName: 'Nombre Usuario',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'identificacion',
      headerName: 'Identificación',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_radicacion',
      headerName: 'Número Radicación F.P.',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_creacion',
      headerName: 'Fecha Creación',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'medio',
      headerName: 'Medio Notificación',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Ver',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Ver">
                <IconButton
                  onClick={() => {
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
            <MenuItem value='nombre_usuario'>Nombre Usuario</MenuItem>
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
        }}
      >
        Buscar
      </Button>
      <Button
        color='primary'
        variant='outlined'
        startIcon={<FilterAltOffOutlined />}
        onClick={() => {
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
                  getRowId={(row) => row.id}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ) : null
    }
  </Box>
  );
}
