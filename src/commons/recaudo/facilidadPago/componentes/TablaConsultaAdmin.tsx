/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TablaObligacionesUsuario } from './TablaObligacionesUsuario';

interface event {
  target: {
    value: string
  }
}

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
  const navigate = useNavigate();

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
    <Box sx={{ width: '100%' }}>
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
          color='secondary'
          variant='contained'
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
        <SearchOutlined />
        </Button>
        <Button
          color='secondary'
          variant='outlined'
          onClick={() => {
            set_visible_rows(contribuyente)
          }}
        >
        Mostrar Todo
        <FilterAltOffOutlined />
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
      {
        obligaciones ? (
          <>
            <p>Las obligaciones pendientes por pago son las siguientes: </p>
            <TablaObligacionesUsuario />
            <Stack
              direction="row"
              justifyContent="right"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <Button
                color='primary'
                variant='contained'
                sx={{ marginTop: '30px' }}
                onClick={() => {
                  navigate('../registro')
                }}
              >
              Crear Facilidad de Pago
              </Button>
            </Stack>
          </>
        ) : null
      }
    </Box>
  );
}
