/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { TablaObligacionesUsuario } from './TablaObligacionesUsuario';
import { type event } from '../interfaces/interfaces';

interface Data {
  identificacion: string;
  nombre: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaConsultaAdmin: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<Data>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const [obligaciones, set_obligaciones] =useState(false);

  const obligaciones_tabla = [
    {
      id: 1,
      nombreObligacion: 'Permiso 1',
      fecha_inicio: '01/01/2015',
      id_expediente: 378765,
      nroResolucion: '378765-143',
      monto_inicial: 120000000,
      carteras: {
        valor_intereses: 35000000,
        dias_mora: 390,
      }
    },
    {
      id: 2,
      nombreObligacion: 'Concesion Aguas',
      fecha_inicio: '01/04/2015',
      id_expediente: 3342765,
      nroResolucion: '3342765-4546',
      monto_inicial: 190700000,
      carteras: {
        valor_intereses: 45000000,
        dias_mora: 180,
      }
    },
  ];

  const contribuyente = [
    {
      id: 1,
      identificacion: '10298723',
      nombre: 'Juan Ortua',
    },
    {
      id: 2,
      identificacion: '2346448723',
      nombre: 'Diana Vargas',
    },
    {
      id: 3,
      identificacion: '43214134',
      nombre: 'Multiservicios',
    },
  ];

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
      field: 'nombre',
      headerName: 'Nombre Contribuyente',
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
                    set_obligaciones(true)
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
                    <ArticleIcon
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
    set_visible_rows(contribuyente)
  }, [])

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
                  >
                    <MenuItem value='identificacion'>Número Identificación</MenuItem>
                    <MenuItem value='nombre'>Nombre Contribuyente</MenuItem>
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
                  const new_rows = [];
                  if(filter === 'identificacion'){
                    for(let i=0; i < contribuyente.length; i++){
                      if(contribuyente[i].identificacion.toLowerCase().includes(search.toLowerCase())){
                        new_rows.push(contribuyente[i])
                      }
                    }
                    set_visible_rows(new_rows)
                  }
                  if(filter === 'nombre'){
                    for(let i=0; i < contribuyente.length; i++){
                      if(contribuyente[i].nombre.toLowerCase().includes(search.toLowerCase())){
                        new_rows.push(contribuyente[i])
                      }
                    }
                    set_visible_rows(new_rows)
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
                  set_visible_rows(contribuyente)
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
                    getRowId={(row) => row.id}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : null
      }
      {
        obligaciones ? (
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
          <Grid item xs={12}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >
                <p>Las obligaciones pendientes por pago son las siguientes:</p>
                <TablaObligacionesUsuario obligaciones={obligaciones_tabla} />
            </Box>
          </Grid>
        </Grid>
        ) : null
      }
    </>
  );
}
