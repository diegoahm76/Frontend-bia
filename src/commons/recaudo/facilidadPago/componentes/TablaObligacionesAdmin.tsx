/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField, Dialog, DialogActions, DialogTitle } from '@mui/material';
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
export const TablaObligacionesAdmin: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<Data>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const [modal, set_modal] = useState(false);
  const [sub_modal, set_sub_modal] = useState(false);
  const [modal_option, set_modal_option] = useState('no');
  const navigate = useNavigate();

  const handle_open = () => { set_modal(true) };
  const handle_close = () => { set_modal(false) };

  const handle_open_sub = () => { set_sub_modal(true) };
  const handle_close_sub = () => { set_sub_modal(false) };

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
    {
      field: 'asignacion',
      headerName: 'Asignación',
      width: 150,
      renderCell: (params) => {
        return (
          <FormControl sx={{ minWidth: 110 }}>
            <InputLabel id="demo-simple-select-label">Seleccionar</InputLabel>
              <Select
                size='small'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Seleccionar"
                onChange={()=>{
                  handle_open()
                }}
              >
                <MenuItem value='Olga'>Olga</MenuItem>
                <MenuItem value='Diana'>Diana</MenuItem>
                <MenuItem value='Juan'>Juan</MenuItem>
                <MenuItem value='Fernando'>Fernando</MenuItem>
              </Select>
          </FormControl>
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
          <InputLabel id="demo-simple-select-label">Filtrar por: </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="filter"
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
          id="outlined-error-helper-text"
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
        <SearchOutlined />
        </Button>
        <Button
          color='secondary'
          variant='outlined'
          onClick={() => {
            set_visible_rows(fac_pago)
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
      <Dialog
        open={modal}
        onClose={handle_close}
        maxWidth="xs"
      >
        <Box component="form"
          onSubmit={()=>{}}>
          <DialogTitle>¿Está seguro de realizar la reasignación de usuario?</DialogTitle>
          <DialogActions>
            <Button onClick={() => {
                handle_open_sub();
                set_modal_option('no')
                handle_close()
            }}>Cancelar</Button>
            <Button variant="contained" color="primary" onClick={()=>{
              handle_open_sub()
              set_modal_option('si')
              handle_close()
            }}>Guardar</Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Dialog
        open={sub_modal}
        onClose={handle_close_sub}
        maxWidth="xs"
      >
        <Box component="form"
          onSubmit={()=>{}}>
          <DialogTitle>{modal_option === 'si' ? 'Reasignación ejecutada con éxito' : 'Reasignación cancelada'}</DialogTitle>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={()=>{
              handle_close_sub()
            }}>Ok</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
