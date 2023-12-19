import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import DigitalizacionesPendientes from '../componentes/CentralDigitalizacion/DigitalizacionesPendientes';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';
import { reset_state } from '../store/slice/centralDigitalizacionSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import {
  get_list_request_status_service,
  get_request_types_service,
  response_request_service,
} from '../store/thunks/centralDigitalizacionThunks';
import SolicitudSeleccionada from '../componentes/CentralDigitalizacion/SolicitudSeleccionada';
import ListadoAnexos from '../componentes/CentralDigitalizacion/ListadoAnexos';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListadoAnexosScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { digitization_request } = useAppSelector(
    (state) => state.central_digitalizacion_slice
  );
  const initial_values = (): void => {};

  useEffect(() => {
    void dispatch(get_request_types_service());
    void dispatch(get_list_request_status_service());
  }, []);

  const responder_digitalizacion_completa = (): void => {
    console.log('ok');
    const params = {
      id_solicitud_de_digitalizacion:
        digitization_request.id_solicitud_de_digitalizacion,
      observacion_digitalizacion: 'test',
      digitalizacion_completada: true,
      id_persona_digitalizo: userinfo.id_persona,
    };

    void dispatch(response_request_service(params));
  };
  const responder_digitalizacion_incompleta = (): void => {
    console.log('ok');
    const params = {
      id_solicitud_de_digitalizacion:
        digitization_request.id_solicitud_de_digitalizacion,
      observacion_digitalizacion: 'test',
      digitalizacion_completada: false,
      id_persona_digitalizo: userinfo.id_persona,
    };

    void dispatch(response_request_service(params));
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
        <Grid item xs={12} marginY={2}>
          <Title
            title={`Digitalización de ${digitization_request.nombre_tipo_solicitud} - N° Radicado ${digitization_request.numero_radicado}`}
          ></Title>
        </Grid>

        {digitization_request.id_solicitud_de_digitalizacion !== null && (
          <SolicitudSeleccionada />
        )}
        <ListadoAnexos />

        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={responder_digitalizacion_completa}
              icon_class={<SaveIcon />}
              disabled={false}
              label="Responder digitalización completa"
              type_button="button"
              color_button="success"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={responder_digitalizacion_incompleta}
              icon_class={<SaveIcon />}
              disabled={false}
              label="Responder digitalización incompleta"
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
