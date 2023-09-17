/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { v4 as uuidv4 } from 'uuid';
import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../components/Title';
import { control_error } from '../../../../../helpers';
import { search_expediente } from '../services/services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaExpedientes: React.FC = () => {

  const columns: GridColDef[] = [
    {
      field: 'orden_ubicacion_por_deposito',
      headerName: 'ORDEN DEL ESTANTE',
      sortable: true,
      width: 100,
    },
    {
      field: 'identificacion_por_deposito',
      headerName: 'IDENTIFICACIÓN DEL ESTANTE',
      sortable: true,
      width: 250,
    },
    {
      field: 'nombre_deposito',
      headerName: 'DEPÓSITO DE ARCHIVO',
      sortable: true,
      width: 250,
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      width: 250,
      renderCell: (params) => (
        <>
        </>
      ),
    },
  ];

  const {
    reset,
    handleSubmit: handle_submit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trd_nombre: '',
      fecha_apertura_expediente: '',
      id_serie_origen: '',
      id_subserie_origen: '',
      palabras_clave_expediente: '',
      titulo_expediente: '',
    },
  });

  const data_watch = watch();

  const [is_search, set_is_search] = useState(false);
  const [open_dialog, set_open_dialog] = useState(false);
  const [rows, set_rows] = useState<ExpedienteDocumental[]>([]);


  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    // reset();
    set_open_dialog(false);
  };

  const on_submit_advance = async (): Promise<any> => {
    const { trd_nombre,
      fecha_apertura_expediente,
      id_serie_origen,
      id_subserie_origen,
      palabras_clave_expediente,
      titulo_expediente, } =
      data_watch;

    try {
      set_is_search(true);
      set_rows([]);

      const {
        data: { data },
      } = await search_expediente({
        trd_nombre,
        fecha_apertura_expediente,
        id_serie_origen,
        id_subserie_origen,
        palabras_clave_expediente,
        titulo_expediente,
      });

      if (data?.length > 0) {
        set_rows(data);
      }
    } catch (error: any) {
      control_error(error.response?.data.detail);
    } finally {
      set_is_search(false);
    }
  };
  useEffect(() => {

    console.log('Hola Mundo')

  }, []);


  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Busqueda de expedientes abiertos" />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="titulo_expediente"
            control={control}
            render={(
              { field: { onChange, value } } // formState: { errors }
            ) => (
              <TextField
                fullWidth
                label="titulo del expediente"
                value={value}
                onChange={onChange}
                size="small"
                margin="dense"
                disabled={true}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={() => {
              handle_click_open();
            }}
          >
            Buscar
          </Button>
        </Grid>

      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="lg">
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void on_submit_advance();
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
                marginTop: '20px',
                marginLeft: '-5px',
              }}
            >
              <Title title="Búsqueda avanzada estantes" />
              <Grid container spacing={2} sx={{ mt: '10px', mb: '20px' }}>
                <Grid item xs={12} sm={6} md={3}>
                  <Controller
                    name="titulo_expediente"
                    control={control}
                    render={(
                      { field: { onChange, value } } // formState: { errors }
                    ) => (
                      <TextField
                        fullWidth
                        label="titulo del expediente"
                        value={value}
                        onChange={onChange}
                        size="small"
                        margin="dense"
                        disabled={false}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} container justifyContent="end">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SearchIcon />}
                    loading={is_search}
                    disabled={is_search}
                  // onClick={(e) => {
                  //   void on_submit_advance(e);
                  // }}
                  >
                    Buscar
                  </LoadingButton>
                </Grid>
                {rows.length > 0 && (
                  <>
                    <Grid item xs={12}>
                      <Title title="Resultados de la búsqueda" />
                      {/* <Typography>Resultados de la búsqueda</Typography> */}
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ width: '100%' }}>
                        <>
                          <DataGrid
                            density="compact"
                            autoHeight
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            getRowId={(row) => uuidv4()}
                          />
                        </>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              handle_close();
              // reset();
            }}
          >
            Cerrar
          </Button>{' '}
        </DialogActions>
      </Dialog>
    </>
  );
};
