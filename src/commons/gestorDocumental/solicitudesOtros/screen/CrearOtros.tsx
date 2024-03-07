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
  reset_state,
  set_exhibits, 
  set_others, 
  set_pqr,
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
  delete_pqrsdf_service,
  edit_pqrsdf_service,
  get_file_categories_service,
  get_file_origin_service,
  get_file_typology_service,
  get_media_types_service,
  get_offices_service,
  get_others_service_id,
  get_pqr_types_service,
  get_pqrsdf_id_service,
  get_presentation_types_service,
  get_storage_mediums_service,
  radicar_pqrsdf_service,
} from '../../PQRSDF/store/thunks/pqrsdfThunks';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import StepOneOtros from '../components/StepOne';
import PersonaTitularOtros from '../components/PersonaTitular';
import StepTwOtros from '../components/StepTwo';
import PersonaInterponeOtros from '../components/PersonaInterpone';
// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearOtroScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const {
    type_applicant,
    on_behalf_of,   
    otro,
    exhibits,
  } = useAppSelector((state) => state.pqrsdf_slice);

  const {
    control: control_pqrsdf,
    handleSubmit: handle_submit_pqrsdf,
    reset: reset_pqrsdf,
    watch,
  } = useForm<any>();

  const { id } = useParams();

  useEffect(() => {
    if (id !== null && id !== undefined) {
      void dispatch(get_others_service_id(id));
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

  const StepComponent = (step: number) => {
    switch (step) {
      case 1:
        return <StepOneOtros control_form={control_pqrsdf} reset={reset_pqrsdf} />;

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
    console.log('validate_pqr', data);

    dispatch(set_pqr({ ...otro, ...data, anexos: exhibits }));
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

//   useEffect(() => {
//     if (watch('cod_tipo_PQRSDF') === 'D') {
//       set_configuration_steps([
//         {
//           step_number: 1,
//           optional: false,
//           skipped: false,
//           step_title: 'Información de PQRSDF',
//           body: StepComponent(1),
//           handle_submit: handle_submit_pqrsdf,
//           validate: validate,
//         },
       
//         {
//           step_number: 3,
//           optional: true,
//           skipped: false,
//           step_title: 'Anexos',
//           body: StepComponent(2),
//           handle_submit: handle_submit_pqrsdf,
//           validate: validate,
//         },
//       ]);
//     } else {
//       dispatch(set_pqr({ ...otro, denuncia: null }));
//       set_configuration_steps([
//         {
//           step_number: 1,
//           optional: false,
//           skipped: false,
//           step_title: 'Información de PQRSDF',
//           body: StepComponent(1),
//           handle_submit: handle_submit_pqrsdf,
//           validate: validate,
//         },
//         {
//           step_number: 2,
//           optional: true,
//           skipped: false,
//           step_title: 'Anexos',
//           body: StepComponent(2),
//           handle_submit: handle_submit_pqrsdf,
//           validate: validate,
//         },
//       ]);
//     }
//   }, [watch('cod_tipo_PQRSDF')]);

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
    reset_pqrsdf({
      ...otro,
      cod_forma_presentacion:
        (type_applicant.key ?? null) === null
          ? 'E'
          : otro.cod_forma_presentacion,
      id_medio_solicitud:
        (type_applicant.key ?? null) === null ? 2 : otro.id_medio_solicitud,
    });
    console.log(otro);
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
      
      set_action('editar');
    }
  }, [otro]);

//   useEffect(() => {
//     console.log(exhibits, otro);
//     if (exhibits.length > 0) {
//       dispatch(set_others({ ...otro, anexos: exhibits }));
//     }
//   }, [exhibits]);

  const on_submit = (data: IObjOtros): void => {
    const form_data: any = new FormData();
    console.log(data)
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
        console.log(aux_items);

        const data_edit: any = {
          ...data,
          cantidad_anexos: exhibits.length,
          nro_folios_totales: folios,
          es_anonima: false,
          anexos: aux_items,
          requiere_digitalizacion: !ya_digitalizado,
          
        };
        console.log(data_edit);
        form_data.append('otros', JSON.stringify(data_edit));
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

        void dispatch(edit_pqrsdf_service(form_data, navigate));
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
        id_persona_titular: userinfo.id_persona,
        id_persona_interpone: userinfo.id_persona,
        cantidad_anexos: exhibits.length,
        nro_folios_totales: folios,
        cod_relacion_con_el_titular: 'MP',
        es_anonima: false,
        anexos: aux_items,
        requiere_digitalizacion: !ya_digitalizado,
      };
      console.log(data_edit);

      form_data.append('otros', JSON.stringify(data_edit));
      exhibits.forEach((elemento) => {
        form_data.append(
          `archivo-create-${elemento.nombre_anexo}`,
          elemento.exhibit_link
        );
      });
      form_data.append('id_persona_guarda', userinfo.id_persona);
      form_data.append('isCreateForWeb', 'True');

      void dispatch(add_other_service(form_data));
    }
    dispatch(reset_state());
    initial_values();
  };
  const delete_pqr = (): void => {
    if (otro.id_otros !== null && otro.id_otros !== undefined) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(otro.fecha_registro ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        void dispatch(delete_pqrsdf_service(otro.id_otros, true));
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
    if (otro.id_otros !== null && otro.id_otros !== undefined) {
      const fecha_actual = new Date();
      const fecha_registro = new Date(otro.fecha_registro ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_registro.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        void dispatch(
          radicar_pqrsdf_service(otro.id_otros, userinfo.id_persona ?? 0, true)
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
          {otro.id_otros !== null && otro.id_otros === null && (
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
