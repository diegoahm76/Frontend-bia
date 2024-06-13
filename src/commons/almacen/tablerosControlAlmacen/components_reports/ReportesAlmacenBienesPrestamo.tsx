import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
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
import { interface_inputs_rabp } from '../interfaces/types';
import { get_tipos_categorias } from '../thunks/tablerosControlAlmacen';
import { BuscadorPersonasReports } from './BuscadorPersonasReports';
import { InfoPersona } from '../../../../interfaces/globalModels';

interface props {
  inputs_rabp: interface_inputs_rabp;
  set_inputs_rabp: Dispatch<SetStateAction<interface_inputs_rabp>>;
  onResult: (data_persona: InfoPersona, param: string) => void;
  set_clear_persons: (bool: boolean) => void;
  seleccion_tablero_control: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ReportesAlmacenBienesPrestamo: FC<props> = ({
  inputs_rabp,
  set_inputs_rabp,
  onResult,
  set_clear_persons,
  seleccion_tablero_control,
}) => {
  const dispatch = useDispatch();

  useEffect(() => console.log(seleccion_tablero_control), [seleccion_tablero_control])

  const [tipos_categoria, set_tipos_categoria] = useState<any[]>([]);

  const get_tipos_categoria_fc = async () => {
    dispatch(get_tipos_categorias()).then((response: any) => {
      if (Object.keys(response).length !== 0) {
        set_tipos_categoria(response);
      } else {
        control_error('Hubo un error al obtener los tipos de categorias');
        set_tipos_categoria([]);
      }
    });
  };

  const servicios_obtenidos = useRef(false);
  useEffect(() => {
    if (!servicios_obtenidos.current) {
      get_tipos_categoria_fc();
      servicios_obtenidos.current = true;
    }
  }, [servicios_obtenidos]);

  return (
    <>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} lg={4}>
          <FormControl required size="small" fullWidth>
            <InputLabel>Categoria: </InputLabel>
            <Select
              label="Categoria :"
              value={inputs_rabp.tipo_categoria || ''}
              fullWidth
              onChange={(e: SelectChangeEvent) => {
                set_inputs_rabp({
                  ...inputs_rabp,
                  tipo_categoria: e.target.value,
                });
              }}
            >
              <MenuItem value={'Todos'}>Todos</MenuItem>
              {tipos_categoria?.length !== 0 ? (
                tipos_categoria?.map((tipo_movimiento) => (
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
              value={inputs_rabp.fecha_desde ?? null}
              onChange={(newValue) => {
                set_inputs_rabp({
                  ...inputs_rabp,
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
              value={inputs_rabp.fecha_hasta ?? null}
              onChange={(newValue) => {
                set_inputs_rabp({
                  ...inputs_rabp,
                  fecha_hasta: dayjs(newValue)?.format('YYYY-MM-DD') ?? '',
                });
              }}
              renderInput={(params) => (
                <TextField required fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>
        {seleccion_tablero_control == 'RABP' && <BuscadorPersonasReports
          set_clear_persons={set_clear_persons}
          onResult={onResult}
          seleccion_tablero_control={seleccion_tablero_control}
        />}
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ReportesAlmacenBienesPrestamo;
