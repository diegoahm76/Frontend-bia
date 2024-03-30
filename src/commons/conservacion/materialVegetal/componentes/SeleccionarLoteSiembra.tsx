import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import SeleccionarModeloDialogForm from '../../../../components/partials/getModels/SeleccionarModeloDialogForm';
import { type GridColDef } from '@mui/x-data-grid';
import { type IObjSeedLot } from '../interfaces/materialvegetal';
import {
  set_current_plant_seed_lot,
  set_plant_seed_lots,
} from '../store/slice/materialvegetalSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import {
  get_lots_code_service,
  get_lots_service,
} from '../store/thunks/materialvegetalThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarLoteSiembra = () => {
  const {
    control: control_bien,
    reset: reset_bien,
    getValues: get_values_bien,
  } = useForm<IObjSeedLot>();

  const [bienes, set_bienes] = useState<any>([]);
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(false);

  const {
    current_nursery,
    current_plant_seed_lot,
    plant_seed_lots,
    current_plant_quarantine,
  } = useAppSelector((state) => state.material_vegetal);
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
      field: 'saldo_disponible',
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
      const agno_lote = get_values_bien('agno_lote');
      void dispatch(
        get_lots_service(id_vivero, codigo_bien, nombre, agno_lote, cod_etapa)
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
    reset_bien(current_plant_seed_lot);
  }, [current_plant_seed_lot]);

  useEffect(() => {
    if (current_plant_seed_lot.id_inventario_vivero === null) {
      reset_bien({
        ...current_plant_seed_lot,
        codigo_bien: current_plant_quarantine.codigo_bien,
        nombre_bien: current_plant_quarantine.nombre_bien,
        nro_lote: current_plant_quarantine.nro_lote,
        agno_lote: current_plant_quarantine.agno_lote,
        cod_etapa_lote: current_plant_quarantine.cod_etapa_lote,
      });
    }
  }, [current_plant_quarantine]);

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_plant_seed_lot}
          row_id={'id_inventario_vivero'}
          columns_model={columns_bienes}
          models={plant_seed_lots}
          get_filters_models={get_bienes}
          set_models={set_plant_seed_lots}
          button_submit_label="Buscar lote"
          button_submit_disabled={
            current_plant_quarantine.id_cuarentena_mat_vegetal !== null ||
            current_nursery.id_vivero === null
          }
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Seleccione lote de material vegetal',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_bien,
              control_name: 'codigo_bien',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Código bien requerido' },
              },
              label: 'Código bien',
              type: 'number',
              disabled:
                current_plant_quarantine.id_cuarentena_mat_vegetal !== null,
              helper_text: '',
              on_blur_function: search_bien,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 4,
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
              md: 2,
              control_form: control_bien,
              control_name: 'nro_lote',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar un bien',
                },
              },
              label: 'Número de lote',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
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
                required_rule: { rule: true, message: 'Código bien requerido' },
              },
              label: 'Código bien',
              type: 'number',
              disabled: false,
              helper_text: '',
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
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'agno_lote',
              default_value: '',
              rules: {},
              label: 'Año lote',
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
          set_current_model={set_current_plant_seed_lot}
          is_modal_active={select_model_is_active}
          set_is_modal_active={set_select_model_is_active}
          modal_title={'Seleccionar lote de material vegetal'}
          form_filters={[]}
          set_models={set_plant_seed_lots}
          get_filters_models={null}
          models={plant_seed_lots}
          columns_model={columns_bienes}
          row_id={'id_inventario_vivero'}
          title_table_modal={'Resultados de la búsqueda'}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarLoteSiembra;
