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
import SeleccionTipoPersona from '../componentes/SolicitudPQRSDF/SeleccionTipoPersona';
import EstadoPqrsdf from '../componentes/SolicitudPQRSDF/EstadoPqrsdf';
import ListadoPqrsdf from '../componentes/SolicitudPQRSDF/ListadoPqrsdf';
import TipoEmpresa from '../componentes/SolicitudPQRSDF/TipoEmpresa';
import TipoPoderdante from '../componentes/SolicitudPQRSDF/TipoPoderdante';
import TipoPersona from '../componentes/SolicitudPQRSDF/TipoPersona';
import FormButton from '../../../../components/partials/form/FormButton';
import Limpiar from '../../../conservacion/componentes/Limpiar';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import {
  initial_state_company,
  initial_state_filed,
  initial_state_person,
  initial_state_pqr,
  reset_state,
  set_attorney,
  set_company,
  set_denuncia,
  set_exhibits,
  set_filed,
  set_grantor,
  set_on_behalf_of,
  set_person,
  set_pqr,
  set_type_applicant,
} from '../store/slice/pqrsdfSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import StepOne from '../componentes/CrearPQRSDF/StepOne';
import StepTwo from '../componentes/CrearPQRSDF/StepTwo';
import {
  IObjExhibit,
  IObjPqr,
  IObjPqrDenuncia,
  IObjStepConfiguration,
} from '../interfaces/pqrsdf';
import PersonaTitular from '../componentes/CrearPQRSDF/PersonaTitular';
import PersonaInterpone from '../componentes/CrearPQRSDF/PersonaInterpone';
import {
  add_pqrsdf_service,
  control_error,
  delete_pqrsdf_service,
  edit_pqrsdf_service,
  get_attorney_document_service,
  get_company_document_service,
  get_file_categories_service,
  get_file_origin_service,
  get_file_typology_service,
  get_filed_id_service,
  get_media_types_service,
  get_offices_service,
  get_person_document_service,
  get_pqr_types_service,
  get_pqrsdf_id_service,
  get_presentation_types_service,
  get_storage_mediums_service,
  radicar_pqrsdf_service,
} from '../store/thunks/pqrsdfThunks';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StepDenuncia from '../componentes/CrearPQRSDF/StepDenuncia';
import ImprimirRadicado from '../componentes/ImpresionRadicado/ImprimirRadicado';
import { ImpresionRadicadoScreen } from './ImpresionRadicadoScreen';
import { checking_anonimous_authentication } from '../../../auth/store/thunks';
import { logout } from '../../../auth/store';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearPqrsdfScreen(): JSX.Element {
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
  } = useAppSelector((state) => state.pqrsdf_slice);

  const {
    control: control_pqrsdf,
    handleSubmit: handle_submit_pqrsdf,
    reset: reset_pqrsdf,
    watch,
  } = useForm<any>();

  const {
    control: control_denuncia,
    handleSubmit: handle_submit_denuncia,
    reset: reset_denuncia,
    watch: watch_denuncia,
  } = useForm<IObjPqrDenuncia>();
  const { id } = useParams();

  useEffect(() => {
    console.log(representacion_legal);
  }, [representacion_legal]);

  useEffect(() => {
    dispatch(set_filed(initial_state_filed));
    if (id !== null && id !== undefined) {
      void dispatch(get_pqrsdf_id_service(id));
      set_action('editar');
    } else {
      dispatch(set_pqr(initial_state_pqr));
      if (status === 'not-authenticated') {
        dispatch(logout(''));
        dispatch(
          checking_anonimous_authentication(
            'solicitud.anonima',
            'Anonima12345+'
          )
        );
        dispatch(
          set_type_applicant({
            id: 'A',
            key: 'A',
            label: 'Anónima',
          })
        );
        dispatch(
          set_on_behalf_of({
            id: null,
            key: null,
            label: null,
          })
        );
      } else {
        dispatch(set_pqr(initial_state_pqr));
        dispatch(set_exhibits([]));
        set_action('crear');
        console.log(userinfo);
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
    }
    if (status === 'authenticated') {
      void dispatch(get_pqr_types_service());
      void dispatch(get_presentation_types_service());
      void dispatch(get_media_types_service());
      void dispatch(get_storage_mediums_service());
      void dispatch(get_file_categories_service());
      void dispatch(get_file_origin_service());
      void dispatch(get_file_typology_service());
      void dispatch(get_offices_service());
    }
  }, []);

  useEffect(() => {
    console.log(userinfo);
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
              : pqr.cod_forma_presentacion,
          id_medio_solicitud:
            representacion_legal?.tipo_sesion === 'E'
              ? 2
              : pqr.id_medio_solicitud,
        })
      );
    }
  }, [userinfo]);

  const StepComponent = (step: number) => {
    switch (step) {
      case 1:
        return <StepOne control_form={control_pqrsdf} reset={reset_pqrsdf} />;

      case 2:
        return <StepTwo />;
      case 3:
        return (
          <StepDenuncia
            control_form={control_denuncia}
            reset={reset_denuncia}
            watch={watch_denuncia}
          />
        );

      default:
        return null;
    }
  };

  const [flag_create, set_flag_create] = useState(false);
  const [action, set_action] = useState('crear');
  const [step, set_step] = useState<number | null>(null);
  const validate = (data: any, step: number) => {
    dispatch(set_pqr({ ...pqr, ...data, anexos: exhibits }));
  };
  const validate_denuncia = (data: any, step: number) => {
    dispatch(set_denuncia(data));
  };
  const [configuration_steps, set_configuration_steps] = useState<
    IObjStepConfiguration[]
  >([
    {
      step_number: 1,
      optional: false,
      skipped: false,
      step_title: 'Información de PQRSDF',
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

  useEffect(() => {
    if (watch('cod_tipo_PQRSDF') === 'D') {
      set_configuration_steps([
        {
          step_number: 1,
          optional: false,
          skipped: false,
          step_title: 'Información de PQRSDF',
          body: StepComponent(1),
          handle_submit: handle_submit_pqrsdf,
          validate: validate,
        },
        {
          step_number: 2,
          optional: false,
          skipped: false,
          step_title: 'Información denuncia',
          body: StepComponent(3),
          handle_submit: handle_submit_denuncia,
          validate: validate_denuncia,
        },
        {
          step_number: 3,
          optional: true,
          skipped: false,
          step_title: 'Anexos',
          body: StepComponent(2),
          handle_submit: handle_submit_pqrsdf,
          validate: validate,
        },
      ]);
    } else {
      set_configuration_steps([
        {
          step_number: 1,
          optional: false,
          skipped: false,
          step_title: 'Información de PQRSDF',
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
    }
  }, [watch('cod_tipo_PQRSDF')]);

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
    console.log(pqr);
    reset_pqrsdf({
      ...pqr,
      cod_forma_presentacion:
        representacion_legal?.tipo_sesion === 'E'
          ? 'E'
          : pqr.cod_forma_presentacion,
      id_medio_solicitud:
        representacion_legal?.tipo_sesion === 'E' ? 2 : pqr.id_medio_solicitud,
    });
    if (pqr.id_PQRSDF !== null && pqr.id_PQRSDF !== undefined) {
      if ('anexos' in pqr) {
        if (pqr.anexos === undefined && pqr.anexos === null) {
          set_step(0);
          void dispatch(get_pqrsdf_id_service(pqr.id_PQRSDF));
        } else {
          dispatch(set_exhibits(pqr.anexos ?? []));
        }
      } else {
        set_step(0);
        void dispatch(get_pqrsdf_id_service(pqr.id_PQRSDF));
      }
      if (pqr.cod_tipo_PQRSDF === 'D') {
        set_configuration_steps([
          {
            step_number: 1,
            optional: false,
            skipped: false,
            step_title: 'Información de PQRSDF',
            body: StepComponent(1),
            handle_submit: handle_submit_pqrsdf,
            validate: validate,
          },
          {
            step_number: 2,
            optional: false,
            skipped: false,
            step_title: 'Información denuncia',
            body: StepComponent(3),
            handle_submit: handle_submit_denuncia,
            validate: validate_denuncia,
          },
          {
            step_number: 3,
            optional: true,
            skipped: false,
            step_title: 'Anexos',
            body: StepComponent(2),
            handle_submit: handle_submit_pqrsdf,
            validate: validate,
          },
        ]);
      } else {
        set_configuration_steps([
          {
            step_number: 1,
            optional: false,
            skipped: false,
            step_title: 'Información de PQRSDF',
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
      }
      if (pqr.id_radicado !== null) {
        if (filed.id_radicado === null) {
          void dispatch(get_filed_id_service(pqr.id_radicado ?? 0));
        }
      }
      set_action('editar');
    } else {
      set_action('crear');
    }
  }, [pqr]);

  useEffect(() => {
    if (exhibits.length > 0) {
      dispatch(set_pqr({ ...pqr, anexos: exhibits }));
    }
  }, [exhibits]);

  const on_submit = (data: IObjPqr): void => {
    const form_data: any = new FormData();
    if (pqr.id_PQRSDF !== null && pqr.id_PQRSDF !== undefined) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(data.fecha_registro ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        set_action('editar');
        let folios: number = 0;
        const aux_items: IObjExhibit[] = [];
        let ya_digitalizado: boolean = true;

        exhibits.forEach((elemento: IObjExhibit, index: number) => {
          folios = folios + Number(elemento.numero_folios ?? 0);
          aux_items.push({
            ...elemento,
            orden_anexo_doc: index,
            ya_digitalizado:
              elemento.metadatos === null
                ? false
                : elemento.metadatos.cod_origen_archivo === 'F'
                ? false
                : true,
          });
          ya_digitalizado =
            elemento.metadatos === null
              ? false
              : elemento.metadatos.cod_origen_archivo === 'F'
              ? false
              : true;
        });

        const data_edit: any = {
          ...data,
          cantidad_anexos: exhibits.length,
          nro_folios_totales: folios,
          anexos: aux_items,
          requiere_digitalizacion: !ya_digitalizado,
          denuncia:
            denuncia !== null
              ? denuncia.Cod_zona_localizacion === null
                ? null
                : {
                    ...(denuncia || {}),
                    cod_recursos_fectados_presuntos:
                      typeof denuncia?.cod_recursos_fectados_presuntos ===
                      'string'
                        ? denuncia?.cod_recursos_fectados_presuntos
                        : Array.isArray(
                            denuncia?.cod_recursos_fectados_presuntos
                          )
                        ? denuncia?.cod_recursos_fectados_presuntos.join('|')
                        : '',
                  }
              : null,
        };
        form_data.append('pqrsdf', JSON.stringify(data_edit));
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

        void dispatch(edit_pqrsdf_service(form_data, navigate));
      } else {
        control_error(
          'Solo se pueden editar pqrsdf hasta 30 dias despues de la fecha de creación'
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
          ya_digitalizado:
            elemento.metadatos === null
              ? false
              : elemento.metadatos.cod_origen_archivo === 'F'
              ? false
              : true,
        });
        ya_digitalizado =
          elemento.metadatos === null
            ? false
            : elemento.metadatos.cod_origen_archivo === 'F'
            ? false
            : true;
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
        denuncia:
          denuncia !== null
            ? denuncia.Cod_zona_localizacion === null
              ? null
              : {
                  ...(denuncia || {}),
                  cod_recursos_fectados_presuntos:
                    typeof denuncia?.cod_recursos_fectados_presuntos ===
                    'string'
                      ? denuncia?.cod_recursos_fectados_presuntos
                      : Array.isArray(denuncia?.cod_recursos_fectados_presuntos)
                      ? denuncia?.cod_recursos_fectados_presuntos.join('|')
                      : '',
                }
            : null,
      };
      console.log(data_edit);

      form_data.append('pqrsdf', JSON.stringify(data_edit));
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
      console.log(status);
      if (status === 'authenticated') {
        void dispatch(add_pqrsdf_service(form_data, navigate));
        dispatch(reset_state());
        initial_values();
      } else {
        void dispatch(add_pqrsdf_service(form_data, navigate, false));
      }
    }
  };
  const delete_pqr = (): void => {
    if (pqr.id_PQRSDF !== null && pqr.id_PQRSDF !== undefined) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(pqr.fecha_registro ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        void dispatch(delete_pqrsdf_service(pqr.id_PQRSDF, true));
        dispatch(reset_state());
        initial_values();
        navigate(`/app/gestor_documental/pqrsdf/crear_pqrsdf/`);
      } else {
        control_error(
          'Solo se pueden eliminar siembras hasta 30 dias despues de la fecha de creación'
        );
      }
    }
  };
  const radicate_pqr = (): void => {
    if (pqr.id_PQRSDF !== null && pqr.id_PQRSDF !== undefined) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(pqr.fecha_registro ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 100) {
        void dispatch(
          radicar_pqrsdf_service(pqr.id_PQRSDF, userinfo.id_persona ?? 0, true)
        );
      } else {
        control_error(
          'Solo se pueden radicar pqrs hasta 30 dias despues de la fecha de creación'
        );
      }
    }
  };
  useEffect(() => {
    if (status !== 'authenticated') {
      dispatch(reset_state());
      console.log('logout');
      dispatch(logout(''));
    }
  }, [dispatch]);

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
          message_success={`Formulario diligenciado correctamente, puede ${action} el PQRSDF`}
          set_success={set_flag_create}
          step={step}
        />
        {filed.numero_radicado_completo !== null && <ImpresionRadicadoScreen />}
        <Grid container direction="row" padding={2} spacing={2}>
          {pqr.id_radicado === null && (
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
          {pqr.id_PQRSDF !== null && pqr.id_radicado === null && (
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
              clean_when_leaving={!(status === 'authenticated')}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
