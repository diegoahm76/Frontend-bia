/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../../../../hooks';
import { DataContext } from '../../Estantes/context/context';
import { useCajaHook } from '../hook/useCajaHook';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IProps {
  Disabled: boolean;
}
export const MoverCaja: React.FC<IProps> = ({ Disabled }: IProps) => {
  const {
    control_mover_cajas,
    errors_mover_cajas,

    set_value_mover_cajas,
    onsubmit_mover_cajas,

    handleSelectChange,

    open_dialog,
    handle_click_open,
    handle_close,

    //  * saving
    is_saving_mover_caja,
  } = useCajaHook();

  const {
    depositos_selected_mover_estante,
    estantes_selected,
    bandejas_selected,
    id_deposito,
    id_estante,
    fetch_data_depositos_mover_caja,
    fetch_data_estantes_mover_cajas,
    fetch_data_bandejas_mover_caja,
  } = useContext(DataContext);

  const { cajas } = useAppSelector((state) => state.deposito);

  useEffect(() => {
    void fetch_data_depositos_mover_caja();
  }, []);

  useEffect(() => {
    if (id_deposito) {
      void fetch_data_estantes_mover_cajas();
    }
    if (id_estante) {
      void fetch_data_bandejas_mover_caja();
    }
  }, [id_deposito, id_estante]);

  useEffect(() => {
    set_value_mover_cajas?.('deposito_actual', cajas?.identificacion_deposito);
    set_value_mover_cajas?.('Estante_actual', cajas?.identificacion_estante);
    set_value_mover_cajas?.('bandeja_actual', cajas?.identificacion_bandeja);
    set_value_mover_cajas?.('caja_actual', cajas?.identificacion_caja);
  }, [cajas]);

  return (
    <>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          disabled={Disabled}
          onClick={() => {
            handle_click_open();
          }}
        >
          Mover Caja
        </Button>
      </Grid>
      <Dialog open={open_dialog} onClose={handle_close} fullWidth maxWidth="md">
        <DialogContent>
          <form
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void onsubmit_mover_cajas();
            }}
          >
            <Grid
              container
              spacing={2}
              m={1}
              p={1}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '10px',
                m: '10px 0 10px 0',
                mb: '10px',
                boxShadow: '0px 3px 6px #042F4A26',
              }}
            >
              <Grid item xs={12}>
                <Title title="Mover caja a otra bandeja" />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="caja_actual"
                  control={control_mover_cajas}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      label="Identificación de la caja"
                      variant="outlined"
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                      error={!!errors_mover_cajas.caja_actual}
                      helperText={
                        errors_mover_cajas.caja_actual
                          ? 'Es obligatorio ingresar una identificación'
                          : 'Ingrese una identificación'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="deposito_actual"
                  control={control_mover_cajas}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Depósito de archivo actual"
                      variant="outlined"
                      disabled={true}
                      value={value}
                      required={true}
                      onChange={onChange}
                      error={!!errors_mover_cajas.deposito_actual}
                      helperText={
                        errors_mover_cajas.deposito_actual
                          ? 'Es obligatorio ingresar el deposito actual'
                          : 'Ingrese el deposito actual'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="Estante_actual"
                  control={control_mover_cajas}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Identificación estante"
                      variant="outlined"
                      value={value}
                      disabled={true}
                      required={true}
                      onChange={onChange}
                      error={!!errors_mover_cajas.Estante_actual}
                      helperText={
                        errors_mover_cajas.Estante_actual
                          ? 'Es obligatorio ingresar una identificación'
                          : 'Ingrese una identificación'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="bandeja_actual"
                  control={control_mover_cajas}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Bandeja actual"
                      variant="outlined"
                      disabled={true}
                      value={value}
                      required={true}
                      onChange={onChange}
                      error={!!errors_mover_cajas.bandeja_actual}
                      helperText={
                        errors_mover_cajas.bandeja_actual
                          ? 'Es obligatorio ingresar el deposito actual'
                          : 'Ingrese el deposito actual'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="deposito_destino"
                  control={control_mover_cajas}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Depósito de archivo destino"
                      placeholder="Depósito de archivo destino"
                      select
                      size="small"
                      margin="dense"
                      disabled={false}
                      fullWidth
                      required={true}
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                        handleSelectChange(event, 'deposito');
                      }}
                      error={!!errors_mover_cajas.deposito_destino}
                      helperText={
                        errors_mover_cajas.deposito_destino
                          ? 'Es obligatorio ingresar el deposito de destino'
                          : 'Ingrese el deposito de destino'
                      }
                    >
                      {depositos_selected_mover_estante.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="estante_destino"
                  control={control_mover_cajas}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Estante destino"
                      placeholder="Estante destino"
                      select
                      size="small"
                      margin="dense"
                      disabled={!id_deposito}
                      fullWidth
                      required={true}
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                        handleSelectChange(event, 'estante');
                      }}
                      error={!!errors_mover_cajas.estante_destino}
                      helperText={
                        errors_mover_cajas.estante_destino
                          ? 'Es obligatorio ingresar el estante de destino'
                          : 'Ingrese el estante de destino'
                      }
                    >
                      {estantes_selected.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Controller
                  name="bandeja_destino"
                  control={control_mover_cajas}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Bandeja destino"
                      placeholder="Bandeja destino"
                      select
                      size="small"
                      margin="dense"
                      disabled={!id_estante}
                      fullWidth
                      required={true}
                      value={value}
                      onChange={(event) => {
                        onChange(event);
                        handleSelectChange(event);
                      }}
                      error={!!errors_mover_cajas.bandeja_destino}
                      helperText={
                        errors_mover_cajas.bandeja_destino
                          ? 'Es obligatorio ingresar la bandeja de destino'
                          : 'Ingrese la bandeja de destino'
                      }
                    >
                      {bandejas_selected.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                  <LoadingButton
                    variant="outlined"
                    color="error"
                    disabled={false}
                    onClick={handle_close}
                  >
                    Descartar
                  </LoadingButton>
                </Grid>
                <Grid item>
                  <LoadingButton
                    variant="outlined"
                    color="success"
                    disabled={is_saving_mover_caja}
                    loading={is_saving_mover_caja}
                    type="submit"
                  >
                    Aceptar
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
