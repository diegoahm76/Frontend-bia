/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Avatar, Box, Grid, IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Title } from '../../../../../components/Title';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import TableRowExpansion from '../../../../../components/partials/form/TableRowExpansion';
import {
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
import { type ColumnProps } from 'primereact/column';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import PrimaryForm from '../../../../../components/partials/form/PrimaryForm';
import ListadoAnexos from '../componentes/ListadoAnexos';
import FormButton from '../../../../../components/partials/form/FormButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import {
  control_success,
  get_solicitud_notificacion_id_service,
  publicar_gaceta_service,
} from '../store/thunks/notificacionesThunks';
import StepTwo from '../componentes/StepTwo';
import { IObjSoporte } from '../interfaces/notificaciones';
// import SeleccionTipoPersona from '../componentes/SolicitudPQRSDF/SeleccionTipoPersona';
// import EstadoPqrsdf from '../componentes/SolicitudPQRSDF/EstadoPqrsdf';
// import ListadoPqrsdf from '../componentes/SolicitudPQRSDF/ListadoPqrsdf';
// import TipoEmpresa from '../componentes/SolicitudPQRSDF/TipoEmpresa';
// import TipoPoderdante from '../componentes/SolicitudPQRSDF/TipoPoderdante';
// import TipoPersona from '../componentes/SolicitudPQRSDF/TipoPersona';
// import FormButton from '../../../../components/partials/form/FormButton';
// import Limpiar from '../../../conservacion/componentes/Limpiar';
// import SaveIcon from '@mui/icons-material/Save';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function PublicacionAvisoScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    notification_requests,
    list_document_types,
    list_status,
    list_groups,
    notification_request,
    tipos_notificacion,
    person,
    persons,
    list_status_asignation,
    notification_per_request,
    soportes,
  } = useAppSelector((state) => state.notificaciones_slice);
  const [selectedPqr, setSelectedPqr] = useState<any>(null);
  const [button_option, set_button_option] = useState('');
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);

  const [detail_is_active, set_detail_is_active] = useState<boolean>(false);
  const {
    control: control_notificacion,
    handleSubmit: handle_submit_notificacion,
    reset: reset_notificacion,
    watch,
  } = useForm<any>();
  // const [file_name, set_file_name] = useState<string>('');
  // const [selected_image_aux, set_selected_image_aux] = useState<any>(null);
  // const [file, set_file] = useState<any>(null);
  useEffect(() => {}, []);
  useEffect(() => {
    reset_notificacion(notification_request);
  }, [notification_request]);
  const guardar_soportes = (): void => {
    const aux_items: IObjSoporte[] = [];
    soportes.forEach((elemento: IObjSoporte, index: number) => {
      if (elemento.id_anexo === null || elemento.id_anexo === undefined) {
        aux_items.push({
          ...elemento,
          orden_anexo_doc: index,
          ya_digitalizado: false,
          cod_medio_almacenamiento: 'Ot',
          uso_del_documento: true,
          cod_tipo_documento: notification_request?.cod_tipo_documento,
          id_tipo_anexo_soporte: elemento.id_tipo_anexo,
          numero_folios: Number(elemento.numero_folios),
          link_publicacion: null,
        });
      }
    });
    console.log(aux_items);
    const form_data: any = new FormData();
    form_data.append('data', JSON.stringify({ anexos: aux_items }));
    soportes.forEach((elemento: IObjSoporte) => {
      if (elemento.id_anexo === null || elemento.id_anexo === undefined) {
        form_data.append(
          `archivo-create-${elemento.nombre_anexo}`,
          elemento.ruta_archivo
        );
      }
    });
    void dispatch(
      publicar_gaceta_service(
        form_data,
        notification_per_request?.id_registro_notificacion_correspondencia
      )
    );

    // control_success('Soportes guardados con exito');
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
          <Title title="Publicación por aviso"></Title>
          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'cod_tipo_documento',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: true,
                helper_text: '',
                select_options: list_document_types,
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'expediente',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Expediente',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'tramite',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Solicitud de trámite',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'acto_administrativo',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Acto administrativo',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'oficina_solicitante',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'oficina solicitante',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'persona_solicitante',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Persona solicitante',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_solicitud',
                default_value: new Date(),
                rules: {},
                label: 'Fecha de solicitud',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_asignacion',
                default_value: new Date(),
                rules: {},
                label: 'Fecha de asignacion',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
            ]}
          />
          <ListadoAnexos />
          {/* 
          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 12,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Descripción',
                disabled: false,
                helper_text: '',
                multiline_text: true,
                rows_text: 4,
              },
            ]}
          /> */}

          {/* <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'title',
                title_label:
                  'Soportes de publicación en página - gaceta ambiental',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 9,
                control_form: control_notificacion,
                control_name: 'link',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Link de publicacion en página',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'button',
                xs: 12,
                md: 3,
                label: 'URL',
                type_button: 'button',
                disabled: true,
                variant_button: 'contained',
                on_click_function: null,
                color_button: 'primary',
              },
              {
                datum_type: 'date_picker_time_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_actual',
                default_value: new Date(),
                rules: {},
                label: 'Fecha y hora de fijación',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD HH:mm:ss',
              },
              {
                datum_type: 'input_file_controller',
                xs: 12,
                md: 5,
                control_form: control_notificacion,
                control_name: 'ruta_imagen_foto',
                default_value: '',
                rules: {
                  required_rule: { rule: false, message: 'Archivo requerido' },
                },
                label: 'Soporte de fijación',
                disabled: false,
                helper_text: '',
                set_value: set_file,
                file_name,
              },
              {
                datum_type: 'image_uploader',
                xs: 12,
                md: 4,
                margin: 0,
                selected_image: selected_image_aux,
                width_image: '150px',
                height_image: 'auto',
              },
            ]}
          /> */}
          <StepTwo />
        </Grid>
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={null}
              icon_class={<CloseIcon />}
              disabled={false}
              label={'Cancelar'}
              type_button="button"
              color_button="error"
              href={`/#/app/transversal/notificaciones/panel_asignacion_funcionario`}
            />
          </Grid>
          <>
            {/* <Grid item xs={12} md={3}>
              <FormButton
                variant_button="outlined"
                on_click_function={null}
                icon_class={<StarOutlineIcon />}
                label={'Generar constancia publicación'}
                type_button="button"
                color_button="primary"
              />
            </Grid> */}
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={guardar_soportes}
                icon_class={<CheckIcon />}
                label={'Guardar'}
                type_button="button"
                color_button="success"
              />
            </Grid>
          </>
        </Grid>
      </Grid>
    </>
  );
}
