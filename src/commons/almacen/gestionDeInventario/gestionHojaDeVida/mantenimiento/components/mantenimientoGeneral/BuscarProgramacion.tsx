import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Title } from '../../../../../../../components';
import { useAppDispatch } from '../../../../../../../hooks';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { get_programmed_maintenance, get_veh_programmed_maintenance } from './thunks/maintenanceThunks';
import { get_cv_vehicle_service } from '../../../hojaDeVidaVehiculo/store/thunks/cvVehiclesThunks';
import { get_cv_computer_service } from '../../../hojaDeVidaComputo/store/thunks/cvComputoThunks';
import { get_cv_others_service } from '../../../hojaDeVidaOtrosActivos/store/thunks/cvOtrosActivosThunks';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  title: string;
  parent_details: any;
  prog_details: any;
  tipo_articulo: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarProgramacionComponent = ({
  is_modal_active,
  set_is_modal_active,
  title,
  parent_details,
  prog_details,
  tipo_articulo,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [codigo, set_codigo] = useState<string>('');
  const [grid_busqueda, set_grid_busqueda] = useState<any[]>([]);
  const [grid_busqueda_before, set_grid_busqueda_before] = useState<any[]>([]);
  const [selected_product, set_selected_product] = useState<any | null>(null);
  const [articulo, set_articulo] = useState<any | null>(null);

  const [tipo_filtro, set_tipo_filtro] = useState<string>('F');
  const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
  const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
  const [km_desde, set_km_desde] = useState<string | null>(null);
  const [km_hasta, set_km_hasta] = useState<string | null>(null);

  const on_change_codigo: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_codigo(e.target.value);
  };

  const handle_change_filtro = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_tipo_filtro(e.target.value);
  }

  const handle_change_fecha_desde = (date: Date | null): void => {
    set_fecha_desde(date);
  };

  const handle_change_fecha_hasta = (date: Date | null): void => {
    set_fecha_hasta(date);
  };

  const handle_change_km_desde = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_km_desde(e.target.value);
  }

  const handle_change_km_hasta = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_km_hasta(e.target.value);
  }

  const accionar_busqueda: any = () => {
    if (tipo_articulo === 'vehículos') {
      dispatch(
        get_veh_programmed_maintenance(
          tipo_filtro,
          fecha_desde ? dayjs(fecha_desde).format('DD-MM-YYYY') : '',
          fecha_hasta ? dayjs(fecha_hasta).format('DD-MM-YYYY') : '',
          km_desde,
          km_hasta
        )
      ).then((response: any) => {
        set_grid_busqueda(response.detail);
        set_grid_busqueda_before([...response.detail]);
      });
    } else if (tipo_articulo === 'computadores') {
      dispatch(
        get_programmed_maintenance(
          dayjs(fecha_desde).format('DD-MM-YYYY'),
          dayjs(fecha_hasta).format('DD-MM-YYYY'),
          'Com'
        )
      ).then((response: any) => {
        set_grid_busqueda(response.detail);
        set_grid_busqueda_before([...response.detail]);
      });
    } else {
      dispatch(
        get_programmed_maintenance(
          dayjs(fecha_desde).format('DD-MM-YYYY'),
          dayjs(fecha_hasta).format('DD-MM-YYYY'),
          'OAc'
        )
      ).then((response: any) => {
        set_grid_busqueda(response.detail);
        set_grid_busqueda_before([...response.detail]);
      });
    }
    //  console.log('')(grid_busqueda_before);
  };

  const selected_product_grid: any = () => {
    if (selected_product !== null) {
      if (tipo_articulo === 'vehículos') {
        dispatch(get_cv_vehicle_service(selected_product.articulo)).then(
          (response: any) => {
            set_articulo(response.data);
            parent_details(response.data);
          }
        );
      } else if (tipo_articulo === 'computadores') {
        dispatch(get_cv_computer_service(selected_product.articulo)).then(
          (response: any) => {
            set_articulo(response.data);
            parent_details(response.data);
          }
        );
      } else {
        dispatch(get_cv_others_service(selected_product.articulo)).then(
          (response: any) => {
            set_articulo(response.data);
            parent_details(response.data);
          }
        );
      }
      prog_details(selected_product);
      set_is_modal_active(false);
    }
  };

  useEffect(() => {
    parent_details(articulo);
  }, [articulo, parent_details]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText
          component={'span'}
          id="alert-dialog-slide-description"
        >
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={3}>
                <TextField
                  label="Código"
                  helperText="Ingrese código"
                  size="small"
                  fullWidth
                  value={codigo}
                  onChange={on_change_codigo}
                />
              </Grid> */}
              {tipo_articulo === 'vehículos' && <Grid item xs={12} sm={3}>
                <TextField
                  select
                  label="Tipo de filtro"
                  helperText="Seleccione un tipo de filtro"
                  size="small"
                  fullWidth
                  value={tipo_filtro}
                  onChange={handle_change_filtro}
                >
                  <MenuItem value=""><em>Selecciona una opción</em></MenuItem>
                  <MenuItem value="F">Fecha</MenuItem>
                  <MenuItem value="K">Kilometraje</MenuItem>
                </TextField>
              </Grid>}
              {tipo_articulo === 'vehículos' && tipo_filtro == 'F' &&
                <>
                  <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha desde"
                        value={fecha_desde}
                        onChange={(newValue) => {
                          handle_change_fecha_desde(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField required fullWidth size="small" {...params} />
                        )}
                        maxDate={fecha_hasta}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha hasta"
                        value={fecha_hasta}
                        onChange={(newValue) => {
                          handle_change_fecha_hasta(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField required fullWidth size="small" {...params} />
                        )}
                        minDate={fecha_desde}
                        disabled={fecha_desde == null}
                      />
                    </LocalizationProvider>
                  </Grid>
                </>
              }
              {tipo_articulo !== 'vehículos' &&
                <>
                  <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha desde"
                        value={fecha_desde}
                        onChange={(newValue) => {
                          handle_change_fecha_desde(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField required fullWidth size="small" {...params} />
                        )}
                        maxDate={fecha_hasta}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Fecha hasta"
                        value={fecha_hasta}
                        onChange={(newValue) => {
                          handle_change_fecha_hasta(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField required fullWidth size="small" {...params} />
                        )}
                        minDate={fecha_desde}
                        disabled={fecha_desde == null}
                      />
                    </LocalizationProvider>
                  </Grid>
                </>
              }
              {tipo_filtro == 'K' &&
                <>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Kilometraje desde"
                      helperText="Ingrese kilómetros"
                      size="small"
                      fullWidth
                      value={km_desde}
                      onChange={handle_change_km_desde}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Kilometraje hasta"
                      helperText="Ingrese kilómetros"
                      size="small"
                      fullWidth
                      value={km_hasta}
                      onChange={handle_change_km_hasta}
                    />
                  </Grid>
                </>
              }
              <Stack
                direction="row"
                sx={{ mt: '17px' }}
              >
                <Grid item xs={12} sm={3} sx={{ml: '1rem'}}>
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={accionar_busqueda}
                    disabled={!tipo_filtro}
                  >
                    Buscar
                  </Button>
                </Grid>
              </Stack>
            </Grid>
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
              <Grid item xs={12} sm={12}>
                <Title title="Resultados" />
                <Box sx={{ width: '100%', mt: '20px' }}>
                  <div className="card">
                    <DataTable
                      value={grid_busqueda}
                      sortField="nombre"
                      stripedRows
                      paginator
                      rows={5}
                      rowsPerPageOptions={[5, 10, 25, 50]}
                      tableStyle={{ minWidth: '50rem' }}
                      selectionMode="single"
                      selection={selected_product}
                      onSelectionChange={(e) => {
                        set_selected_product(e.value);
                      }}
                      dataKey="id_programacion_mantenimiento"
                    >
                      <Column
                        field="placa"
                        header="Placa"
                        style={{ width: '20%' }}
                      ></Column>
                      <Column
                        field="tipo_descripcion"
                        header="Tipo mantenimiento"
                        style={{ width: '30%' }}
                      ></Column>
                      <Column
                        field="fecha"
                        header="Fecha programado"
                        style={{ width: '30%' }}
                      ></Column>
                      {tipo_articulo === 'vehículos' && <Column
                        field="kilometraje_programado"
                        header="Kilometraje programado"
                        style={{ width: '30%' }}
                      ></Column>}
                      <Column
                        field="marca"
                        header="Marca"
                        style={{ width: '20%' }}
                      ></Column>
                      <Column
                        field="estado"
                        header="Estado"
                        style={{ width: '20%' }}
                      ></Column>
                    </DataTable>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={selected_product_grid}
        >
          Seleccionar
        </Button>
        <Button
          color="inherit"
          variant="contained"
          onClick={() => {
            set_is_modal_active(false);
          }}
        >
          Salir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default BuscarProgramacionComponent;