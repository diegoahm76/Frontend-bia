import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import SeleccionarModeloDialogForm from '../../../../components/partials/getModels/SeleccionarModeloDialogForm';
import { type GridColDef } from '@mui/x-data-grid';
import { type IObjSiembraMV } from '../interfaces/produccion';
import {
  set_current_siembra_material_vegetal,
  set_siembras_material_vegetal,
} from '../store/slice/produccionSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import {
  get_lots_code_service,
  get_lots_service,
} from '../store/thunks/produccionThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarLoteSiembra = () => {
  const {
    control: control_bien,
    reset: reset_bien,
    getValues: get_values_bien,
  } = useForm<IObjSiembraMV>();

  const [bienes, set_bienes] = useState<any>([]);
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(false);

  const {
    current_nursery,
    current_siembra_material_vegetal,
    siembras_material_vegetal,
    current_incidencia,
  } = useAppSelector((state) => state.produccion);
  const dispatch = useAppDispatch();

  const columns_bienes: GridColDef[] = [
    {
      field: 'codigo_bien',
      headerName: 'Codigo',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_bien',
      headerName: 'Nombre',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'agno_lote',
      headerName: 'Año lote',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nro_lote',
      headerName: '# lote',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cod_etapa_lote',
      headerName: 'Etapa lote',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === 'P'
            ? 'Producción'
            : params.value === 'D'
            ? 'Distribución'
            : params.value === 'G'
            ? 'Germinación'
            : '-'}
        </div>
      ),
    },
    {
      field: 'saldo_disponible_registro',
      headerName: 'Cantidad disponible',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const get_bienes: any = async () => {
    const id_vivero = current_nursery.id_vivero;
    if (id_vivero !== null && id_vivero !== undefined) {
      const codigo_bien = get_values_bien('codigo_bien') ?? '';
      const nombre = get_values_bien('nombre_bien') ?? '';
      const cod_etapa = get_values_bien('cod_etapa_lote') ?? '';
      void dispatch(
        get_lots_service(id_vivero, codigo_bien, nombre, cod_etapa)
      );
    }
  };

  const search_bien: any = async () => {
    try {
      const id_vivero = current_nursery.id_vivero;
      if (id_vivero !== null && id_vivero !== undefined) {
        const codigo = get_values_bien('codigo_bien') ?? '';
        const data = await dispatch(get_lots_code_service(id_vivero, codigo));
        set_bienes(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if ('success' in bienes) {
      if (bienes.success === true) {
        if ('data' in bienes) {
          if (bienes.data.length > 1) {
            set_select_model_is_active(true);
          }
        }
      }
    }
  }, [bienes]);

  useEffect(() => {
    reset_bien(current_siembra_material_vegetal);
  }, [current_siembra_material_vegetal]);

  useEffect(() => {
    if (current_siembra_material_vegetal.id_inventario_vivero === null) {
      reset_bien(current_siembra_material_vegetal);
    }
  }, [current_incidencia]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_siembra_material_vegetal}
          row_id={'id_inventario_vivero'}
          columns_model={columns_bienes}
          models={siembras_material_vegetal}
          get_filters_models={get_bienes}
          set_models={set_siembras_material_vegetal}
          button_submit_label="Buscar bien"
          button_submit_disabled={current_nursery.id_vivero === null}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Selección material vegetal (lote-etapa)',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'codigo_bien',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Codigo bien requerido' },
              },
              label: 'Codigo bien',
              type: 'number',
              disabled: current_incidencia.id_incidencias_mat_vegetal !== null,
              helper_text: '',
              on_blur_function: search_bien,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'nombre_bien',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar un bien',
                },
              },
              label: 'Nombre',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'nro_lote',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar un bien',
                },
              },
              label: 'Numero de lote',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'agno_lote',
              default_value: '',
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Debe seleccionar un bien',
                },
              },
              label: 'Año lote',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'saldo_disponible_registro',
              default_value: '',
              rules: {
                required_rule: {
                  rule: false,
                  message: 'Debe seleccionar un bien',
                },
              },
              label: 'Saldo',
              type: 'number',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_bien,
              control_name: 'cod_etapa_lote',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'requerido' } },
              label: 'Etapa de lote',
              helper_text: '',
              disabled: true,
              select_options: [
                { label: 'Germinación', value: 'G' },
                { label: 'Producción', value: 'P' },
                { label: 'Distribucción', value: 'D' },
              ],
              option_label: 'label',
              option_key: 'value',
            },
          ]}
          modal_select_model_title="Buscar bien"
          modal_form_filters={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'codigo_bien',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Codigo bien requerido' },
              },
              label: 'Codigo bien',
              type: 'number',
              disabled: false,
              helper_text: '',
              on_blur_function: search_bien,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'nombre_bien',
              default_value: '',
              rules: {},
              label: 'Nombre',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_bien,
              control_name: 'cod_etapa_lote',
              default_value: '',
              rules: {},
              label: 'Etapa de lote',
              helper_text: '',
              disabled: false,
              select_options: [
                { label: 'Germinación', value: 'G' },
                { label: 'Producción', value: 'P' },
                { label: 'Distribucción', value: 'D' },
              ],
              option_label: 'label',
              option_key: 'value',
            },
          ]}
        />

        <SeleccionarModeloDialogForm
          set_current_model={set_current_siembra_material_vegetal}
          is_modal_active={select_model_is_active}
          set_is_modal_active={set_select_model_is_active}
          modal_title={'Seleccionar lote de material vegetal'}
          form_filters={[]}
          set_models={set_siembras_material_vegetal}
          get_filters_models={null}
          models={siembras_material_vegetal}
          columns_model={columns_bienes}
          row_id={'id_inventario_vivero'}
          title_table_modal={'Resultados de la busqueda'}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarLoteSiembra;
