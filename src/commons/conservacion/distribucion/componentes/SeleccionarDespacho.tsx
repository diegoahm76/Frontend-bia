/* eslint-disable @typescript-eslint/no-unused-vars */

import { Chip, Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import {
  set_current_despacho,
  set_despachos,
} from '../store/slice/distribucionSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import { api } from '../../../../api/axios';
import { get_despachos_service } from '../store/thunks/distribucionThunks';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';

interface IProps {
  control_despacho: any;
  get_values: any;
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
const SeleccionarDespacho = ({ control_despacho, get_values }: IProps) => {
  // const [action, set_action] = useState<string>("agregar");
  const { despachos, current_despacho, transfer_person, origin_nursery } =
    useAppSelector((state) => state.distribucion);
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
        console.log(err);
      }
    };
    void get_selects_options();
  }, []);

  const columns_despacho: GridColDef[] = [
    { field: 'id_despacho_viveros', headerName: 'ID', width: 20 },
    {
      field: 'nro_despachos_viveros',
      headerName: 'Numero de despacho',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nro_solicitud_a_viveros',
      headerName: 'Numero de solicitud',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_despacho',
      headerName: 'Fecha de despacho',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {new Date(params.value).toDateString()}
        </div>
      ),
    },
    {
      field: 'despacho_anulado',
      headerName: 'Estado de despacho',
      width: 200,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.despacho_anulado ? (
          <Chip size="small" label="ANULADO" color="error" variant="outlined" />
        ) : (
          <Chip
            size="small"
            label="NO ANULADO"
            color="success"
            variant="outlined"
          />
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
            id_vivero: get_values('id_vivero'),
            fecha_despacho: get_values('fecha_despacho'),
            motivo: get_values('motivo'),
            id_persona_despacha: transfer_person.id_persona,
            persona_crea: transfer_person.nombre_completo,
            ruta_archivo_con_recibido: file,
          })
        );
      }
    }
  }, [file]);
  useEffect(() => {
    if (current_despacho.id_despacho_viveros !== null) {
      if (
        current_despacho.ruta_archivo_con_recibido !== null &&
        current_despacho.ruta_archivo_con_recibido !== undefined
      ) {
        set_file_name(String(current_despacho.ruta_archivo_con_recibido));
      }
    }
  }, [current_despacho]);

<<<<<<< HEAD
    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}
            >
                <BuscarModelo
                    set_current_model={set_current_despacho}
                    row_id={"id_despacho_viveros"}
                    columns_model={columns_despacho}
                    models={despachos}
                    get_filters_models={get_despachos}
                    set_models={set_despachos}
                    button_submit_label='Buscar despachos'
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: "Información del despacho"
                        },
                        {
                        datum_type: "select_controller",
                        xs: 12,
                        md: 5,
                        control_form: control_despacho,
                        control_name: "id_vivero",
                        default_value: "",
                        rules: { required_rule: { rule: true, message: "Vivero requerido" } },
                        label: "Vivero",
                        disabled: false,
                        helper_text: "Seleccione Vivero",
                        select_options: nurseries,
                        option_label: "nombre",
                        option_key: "id_vivero",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_despacho,
                            control_name: "nro_despachos_viveros",
                            default_value: "",
                            rules: {},
                            label: "Número de despacho",
                            type: "number",
                            disabled: true,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_file_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_despacho,
                            control_name: "ruta_archivo_con_recibido",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "Archivo requerido" } },
                            label: "Archivo soporte",
                            disabled: false,
                            helper_text: "",
                            set_value: set_file,
                            file_name,
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_despacho,
                            control_name: "motivo",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Observación requerida" } },
                            label: "Observaciones",
                            type: "text",
                            multiline_text: true,
                            rows_text: 4,
                            disabled: false,
                            helper_text: ""
                          },
                          {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_despacho,
                            control_name: "persona_crea",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Debe seleccionar la persona que la creó" } },
                            label: "Despacho realizado por",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 5,
                            control_form: control_despacho,
                            control_name: "fecha_despacho",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Debe seleccionar fecha" } },
                            label: "Fecha de incidencia",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                    ]}
                    modal_select_model_title='Buscar despacho'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_despacho,
                            control_name: "nro_despachos_viveros",
                            default_value: "",
                            rules: { },
                            label: "Número despacho",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                     ]}   
                />
            </Grid>
        </>
    );
}
=======
  const get_despachos: any = async () => {
    if (origin_nursery.id_vivero !== null) {
      const nro = get_values('nro_despacho');
      const fecha_desde = get_values('fecha_desde');
      const fecha_hasta = get_values('fecha_hasta');
      void dispatch(
        get_despachos_service(
          origin_nursery.id_vivero,
          nro,
          fecha_desde,
          fecha_hasta
        )
      );
    }
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_despacho}
          row_id={'id_despacho_viveros'}
          columns_model={columns_despacho}
          models={despachos}
          get_filters_models={get_despachos}
          set_models={set_despachos}
          button_submit_label="Buscar despachos"
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Informacion del despacho',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 5,
              control_form: control_despacho,
              control_name: 'id_vivero',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Vivero requerido' },
              },
              label: 'Vivero',
              disabled: false,
              helper_text: 'Seleccione Vivero',
              select_options: nurseries,
              option_label: 'nombre',
              option_key: 'id_vivero',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_despacho,
              control_name: 'nro_despachos_viveros',
              default_value: '',
              rules: {},
              label: 'Numero despacho',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_file_controller',
              xs: 12,
              md: 4,
              control_form: control_despacho,
              control_name: 'ruta_archivo_con_recibido',
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
              datum_type: 'input_controller',
              xs: 12,
              md: 12,
              control_form: control_despacho,
              control_name: 'motivo',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Observación requerida' },
              },
              label: 'observaciones',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
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
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_despacho,
              control_name: 'fecha_despacho',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar fecha',
                },
              },
              label: 'Fecha de incidencia',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
          ]}
          modal_select_model_title="Buscar despacho"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_despacho,
              control_name: 'nro_despachos_viveros',
              default_value: '',
              rules: {},
              label: 'Numero despacho',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
          ]}
        />
      </Grid>
    </>
  );
};
>>>>>>> d3d6f4f379bae3d51692b1dd1f365c7d6bc5d30d

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarDespacho;
