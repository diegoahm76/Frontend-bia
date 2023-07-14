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
import FormInputController from '../../../../components/partials/form/FormInputController';
import FormDatePickerController from '../../../../components/partials/form/FormDatePickerController';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function DetailAperturaCierreViveroScreen(): JSX.Element {
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
    if (id !== null && id !== undefined) {
      void dispatch(get_nursery_service(id));
    } else set_nursery(current_nursery);
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
        : current_nursery.en_funcionamiento !== true
        ? 'Cerrar'
        : 'Abrir'
    );
    if (current_nursery.en_funcionamiento !== true) {
      if (current_nursery.id_persona_cierra !== null) {
        void dispatch(
          get_person_id_service(current_nursery.id_persona_cierra ?? 0)
        );
      }
    } else {
      if (current_nursery.id_persona_abre !== null) {
        void dispatch(
          get_person_id_service(current_nursery.id_persona_abre ?? 0)
        );
      }
    }
  }, [current_nursery]);

  useEffect(() => {
    reset_nursery(nursery);
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    set_action(
      nursery.id_vivero === null
        ? ''
        : nursery.en_funcionamiento !== true
        ? 'Cerrar'
        : 'Abrir'
    );
  }, [nursery]);

  const nurseries_closing = {
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
                ? `Detalle de apertura de vivero ${current_nursery.nombre}`
                : `Detalle de cierre de vivero ${current_nursery.nombre}`
            }
          ></Title>

          <Grid item xs={11} md={12} margin={2}>
            <Autocomplete
              {...nurseries_closing}
              disabled
              id="controlled-demo"
              value={nursery}
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
                label="El vivero se encuentra abierto"
                color="success"
                variant="outlined"
              />
            ) : action === 'Cerrar' ? (
              <Chip
                label="El vivero se encuentra cerrado"
                color="error"
                variant="outlined"
              />
            ) : null}
          </Grid>
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
                ? 'Persona que realizó apertura'
                : 'Persona que realizó el cierre'
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
            control_name={
              action === 'Abrir'
                ? 'fecha_ultima_apertura'
                : 'fecha_cierre_actual'
            }
            default_value={''}
            rules={{}}
            label={action === 'Abrir' ? 'Fecha de apertura' : 'Fecha de cierre'}
            disabled={true}
            format={'YYYY-MM-DD'}
            helper_text={''}
            hidden_text={nursery.id_vivero === null}
          />

          {action === 'Abrir' ? (
            <Grid item xs={11} md={12} margin={2}>
              <Controller
                name={'justificacion_apertura'}
                control={control_vivero}
                defaultValue={current_nursery.justificacion_apertura}
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    disabled
                    fullWidth
                    multiline
                    rows={4}
                    size="small"
                    label={'Justificación de apertura'}
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
          ) : action === 'Cerrar' ? (
            <Grid item xs={11} md={12} margin={2}>
              <Controller
                name={'justificacion_cierre'}
                control={control_vivero}
                defaultValue={current_nursery.justificacion_cierre}
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
                    label={'Justificación de cierre'}
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
          ) : null}
        </Grid>
      </Grid>
    </>
  );
}
