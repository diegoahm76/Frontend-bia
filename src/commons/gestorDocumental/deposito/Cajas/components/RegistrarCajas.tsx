/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Button, Grid, MenuItem, TextField } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { useAppSelector } from '../../../../../hooks';
import { lazy, useContext, useEffect } from 'react';
import { DataContext } from '../../Estantes/context/context';
import { useCajaHook } from '../hook/useCajaHook';
// import { MoverCaja } from './MoverCaja';
// import Select from 'react-select';

const MoverCaja = lazy(async () => {
    const module = await import('../components/MoverCaja');
    return { default: module.MoverCaja };
  });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistrarCaja: React.FC = () => {
  const {
    control_cajas,
    errors_cajas,
    reset_cajas,
    // set_value_estantes,
    // * habilitar campos orden
    is_habilita_cambiar_orden_cajas,
    set_is_habilita_cambiar_orden_cajas,
    is_habilita_nuevo_orden,
    set_is_habilita_nuevo_orden,
    set_orden,
    set_nuevo_orden,
  } = useCajaHook();

  const { data_estantes } = useAppSelector((state) => state.deposito);

  const { nuevo_orden_estantes_selected } = useContext(DataContext);

//   useEffect(() => {
//     reset_cajas({
//       identificacion_por_deposito: data_estantes?.identificacion_por_deposito,
//       orden: data_estantes?.orden_ubicacion_por_deposito,
//       nuevo_orden: '',
//     });
//     set_orden(data_estantes?.orden_ubicacion_por_deposito);
//   }, [data_estantes]);

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
            name="identificacion_por_bandeja"
            control={control_cajas}
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
                error={!!errors_cajas.identificacion_por_bandeja}
                helperText={
                  errors_cajas.identificacion_por_bandeja
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
            control={control_cajas}
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
          <Button
            variant="contained"
            color="primary"
            disabled={is_habilita_cambiar_orden_cajas}
            onClick={() => {
              set_is_habilita_cambiar_orden_cajas(true);
              set_is_habilita_nuevo_orden(false);
            }}
          >
            Cambiar orden
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Controller
            name="nuevo_orden"
            control={control_cajas}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Nuevo orden"
                placeholder="Nuevo orden"
                select
                size="small"
                margin="dense"
                disabled={is_habilita_nuevo_orden}
                fullWidth
                required={false}
                value={value}
                onChange={(e) => {
                  onChange(e);
                  console.log(e.target.value, 'e.target.value');
                  set_nuevo_orden(Number(e.target.value));
                }}
              >
                {nuevo_orden_estantes_selected.map((option) => (
                  <MenuItem key={option.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />{' '}
        </Grid>

        {/* <Grid
          item
          xs={12}
          sm={6}
          md={3}
          // sx={{
          //   marginTop: '25px',
          //   marginBottom: '10px',
          // }}
        >
          <Controller
            name="nuevo_orden"
            control={control_cajas}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <div>
                <Select
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: '100%',
                      minHeight: '100%',
                    }),
                  }}
                  value={value}
                  onChange={onChange}
                  options={nuevo_orden_estantes_selected}
                  placeholder="Seleccionar"
                  isDisabled={is_habilita_nuevo_orden}
                />
                <label>
                  <small
                    style={{
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontWeight: 'thin',
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                      // marginLeft: '0.25rem'
                    }}
                  >
                    Nuevo orden
                  </small>
                </label>
              </div>
            )}
          />
        </Grid> */}
        <Grid container spacing={2} justifyContent="flex-end">
          <MoverCaja />
          <Grid item></Grid>
        </Grid>
      </Grid>
    </>
  );
};
