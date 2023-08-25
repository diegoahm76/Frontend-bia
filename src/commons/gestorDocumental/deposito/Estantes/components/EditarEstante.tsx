/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Button, Grid, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { useEstantesHook } from '../hooks/useEstantesHook';
import { MoverEstantes } from './MoverEstantes';
import { useAppSelector } from '../../../../../hooks';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarEstante: React.FC = () => {
  const { control_estantes, errors_estantes, reset_estantes } =
    useEstantesHook();

  const { data_estantes } = useAppSelector((state) => state.deposito);

  useEffect(() => {
    reset_estantes({
      identificacion_por_deposito: data_estantes?.identificacion_por_deposito,
      orden: data_estantes?.orden_ubicacion_por_deposito,
      nuevo_orden: '',
    });
  }, [data_estantes]);

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
          <Title title="Edición de estantes" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="identificacion_por_deposito"
            control={control_estantes}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                size="small"
                label="Identificación"
                variant="outlined"
                value={value}
                disabled={false}
                required={true}
                onChange={onChange}
                error={!!errors_estantes.identificacion_por_deposito}
                helperText={
                  errors_estantes.identificacion_por_deposito
                    ? 'Es obligatorio ingresar una identificación'
                    : 'Ingrese una identificación'
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="orden"
            control={control_estantes}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                size="small"
                label="Orden"
                variant="outlined"
                disabled={true}
                value={value}
                required={false}
                onChange={onChange}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button variant="contained" color="primary" disabled={true}>
            Cambiar orden
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="nuevo_orden"
            control={control_estantes}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fullWidth
                size="small"
                // select
                placeholder="Nuevo Orden"
                label="Nuevo Orden"
                variant="outlined"
                value={value}
                disabled={true}
                required={false}
                onChange={onChange}
              />
            )}
          />
        </Grid>
        <Grid container spacing={2} justifyContent="flex-end">
          <MoverEstantes />
          <Grid item></Grid>
        </Grid>
      </Grid>
    </>
  );
};
