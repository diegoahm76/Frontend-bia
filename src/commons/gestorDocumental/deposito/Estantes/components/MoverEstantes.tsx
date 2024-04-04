/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

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
import { useEstantesHook } from '../hooks/useEstantesHook';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/context';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../../../../hooks';
import { confirmarAccion } from '../../utils/function';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MoverEstantes: React.FC = () => {
  const {
    control_mover_estantes,
    errors_mover_estantes,
    reset_mover_estantes,
    set_value_mover_estantes,
    onsubmit_mover_estantes,

    selectedItem,
    handleSelectChange,

    open_dialog,
    handle_click_open,
    handle_close,

    //  * saving
    is_saving_mover_estante,
  } = useEstantesHook();

  const { depositos_selected_mover_estante, fetch_data_depositos } =
    useContext(DataContext);

  const { data_estantes, data_depositos } = useAppSelector(
    (state) => state.deposito
  );

  useEffect(() => {
    // reset();
    void fetch_data_depositos();
  }, []);

  useEffect(() => {
    // set_value_mover_estantes(
    //   'identificacion_estante',
    //   data_estantes?.identificacion_por_deposito
    // );
    // set_value_mover_estantes(
    //   'deposito_actual',
    //   data_depositos?.nombre_deposito
    // );
    //  console.log('')('entro');
    //  console.log('')('data_depositos', data_depositos);
    reset_mover_estantes({
      identificacion_estante: data_estantes?.identificacion_por_deposito,
      deposito_actual: data_depositos?.nombre_deposito,
      identificacion_por_entidad_destino: {
        value: '',
        label: '',
      },
    });
  }, [data_estantes, data_depositos]);
  useEffect(() => {
    set_value_mover_estantes(
      'identificacion_estante',
      data_estantes?.identificacion_por_deposito
    );
    set_value_mover_estantes(
      'deposito_actual',
      data_depositos?.nombre_deposito
    );
    //  console.log('')('entro primero');
    // reset_mover_estantes({
    //   identificacion_estante: data_estantes?.identificacion_por_deposito,
    //   deposito_actual: data_depositos?.nombre_deposito,
    //   identificacion_por_entidad_destino: {
    //     value: '',
    //     label: '',
    //   },
    // });
  }, []);

  return (
    <>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handle_click_open();
          }}
        >
          Mover estante
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
              void confirmarAccion(
                onsubmit_mover_estantes,
                '¿Estás seguro de mover el estante?'
              );
              // void onsubmit_mover_estantes(e);
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
                <Title title="Mover Estante a otro deposito de archivo" />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="identificacion_estante"
                  control={control_mover_estantes}
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
                      error={
                        !!errors_mover_estantes.identificacion_por_deposito
                      }
                      helperText={
                        errors_mover_estantes.identificacion_por_deposito
                          ? 'Es obligatorio ingresar una identificación'
                          : 'Ingrese una identificación'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="deposito_actual"
                  control={control_mover_estantes}
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
                      error={!!errors_mover_estantes.deposito_actual}
                      helperText={
                        errors_mover_estantes.deposito_actual
                          ? 'Es obligatorio ingresar el deposito actual'
                          : 'Ingrese el deposito actual'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller
                  name="identificacion_por_entidad_destino"
                  control={control_mover_estantes}
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
                        handleSelectChange(event);
                      }}
                      error={
                        !!errors_mover_estantes.identificacion_por_entidad_destino
                      }
                      helperText={
                        errors_mover_estantes.identificacion_por_entidad_destino
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
              </Grid>{' '}
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
                    disabled={!selectedItem || is_saving_mover_estante}
                    loading={is_saving_mover_estante}
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
