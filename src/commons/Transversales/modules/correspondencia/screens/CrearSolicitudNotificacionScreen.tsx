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
import { GridColDef } from '@mui/x-data-grid';
import {
  set_acto_administrativo,
  set_actos_administrativos,
  set_expediente,
  set_expedientes,
  set_group,
  set_notification_request,
  set_person,
  set_persons,
  set_tramite,
  set_tramites,
} from '../store/slice/notificacionesSlice';
import {
  get_acto_administrativo_filter,
  get_document_types_service,
  get_expedientes_filter,
  get_funcionarios_unidad_service,
  get_grupos_id_unidad_service,
  get_subdirecciones_service,
  get_tipos_acto_administrativo_service,
  get_tramite_filter,
  get_trd_service,
  obtener_serie_subserie,
  obtener_unidades_marcadas,
} from '../store/thunks/notificacionesThunks';
import dayjs from 'dayjs';
import DialogSearchModel from '../componentes/DialogSearchModel';
import { get_document_types_service as get_dni_types } from '../../../../gestorDocumental/PQRSDF/store/thunks/pqrsdfThunks';
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
export function CrearSolicitudNotificacionScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const {
    list_unidades_organizacionales,
    notification_requests,
    list_document_types,
    list_status,
    list_groups,
    group,
    notification_request,
    tipos_notificacion,
    expedientes,
    expediente,
    acto_administrativo,
    actos_administrativos,
    tramite,
    tramites,
    person,
    persons,
    trd,
    serie_subserie,
    unidades_marcadas,
    tipos_acto_administrativo,
  } = useAppSelector((state) => state.notificaciones_slice);

  const [expediente_modal, set_expediente_modal] = useState<any>(false);
  const [tramite_modal, set_tramite_modal] = useState<any>(false);
  const [acto_modal, set_acto_modal] = useState<any>(false);
  const [persona_modal, set_persona_modal] = useState<any>(false);
  const [button_option, set_button_option] = useState('');
  const [expandedRows, setExpandedRows] = useState<
    DataTableExpandedRows | DataTableValueArray | undefined
  >(undefined);
  const { document_types } = useAppSelector((state) => state.pqrsdf_slice);
  const [detail_is_active, set_detail_is_active] = useState<boolean>(false);
  const {
    control: control_notificacion,
    handleSubmit: handle_submit_notificacion,
    reset: reset_notificacion,
    watch,
  } = useForm<any>();
  const {
    control: control_expediente,
    reset: reset_expediente,
    getValues: get_values_expediente,
  } = useForm<any>();
  const {
    control: control_tramite,
    reset: reset_tramite,
    getValues: get_values_tramite,
  } = useForm<any>();
  const {
    control: control_acto,
    reset: reset_acto,
    getValues: get_values_acto,
  } = useForm<any>();
  const {
    control: control_persona_solicita,
    reset: reset_persona_solicita,
    getValues: get_values_persona_solicita,
  } = useForm<any>();
  useEffect(() => {
    void dispatch(get_trd_service());
    void dispatch(get_tipos_acto_administrativo_service());
    void dispatch(get_dni_types());
    void dispatch(get_document_types_service());
    void dispatch(get_subdirecciones_service());
  }, []);
  const columns_list: GridColDef[] = [
    {
      field: 'persona_asignada',
      headerName: 'Funcionario',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'vigencia_contrato',
      headerName: 'Vigencia del contrato',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'asignadas',
      headerName: 'Tareas asignadas',
      width: 300,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'resueltas',
      headerName: 'Tareas resueltas',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'pendientes',
      headerName: 'Pendientes',
      width: 250,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];
  const on_change_select = (value: any, name: string): void => {
    if (name === 'id_trd_origen') {
      if (value !== undefined) {
        console.log(value);
        void dispatch(obtener_unidades_marcadas(value.id_organigrama));
        set_expediente_modal(true);
        //  console.log('')(value);
      }
    } else if (name === 'id_und_seccion_propietaria_serie') {
      if (value !== undefined) {
        console.log(value);
        void dispatch(
          obtener_serie_subserie({
            id_trd: get_values_expediente('id_trd_origen'),
            id_unidad_organizacional: value.id_unidad_organizacional,
          })
        );
      }
    } else if (name === 'subdireccion') {
      if (value !== undefined) {
        console.log(value);
        void dispatch(get_grupos_id_unidad_service(value.id));
      }
    } else if (name === 'grupo') {
      if (value !== undefined) {
        console.log(value);
        void dispatch(set_group(value));
      }
    }
  };
  useEffect(() => {
    reset_notificacion(notification_request);
  }, [notification_request]);

  const open_expediente_modal = (): void => {
    set_expediente_modal(true);
  };
  useEffect(() => {
    reset_expediente(expediente);
    dispatch(
      set_notification_request({
        ...notification_request,
        id_expediente_documental: expediente?.id_expediente_documental,
        codigo_exp_und_serie_subserie:
          expediente?.codigo_exp_und_serie_subserie +
          '.' +
          (expediente?.codigo_exp_Agno !== null &&
            '.' + expediente?.codigo_exp_Agno),
      })
    );
  }, [expediente]);

  const get_expedientes: any = async () => {
    const id_trd_origen = get_values_expediente('id_trd_origen') ?? '';
    const id_und_seccion_propietaria_serie =
      get_values_expediente('id_und_seccion_propietaria_serie') ?? '';
    const id_cat_serie_und_org_ccd_trd_prop =
      get_values_expediente('id_cat_serie_und_org_ccd_trd_prop') ?? '';
    const codigo_exp_Agno = get_values_expediente('codigo_exp_Agno') ?? '';

    const params: any = {};

    if (id_trd_origen !== '') {
      params.id_trd_origen = id_trd_origen;
    }

    if (id_und_seccion_propietaria_serie !== '') {
      params.id_und_seccion_propietaria_serie =
        id_und_seccion_propietaria_serie;
    }

    if (id_cat_serie_und_org_ccd_trd_prop !== '') {
      params.id_cat_serie_und_org_ccd_trd_prop =
        id_cat_serie_und_org_ccd_trd_prop;
    }

    if (codigo_exp_Agno !== '') {
      const fecha_start = new Date(codigo_exp_Agno ?? ''); // Obtén el valor de fecha_start del objeto enviado por el formulario
      const year_start = fecha_start.getFullYear();
      params.codigo_exp_Agno = year_start;
    }
    console.log(params);
    void dispatch(get_expedientes_filter(params));
  };
  const columns_expediente: GridColDef[] = [
    {
      field: 'codigo_exp_und_serie_subserie',
      headerName: 'CÓDIGO',
      sortable: true,
      width: 150,
      valueGetter: (params) =>
        params.row.codigo_exp_und_serie_subserie +
        '.' +
        params.row.codigo_exp_Agno +
        (params.row.codigo_exp_consec_por_agno !== null
          ? '.' + params.row.codigo_exp_consec_por_agno
          : ''),
    },
    {
      field: 'nombre_trd_origen',
      headerName: 'TRD',
      sortable: true,
      width: 200,
    },
    {
      field: 'titulo_expediente',
      headerName: 'TITULO',
      width: 200,
    },
    {
      field: 'nombre_unidad_org',
      headerName: 'UNIDAD ORGANIZACIONAL',
      width: 250,
    },
    {
      field: 'nombre_serie_origen',
      headerName: 'SERIE',
      width: 150,
    },
    {
      field: 'nombre_subserie_origen',
      headerName: 'SUB SERIE',
      width: 200,
    },
    {
      field: 'fecha_apertura_expediente',
      headerName: 'AÑO',
      width: 100,
      valueGetter: (params) =>
        dayjs(params.row.fecha_apertura_expediente).format('YYYY'),
    },
    {
      field: 'nombre_persona_titular',
      headerName: 'Persona titular',
      width: 300,
    },
  ];
  const columns_tramite: GridColDef[] = [
    {
      field: 'nombre_proyecto',
      headerName: 'Proyecto',
      sortable: true,
      width: 150,
    },
    {
      field: 'Radicado',
      headerName: 'Radicado',
      sortable: true,
      width: 200,
    },
    {
      field: 'fecha_radicado',
      headerName: 'AÑO',
      width: 100,
      valueGetter: (params) =>
        params.row.fecha_radicado !== null
          ? dayjs(params.row.fecha_radicado).format('YYYY-MM-DD')
          : '',
    },
    {
      field: 'expediente',
      headerName: 'Expediente',
      width: 250,
    },
  ];
  const columns_acto: GridColDef[] = [
    {
      field: 'codigo_exp_und_serie_subserie',
      headerName: 'CÓDIGO',
      sortable: true,
      width: 150,
      valueGetter: (params) =>
        params.row.codigo_exp_und_serie_subserie +
        '.' +
        params.row.codigo_exp_Agno +
        (params.row.codigo_exp_consec_por_agno !== null
          ? '.' + params.row.codigo_exp_consec_por_agno
          : ''),
    },
    {
      field: 'nombre_trd_origen',
      headerName: 'TRD',
      sortable: true,
      width: 200,
    },
    {
      field: 'titulo_expediente',
      headerName: 'TITULO',
      width: 200,
    },
    {
      field: 'nombre_unidad_org',
      headerName: 'UNIDAD ORGANIZACIONAL',
      width: 250,
    },
    {
      field: 'nombre_serie_origen',
      headerName: 'SERIE',
      width: 150,
    },
    {
      field: 'nombre_subserie_origen',
      headerName: 'SUB SERIE',
      width: 200,
    },
    {
      field: 'fecha_apertura_expediente',
      headerName: 'AÑO',
      width: 100,
      valueGetter: (params) =>
        dayjs(params.row.fecha_apertura_expediente).format('YYYY'),
    },
    {
      field: 'nombre_persona_titular',
      headerName: 'Persona titular',
      width: 300,
    },
  ];
  const columns_persona: GridColDef[] = [
    {
      field: 'numero_documento',
      headerName: 'Número documento',
      sortable: true,
      width: 150,
    },
    {
      field: 'nombre_completo',
      headerName: 'Nombre completo',
      sortable: true,
      width: 350,
    },
    {
      field: 'tipo_persona_desc',
      headerName: 'Tipo persona',
      width: 250,
    },
  ];
  const open_tramite_modal = (): void => {
    set_tramite_modal(true);
  };
  const open_acto_modal = (): void => {
    set_acto_modal(true);
  };
  const open_persona_modal = (): void => {
    set_persona_modal(true);
  };
  useEffect(() => {
    reset_tramite(tramite);
    dispatch(
      set_notification_request({
        ...notification_request,
      })
    );
  }, [tramite]);
  useEffect(() => {
    reset_acto(acto_administrativo);
    dispatch(
      set_notification_request({
        ...notification_request,
      })
    );
  }, [acto_administrativo]);
  useEffect(() => {
    reset_persona_solicita(person);
    dispatch(
      set_notification_request({
        ...notification_request,
      })
    );
  }, [person]);

  const get_tramites: any = async () => {
    const tipo_documento = get_values_tramite('tipo_documento') ?? '';
    const grupo_solicitante = get_values_tramite('grupo_solicitante') ?? '';
    const estado = get_values_tramite('estado') ?? '';
    const radicado = get_values_tramite('radicado') ?? '';
    const expediente = get_values_tramite('expediente') ?? '';

    const params: any = {};

    if (tipo_documento !== '') {
      params.tipo_documento = tipo_documento;
    }

    if (grupo_solicitante !== '') {
      params.grupo_solicitante = grupo_solicitante;
    }

    if (estado !== '') {
      params.estado = estado;
    }

    if (radicado !== '') {
      params.radicado = radicado;
    }
    if (expediente !== '') {
      params.expediente = expediente;
    }
    console.log(params);
    void dispatch(get_tramite_filter(params));
  };
  const get_acto: any = async () => {
    const tipo_documento = get_values_tramite('tipo_documento') ?? '';
    const grupo_solicitante = get_values_tramite('grupo_solicitante') ?? '';
    const estado = get_values_tramite('estado') ?? '';
    const radicado = get_values_tramite('radicado') ?? '';
    const expediente = get_values_tramite('expediente') ?? '';

    const params: any = {};

    if (tipo_documento !== '') {
      params.tipo_documento = tipo_documento;
    }

    if (grupo_solicitante !== '') {
      params.grupo_solicitante = grupo_solicitante;
    }

    if (estado !== '') {
      params.estado = estado;
    }

    if (radicado !== '') {
      params.radicado = radicado;
    }
    if (expediente !== '') {
      params.expediente = expediente;
    }
    console.log(params);
    void dispatch(get_acto_administrativo_filter(params));
  };
  const get_personas: any = async () => {
    const subdireccion = get_values_persona_solicita('subdireccion') ?? '';
    const grupo = get_values_persona_solicita('grupo') ?? '';

    void dispatch(get_funcionarios_unidad_service(grupo));
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
          <Title title="Nueva solicitud de notificación"></Title>
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
                control_name: 'tipo_documento',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: false,
                helper_text: '',
                select_options: list_document_types,
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_searcheable',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'codigo_exp_und_serie_subserie',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Expediente',
                disabled: true,
                helper_text: '',
                on_click_function: open_expediente_modal,
                icon_class: null,
              },
              {
                datum_type: 'input_searcheable',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'tramite',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Solicitud de trámite',
                disabled: true,
                helper_text: '',
                on_click_function: open_tramite_modal,
                icon_class: null,
              },
              {
                datum_type: 'input_searcheable',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'acto',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Acto administrativo',
                disabled: true,
                helper_text: '',
                on_click_function: open_acto_modal,
                icon_class: null,
              },
              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'recurso_reposicion',
                default_value: false,
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Procede recurso de reposición',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'oficina',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Oficina solicitante',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_searcheable',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'persona_solicitante',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Persona solicitante',
                disabled: true,
                helper_text: '',
                on_click_function: open_persona_modal,
                icon_class: null,
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
                title_label: 'Datos a quien se dirige',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'cod_tipo_documentoID',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Tipo de documento',
                disabled: false,
                helper_text: '',
                select_options: document_types,
                option_label: 'nombre',
                option_key: 'cod_tipo_documento',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'numero_documento',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Número de identificación',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'persona_a_quien_se_dirige',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Nombre persona o entidad',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'cod_municipio_notificacion_nal',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Municipio',
                disabled: false,
                helper_text: '',
                select_options: [],
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 8,
                control_form: control_notificacion,
                control_name: 'dir_notificacion_nal',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Dirección',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'tel_fijo',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Teléfono fijo',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'tel_celular',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Celular',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 4,
                control_form: control_notificacion,
                control_name: 'email_notificacion',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Email',
                disabled: false,
                helper_text: '',
              },

              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 12,
                control_form: control_notificacion,
                control_name: 'permite_notificacion_email',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label:
                  'El usuario autorizó el correo electrónico para notificaciones',
                disabled: false,
                helper_text: '',
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
                title_label: 'Datos básicos de la solicitud',
              },
              {
                datum_type: 'select_controller',
                xs: 12,
                md: 12,
                control_form: control_notificacion,
                control_name: 'asunto',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Asunto',
                disabled: false,
                helper_text: '',
                select_options: [],
                option_label: 'label',
                option_key: 'key',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 12,
                control_form: control_notificacion,
                control_name: 'descripcion',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Descripción',
                disabled: false,
                helper_text: '',
                multiline_text: true,
                rows_text: 4,
              },
              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'allega_copia_fisica',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Allega copia física',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'cantidad_anexos',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Cantidad de anexos',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'nro_folios_totales',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Cantidad de folios',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'input_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'funcionario_recibe',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Funcionario que recibe',
                disabled: false,
                helper_text: '',
              },
              {
                datum_type: 'checkbox_controller',
                xs: 12,
                md: 3,
                control_form: control_notificacion,
                control_name: 'requiere_digitalizacion',
                default_value: '',
                rules: { required_rule: { rule: true, message: 'Requerido' } },
                label: 'Requiere digitalización',
                disabled: true,
                helper_text: '',
              },
            ]}
          />
        </Grid>
        <StepTwo />
        <DialogSearchModel
          set_current_model={set_expediente}
          modal_select_model_title="Buscar expediente"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 6,
              control_form: control_expediente,
              control_name: 'id_trd_origen',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'TRD-Actual',
              disabled: false,
              helper_text: '',
              select_options: trd,
              option_label: 'nombre',
              option_key: 'id_trd',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 6,
              control_form: control_expediente,
              control_name: 'id_und_seccion_propietaria_serie',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Sección',
              disabled: false,
              helper_text: '',
              select_options: unidades_marcadas,
              option_label: 'nombre',
              option_key: 'id_unidad_organizacional',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 6,
              control_form: control_expediente,
              control_name: 'id_cat_serie_und_org_ccd_trd_prop',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Serie',
              disabled: false,
              helper_text: '',
              select_options: serie_subserie,
              option_label: 'nombre_serie',
              option_key: 'id_catserie_unidadorg',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 3,
              control_form: control_expediente,
              control_name: 'codigo_exp_Agno',
              default_value: null,
              rules: {},
              label: 'Año',
              disabled: false,
              helper_text: '',
              format: 'YYYY',
              open_to: 'year',
            },
          ]}
          set_models={set_expedientes}
          get_filters_models={get_expedientes}
          models={expedientes}
          columns_model={columns_expediente}
          row_id="id_expediente_documental"
          select_model_is_active={expediente_modal}
          set_select_model_is_active={set_expediente_modal}
        />
        <DialogSearchModel
          set_current_model={set_tramite}
          modal_select_model_title="Buscar solicitud de trámite"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_expediente,
              control_name: 'nombre',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Nombre del proyecto',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_expediente,
              control_name: 'persona',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Persona titular',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_expediente,
              control_name: 'expediente',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Expediente',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_expediente,
              control_name: 'radicado',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Radicado',
              disabled: false,
              helper_text: '',
            },
          ]}
          set_models={set_tramites}
          get_filters_models={get_tramites}
          models={tramites}
          columns_model={columns_tramite}
          row_id="id_solicitud_tramite"
          select_model_is_active={tramite_modal}
          set_select_model_is_active={set_tramite_modal}
        />
        <DialogSearchModel
          set_current_model={set_acto_administrativo}
          modal_select_model_title="Buscar acto administrativo"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_acto,
              control_name: 'nombre',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Número de acto administrativo',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 6,
              control_form: control_expediente,
              control_name: 'persona',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Tipo de acto admnistrativo',
              disabled: false,
              helper_text: '',
              select_options: tipos_acto_administrativo,
              option_label: 'nombre',
              option_key: 'id_tipo_notificacion_correspondencia',
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 3,
              control_form: control_expediente,
              control_name: 'codigo_exp_Agno',
              default_value: null,
              rules: {},
              label: 'Fecha del acto administrativo',
              disabled: false,
              helper_text: '',
              format: 'YYYY-MM-DD',
            },
          ]}
          set_models={set_actos_administrativos}
          get_filters_models={get_acto}
          models={actos_administrativos}
          columns_model={columns_acto}
          row_id="id_solicitud_tramite"
          select_model_is_active={acto_modal}
          set_select_model_is_active={set_acto_modal}
        />
        <DialogSearchModel
          set_current_model={set_person}
          modal_select_model_title="Buscar grupo y funcionario solicitante"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_persona_solicita,
              control_name: 'subdireccion',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'subdireccion',
              disabled: false,
              helper_text: '',
              select_options: list_unidades_organizacionales,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 4,
              control_form: control_persona_solicita,
              control_name: 'grupo',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Requerido' },
              },
              label: 'Grupo solicitante',
              disabled: false,
              helper_text: '',
              select_options: list_groups,
              option_label: 'label',
              option_key: 'key',
              on_change_function: on_change_select,
            },
          ]}
          set_models={set_persons}
          get_filters_models={get_personas}
          models={persons}
          columns_model={columns_persona}
          row_id="id_persona"
          select_model_is_active={persona_modal}
          set_select_model_is_active={set_persona_modal}
        />
        <Grid container direction="row" padding={2} spacing={2}>
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={null}
              icon_class={<CloseIcon />}
              disabled={!false}
              label={'Rechazar'}
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
                label={'Agregar solicitud de notificación'}
                type_button="button"
                color_button="primary"
              />
            </Grid>
          </>
        </Grid>
      </Grid>
    </>
  );
}
