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
import ListadoAnexos from '../../../../gestorDocumental/CentralDigitalizacion/componentes/CentralDigitalizacion/ListadoAnexos';
import FormButton from '../../../../../components/partials/form/FormButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import StepTwo from '../../../../gestorDocumental/PQRSDF/componentes/CrearPQRSDF/StepTwo';
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
export function PublicarEdictosScreen(): JSX.Element {
  const dispatch = useAppDispatch();

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
  const [file_name, set_file_name] = useState<string>('');
  const [selected_image_aux, set_selected_image_aux] = useState<any>(null);
  const [file, set_file] = useState<any>(null);
  const [file_name_1, set_file_name_1] = useState<string>('');
  const [selected_image_aux_1, set_selected_image_aux_1] = useState<any>(null);
  const [file_1, set_file_1] = useState<any>(null);
  useEffect(() => {}, []);
  useEffect(() => {
    if (file !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        set_selected_image_aux(reader.result);
      };
      reader.readAsDataURL(file);

      if ('name' in file) {
        //  console.log('')(file.name)
        set_file_name(file.name);
        // dispatch(set_current_cv_others({
        //     ...current_cv_other,
        //     id_marca: get_values("id_marca"),
        //     especificaciones_tecnicas: get_values("especificaciones_tecnicas"),
        //     caracteristicas_fisicas: get_values("caracteristicas_fisicas"),
        //     observaciones_adicionales: get_values("observaciones_adicionales"),
        //     ruta_imagen_foto: file
        // }))
      }
    }
  }, [file]);
  useEffect(() => {
    if (file_1 !== null) {
      const reader = new FileReader();
      reader.onload = () => {
        set_selected_image_aux_1(reader.result);
      };
      reader.readAsDataURL(file_1);

      if ('name' in file) {
        //  console.log('')(file.name)
        set_file_name_1(file.name);
        // dispatch(set_current_cv_others({
        //     ...current_cv_other,
        //     id_marca: get_values("id_marca"),
        //     especificaciones_tecnicas: get_values("especificaciones_tecnicas"),
        //     caracteristicas_fisicas: get_values("caracteristicas_fisicas"),
        //     observaciones_adicionales: get_values("observaciones_adicionales"),
        //     ruta_imagen_foto: file
        // }))
      }
    }
  }, [file_1]);
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
          <Title title="Publicación Edíctos - pagina web"></Title>
          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Acto administrativo',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Expediente',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'oficina solicitante',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'type_applicant',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Funcionario solicitante',
                disabled: true,
                helper_text: '',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 2,
                control_form: control_notificacion,
                control_name: 'fecha_actual',
                default_value: new Date(),
                rules: {},
                label: 'Fecha solicitud',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 2,
                control_form: control_notificacion,
                control_name: 'fecha_actual',
                default_value: new Date(),
                rules: {},
                label: 'Fecha asignación',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
            ]}
          />
          <StepTwo />
          <Grid container direction="row" padding={2} spacing={2}>
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
                icon_class={null}
                disabled={false}
                label={'Generar documento'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
          </Grid>

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
          />

          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'title',
                title_label: 'Soportes de publicación en página - Edíctos',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 9,
                control_form: control_notificacion,
                control_name: 'type_applicant_0',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Link de publicacion en página',
                disabled: true,
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
              {
                datum_type: 'date_picker_time_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'fecha_actual_1',
                default_value: new Date(),
                rules: {},
                label: 'Fecha y hora de desfijación',
                disabled: true,
                helper_text: '',
                format: 'YYYY-MM-DD HH:mm:ss',
              },
              {
                datum_type: 'input_file_controller',
                xs: 12,
                md: 5,
                control_form: control_notificacion,
                control_name: 'ruta_imagen_foto_1',
                default_value: '',
                rules: {
                  required_rule: { rule: false, message: 'Archivo requerido' },
                },
                label: 'Soporte de desfijación',
                disabled: false,
                helper_text: '',
                set_value: set_file_1,
                file_name: file_name_1,
              },
              {
                datum_type: 'image_uploader',
                xs: 12,
                md: 4,
                margin: 0,
                selected_image: selected_image_aux_1,
                width_image: '150px',
                height_image: 'auto',
              },
            ]}
          />
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
            />
          </Grid>
          <>
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="outlined"
                on_click_function={null}
                icon_class={<StarOutlineIcon />}
                label={'Generar constancia publicación'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={null}
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
