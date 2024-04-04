import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import SeleccionarModeloDialogForm from '../../../../components/partials/getModels/SeleccionarModeloDialogForm';
import { type GridColDef } from '@mui/x-data-grid';
import {
  type IObjGoods,
  type IObjTransferGoods,
} from '../interfaces/distribucion';
import {
  set_transfer_goods,
  set_current_good,
  set_goods,
} from '../store/slice/distribucionSlice';
import {
  control_error,
  get_good_code_service,
  get_goods_service,
} from '../store/thunks/distribucionThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienTraslado = () => {
  const {
    control: control_bien,
    reset: reset_bien,
    getValues: get_values_bien,
  } = useForm<IObjGoods>();
  const {
    control: control_traslado,
    handleSubmit: handle_submit_traslado,
    reset: reset_traslado,
    getValues: get_values_traslado,
  } = useForm<IObjTransferGoods>();
  const [aux_transfer_goods, set_aux_transfer_goods] = useState<
    IObjTransferGoods[]
  >([]);

  const [action, set_action] = useState<string>('agregar');
  const [bienes, set_bienes] = useState<any[]>([]);
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(false);

  const {
    current_transfer,
    goods,
    goods_aux,
    transfer_goods,
    origin_nursery,
    current_good,
  } = useAppSelector((state) => state.distribucion);
  const dispatch = useAppDispatch();
  const fecha_actual = new Date();
  const fecha_traslado = new Date(current_transfer.fecha_traslado ?? '');
  const diferencia_ms = fecha_actual.getTime() - fecha_traslado.getTime();
  const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
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
      field: 'nombre',
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
      width: 130,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nro_lote',
      headerName: 'Número del lote',
      width: 130,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cod_etapa_lote',
      headerName: 'Etapa del lote',
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

  const columns_bienes_siembra: GridColDef[] = [
    {
      field: 'codigo_bien',
      headerName: 'Código',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_bien',
      headerName: 'Nombre',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'agno_lote_origen',
      headerName: 'Año lote origen',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nro_lote_origen',
      headerName: 'Número del lote de origen',
      width: 180,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cod_etapa_lote_origen',
      headerName: 'Etapa de origen',
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
      field: 'cantidad_a_trasladar',
      headerName: 'Cantidad a trasladar',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'altura_lote_destion_en_cms',
      headerName: 'Altura final',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'agno_lote_destino_MV',
      headerName: 'Año lote destino',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nro_lote_destino_MV',
      headerName: 'Número lote destino',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cod_etapa_lote_destino_MV',
      headerName: 'Etapa de destino',
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
      field: 'acciones',
      headerName: 'Acciones',
      width: 90,
      renderCell: (params) => (
        <>
          <Tooltip title="Editar">
            <IconButton
              disabled={diferencia_dias > 1}
              onClick={() => {
                edit_bien_traslado(params.row);
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <EditIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>

          <Tooltip title="Borrar">
            <IconButton
              disabled={diferencia_dias > 1}
              onClick={() => {
                delete_bien_traslado(params.row);
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <DeleteIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const get_bienes: any = async () => {
    const id_vivero = origin_nursery.id_vivero;
    if (id_vivero !== null && id_vivero !== undefined) {
      const codigo_bien = get_values_bien('codigo_bien') ?? '';
      const nombre = get_values_bien('nombre') ?? '';
      const tipo_bien = get_values_bien('cod_tipo_elemento_vivero') ?? '';
      const semilla = tipo_bien === 'SE';
      void dispatch(
        get_goods_service(id_vivero, codigo_bien, nombre, tipo_bien, semilla)
      );
    }
  };

  const search_bien: any = async () => {
    try {
      const id_vivero = origin_nursery.id_vivero;
      if (id_vivero !== null && id_vivero !== undefined) {
        const codigo = get_values_bien('codigo_bien') ?? '';
        const data = await dispatch(get_good_code_service(id_vivero, codigo));
        set_bienes(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if ('success' in bienes) {
      if (bienes.success === true) {
        if ('modal' in bienes) {
          if (bienes.modal === true) {
            set_select_model_is_active(true);
          }
        }
      }
    }
  }, [bienes]);

  useEffect(() => {
    // const id_vivero = origin_nursery.id_vivero
    // if (id_vivero !== null && id_vivero !== undefined) {
    //     void dispatch(get_goods_service(id_vivero));
    // }
    set_action('agregar');
  }, [origin_nursery]);

  useEffect(() => {
    //  console.log('')(transfer_goods);
    set_aux_transfer_goods(transfer_goods);
  }, [transfer_goods]);

  useEffect(() => {
    dispatch(set_transfer_goods(aux_transfer_goods));
  }, [aux_transfer_goods]);

  useEffect(() => {
    reset_bien(current_good);
    set_action('agregar');
  }, [current_good]);

  const on_submit_traslado = (data: IObjTransferGoods): void => {
    if (current_good.id_bien !== null) {
      if (get_values_bien('codigo_bien') === current_good.codigo_bien) {
        let bien: IObjTransferGoods | undefined;
        if (
          current_good.cod_tipo_elemento_vivero === 'MV' &&
          current_good.es_semilla_vivero === false
        ) {
          bien = aux_transfer_goods.find(
            (p) =>
              p.id_bien_origen === current_good.id_bien &&
              p.agno_lote_origen === current_good.agno_lote &&
              p.nro_lote_origen === current_good.nro_lote &&
              p.cod_etapa_lote_origen === current_good.cod_etapa_lote
          );
        } else {
          bien = aux_transfer_goods.find(
            (p) => p.id_bien_origen === current_good.id_bien
          );
        }

        if (
          (data.cantidad_a_trasladar ?? 0) <=
          (current_good.saldo_disponible ?? 0)
        ) {
          const new_bien: IObjTransferGoods = {
            id_item_traslado_viveros: data.id_item_traslado_viveros ?? null,
            agno_lote_origen: current_good.agno_lote,
            nro_lote_origen: current_good.nro_lote,
            cod_etapa_lote_origen: current_good.cod_etapa_lote,
            agno_lote_destino_MV: data.agno_lote_destino_MV ?? null,
            nro_lote_destino_MV: data.nro_lote_destino_MV ?? null,
            cod_etapa_lote_destino_MV: data.cod_etapa_lote_destino_MV ?? null,
            cantidad_a_trasladar: Number(data.cantidad_a_trasladar),
            altura_lote_destion_en_cms:
              current_good.cod_etapa_lote === null
                ? null
                : (data.altura_lote_destion_en_cms ?? null) !== null
                ? Number(data.altura_lote_destion_en_cms)
                : null,
            id_traslado: current_transfer.id_traslado,
            id_bien_origen: current_good.id_bien,
            codigo_bien: current_good.codigo_bien,
            nombre_bien: current_good.nombre,
            es_semilla_vivero: current_good.es_semilla_vivero,
            nro_posicion: null,
          };

          if (bien === undefined) {
            set_aux_transfer_goods([...aux_transfer_goods, new_bien]);
            const restante =
              (current_good.saldo_disponible ?? 0) -
              (new_bien.cantidad_a_trasladar ?? 0);
            dispatch(
              set_current_good({ ...current_good, saldo_disponible: restante })
            );
          } else {
            if (action === 'editar') {
              const aux_items: IObjTransferGoods[] = [];
              aux_transfer_goods.forEach((option) => {
                if (option.id_bien_origen === current_good.id_bien) {
                  aux_items.push(new_bien);
                } else {
                  aux_items.push(option);
                }
              });
              set_aux_transfer_goods(aux_items);
              const restante =
                (current_good.saldo_disponible ?? 0) -
                (new_bien.cantidad_a_trasladar ?? 0);
              dispatch(
                set_current_good({
                  ...current_good,
                  saldo_disponible: restante,
                })
              );
              set_action('agregar');
            } else {
              control_error('El bien ya fue agregado');
            }
          }
        } else {
          control_error(
            'La cantidad asignada debe ser máximo ' +
              String(current_good.saldo_disponible)
          );
        }
      } else {
        control_error('El código de bien no coincide con el seleccionado');
      }
    } else {
      control_error('Debe seleccionar el bien');
    }
  };

  const edit_bien_traslado = (item: IObjTransferGoods): void => {
    set_action('editar');

    let bien: IObjGoods | undefined;
    if (
      current_good.cod_tipo_elemento_vivero === 'MV' &&
      current_good.es_semilla_vivero === false
    ) {
      bien = goods_aux.find(
        (p) =>
          p.id_bien === item.id_bien_origen &&
          p.agno_lote === item.agno_lote_origen &&
          p.nro_lote === item.nro_lote_origen &&
          p.cod_etapa_lote === item.cod_etapa_lote_origen
      );
    } else {
      bien = goods_aux.find(
        (p: IObjGoods) => p.id_bien === item.id_bien_origen
      );
    }
    reset_traslado(item);
    const aux_items: IObjTransferGoods[] = [];
    let restante = 0;
    aux_transfer_goods.forEach((option) => {
      if (!deepEqual(option, item)) {
        aux_items.push(option);
      }
    });
    if (bien !== undefined) {
      restante =
        (bien.saldo_disponible ?? 0) + (item?.cantidad_a_trasladar ?? 0);
      if (item.id_item_traslado_viveros !== null) {
        dispatch(set_current_good({ ...bien, saldo_disponible: restante }));
      } else {
        dispatch(set_current_good(bien));
      }
    }
    set_aux_transfer_goods(aux_items);
  };

  const delete_bien_traslado = (item: IObjTransferGoods): void => {
    let bien: IObjGoods | undefined;
    if (
      current_good.cod_tipo_elemento_vivero === 'MV' &&
      current_good.es_semilla_vivero === false
    ) {
      bien = goods_aux.find(
        (p) =>
          p.id_bien === item.id_bien_origen &&
          p.agno_lote === item.agno_lote_origen &&
          p.nro_lote === item.nro_lote_origen &&
          p.cod_etapa_lote === item.cod_etapa_lote_origen
      );
    } else {
      bien = goods_aux.find(
        (p: IObjGoods) => p.id_bien === item.id_bien_origen
      );
    }
    if (bien !== undefined) {
      const restante =
        (bien.saldo_disponible ?? 0) + (item?.cantidad_a_trasladar ?? 0);
      if (item.id_item_traslado_viveros !== null) {
        dispatch(set_current_good({ ...bien, saldo_disponible: restante }));
      } else {
        dispatch(set_current_good(bien));
      }
    }
    reset_traslado({
      ...item,
      id_item_traslado_viveros: null,
      altura_lote_destion_en_cms: null,
      cantidad_a_trasladar: null,
      cod_etapa_lote_destino_MV: null,
    });
    const aux_items: IObjTransferGoods[] = [];
    aux_transfer_goods.forEach((option) => {
      if (!deepEqual(option, item)) {
        aux_items.push(option);
      }
    });
    set_aux_transfer_goods(aux_items);
  };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_good}
          row_id={'id_inventario_vivero'}
          columns_model={columns_bienes}
          models={goods}
          get_filters_models={get_bienes}
          set_models={set_transfer_goods}
          button_submit_label="Buscar bien"
          button_submit_disabled={
            origin_nursery.id_vivero === null || diferencia_dias > 1
          }
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Seleccione bien',
            },
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
              on_blur_function: search_bien,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'nombre',
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
              control_name: 'saldo_disponible',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar un bien',
                },
              },
              label: 'Cantidad disponible',
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
              hidden_text: !(
                get_values_bien('es_semilla_vivero') === false &&
                current_good.cod_tipo_elemento_vivero === 'MV'
              ),
            },
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_bien,
              control_name: 'cod_etapa_lote',
              default_value: '',
              rules: { required_rule: { rule: false, message: 'Requerido' } },
              label: 'Etapa de lote',
              helper_text: '',
              disabled: true,
              select_options: [
                { label: 'Producción', value: 'P' },
                { label: 'Distribución', value: 'D' },
              ],
              option_label: 'label',
              option_key: 'value',
              hidden_text: !(
                get_values_bien('es_semilla_vivero') === false &&
                current_good.cod_tipo_elemento_vivero === 'MV'
              ),
            },
          ]}
          form_inputs_list={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_traslado,
              control_name: 'cod_etapa_lote_destino_MV',
              default_value: '',
              rules: { required_rule: { rule: true, message: 'Requerido' } },
              label: 'Etapa de lote destino',
              helper_text: 'debe seleccionar campo',
              select_options: [
                { label: 'Producción', value: 'P' },
                { label: 'Distribución', value: 'D' },
              ],
              option_label: 'label',
              option_key: 'value',
              hidden_text: !(
                get_values_bien('es_semilla_vivero') === false &&
                current_good.cod_tipo_elemento_vivero === 'MV'
              ),
              disabled:
                diferencia_dias > 1 ||
                (get_values_traslado('id_item_traslado_viveros') ?? null) !==
                  null,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: 'altura_lote_destion_en_cms',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Ingrese la altura' },
              },
              label: 'Altura planta (cms)',
              type: 'number',
              disabled: false,
              helper_text: '',
              hidden_text: !(
                get_values_bien('es_semilla_vivero') === false &&
                current_good.cod_tipo_elemento_vivero === 'MV'
              ),
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_traslado,
              control_name: 'cantidad_a_trasladar',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Ingrese cantidad' },
                min_rule: {
                  rule: 0.01,
                  message: 'Cantidad debe ser mayor que 0',
                },
                max_rule: {
                  rule: current_good.saldo_disponible,
                  message:
                    'La cantidad disponible es ' +
                    String(current_good.saldo_disponible) +
                    '',
                },
              },
              label: 'Cantidad a trasladar',
              type: 'number',
              disabled: diferencia_dias > 1,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 1,
              control_form: control_bien,
              control_name: 'unidad_medida',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Debe seleccionar bien' },
              },
              label: 'Unidad',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
          ]}
          title_list="Bienes trasladados"
          list={aux_transfer_goods}
          add_item_list={handle_submit_traslado(on_submit_traslado)}
          add_list_button_label={'agregar'}
          columns_list={columns_bienes_siembra}
          row_list_id={'id_item_traslado_viveros'}
          modal_select_model_title="Buscar bien"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'cod_tipo_elemento_vivero',
              default_value: '',
              rules: {},
              label: 'Tipo de bien',
              disabled: false,
              helper_text: '',
              select_options: [
                { label: 'Semillas', value: 'SE' },
                { label: 'Insumos', value: 'IN' },
                { label: 'Plantas', value: 'MV' },
                { label: 'Herramientas', value: 'HE' },
              ],
              option_label: 'label',
              option_key: 'value',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'codigo_bien',
              default_value: '',
              rules: {},
              label: 'Código del bien',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'nombre',
              default_value: '',
              rules: {},
              label: 'Nombre',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
          ]}
        />

        <SeleccionarModeloDialogForm
          set_current_model={set_current_good}
          is_modal_active={select_model_is_active}
          set_is_modal_active={set_select_model_is_active}
          modal_title={'Seleccionar lote de material vegetal'}
          form_filters={[]}
          set_models={set_goods}
          get_filters_models={null}
          models={goods}
          columns_model={columns_bienes}
          row_id={'id_inventario_vivero'}
          title_table_modal={'Resultados de la búsqueda'}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienTraslado;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function deepEqual(obj1: any, obj2: any) {
  // Verificar si son el mismo objeto en memoria
  if (obj1 === obj2) {
    return true;
  }

  // Verificar si ambos son objetos y tienen la misma cantidad de propiedades
  if (
    typeof obj1 === 'object' &&
    obj1 !== null &&
    typeof obj2 === 'object' &&
    obj2 !== null
  ) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    // Recorrer las propiedades y comparar su contenido de forma recursiva
    for (const key of keys1) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  // Si no cumple ninguna de las condiciones anteriores, consideramos los objetos diferentes
  return false;
}
