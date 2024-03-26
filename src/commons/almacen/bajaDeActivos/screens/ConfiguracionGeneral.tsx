import React, { useState } from 'react';
import { Button, CircularProgress, Grid, TextField } from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { control_error } from '../../../../helpers';


interface props {
  set_formulario_valido: React.Dispatch<React.SetStateAction<boolean>>;
  set_position_tab: React.Dispatch<React.SetStateAction<string>>;
  set_fecha_registro: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  fecha_registro: Dayjs | null;
  set_concepto: React.Dispatch<React.SetStateAction<string>>;
  concepto: string;
  set_consecutivo: React.Dispatch<React.SetStateAction<number | null>>;
  consecutivo: number | null;
  set_consecutivo_buscar: React.Dispatch<React.SetStateAction<number>>;
  consecutivo_buscar: number;
  get_obtener_registro_baja_fc: () => Promise<void>;
  accion: string;
  set_accion: React.Dispatch<React.SetStateAction<string>>;
  set_loadding_registro_baja: React.Dispatch<React.SetStateAction<boolean>>;
  loadding_registro_baja: boolean
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ConfiguracionGeneral: React.FC<props> = ({
  set_formulario_valido,
  set_position_tab,
  set_fecha_registro,
  fecha_registro,
  set_concepto,
  concepto,
  set_consecutivo,
  consecutivo,
  set_consecutivo_buscar,
  consecutivo_buscar,
  get_obtener_registro_baja_fc,
  set_accion,
  accion,
  set_loadding_registro_baja,
  loadding_registro_baja
  }) => {


  const cambio_fecha_registro = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_registro(date);
    }
  };

  const buscar_registro = async() => {
    set_loadding_registro_baja(true)
    await get_obtener_registro_baja_fc();
    set_accion('editar');
  }

  return (
    <>
      <Grid container item xs={12} rowSpacing={4} columnSpacing={2}>
        <Grid container item xs={12} lg={3}>
          <TextField
            fullWidth
            disabled
            label='Consecutivo creación de baja:'
            size='small'
            value={consecutivo === null ? 'Cargando...' : consecutivo_buscar === 0 ? consecutivo : ''}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              set_consecutivo(Number(event.target.value));
            }}
          />
        </Grid>

        <Grid container item xs={12} lg={3}>
          <TextField
            type='number'
            fullWidth
            disabled={accion === 'crear' && concepto !== '' ? true : loadding_registro_baja && true}
            label='Consecutivo a buscar:'
            size='small'
            value={consecutivo_buscar === 0 ? '' : consecutivo_buscar}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              set_consecutivo_buscar(Number(event.target.value));
            }}
          />
        </Grid>

        <Grid container item xs={12} lg={2}>
          <Button
            fullWidth
            type='button'
            variant='contained'
            disabled={accion === 'crear' && concepto !== '' || loadding_registro_baja}
            color='primary'
            startIcon={loadding_registro_baja ? <CircularProgress size={25} /> :<SearchIcon />}
            onClick={buscar_registro}
          >
            {loadding_registro_baja ? '' : 'Buscar Registro'}
          </Button>
        </Grid>

        <Grid container item xs={12} lg={4} sx={{
          display: "flex",
          justifyContent: "end",
          }}>
          <Grid item xs={12} lg={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label='Fecha de registro: '
                value={fecha_registro}
                onChange={(newValue) => {
                  cambio_fecha_registro(newValue);
                }}
                renderInput={(params) => (
                  <TextField disabled required fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid> 
        
        <Grid container item xs={12}>
          <TextField
            fullWidth
            required
            label='Concepto: '
            rows={4}
            multiline
            size='small'
            value={concepto}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              set_concepto(event.target.value);
            }}
          />
        </Grid>

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ConfiguracionGeneral;