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
  reset_state,
  set_attorney,
  set_exhibits,
  set_grantor,
  set_on_behalf_of,
  set_pqr,
  set_type_applicant,
} from '../store/slice/pqrsdfSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import StepOne from '../componentes/CrearPQRSDF/StepOne';
import StepTwo from '../componentes/CrearPQRSDF/StepTwo';
import {
  IObjExhibit,
  IObjPqr,
  IObjStepConfiguration,
} from '../interfaces/pqrsdf';
import PersonaTitular from '../componentes/CrearPQRSDF/PersonaTitular';
import PersonaInterpone from '../componentes/CrearPQRSDF/PersonaInterpone';
import {
  add_pqrsdf_service,
  control_error,
  delete_pqrsdf_service,
  edit_pqrsdf_service,
  get_file_categories_service,
  get_file_origin_service,
  get_file_typology_service,
  get_media_types_service,
  get_offices_service,
  get_pqr_types_service,
  get_pqrsdf_id_service,
  get_presentation_types_service,
  get_storage_mediums_service,
  radicar_pqrsdf_service,
} from '../store/thunks/pqrsdfThunks';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearPqrsdfScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
    exhibits,
  } = useAppSelector((state) => state.pqrsdf_slice);
  const {
    control: control_estado,
    handleSubmit: handle_submit_estado,
    reset,
  } = useForm<any>();

  const {
    control: control_pqrsdf,
    handleSubmit: handle_submit_pqrsdf,
    reset: reset_pqrsdf,
  } = useForm<any>();
  const { id } = useParams();

  useEffect(() => {
    if (id !== null && id !== undefined) {
      void dispatch(get_pqrsdf_id_service(id));
    }
    // if (type_applicant.key === null) {
    //       // no viene de ventanilla
    //       if (!false) {
    //         //si no esta logueado
    //         dispatch(set_type_applicant(list_applicant_types[1]))
    //       } else {
    //         // si esta logueado
    //         dispatch(set_type_applicant(list_applicant_types[0]))
    //         //preguntar por usuario logueado y saber si es representación propia, empresa o apoderado
    //         switch () {
    //           case 'propia':
    //             dispatch(set_on_behalf_of(list_on_behalf_of[0]))
    //             dispatch(set_person(datos_de_persona_logueada))
    //             break;

    //           case 'empresa':
    //             dispatch(set_on_behalf_of(list_on_behalf_of[1]))
    //             dispatch(set_company(datos_de_empresa que_representa_logueada))
    //             break;
    //           case 'apoderado':
    //             dispatch(set_on_behalf_of(list_on_behalf_of[2]))
    //             dispatch(set_grantor(datos_de_poderdante_persona_logueada))
    //             dispatch(set_attorney(datos_de_persona_logueada_apoderado))
    //             break;

    //           default:
    //             return null;
    //         }
    //       }
    //     }

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
        return <StepOne control_form={control_pqrsdf} reset={reset_pqrsdf} />;

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
  const [flag_create, set_flag_create] = useState(false);
  const [action, set_action] = useState('crear');
  const [step, set_step] = useState<number | null>(null);

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
    reset_pqrsdf(pqr);
    console.log(pqr);
    if (pqr.id_PQRSDF !== null) {
      if ('anexos' in pqr) {
        if (pqr.anexos == undefined && pqr.anexos == null) {
          navigate(
            `/app/gestor_documental/pqrsdf/crear_pqrsdf/${pqr.id_PQRSDF}`
          );
          set_step(0);
        } else {
          dispatch(set_exhibits(pqr.anexos));
        }
      } else {
        navigate(`/app/gestor_documental/pqrsdf/crear_pqrsdf/${pqr.id_PQRSDF}`);
        set_step(0);
      }
      set_action('editar');
    }
  }, [pqr]);

  useEffect(() => {
    console.log(exhibits);
    dispatch(set_pqr({ ...pqr, anexos: exhibits }));
    // const aux_items: IObjExhibit[] = [];
    // exhibits.forEach((elemento: IObjExhibit, index: number) => {
    //   if (elemento.id_anexo !== null) {
    //     if (
    //       elemento.exhibit_link === null ||
    //       elemento.exhibit_link === undefined
    //     ) {
    //       aux_items.push({
    //         ...elemento,
    //         exhibit_link: elemento.metadatos?.archivo?.ruta_archivo ?? null,
    //       });
    //     } else {
    //       aux_items.push(elemento);
    //     }
    //   } else {
    //     aux_items.push(elemento);
    //   }
    // });
    // dispatch(set_exhibits(aux_items));
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
        console.log(exhibits);
        exhibits.forEach((elemento: IObjExhibit, index: number) => {
          console.log(elemento);
          folios = folios + Number(elemento.numero_folios ?? 0);
          if (elemento.exhibit_link === null) {
            aux_items.push({
              ...elemento,
              orden_anexo_doc: index,
              metadatos: elemento.metadato ?? null,
              exhibit_link: elemento.metadato?.archivo?.ruta_archivo ?? null,
            });
          } else {
            if (typeof elemento.exhibit_link === 'string') {
              aux_items.push({
                ...elemento,
                orden_anexo_doc: index,
                metadatos: elemento.metadato ?? null,
                exhibit_link: elemento.metadato?.archivo?.ruta_archivo ?? null,
              });
            } else {
              console.log(elemento);
              aux_items.push({
                ...elemento,
                orden_anexo_doc: index,
                metadatos: elemento.metadato ?? null,
              });
            }
          }
        });
        console.log(aux_items);
        const data_edit: IObjPqr = {
          ...data,
          cantidad_anexos: exhibits.length,
          nro_folios_totales: folios,
          cod_relacion_con_el_titular: 'MP',
          es_anonima: false,
          anexos: aux_items,
          requiere_digitalizacion: true,
          denuncia: null,
        };
        console.log(data_edit);
        form_data.append('pqrsdf', JSON.stringify(data_edit));
        aux_items.forEach((elemento) => {
          console.log(elemento);
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
        form_data.append('isCreateForWeb', 'True');

        void dispatch(edit_pqrsdf_service(form_data));
      } else {
        control_error(
          'Solo se pueden editar pqrsdf hasta 30 dias despues de la fecha de creación'
        );
      }
    } else {
      console.log(data, exhibits);
      set_action('crear');
      const fecha = new Date(data.fecha_registro ?? '').toISOString();
      let folios: number = 0;
      const aux_items: IObjExhibit[] = [];
      exhibits.forEach((elemento: IObjExhibit, index: number) => {
        folios = folios + Number(elemento.numero_folios ?? 0);
        aux_items.push({
          ...elemento,
          orden_anexo_doc: index,
          ya_digitalizado: elemento.metadatos === null ? false : true,
        });
      });
      const data_edit: IObjPqr = {
        ...data,
        fecha_registro: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
        id_sucursal_especifica_implicada: 1,
        id_persona_titular: userinfo.id_persona,
        id_persona_interpone: userinfo.id_persona,
        cantidad_anexos: exhibits.length,
        nro_folios_totales: folios,
        cod_relacion_con_el_titular: 'MP',
        es_anonima: false,
        anexos: aux_items,
        requiere_digitalizacion: true,
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
      form_data.append('isCreateForWeb', 'True');

      void dispatch(add_pqrsdf_service(form_data));
      // dispatch(reset_state());
      // initial_values();
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
      if (diferencia_dias <= 30) {
        void dispatch(
          radicar_pqrsdf_service(pqr.id_PQRSDF, userinfo.id_persona ?? 0, true)
        );
      } else {
        control_error(
          'Solo se pueden radicar siembras hasta 30 dias despues de la fecha de creación'
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
          handle_submit={handle_submit_pqrsdf}
          validate={validate}
          set_success={set_flag_create}
          step={step}
        />
        <Grid container direction="row" padding={2} spacing={2}>
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
          {pqr.id_PQRSDF !== null && pqr.fecha_radicado !== null && (
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
          )}
          {pqr.id_PQRSDF !== null && (
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
