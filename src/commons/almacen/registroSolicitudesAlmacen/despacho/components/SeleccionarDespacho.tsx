/* eslint-disable @typescript-eslint/no-unused-vars */

import { Chip, Grid } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import {
  set_current_despacho,
  set_despachos,
} from '../store/slices/indexDespacho';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { get_despachos_service } from '../store/thunks/despachoThunks';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

interface IProps {
  control_despacho: any;
  get_values: any;
  open_modal: boolean;
  set_open_modal: any;
}
interface IList {
  value: string | number;
  label: string | number;
}
const initial_options: IList[] = [
  {
    label: '',
    value: '',
  },
];


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarDespacho = ({ control_despacho, get_values, open_modal, set_open_modal, }: IProps) => {
  // const [action, set_action] = useState<string>("agregar");
  const { despachos, current_despacho, persona_despacha } = useAppSelector(
    (state) => state.despacho
  );
  const { unidad_organizacional } = useAppSelector(
    (state) => state.solic_consumo
  );

  const { nurseries } = useAppSelector((state) => state.solicitud_vivero);

  const dispatch = useAppDispatch();
  const [file, set_file] = useState<any>(null);
  const [file_name, set_file_name] = useState<any>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [document_type, set_document_type] = useState<IList[]>(initial_options);

  const text_choise_adapter: any = (dataArray: string[]) => {
    const data_new_format: IList[] = dataArray.map((dataOld) => ({
      label: dataOld[1],
      value: dataOld[0],
    }));
    return data_new_format;
  };

  useEffect(() => {
    const get_selects_options: any = async () => {
      try {
        const { data: document_type_no_format } = await api.get(
          'choices/tipo-documento/'
        );

        const document_type_format: IList[] = text_choise_adapter(
          document_type_no_format
        );
        set_document_type(document_type_format);
      } catch (err) {
        //  console.log('')(err);
      }
    };
    void get_selects_options();
  }, []);

  const columns_despacho: GridColDef[] = [

    {
      field: 'fecha_solicitud',
      headerName: 'Fecha de solicitud',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_despacho',
      headerName: 'Fecha del despacho',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'motivo',
      headerName: 'Motivo',
      width: 350,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'es_despacho_conservacion',
      headerName: 'Es despacho de conservación',
      width: 350,
      renderCell: (params) => {
        return params.row.es_despacho_conservacion === true ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="error" variant="outlined" />
        );
      },
    },
  ];

  useEffect(() => {
    if (file !== null) {
      if ('name' in file) {
        set_file_name(file.name);
        dispatch(
          set_current_despacho({
            ...current_despacho,
            fecha_despacho: get_values('fecha_despacho'),
            motivo: get_values('motivo'),
            id_persona_despacha: persona_despacha.id_persona,
            persona_crea: persona_despacha.nombre_completo ?? '',
            ruta_archivo_doc_con_recibido: file,
          })
        );
      }
    }
  }, [file]);
  useEffect(() => {
    if (current_despacho.id_despacho_consumo !== null) {
      if (
        current_despacho.ruta_archivo_doc_con_recibido !== null &&
        current_despacho.ruta_archivo_doc_con_recibido !== undefined
      ) {
        set_file_name(String(current_despacho.ruta_archivo_doc_con_recibido));
      }
    }
  }, [current_despacho]);

  const get_despachos: any = async () => {
    //  console.log('')("buscar...");
    const nro = get_values('numero_solicitud_por_tipo') ?? '';
    const id_unidad = get_values('id_unidad_para_la_que_solicita') ?? '';
    const fecha_despacho = get_values('fecha_despacho') ?? '';
    const es_conservacion = get_values('es_despacho_conservacion') ?? '';
    void dispatch(get_despachos_service(nro, id_unidad, fecha_despacho, es_conservacion)
    );

  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_despacho}
          row_id={'id_despacho_consumo'}
          columns_model={columns_despacho}
          models={despachos}
          get_filters_models={get_despachos}
          set_models={set_despachos}
          show_search_button={false}
          open_search_modal={open_modal}
          set_open_search_modal={set_open_modal}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Información del despacho',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
              control_form: control_despacho,
              control_name: 'numero_despacho_consumo',
              default_value: '',
              rules: {},
              label: 'Número despacho',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 4,
              control_form: control_despacho,
              control_name: 'ruta_archivo_doc_con_recibido',
              default_value: '',
              rules: {
                required_rule: { rule: false, message: 'Archivo requerido' },
              },
              label: 'Archivo soporte',
              disabled: false,
              helper_text: '',
              set_value: set_file,
              file_name,
            },
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 4,
              control_form: control_despacho,
              control_name: 'fecha_despacho',
              default_value: '',
              rules: {

              },
              label: 'Fecha de despacho',
              disabled: true,
              helper_text: '',
              format: 'YYYY-MM-DD',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_despacho,
              control_name: 'motivo',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Observación requerida' },
              },
              label: 'Observaciones',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_despacho,
              control_name: 'persona_crea',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar la personas que la creó',
                },
              },
              label: 'Despacho realizada por',
              type: 'text',
              disabled: true,
              helper_text: '',
            },

          ]}
          modal_select_model_title="Buscar despacho"
          modal_form_filters={[
            {
              datum_type: 'date_picker_controller',
              xs: 12,
              md: 2,
              control_form: control_despacho,
              control_name: 'fecha_despacho',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'requerido' } },
              label: 'Fecha del despacho',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_despacho,
              control_name: 'numero_solicitud_por_tipo',
              default_value: '',
              rules: {},
              label: 'Número despacho',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_despacho,
              control_name: 'id_unidad_para_la_que_solicita',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'requerido' } },
              label: 'Unidad organizacional',
              disabled: false,
              helper_text: 'debe seleccionar campo',
              select_options: unidad_organizacional,
              option_label: 'nombre',
              option_key: 'id_unidad_organizacional',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_despacho,
              control_name: 'es_despacho_conservacion',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'requerido' } },
              label: '¿Es despacho para conservación?',
              disabled: false,
              helper_text: 'debe seleccionar campo',
              select_options: [
                { label: 'SI', key: true },
                { label: 'NO', key: false },
              ],
              option_label: 'label',
              option_key: 'key',
            },
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarDespacho;
