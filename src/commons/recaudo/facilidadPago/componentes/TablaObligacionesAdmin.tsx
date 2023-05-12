/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined, Close } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type event, type FacilidadPago } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';

interface RootState {
  facilidades: {
    facilidades: FacilidadPago[];
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaObligacionesAdmin: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<FacilidadPago>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const [modal, set_modal] = useState(false);
  const [sub_modal, set_sub_modal] = useState(false);
  const [modal_option, set_modal_option] = useState('no');
  const { facilidades } = useSelector((state: RootState) => state.facilidades);
  const navigate = useNavigate();

  const handle_open = () => { set_modal(true) };
  const handle_close = () => { set_modal(false) };

  const handle_open_sub = () => { set_sub_modal(true) };
  const handle_close_sub = () => { set_sub_modal(false) };

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
      field: 'fecha_generacion',
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
            <InputLabel>Seleccionar</InputLabel>
              <Select
                size='small'
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
              onChange={(event: event)=>{
                const { value } = event.target
                set_filter(value)
              }}
            >
              <MenuItem value='nombre_de_usuario'>Nombre Usuario</MenuItem>
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
            if(filter === 'nombre_de_usuario'){
              for(let i=0; i < facilidades.length; i++){
                if(facilidades[i].nombre_de_usuario.toLowerCase().includes(search.toLowerCase())){
                  new_rows.push(facilidades[i])
                }
              }
              set_visible_rows(new_rows)
            }
            if(filter === 'identificacion'){
              for(let i=0; i < facilidades.length; i++){
                if(facilidades[i].identificacion.toLowerCase().includes(search.toLowerCase())){
                  new_rows.push(facilidades[i])
                }
              }
              set_visible_rows(new_rows)
            }
            if(filter === 'obligacion'){
              for(let i=0; i < facilidades.length; i++){
                if(facilidades[i].obligacion.toLowerCase().includes(search.toLowerCase())){
                  new_rows.push(facilidades[i])
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
            set_visible_rows(facilidades)
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
                    getRowId={(row) => row.identificacion}
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
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={() => {
                handle_open_sub();
                set_modal_option('no')
                handle_close()
            }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={()=>{
                handle_open_sub()
                set_modal_option('si')
                handle_close()
            }}
            >
              Guardar
            </Button>
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
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={()=>{
                handle_close_sub()
            }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
