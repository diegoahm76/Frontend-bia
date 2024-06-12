import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import { interface_inputs_mafi } from '../interfaces/types';
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { control_error } from '../../../../helpers';
import { get_tipos_movimientos } from '../thunks/tablerosControlAlmacen';

interface props {
  inputs_mafi: interface_inputs_mafi;
  set_inputs_mafi: Dispatch<SetStateAction<interface_inputs_mafi>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const MovimientosActivosFijosInventario: FC<props> = ({
  inputs_mafi,
  set_inputs_mafi,
}) => {
  const dispatch = useDispatch();

  const [tipos_movimientos, set_tipos_movimientos] = useState<any[]>([]);

  const get_tipos_movimientos_fc = async () => {
    dispatch(get_tipos_movimientos()).then((response: any) => {
      if (Object.keys(response).length !== 0) {
        set_tipos_movimientos(response);
      } else {
        control_error('Hubo un error al obtener los tipos de movimientos de activos fijos. Intente de nuevo.');
        set_tipos_movimientos([]);
      }
    });
  };

  const servicios_obtenidos = useRef(false);
  useEffect(() => {
    if (!servicios_obtenidos.current) {
      get_tipos_movimientos_fc();
      servicios_obtenidos.current = true;
    }
  }, [servicios_obtenidos]);

  return (
    <>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} lg={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel>Tipo de activo: </InputLabel>
            <Select
              label="Tipo de activo :"
              value={inputs_mafi.tipo_activo}
              fullWidth
              onChange={(e: SelectChangeEvent) => {
                set_inputs_mafi({
                  ...inputs_mafi,
                  tipo_activo: e.target.value,
                });
              }}
            >
              <MenuItem value={'Todos'}>Todos</MenuItem>
              {tipos_movimientos?.length !== 0 ? (
                tipos_movimientos?.map((tipo_movimiento) => (
                  <MenuItem key={tipo_movimiento[0]} value={tipo_movimiento[0]}>
                    {tipo_movimiento[1]}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={''}>Cargando...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha desde:"
              value={inputs_mafi.fecha_desde ?? null}
              onChange={(newValue) => {
                set_inputs_mafi({
                  ...inputs_mafi,
                  fecha_desde: dayjs(newValue)?.format('YYYY-MM-DD') ?? '',
                });
              }}
              renderInput={(params) => (
                <TextField required fullWidth size="small" {...params} />
              )}

            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha hasta:"
              value={inputs_mafi.fecha_hasta ?? null}
              onChange={(newValue) => {
                set_inputs_mafi({
                  ...inputs_mafi,
                  fecha_hasta: dayjs(newValue)?.format('YYYY-MM-DD') ?? '',
                });
              }}
              renderInput={(params) => (
                <TextField required fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default MovimientosActivosFijosInventario;
