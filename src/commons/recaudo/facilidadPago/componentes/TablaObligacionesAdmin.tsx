/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid, Box, IconButton, Avatar, Tooltip, FormControl, Select, InputLabel, MenuItem, Stack, Button, TextField, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { SearchOutlined, FilterAltOffOutlined, Close, ManageAccounts } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type event, type FacilidadPago, type Funcionario } from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { get_facilidad_solicitud } from '../slices/SolicitudSlice';
import { get_filtro_fac_pago_ingresadas, get_facilidades_ingresadas } from '../slices/FacilidadesSlice';
import { put_asignacion_funcionario } from '../requests/requests';

interface RootStateFacilidades {
  facilidades: {
    facilidades: FacilidadPago[];
  }
}

interface RootStateFuncionarios {
  funcionarios: {
    funcionarios: Funcionario[];
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
  const [modal_asignacion, set_modal_asignacion] = useState(false);
  const [funcionario_selected, set_funcionario_selected] = useState(0);
  const [facilidad_selected, set_facilidad_selected] = useState(0);
  const { facilidades } = useSelector((state: RootStateFacilidades) => state.facilidades);
  const { funcionarios } = useSelector((state: RootStateFuncionarios) => state.funcionarios);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();

  const handle_open = () => { set_modal(true) };
  const handle_close = () => { set_modal(false) };

  const handle_open_sub = () => { set_sub_modal(true) };
  const handle_close_sub = () => { set_sub_modal(false) };

  const columns: GridColDef[] = [
    {
      field: 'nombre_de_usuario',
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
      width: 200,
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
                    void dispatch(get_facilidad_solicitud(params.row.id_facilidad));
                    navigate('../solicitud');
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
      field: 'nombre_funcionario',
      headerName: 'Asignación',
      width: 300,
      renderCell: (params) => {
        return modal_asignacion ? (
          <FormControl sx={{ minWidth: 110 }}>
            <InputLabel>Seleccionar</InputLabel>
              <Select
                size='small'
                label="Seleccionar"
                defaultValue={params.value}
                onChange={(event: event) => {
                  const { value } = event.target
                  for(let i=0; i<funcionarios.length; i++){
                    if(funcionarios[i].nombre_funcionario === value){
                      set_funcionario_selected(funcionarios[i].id_persona);
                      set_facilidad_selected(params.row.id_facilidad);
                      handle_open();
                    }
                  }
                }}
              >
                {
                  funcionarios.map((funcionario) => (
                    <MenuItem key={funcionario.id_persona} value={funcionario.nombre_funcionario}>{funcionario.nombre_funcionario}</MenuItem>
                  ))
                }
              </Select>
          </FormControl>
        ) : (
          <>
            <Tooltip title="Reasignar">
              <IconButton
                onClick={() => {
                  set_modal_asignacion(true)
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
                  <ManageAccounts
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.value}
            </div>
          </>
        )
      },
    },
  ];

  useEffect(() => {
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
              void dispatch(get_filtro_fac_pago_ingresadas({parametro: filter, valor: search}));
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
              void dispatch(get_facilidades_ingresadas());
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
                    getRowId={(row) => row.id_facilidad}
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
        <Box component="form">
          <DialogTitle>¿Está seguro de realizar la reasignación de usuario?</DialogTitle>
          <DialogActions>
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={() => {
                try {
                  handle_open_sub();
                  set_modal_option('no');
                  handle_close();
                } catch (error: any) {
                  throw new Error(error);
                }
            }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => {
                try {
                  void put_asignacion_funcionario(facilidad_selected, {id_funcionario: funcionario_selected});
                  handle_open_sub();
                  set_modal_option('si');
                  handle_close();
                } catch (error: any) {
                  throw new Error(error);
                }
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
        <Box component="form">
          <DialogTitle>{modal_option === 'si' ? 'Reasignación ejecutada con éxito' : 'Reasignación cancelada'}</DialogTitle>
          <DialogActions>
            <Button
              variant='outlined'
              color="primary"
              startIcon={<Close />}
              onClick={() => {
                try {
                  void dispatch(get_facilidades_ingresadas());
                  set_modal_asignacion(false);
                  handle_close_sub();
                } catch (error: any) {
                  throw new Error(error);
                }
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
