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
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import {
  initial_state_company,
  initial_state_filed,
  initial_state_otro,
  initial_state_person,
  reset_state,
  set_attorney,
  set_company,
  set_exhibits,
  set_filed,
  set_grantor,
  set_on_behalf_of,
  set_other,
  set_others,
  set_person,
  set_pqr,
  set_type_applicant,
} from '../../PQRSDF/store/slice/pqrsdfSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import {
  IObjExhibit,
  IObjOtros,
  IObjStepConfiguration,
} from '../../PQRSDF/interfaces/pqrsdf';
import {
  add_other_service,
  control_error,
  delete_otro,
  delete_pqrsdf_service,
  edit_otros,
  edit_pqrsdf_service,
  get_attorney_document_service,
  get_company_document_service,
  get_file_categories_service,
  get_file_origin_service,
  get_file_typology_service,
  get_filed_id_service,
  get_media_types_service,
  get_offices_service,
  get_others_service_id,
  get_person_document_service,
  get_pqr_types_service,
  get_pqrsdf_id_service,
  get_presentation_types_service,
  get_storage_mediums_service,
  radicar_otro,
  radicar_pqrsdf_service,
} from '../../PQRSDF/store/thunks/pqrsdfThunks';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StepOneOtros from '../components/StepOne';
import PersonaTitularOtros from '../components/PersonaTitular';
import StepTwOtros from '../components/StepTwo';
import PersonaInterponeOtros from '../components/PersonaInterpone';
import { checking_anonimous_authentication, logout } from '../../../auth/store';
import { ImpresionRadicadoScreen } from '../../PQRSDF/screens/ImpresionRadicadoScreen';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearOtroScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userinfo, status } = useSelector((state: AuthSlice) => state.auth);
  const { representacion_legal } = useAppSelector((state) => state.auth);

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
    exhibits,
    denuncia,
    filed,
    otro,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const {
    control: control_pqrsdf,
    handleSubmit: handle_submit_pqrsdf,
    reset: reset_pqrsdf,
    watch,
  } = useForm<any>();

  const { id } = useParams();

  useEffect(() => {
    dispatch(set_filed(initial_state_filed));
    if (id !== null && id !== undefined) {
      void dispatch(get_others_service_id(id));
      set_action('editar');
    } else {
      dispatch(set_other(initial_state_otro));
      dispatch(set_exhibits([]));
      set_action('crear');
      if (representacion_legal?.tipo_sesion === 'E') {
        dispatch(
          set_type_applicant({
            id: 'T',
            key: 'T',
            label: 'Titular',
          })
        );
        if (on_behalf_of.id === null) {
          if (representacion_legal?.cod_relacion_con_el_titular === 'MP') {
            dispatch(
              set_on_behalf_of({
                id: 'P',
                key: 'P',
                label: 'Propia',
              })
            );
            void dispatch(
              get_person_document_service(
                userinfo.tipo_documento ?? '',
                userinfo.numero_documento ?? '',
                true
              )
            );
          } else if (
            representacion_legal?.cod_relacion_con_el_titular === 'AP'
          ) {
            dispatch(
              set_on_behalf_of({
                id: 'A',
                key: 'A',
                label: 'Apoderado',
              })
            );
            void dispatch(
              get_person_document_service(
                representacion_legal?.representacion.tipo_documento ?? 'CC',
                representacion_legal?.representacion.numero_documento ?? '',
                false
              )
            );
            void dispatch(
              get_attorney_document_service(
                userinfo.tipo_documento ?? 'CC',
                userinfo.numero_documento ?? ''
              )
            );
          } else {
            dispatch(
              set_on_behalf_of({
                id: 'E',
                key: 'E',
                label: 'Empresa',
              })
            );
            void dispatch(
              get_company_document_service(
                representacion_legal?.representacion.tipo_documento ?? 'NIT',
                representacion_legal?.representacion.numero_documento
              )
            );
          }
        }
      } else {
        if (type_applicant.id !== 'T') {
          dispatch(
            set_type_applicant({
              id: 'A',
              key: 'A',
              label: 'Anónimo',
            })
          );
          dispatch(
            set_on_behalf_of({
              id: null,
              key: null,
              label: null,
            })
          );
          dispatch(set_person(initial_state_person));
          dispatch(set_attorney(initial_state_person));
          dispatch(set_grantor(initial_state_person));
          dispatch(set_company(initial_state_company));
        }
      }
    }

    void dispatch(get_pqr_types_service());
    void dispatch(get_presentation_types_service());
    void dispatch(get_media_types_service());
    void dispatch(get_storage_mediums_service());
    void dispatch(get_file_categories_service());
    void dispatch(get_file_origin_service());
    void dispatch(get_file_typology_service());
    void dispatch(get_offices_service());
  }, []);

  useEffect(() => {
    console.log(userinfo);
    console.log('PQR----', pqr);
    console.log('OTRO------', otro);
    if (userinfo.id_persona !== null && userinfo.id_persona !== 0) {
      void dispatch(get_pqr_types_service());
      void dispatch(get_presentation_types_service());
      void dispatch(get_media_types_service());
      void dispatch(get_storage_mediums_service());
      void dispatch(get_file_categories_service());
      void dispatch(get_file_origin_service());
      void dispatch(get_file_typology_service());
      void dispatch(get_offices_service());
      dispatch(
        set_pqr({
          ...pqr,
          cod_forma_presentacion:
            representacion_legal?.tipo_sesion === 'E'
              ? 'E'
              : otro.cod_forma_presentacion || pqr.cod_forma_presentacion,
          id_medio_solicitud:
            representacion_legal?.tipo_sesion === 'E'
              ? 2
              : otro.id_medio_solicitud || pqr.id_medio_solicitud,
        })
      );
    }
  }, [userinfo]);

  const StepComponent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <StepOneOtros control_form={control_pqrsdf} reset={reset_pqrsdf} />
        );

      case 2:
        return <StepTwOtros />;

      default:
        return null;
    }
  };

  const [flag_create, set_flag_create] = useState(false);
  const [action, set_action] = useState('crear');
  const [step, set_step] = useState<number | null>(null);
  const validate = (data: any, step: number) => {
    dispatch(set_other({ ...otro, ...data, anexos: exhibits }));
  };

  const [configuration_steps, set_configuration_steps] = useState<
    IObjStepConfiguration[]
  >([
    {
      step_number: 1,
      optional: false,
      skipped: false,
      step_title: 'Información de solictudes otros',
      body: StepComponent(1),
      handle_submit: handle_submit_pqrsdf,
      validate: validate,
    },
    {
      step_number: 2,
      optional: true,
      skipped: false,
      step_title: 'Anexos',
      body: StepComponent(2),
      handle_submit: handle_submit_pqrsdf,
      validate: validate,
    },
  ]);

  const initial_values = (): void => {
    void dispatch(get_pqr_types_service());
    void dispatch(get_presentation_types_service());
    void dispatch(get_media_types_service());
    void dispatch(get_offices_service());
    void dispatch(get_storage_mediums_service());
    void dispatch(get_file_categories_service());
    void dispatch(get_file_origin_service());
    void dispatch(get_file_typology_service());
    set_flag_create(false);
    set_step(0);
  };

  useEffect(() => {
    console.log(otro, 'OTROOOOOOOOOOOOO');
    console.log(exhibits, 'EXHIBIT');
    console.log(pqr, 'PQR');
    reset_pqrsdf({
      ...otro,
      cod_forma_presentacion:
        representacion_legal?.tipo_sesion === 'E'
          ? 'E'
          : pqr.cod_forma_presentacion || otro.cod_forma_presentacion,
      id_medio_solicitud:
        representacion_legal?.tipo_sesion === 'E' ? 2 : pqr.id_medio_solicitud || otro.id_medio_solicitud,
    });
    if (otro.id_otros !== null && otro.id_otros !== undefined) {
      if ('anexos' in otro) {
        if (otro.anexos === undefined && otro.anexos === null) {
          set_step(0);
          void dispatch(get_others_service_id(otro.id_otros));
        } else {
          dispatch(set_exhibits(otro.anexos ?? []));
        }
      } else {
        set_step(0);
        void dispatch(get_others_service_id(otro.id_otros));
      }
      if (otro.id_radicados !== null) {
        if (filed.id_radicado === null) {
          void dispatch(get_filed_id_service(pqr.id_radicado ?? 0));
        }
      }

      set_action('editar');
    } else {
      set_action('crear');
    }
  }, [otro, control_pqrsdf]);

  useEffect(() => {
    if (exhibits.length > 0) {
      dispatch(set_other({ ...otro, anexos: exhibits }));
    }
  }, [exhibits]);


  const on_submit = (data: IObjOtros): void => {
    const form_data: any = new FormData();
    if (otro.id_otros !== null && otro.id_otros !== undefined) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(data.fecha_registro ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        set_action('editar');
        let folios: number = 0;
        const aux_items: IObjExhibit[] = [];
        console.log(exhibits);
        let ya_digitalizado: boolean = true;

        exhibits.forEach((elemento: IObjExhibit, index: number) => {
          folios = folios + Number(elemento.numero_folios ?? 0);
          aux_items.push({
            ...elemento,
            orden_anexo_doc: index,
            ya_digitalizado: elemento.metadatos === null ? false : true,
          });
          ya_digitalizado = elemento.metadatos === null ? false : true;
        });

        const data_edit: any = {
          ...data,
          cantidad_anexos: exhibits.length,
          nro_folios_totales: folios,
          es_anonima: false,
          anexos: aux_items,
          requiere_digitalizacion: !ya_digitalizado,
        };
        form_data.append('otros', JSON.stringify(data_edit));
        aux_items.forEach((elemento) => {
          if (elemento.id_anexo === null) {
            form_data.append(
              `archivo-create-${elemento.nombre_anexo}`,
              elemento.exhibit_link
            );
          } else {
            if (
              elemento.exhibit_link !==
              elemento.metadatos?.archivo?.ruta_archivo
            ) {
              if (
                elemento.exhibit_link !== null &&
                elemento.exhibit_link !== undefined
              ) {
                form_data.append(
                  `archivo-update-${elemento.nombre_anexo}`,
                  elemento.exhibit_link
                );
              }
            }
          }
        });
        form_data.append(
          'isCreateForWeb',
          representacion_legal?.tipo_sesion === 'E' ? 'True' : 'False'
        );

        void dispatch(edit_otros(form_data, navigate));
      } else {
        control_error(
          'Solo se pueden editar otros hasta 30 dias despues de la fecha de creación'
        );
      }
    } else {
      set_action('crear');
      const fecha = new Date(data.fecha_registro ?? '').toISOString();
      let folios: number = 0;
      let ya_digitalizado: boolean = true;
      const aux_items: IObjExhibit[] = [];
      exhibits.forEach((elemento: IObjExhibit, index: number) => {
        folios = folios + Number(elemento.numero_folios ?? 0);
        aux_items.push({
          ...elemento,
          orden_anexo_doc: index,
          ya_digitalizado: elemento.metadatos === null ? false : true,
        });
        ya_digitalizado = elemento.metadatos === null ? false : true;
      });
      const data_edit: any = {
        ...data,
        fecha_registro: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
        id_persona_titular:
          person.id_persona !== null
            ? person.id_persona
            : grantor.id_persona !== null
            ? grantor.id_persona
            : company.id_persona !== null
            ? company.id_persona
            : 0,
        id_persona_interpone:
          person.id_persona !== null
            ? person.id_persona
            : attorney.id_persona !== null
            ? attorney.id_persona
            : company.id_persona !== null
            ? company.persona_representante?.id_persona
            : 0,
        cantidad_anexos: exhibits.length,
        nro_folios_totales: folios,
        cod_relacion_con_el_titular:
          person.id_persona !== null
            ? 'MP'
            : grantor.id_persona !== null
            ? 'AP'
            : company.id_persona !== null
            ? 'RL'
            : 'MP',

        es_anonima:
          person.id_persona === null &&
          grantor.id_persona === null &&
          company.id_persona === null
            ? true
            : false,
        id_persona_recibe: userinfo.id_persona,
        anexos: aux_items,
        requiere_digitalizacion: !ya_digitalizado,
      };
      form_data.append('otros', JSON.stringify(data_edit));
      exhibits.forEach((elemento) => {
        form_data.append(
          `archivo-create-${elemento.nombre_anexo}`,
          elemento.exhibit_link
        );
      });
      form_data.append('id_persona_guarda', userinfo.id_persona);
      form_data.append(
        'isCreateForWeb',
        representacion_legal?.tipo_sesion === 'E'
          ? 'True'
          : type_applicant.id === 'A'
          ? 'True'
          : 'False'
      );

      void dispatch(add_other_service(form_data, navigate));
      dispatch(reset_state());
      initial_values();
    }
  };
  const delete_pqr = (): void => {
    if (otro.id_otros !== null && otro.id_otros !== undefined) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(otro.fecha_registro ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        void dispatch(delete_otro(otro.id_otros, true));
        dispatch(reset_state());
        initial_values();
        navigate(`/app/gestor_documental/solicitudes_otros/crear/`);
      } else {
        control_error(
          'Solo se pueden eliminar otras solicitudes hasta 30 dias despues de la fecha de creación'
        );
      }
    }
  };
  const radicate_pqr = (): void => {
    if (otro.id_otros !== null && otro.id_otros !== undefined) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(otro.fecha_registro ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        void dispatch(
          radicar_otro(otro.id_otros, userinfo.id_persona ?? 0, true)
        );
      } else {
        control_error(
          'Solo se pueden radicar solicitudes otros hasta 30 dias despues de la fecha de creación'
        );
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
        {type_applicant.key !== null && <PersonaTitularOtros />}
        {(on_behalf_of.key === 'E' || on_behalf_of.key === 'A') && (
          <PersonaInterponeOtros />
        )}

        <FormStepper
          configuration_steps={configuration_steps}
          message_success={`Formulario diligenciado correctamente, puede ${action} la solicitud otros`}
          set_success={set_flag_create}
          step={step}
        />
        {filed.numero_radicado_completo !== null && <ImpresionRadicadoScreen />}

        <Grid container direction="row" padding={2} spacing={2}>
          {otro.id_radicados === null && (
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit_pqrsdf(on_submit)}
                icon_class={<SaveIcon />}
                disabled={!flag_create}
                label={action}
                type_button="button"
                color_button="success"
              />
            </Grid>
          )}
          {otro.id_otros !== null && otro.id_radicados === null && (
            <>
              <Grid item xs={12} md={3}>
                <FormButton
                  variant_button="outlined"
                  on_click_function={radicate_pqr}
                  icon_class={<AssignmentTurnedInIcon />}
                  label={'Radicar'}
                  type_button="button"
                  color_button="primary"
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <FormButton
                  variant_button="outlined"
                  on_click_function={delete_pqr}
                  icon_class={<DeleteIcon />}
                  label={'Eliminar'}
                  type_button="button"
                  color_button="error"
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
              clean_when_leaving={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
