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
  initial_state_complemento,
  reset_state,
  set_attorney,
  set_complement_pqr,
  set_exhibits,
  set_grantor,
  set_on_behalf_of,
  set_pqr,
  set_type_applicant,
} from '../store/slice/complementoPqrsdfSlice';
import FormStepper from '../../../../components/partials/form/FormStepper';
import StepOne from '../componentes/CrearComplementoPQRSDF/StepOne';
import {
  IObjComplementPqr,
  IObjExhibit,
  IObjPqr,
  IObjPqrDenuncia,
  IObjStepConfiguration,
} from '../interfaces/complemento_pqrsdf';
import PersonaTitular from '../componentes/CrearComplementoPQRSDF/PersonaTitular';
import PersonaInterpone from '../componentes/CrearComplementoPQRSDF/PersonaInterpone';
import {
  add_complemento_pqrsdf_service,
  control_error,
  delete_complemento_pqrsdf_service,
  edit_complemento_pqrsdf_service,
  get_file_categories_service,
  get_file_origin_service,
  get_file_typology_service,
  get_media_types_service,
  get_offices_service,
  get_pqr_types_service,
  get_complemento_pqrsdf_id_service,
  get_presentation_types_service,
  get_storage_mediums_service,
  radicar_complemento_pqrsdf_service,
  get_pqrsdf_id_service,
} from '../store/thunks/complementoPqrsdfThunks';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import StepTwo from '../componentes/CrearComplementoPQRSDF/StepTwo';
import StepThree from '../componentes/CrearComplementoPQRSDF/StepThree';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearComplementoPqrsdfScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { pqr, exhibits, complement_pqr } = useAppSelector(
    (state) => state.complemento_pqrsdf_slice
  );
  const {
    list_applicant_types,
    type_applicant,
    list_on_behalf_of,
    on_behalf_of,
    person,
    company,
    grantor,
    attorney,
  } = useAppSelector((state) => state.pqrsdf_slice);

  const {
    control: control_pqrsdf,
    handleSubmit: handle_submit_pqrsdf,
    reset: reset_pqrsdf,
    watch,
  } = useForm<any>();

  const {
    control: control_complemento,
    handleSubmit: handle_submit_complemento,
    reset: reset_complemento,
    watch: watch_complemento,
  } = useForm<IObjComplementPqr>();
  const { id } = useParams();

  useEffect(() => {
    if (id !== null && id !== undefined) {
      const params = {
        id_PQRSDF: id,
        id_persona_titular: userinfo.id_persona,
        id_persona_interpone: userinfo.id_persona,
      };
      void dispatch(get_pqrsdf_id_service(params));
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
  const delete_complemento_pqr = (): void => {
    if (
      complement_pqr.idComplementoUsu_PQR !== null &&
      complement_pqr.idComplementoUsu_PQR !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(complement_pqr.fecha_complemento ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        const params = {
          id_PQRSDF: pqr.id_PQRSDF,
          id_persona_titular: userinfo.id_persona,
          id_persona_interpone: userinfo.id_persona,
        };
        void dispatch(
          delete_complemento_pqrsdf_service(
            complement_pqr.idComplementoUsu_PQR,
            true,
            params
          )
        );
        dispatch(reset_state());
        initial_values();
      } else {
        control_error(
          'Solo se pueden eliminar siembras hasta 30 dias despues de la fecha de creación'
        );
      }
    }
  };
  const StepComponent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <StepOne
            control_form={control_pqrsdf}
            reset={reset_pqrsdf}
            delete_function={delete_complemento_pqr}
          />
        );

      case 2:
        return (
          <StepTwo
            control_form={control_complemento}
            reset={reset_complemento}
            watch={watch_complemento}
          />
        );
      case 3:
        return <StepThree />;

      default:
        return null;
    }
  };
  const [flag_create, set_flag_create] = useState(false);
  const [action, set_action] = useState('crear');
  const [step, set_step] = useState<number | null>(null);
  const validate = (data: any, step: number) => {
    console.log('validate_pqr', data);
  };
  const validate_complemento = (data: any, step: number) => {
    console.log('validate_complemento', data, exhibits);
    dispatch(set_complement_pqr({ ...data }));
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
      optional: false,
      skipped: false,
      step_title: 'Información complemento',
      body: StepComponent(2),
      handle_submit: handle_submit_complemento,
      validate: validate_complemento,
    },
    {
      step_number: 3,
      optional: true,
      skipped: false,
      step_title: 'Anexos',
      body: StepComponent(3),
      handle_submit: handle_submit_complemento,
      validate: validate_complemento,
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
    reset_complemento(complement_pqr);
    console.log(complement_pqr);
    if (
      complement_pqr.idComplementoUsu_PQR !== null &&
      complement_pqr.idComplementoUsu_PQR !== undefined
    ) {
      if ('anexos' in complement_pqr) {
        if (
          complement_pqr.anexos === undefined ||
          complement_pqr.anexos === null
        ) {
          set_step(0);

          // void dispatch(
          //   get_complemento_pqrsdf_id_service(complement_pqr.id_PQRSDF)
          // ); servicio para consultar complemento por id
        } else {
          set_step(1);
          dispatch(set_exhibits(complement_pqr.anexos ?? []));
        }
      } else {
        set_step(0);
        // void dispatch(get_complemento_pqrsdf_id_service(pqr.id_PQRSDF));servicio para consultar complemento por id
      }
      set_action('editar');
    } else {
      set_action('crear');
    }
  }, [complement_pqr]);

  useEffect(() => {
    console.log(exhibits, pqr);
    if (exhibits.length > 0) {
      dispatch(set_complement_pqr({ ...complement_pqr, anexos: exhibits }));
    }
  }, [exhibits]);

  const on_submit = (data: IObjComplementPqr): void => {
    const params = {
      id_PQRSDF: pqr.id_PQRSDF,
      id_persona_titular: userinfo.id_persona,
      id_persona_interpone: userinfo.id_persona,
    };
    const form_data: any = new FormData();
    if (
      complement_pqr.idComplementoUsu_PQR !== null &&
      complement_pqr.idComplementoUsu_PQR !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(data.fecha_complemento ?? '');
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
        console.log(aux_items);

        const data_edit: any = {
          ...data,
          cantidad_anexos: exhibits.length,
          nro_folios_totales: folios,
          cod_relacion_titular: 'MP',
          anexos: aux_items,
          requiere_digitalizacion: !ya_digitalizado,
          id_persona_interpone: userinfo.id_persona,
        };
        console.log(data_edit);
        form_data.append('complemento_pqrsdf', JSON.stringify(data_edit));
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

        void dispatch(
          edit_complemento_pqrsdf_service(form_data, navigate, params)
        );
      } else {
        control_error(
          'Solo se pueden editar pqrsdf hasta 30 dias despues de la fecha de creación'
        );
      }
    } else {
      console.log(data, exhibits);
      set_action('crear');
      const fecha = new Date(data.fecha_complemento ?? '').toISOString();
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
        fecha_complemento: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
        id_persona_titular: userinfo.id_persona,
        id_persona_interpone: userinfo.id_persona,
        cantidad_anexos: exhibits.length,
        nro_folios_totales: folios,
        cod_relacion_titular: 'MP',
        anexos: aux_items,
        requiere_digitalizacion: !ya_digitalizado,
        id_PQRSDF: pqr.id_PQRSDF,
      };
      console.log(data_edit);

      form_data.append('complemento_pqrsdf', JSON.stringify(data_edit));
      exhibits.forEach((elemento) => {
        form_data.append(
          `archivo-create-${elemento.nombre_anexo}`,
          elemento.exhibit_link
        );
      });
      form_data.append('id_persona_guarda', userinfo.id_persona);
      form_data.append('isCreateForWeb', 'True');

      void dispatch(
        add_complemento_pqrsdf_service(form_data, navigate, params)
      );
    }
    dispatch(reset_state());
    initial_values();
  };

  const radicate_complemento_pqr = (): void => {
    if (
      complement_pqr.idComplementoUsu_PQR !== null &&
      complement_pqr.idComplementoUsu_PQR !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(complement_pqr.fecha_complemento ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        const params = {
          id_PQRSDF: pqr.id_PQRSDF,
          id_persona_titular: userinfo.id_persona,
          id_persona_interpone: userinfo.id_persona,
        };
        void dispatch(
          radicar_complemento_pqrsdf_service(
            complement_pqr.idComplementoUsu_PQR,
            userinfo.id_persona ?? 0,
            params
          )
        );
        dispatch(reset_state());
        initial_values();
      } else {
        control_error(
          'Solo se pueden radicar complementos hasta 30 dias despues de la fecha de creación'
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
          <Title title="Complemento sobre PQRSDF"></Title>
        </Grid>
        {type_applicant.key !== null && <PersonaTitular />}
        {(on_behalf_of.key === 'E' || on_behalf_of.key === 'A') && (
          <PersonaInterpone />
        )}

        <FormStepper
          configuration_steps={configuration_steps}
          message_success={`Formulario diligenciado correctamente, puede ${action} el PQRSDF`}
          set_success={set_flag_create}
          step={step}
        />
        <Grid container direction="row" padding={2} spacing={2}>
          {complement_pqr.id_radicado === null && (
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit_complemento(on_submit)}
                icon_class={<SaveIcon />}
                disabled={!flag_create}
                label={action}
                type_button="button"
                color_button="success"
              />
            </Grid>
          )}
          {complement_pqr.idComplementoUsu_PQR !== null &&
            complement_pqr.id_radicado === null && (
              <>
                <Grid item xs={12} md={3}>
                  <FormButton
                    variant_button="outlined"
                    on_click_function={radicate_complemento_pqr}
                    icon_class={<AssignmentTurnedInIcon />}
                    label={'Radicar'}
                    type_button="button"
                    color_button="primary"
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <FormButton
                    variant_button="outlined"
                    on_click_function={delete_complemento_pqr}
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
