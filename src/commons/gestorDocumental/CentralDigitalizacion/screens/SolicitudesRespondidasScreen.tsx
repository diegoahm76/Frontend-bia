import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import DigitalizacionesRespondidas from '../componentes/CentralDigitalizacion/DigitalizacionesRespondidas';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';
import { reset_state } from '../store/slice/centralDigitalizacionSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import {
  get_list_request_status_service,
  get_request_types_service,
} from '../store/thunks/centralDigitalizacionThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function SolicitudesRespondidasScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { person } = useAppSelector(
    (state) => state.central_digitalizacion_slice
  );
  const initial_values = (): void => {};

  useEffect(() => {
    void dispatch(get_request_types_service());
    void dispatch(get_list_request_status_service());
  }, []);

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
          <Title title="Historico de solicitudes de digitalización respondidas"></Title>
        </Grid>
        <DigitalizacionesRespondidas />

        <Grid container direction="row" padding={2} spacing={2}>
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
