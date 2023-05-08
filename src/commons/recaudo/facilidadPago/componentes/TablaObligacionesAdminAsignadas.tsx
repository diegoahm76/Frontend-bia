/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined } from '@mui/icons-material';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface event {
  target: {
    value: string
  }
}

interface Data {
  nombre: string;
  identificacion: string;
  obligacion: string;
  fechaRadicacion: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaObligacionesAdminAsignadas: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<Data>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const navigate = useNavigate();

  const fac_pago = [
    {
      id: 1,
      nombre: 'Koch and Sons',
      identificacion: '10298723',
      obligacion: 'Concesión Agua Superficial',
      fechaRadicacion: '01/01/2022'
    },
    {
      id: 2,
      nombre: 'Steuber LLC',
      identificacion: '2346448723',
      obligacion: 'Permiso Perforación',
      fechaRadicacion: '01/01/2022'
    },
    {
      id: 3,
      nombre: 'Konopelski Group',
      identificacion: '43214134',
      obligacion: 'Pago Tasa TUA',
      fechaRadicacion: '01/01/2022'
    },
    {
      id: 4,
      nombre: 'Harber Inc',
      identificacion: '34545437',
      obligacion: 'Uso Agua Subterranea',
      fechaRadicacion: '01/01/2022'
    },
  ];

  const columns: GridColDef[] = [
    {
      field: 'nombre',
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
      field: 'obligacion',
      headerName: 'Número Radicación F.P.',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fechaRadicacion',
      headerName: 'Fecha Radicación',
      width: 150,
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
                    navigate('../solicitud')
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
    set_visible_rows(fac_pago)
  }, [])

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
              onChange={(event: event)=>{
                const { value } = event.target
                set_filter(value)
              }}
            >
              <MenuItem value='nombre'>Nombre Usuario</MenuItem>
              <MenuItem value='identificacion'>Identificación</MenuItem>
              <MenuItem value='obligacion'>Número Radicación F.P.</MenuItem>
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
            if(filter === 'nombre'){
              for(let i=0; i < fac_pago.length; i++){
                if(fac_pago[i].nombre.toLowerCase().includes(search.toLowerCase())){
                  new_rows.push(fac_pago[i])
                }
              }
              set_visible_rows(new_rows)
            }
            if(filter === 'identificacion'){
              for(let i=0; i < fac_pago.length; i++){
                if(fac_pago[i].identificacion.toLowerCase().includes(search.toLowerCase())){
                  new_rows.push(fac_pago[i])
                }
              }
              set_visible_rows(new_rows)
            }
            if(filter === 'obligacion'){
              for(let i=0; i < fac_pago.length; i++){
                if(fac_pago[i].obligacion.toLowerCase().includes(search.toLowerCase())){
                  new_rows.push(fac_pago[i])
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
            set_visible_rows(fac_pago)
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
