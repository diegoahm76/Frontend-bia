/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField, Chip } from '@mui/material';
import { Title } from '../../../../components';
import {
  get_nurseries_closing_service,
  get_nursery_service,
  get_person_id_service,
} from '../store/thunks/gestorViveroThunks';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IObjNursery } from '../interfaces/vivero';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import FormDatePickerController from '../../../../components/partials/form/FormDatePickerController';
import FormInputController from '../../../../components/partials/form/FormInputController';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function DetailCuarentenaViveroScreen(): JSX.Element {
  const { nurseries, current_nursery, persona } = useAppSelector(
    (state) => state.nursery
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [action, set_action] = useState<string>('');

  const [nursery, set_nursery] = useState<IObjNursery>(current_nursery);

  const { control: control_vivero, reset: reset_nursery } =
    useForm<IObjNursery>();

  useEffect(() => {
    void dispatch(get_nurseries_closing_service());
    //  console.log('')(id);
    if (id !== null && id !== undefined) {
      void dispatch(get_nursery_service(id));
    } else {
      set_nursery(current_nursery);
    }
  }, []);
  useEffect(() => {
    reset_nursery({ ...current_nursery, persona: persona.nombre_completo });
  }, [persona]);

  useEffect(() => {
    set_nursery(current_nursery);
    reset_nursery(current_nursery);
    set_action(
      current_nursery.id_vivero === null
        ? ''
        : current_nursery.vivero_en_cuarentena !== true
        ? 'Abrir'
        : 'Cerrar'
    );
    if (current_nursery.id_persona_cuarentena !== null) {
      void dispatch(
        get_person_id_service(current_nursery.id_persona_cuarentena ?? 0)
      );
    }
  }, [current_nursery]);

  useEffect(() => {
    reset_nursery(nursery);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    set_action(
      nursery.id_vivero === null
        ? ''
        : nursery.vivero_en_cuarentena !== true
        ? 'Abrir'
        : 'Cerrar'
    );
  }, [nursery]);

  const nurseries_quarantine = {
    options: nurseries,
    getOptionLabel: (option: IObjNursery) => option.nombre,
  };

  return (
    <>
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
        <Grid container>
          <Title
            title={
              action === 'Abrir'
                ? `Detalle de salida de cuarentena de vivero ${current_nursery.nombre}`
                : `Detalle de ingreso a cuarentena de vivero ${current_nursery.nombre}`
            }
          ></Title>

          <Grid item xs={11} md={12} margin={2}>
            <Autocomplete
              {...nurseries_quarantine}
              id="controlled-demo"
              value={nursery}
              disabled
              onChange={(event: any, newValue: any) => {
                set_nursery(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Vivero" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={11} md={12} margin={2}>
            {action === 'Abrir' ? (
              <Chip
                label="El vivero no se encuentra en cuarentena"
                color="success"
                variant="outlined"
              />
            ) : action === 'Cerrar' ? (
              <Chip
                label="El vivero se encuentra en cuarentena"
                color="error"
                variant="outlined"
              />
            ) : null}
          </Grid>

          {action !== '' ? (
            <>
              <FormInputController
                xs={11}
                md={12}
                margin={2}
                control_form={control_vivero}
                control_name="persona"
                default_value=""
                rules={{}}
                label={
                  action === 'Abrir'
                    ? 'Persona que realizó salida de cuarentena'
                    : 'Persona que realizó ingreso a cuarentena'
                }
                type="text"
                disabled={true}
                helper_text=""
                hidden_text={nursery.id_vivero === null}
              />

              <FormDatePickerController
                xs={11}
                md={12}
                margin={2}
                control_form={control_vivero}
                control_name={'fecha_inicio_cuarenten'}
                default_value={new Date()}
                rules={{}}
                label={
                  action === 'Abrir'
                    ? 'Fecha de salida de cuarentena'
                    : 'Fecha de ingreso a cuarentena'
                }
                disabled={true}
                format={'YYYY-MM-DD'}
                helper_text={''}
                hidden_text={nursery.id_vivero === null}
              />
              <Grid item xs={11} md={12} margin={2}>
                <Controller
                  name={'justificacion_cuarentena'}
                  control={control_vivero}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      multiline
                      disabled
                      rows={4}
                      size="small"
                      label={
                        nursery.vivero_en_cuarentena
                          ? 'Justificación de finalización de la cuarentena'
                          : 'Justificación de ingreso a cuarentena'
                      }
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar justificación'
                          : ''
                      }
                    />
                  )}
                />
              </Grid>
            </>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
