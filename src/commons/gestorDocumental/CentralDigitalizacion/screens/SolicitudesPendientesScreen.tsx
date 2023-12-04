import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import DigitalizacionesPendientes from '../componentes/SolicitudesPendientes/DigitalizacionesPendientes';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';
import { reset_state } from '../store/slice/centralDigitalizacionSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import {} from '../store/thunks/pqrsdfThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SolicitudesPendientesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { person } = useAppSelector(
    (state) => state.central_digitalizacion_slice
  );
  const initial_values = (): void => {};

  useEffect(() => {}, []);

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
        <Grid item xs={12} marginY={2}>
          <Title title="Central de digitalización"></Title>
        </Grid>
        <DigitalizacionesPendientes />

        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={null}
              icon_class={<SaveIcon />}
              disabled={false}
              label="Crear PQRSDF"
              type_button="button"
              color_button="success"
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={initial_values}
              variant_button={'outlined'}
              clean_when_leaving={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
