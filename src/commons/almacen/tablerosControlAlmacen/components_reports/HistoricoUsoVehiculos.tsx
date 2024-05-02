import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import { interface_busqueda_vehiculos, interface_historico_vehiculo, interface_inputs_huv } from '../interfaces/types';
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { control_error } from '../../../../helpers';
import { get_tipos_vehiculos } from '../thunks/tablerosControlAlmacen';
import SearchIcon from '@mui/icons-material/Search';
import ModalBusquedaVehiculos from '../manners/ModalBusquedaVehiculos';



interface props {
  inputs_huv: interface_inputs_huv;
  set_inputs_huv: Dispatch<SetStateAction<interface_inputs_huv>>;
  set_data_vehiculo_seleccionado: Dispatch<SetStateAction<interface_busqueda_vehiculos>>;
  set_data_huv: Dispatch<SetStateAction<interface_historico_vehiculo[]>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const HistoricoUsoVehiculos: FC<props> = ({
  inputs_huv,
  set_inputs_huv,
  set_data_vehiculo_seleccionado,
  set_data_huv,
}) => {
  const dispatch = useDispatch();

  const [mostrar_modal_vehiculo, set_mostrar_modal_vehiculo] = useState<boolean>(false);

  const [tipos_vehiculos, set_tipos_vehiculos] = useState<any[]>([]);


  const get_tipos_vehiculos_fc = () => {
    dispatch(get_tipos_vehiculos())
      .then((response: any) => {
        if (Object.keys(response).length !== 0) {
          set_tipos_vehiculos(response);
        } else {
          control_error('Error en el servidor al obtener tipos de documentos');
        }
      });
  }

  const servicios_obtenidos = useRef(false);
  useEffect(() => {
    if (!servicios_obtenidos.current) {
      get_tipos_vehiculos_fc();
      servicios_obtenidos.current = true;
    }
  }, [servicios_obtenidos]);


  return (
    <>
      <ModalBusquedaVehiculos
        set_mostrar_modal_vehiculo={set_mostrar_modal_vehiculo}
        mostrar_modal_vehiculo={mostrar_modal_vehiculo}
        set_data_vehiculo_seleccionado={set_data_vehiculo_seleccionado}
      />

      <Grid container item xs={12} spacing={2} rowSpacing={4}>
        <Grid item xs={12} lg={12}>
          <FormControl required size="small" fullWidth>
            <InputLabel>Tipo de consulta: </InputLabel>
            <Select
              label="Tipo de consulta: "
              value={inputs_huv.tipo_consulta}
              fullWidth
              onChange={(e: SelectChangeEvent) => {
                // limpiamos los datos de la tabla
                set_data_huv([]);
                // agregamos el nuevo valor
                set_inputs_huv({
                  ...inputs_huv,
                  tipo_consulta: e.target.value,
                });
              }}
            >
              <MenuItem value={'vehiculo_especifico'}>Vehículo especifico</MenuItem>
              <MenuItem value={'todos_vehiculos'}>Todos los vehículos</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {inputs_huv?.tipo_consulta === 'vehiculo_especifico' &&
          <>
            <Grid item xs={12} lg={8}>
              <TextField
                fullWidth
                label='Vehículo:'
                disabled
                value={inputs_huv.nombre_vehiculo ?? ''}
                onChange={
                  (e) => {
                    set_inputs_huv({
                      ...inputs_huv,
                      nombre_vehiculo: e.target.value,
                    });
                  }
                }
                size='small'
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => set_mostrar_modal_vehiculo(true)}
              >
                Búsqueda avanzada
              </Button>
            </Grid>
          </>
        }

        {inputs_huv?.tipo_consulta === 'todos_vehiculos' &&
          <>
            <Grid item xs={12} lg={6}>
              <FormControl required size="small" fullWidth>
                <InputLabel >Tipo vehículo:</InputLabel>
                <Select
                  label='Tipo vehículo:'
                  value={inputs_huv.tipo_vehiculo}
                  onChange={
                    (e) => {
                      set_inputs_huv({
                        ...inputs_huv,
                        tipo_vehiculo: e.target.value,
                      });
                    }
                  }
                >
                  {tipos_vehiculos.length !== 0 ?
                    tipos_vehiculos.map((item: any) => (
                      <MenuItem key={item[0]} value={item[0]}>{item[1]}</MenuItem>
                    ))
                    :
                    <MenuItem value=''>Cargando...</MenuItem>
                  }
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <FormControl required size="small" fullWidth>
                <InputLabel >Propiedad:</InputLabel>
                <Select
                  label='Propiedad:'
                  value={inputs_huv.propiedad}
                  onChange={
                    (e) => {
                      set_inputs_huv({
                        ...inputs_huv,
                        propiedad: e.target.value,
                      });
                    }
                  }
                >
                  <MenuItem value=''>Todos</MenuItem>
                  <MenuItem value='PENDIENTE'>Propio</MenuItem>
                  <MenuItem value='PENDIENTE'>Arrendado</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha desde:"
                  value={inputs_huv.fecha_desde ?? null}
                  onChange={(newValue) => {
                    set_inputs_huv({
                      ...inputs_huv,
                      fecha_desde: dayjs(newValue)?.format('YYYY-MM-DD') ?? '',
                    });
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}

                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha hasta:"
                  value={inputs_huv.fecha_hasta ?? null}
                  onChange={(newValue) => {
                    set_inputs_huv({
                      ...inputs_huv,
                      fecha_hasta: dayjs(newValue)?.format('YYYY-MM-DD') ?? '',
                    });
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </>
        }


      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default HistoricoUsoVehiculos;
