/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
// import SeleccionTipoPersona from '../componentes/SolicitudesPendientes/SeleccionTipoPersona';
// import EstadoPqrsdf from '../componentes/SolicitudesPendientes/DigitalizacionesPendientes';
// import ListadoPqrsdf from '../componentes/SolicitudesPendientes/ListadoPqrsdf';
// import TipoEmpresa from '../componentes/SolicitudesPendientes/TipoEmpresa';
// import TipoPoderdante from '../componentes/SolicitudesPendientes/TipoPoderdante';
// import TipoPersona from '../componentes/SolicitudesPendientes/TipoPersona';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';
import {
  reset_state,
 // set_attorney,
///  set_grantor,
//  set_on_behalf_of,
  set_pqr,
 // set_type_applicant,
} from '../store/slice/centralDigitalizacionSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import StepOne from '../componentes/CrearPQRSDF/StepOne';
import StepTwo from '../componentes/CrearPQRSDF/StepTwo';
// import { IObjStepConfiguration } from '../interfaces/central_digitalizacion';
import PersonaTitular from '../componentes/CrearPQRSDF/PersonaTitular';
import PersonaInterpone from '../componentes/CrearPQRSDF/PersonaInterpone';
import {
  get_file_categories_service,
  get_file_origin_service,
  get_file_typology_service,
  get_media_types_service,
  get_offices_service,
  get_pqr_types_service,
  get_presentation_types_service,
  get_storage_mediums_service,
} from '../store/thunks/pqrsdfThunks';
import { IObjStepConfiguration } from '../../PQRSDF/interfaces/pqrsdf';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearPqrsdfScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    list_applicant_types,
    type_applicant,
    list_on_behalf_of,
    on_behalf_of,
    person,
    company,
    grantor,
    attorney,
    pqr_status,
    pqr,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const {
    control: control_estado,
    handleSubmit: handle_submit_estado,
    reset,
  } = useForm<any>();
  useEffect(() => {
    void dispatch(get_pqr_types_service());
    void dispatch(get_presentation_types_service());
    void dispatch(get_media_types_service());
    void dispatch(get_storage_mediums_service());
    void dispatch(get_file_categories_service());
    void dispatch(get_file_origin_service());
    void dispatch(get_file_typology_service());
    void dispatch(get_offices_service());
  }, []);

  const StepComponent = (step: number) => {
    switch (step) {
      case 1:
        return <StepOne control_form={control_estado} reset={reset} />;

      case 2:
        return <StepTwo />;

      default:
        return null;
    }
  };
  // useEffect(() => {
  //   if (type_applicant.key === null) {
  //     // no viene de ventanilla
  //     if (!auth) {
  //       //si no esta logueado
  //       dispatch(set_type_applicant(list_applicant_types[1]))
  //     } else {
  //       // si esta logueado
  //       dispatch(set_type_applicant(list_applicant_types[0]))
  //       //preguntar por usuario logueado y saber si es representación propia, empresa o apoderado
  //       switch ('propia' | 'empresa' | 'apoderado') {
  //         case 'propia':
  //           dispatch(set_on_behalf_of(list_on_behalf_of[0]))
  //           dispatch(set_person(datos_de_persona_logueada))
  //           break;

  //         case 'empresa':
  //           dispatch(set_on_behalf_of(list_on_behalf_of[1]))
  //           dispatch(set_company(datos_de_empresa que_representa_logueada))
  //           break;
  //         case 'apoderado':
  //           dispatch(set_on_behalf_of(list_on_behalf_of[2]))
  //           dispatch(set_grantor(datos_de_poderdante_persona_logueada))
  //           dispatch(set_attorney(datos_de_persona_logueada_apoderado))
  //           break;

  //         default:
  //           return null;
  //       }
  //     }
  //   }
  // }, []);
  const [configuration_steps, set_configuration_steps] = useState<
    IObjStepConfiguration[]
  >([
    {
      step_number: 1,
      optional: false,
      skipped: false,
      step_title: 'Información de PQRSDF',
      body: StepComponent(1),
    },
    {
      step_number: 2,
      optional: true,
      skipped: false,
      step_title: 'Anexos',
      body: StepComponent(2),
    },
  ]);

  const validate = (data: any) => {
    dispatch(set_pqr({ ...pqr, ...data }));
  };

  const initial_values = (): void => {
    void dispatch(get_pqr_types_service());
    void dispatch(get_presentation_types_service());
    void dispatch(get_media_types_service());
    void dispatch(get_offices_service());
    void dispatch(get_storage_mediums_service());
    void dispatch(get_file_categories_service());
    void dispatch(get_file_origin_service());
    void dispatch(get_file_typology_service());
  };

  useEffect(() => {
    reset(pqr);
  }, [pqr]);

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
          <Title title="Solicitud PQRSDF"></Title>
        </Grid>
        {type_applicant.key !== null && <PersonaTitular />}
        {(on_behalf_of.key === 'E' || on_behalf_of.key === 'A') && (
          <PersonaInterpone />
        )}

        <Grid item xs={12} marginY={2}>
          <Title title="PQRSDF"></Title>
        </Grid>
        <FormStepper
          configuration_steps={configuration_steps}
          message_success={
            'Formulario diligenciado correctamente, puede crear el PQRSDF'
          }
          handle_submit={handle_submit_estado}
          validate={validate}
        />
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={null}
              icon_class={<SaveIcon />}
              disabled={!(pqr_status.key === 'N' || type_applicant.key === 'A')}
              label="Crear PQRSDF"
              type_button="button"
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
