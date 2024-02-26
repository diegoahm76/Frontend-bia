import { Chip, Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useContext, useEffect, useState } from 'react';
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
  control_error,
  get_digitalization_request_id_service,
  get_digitalization_request_id_service_otros,
  get_digitalization_opas,
  get_list_request_status_service,
  get_request_types_service,
  response_request_service,
  response_request_opas_service,
  response_request_service_otros,
} from '../store/thunks/centralDigitalizacionThunks';
import SolicitudSeleccionada from '../componentes/CentralDigitalizacion/SolicitudSeleccionada';
import ListadoAnexos from '../componentes/CentralDigitalizacion/ListadoAnexos';
import { useParams } from 'react-router-dom';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLate from '@mui/icons-material/AssignmentLate';
import { OpcionOtrosContext } from '../context/BusquedaOtrosDigitalizacion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function ListadoAnexosScreen(): JSX.Element {
   const { opcion_otros } = useContext(OpcionOtrosContext);
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const { digitization_request, exhibits, edit_digitization } = useAppSelector(
    (state) => state.central_digitalizacion_slice
  );
  const [success_digitization, set_success_digitization] =
    useState<boolean>(false);
  const {
    control: control_solicitud,
    reset: reset_solicitud,
    getValues: get_values,
  } = useForm<any>();

  const { id } = useParams();

  const initial_values = (): void => { };

  useEffect(() => {

    if (id !== null && id !== undefined) {
      if (digitization_request.nombre_tipo_solicitud === "OTROS") {
        void dispatch(get_digitalization_request_id_service_otros(id));
        return ;
      } 
      


    if (digitization_request.nombre_tipo_solicitud === "OPAS") {
      void dispatch(get_digitalization_opas(id));
    } else if (id !== null && id !== undefined) {
      void dispatch(get_digitalization_request_id_service(id));
    };
    void dispatch(get_request_types_service());
    void dispatch(get_list_request_status_service());
  }
  }, []);

  useEffect(() => {
    if (exhibits.length > 0) {
      let flag = true;
      exhibits.forEach(function (element, index) {
        if (
          element.ya_digitalizado === false ||
          element.ya_digitalizado === null
        ) {
          flag = false;
        }
      });
      set_success_digitization(flag);
    }
  }, [exhibits]);
  const responder_digitalizacion_completa = (): void => {

    if(opcion_otros==="OTROS"){

      const observacion = get_values('observacion_digitalización') ?? '';
    
      const params = {
        id_solicitud_de_digitalizacion:digitization_request.id_solicitud_de_digitalizacion,
        observacion_digitalizacion: observacion,
        digitalizacion_completada: true,
      };
  
      void dispatch(response_request_service_otros(params));

      return
    }





    const observacion = get_values('observacion_digitalización') ?? '';

    const params = {
      id_solicitud_de_digitalizacion:
        digitization_request.id_solicitud_de_digitalizacion,
      observacion_digitalizacion: observacion,
      digitalizacion_completada: true,
      id_persona_digitalizo: userinfo.id_persona,
    };
    if (digitization_request.nombre_tipo_solicitud === "OPAS") {

      void dispatch(response_request_opas_service(params));
    } else {

      void dispatch(response_request_service(params));
    }
  };



  const responder_digitalizacion_incompleta = (): void => {

    if(opcion_otros==="OTROS"){


      const observacion = get_values('observacion_digitalización') ?? '';
      if (observacion === '') {
        control_error('Debe diligenciar la observacion de digitalización');
      } else {
        const params = {
          id_solicitud_de_digitalizacion:digitization_request.id_solicitud_de_digitalizacion,
          observacion_digitalizacion: observacion,
          digitalizacion_completada: false,
        
        };
  
        void dispatch(response_request_service_otros(params));
      }
return 
    }



    const observacion = get_values('observacion_digitalización') ?? '';
    if (observacion === '') {
      control_error('Debe diligenciar la observacion de digitalización');
    } else {
      const params = {
        id_solicitud_de_digitalizacion:
          digitization_request.id_solicitud_de_digitalizacion,
        observacion_digitalizacion: observacion,
        digitalizacion_completada: false,
        id_persona_digitalizo: userinfo.id_persona,
      };
      if (digitization_request.nombre_tipo_solicitud === "OPAS") {

        void dispatch(response_request_opas_service(params));
      } else {

        void dispatch(response_request_service(params));
      }
    }
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
          <SolicitudSeleccionada
            control_solicitud={control_solicitud}
            reset={reset_solicitud}
          />
        )}
        <ListadoAnexos />
        {edit_digitization && (
          <Grid container direction="row" padding={2} spacing={2}>
            {success_digitization ? (
              <>
                <Grid item xs={12} md={3}>
                  <Chip
                    icon={<AssignmentTurnedInIcon />}
                    label="Digitalización completa"
                    color="success"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormButton
                    variant_button="contained"
                    on_click_function={responder_digitalizacion_completa}
                    icon_class={<AssignmentTurnedInIcon />}
                    disabled={false}
                    label="Responder digitalización completa"
                    type_button="button"
                    color_button="success"
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} md={3}>
                  <Chip
                    icon={<AssignmentLate />}
                    label="Digitalización incompleta"
                    color="warning"
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormButton
                    variant_button="contained"
                    on_click_function={responder_digitalizacion_incompleta}
                    icon_class={<AssignmentLate />}
                    disabled={false}
                    label="Responder digitalización incompleta"
                    type_button="button"
                    color_button="warning"
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} md={3}>
              <Limpiar
                dispatch={dispatch}
                reset_state={reset_state}
                set_initial_values={initial_values}
                variant_button={'outlined'}
                clean_when_leaving={true}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}
