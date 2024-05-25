/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Avatar, Box, Grid, IconButton, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Title } from '../../../../../../components/Title';
import BuscarModelo from '../../../../../../components/partials/getModels/BuscarModelo';
import TableRowExpansion from '../../../../../../components/partials/form/TableRowExpansion';
import {
  DataTableExpandedRows,
  DataTableValueArray,
} from 'primereact/datatable';
import { type ColumnProps } from 'primereact/column';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React from 'react';
import PrimaryForm from '../../../../../../components/partials/form/PrimaryForm';
import ListadoAnexos from '../../../../../gestorDocumental/CentralDigitalizacion/componentes/CentralDigitalizacion/ListadoAnexos';
import FormButton from '../../../../../../components/partials/form/FormButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import CloseIcon from '@mui/icons-material/Close';
import ImprimirRadicado from '../../componentes/generador/ImprimirRadicado';
import PrintIcon from '@mui/icons-material/Print';

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
export function GeneradorDocumentosScreen(): JSX.Element {
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
    getValues: get_values,
  } = useForm<any>();
  const [file_name, set_file_name] = useState<string>('');
  const [selected_image_aux, set_selected_image_aux] = useState<any>(null);
  const [file, set_file] = useState<any>(null);
  const [visor, set_visor] = useState<any>();
  const descargarPDF = () => {
    // Puedes convertir el contenido del visor a Blob
    const byteString = atob(visor.split(',')[1]);
    const mimeString = visor.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: mimeString });

    // Crea un enlace temporal y simula un clic para iniciar la descarga
    const enlaceTemporal = document.createElement('a');
    enlaceTemporal.href = URL.createObjectURL(blob);
    enlaceTemporal.download = `documento_generado.pdf`;
    enlaceTemporal.click();
  };
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
          <Title title="Generador de documentos"></Title>
          <PrimaryForm
            on_submit_form={null}
            button_submit_label=""
            button_submit_icon_class={null}
            show_button={false}
            form_inputs={[
              {
                datum_type: 'title',
                title_label: 'Información básica del documento',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'document',
                default_value: 1,
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: false,
                helper_text: '',
                select_options: [
                  { label: 'Documento 1', key: 1 },
                  { label: 'Documento 2', key: 2 },
                  { label: 'Documento 3', key: 3 },
                  { label: 'Documento 4', key: 4 },
                  { label: 'Documento 5', key: 5 },
                  { label: 'Documento 6', key: 6 },
                  { label: 'Documento 7', key: 7 },
                ],
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'two',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Acto administrativo',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'three',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de acto administrativo',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'date_picker_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'four',
                default_value: new Date(),
                rules: {},
                label: 'Fecha del acto administrativo',
                disabled: false,
                helper_text: '',
                format: 'YYYY-MM-DD',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'five',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Titular a notificar',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'six',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Correo electrónico',
                disabled: false,
                helper_text: '',
              },

              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'seven',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Dirección',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'eight',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Radicado',
                disabled: false,
                helper_text: '',
              },
            ]}
          />
          <ImprimirRadicado
            visor={visor}
            set_visor={set_visor}
            get_values={get_values}
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

          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={descargarPDF}
              icon_class={<PrintIcon />}
              disabled={false}
              label="Imprimir"
              type_button="button"
              color_button="warning"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="outlined"
              on_click_function={null}
              icon_class={<StarOutlineIcon />}
              label={'Guardar'}
              type_button="button"
              color_button="primary"
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
