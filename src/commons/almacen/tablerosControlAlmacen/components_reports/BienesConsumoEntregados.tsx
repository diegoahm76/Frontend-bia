import React, {
  FC,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import { interface_inputs_bce } from '../interfaces/types';
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
  inputs_bce: interface_inputs_bce;
  set_inputs_bce: Dispatch<SetStateAction<interface_inputs_bce>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BienesConsumoEntregados: FC<props> = ({
  inputs_bce,
  set_inputs_bce,
}) => {

  
  return (
    <>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} lg={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha desde:"
              value={inputs_bce.fecha_desde ?? null}
              onChange={(newValue) => {
                set_inputs_bce({
                  ...inputs_bce,
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
              value={inputs_bce.fecha_hasta ?? null}
              onChange={(newValue) => {
                set_inputs_bce({
                  ...inputs_bce,
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
export default BienesConsumoEntregados;
