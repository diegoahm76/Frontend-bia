import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import SeleccionarModeloDialogForm from '../../../../components/partials/getModels/SeleccionarModeloDialogForm';
import { type GridColDef } from '@mui/x-data-grid';
import {
  type IObjItemMortalidad,
  type IObjSiembraMV,
} from '../interfaces/produccion';
import {
  set_current_siembra_material_vegetal,
  set_items_mortalidad,
  set_siembras_material_vegetal,
} from '../store/slice/produccionSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import {
  control_error,
  get_lots_code_service,
  get_lots_service,
} from '../store/thunks/produccionThunks';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarLoteSiembra = () => {
  const {
    control: control_bien,
    reset: reset_bien,
    getValues: get_values_bien,
  } = useForm<IObjSiembraMV>();
  const {
    control: control_mortalidad,
    handleSubmit: handle_submit_mortalidad,
    reset: reset_mortalidad,
  } = useForm<IObjItemMortalidad>();

  const [bienes, set_bienes] = useState<any>([]);
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(false);
  const [action, set_action] = useState<string>('agregar');
  const [aux_insumos, set_aux_insumos] = useState<IObjItemMortalidad[]>([]);

  const {
    current_nursery,
    current_siembra_material_vegetal,
    siembras_material_vegetal,
    current_mortalidad,
    items_mortalidad,
  } = useAppSelector((state) => state.produccion);
  const dispatch = useAppDispatch();

  const columns_bienes: GridColDef[] = [
    { field: 'id_bien', headerName: 'ID', width: 20 },
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
          {params.value}
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

  const columns_bienes_mortalidad: GridColDef[] = [
    { field: 'id_bien', headerName: 'ID', width: 20 },
    {
      field: 'codigo_bien',
      headerName: 'Codigo',
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
      field: 'nro_lote',
      headerName: 'Nro lote',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'agno_lote',
      headerName: 'Año lote',
      width: 150,
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
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_baja',
      headerName: 'Cantidad',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'observaciones',
      headerName: 'Observacion',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
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
              onClick={() => {
                edit_bien_mortalidad(params.row);
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
              onClick={() => {
                delete_bien_mortalidad(params.row);
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
    set_action('agregar');
  }, [current_siembra_material_vegetal]);

  useEffect(() => {
    if (current_siembra_material_vegetal.id_inventario_vivero === null) {
      reset_bien(current_siembra_material_vegetal);
    }
  }, [current_mortalidad]);

  useEffect(() => {
    // const id_vivero = current_nursery.id_vivero
    // if (id_vivero !== null && id_vivero !== undefined) {
    //     void dispatch(get_goods_service(id_vivero));
    // }
    set_action('agregar');
  }, [current_nursery]);

  useEffect(() => {
    set_aux_insumos(items_mortalidad);
  }, [items_mortalidad]);

  useEffect(() => {
    dispatch(set_items_mortalidad(aux_insumos));
  }, [aux_insumos]);

  const on_submit_mortalidad = (data: IObjItemMortalidad): void => {
    if (current_siembra_material_vegetal.id_bien !== null) {
      if (
        get_values_bien('codigo_bien') ===
        current_siembra_material_vegetal.codigo_bien
      ) {
        const bien: IObjItemMortalidad | undefined = aux_insumos.find(
          (p) => p.id_bien === current_siembra_material_vegetal.id_bien
        );
        let asignada = 0;
        aux_insumos.forEach((option) => {
          if (option.id_bien !== bien?.id_bien) {
            asignada = asignada + (option.cantidad_baja ?? 0);
          }
        });

        if (
          (data.cantidad_baja ?? 0) <=
          (current_siembra_material_vegetal.saldo_disponible_registro ?? 0)
        ) {
          const new_bien: IObjItemMortalidad = {
            id_item_baja_viveros: data.id_item_baja_viveros ?? null,
            id_baja: current_mortalidad.id_baja,
            agno_lote: current_siembra_material_vegetal.agno_lote,
            nro_lote: current_siembra_material_vegetal.nro_lote,
            cod_etapa_lote: current_siembra_material_vegetal.cod_etapa_lote,
            id_bien: current_siembra_material_vegetal.id_bien,
            cantidad_baja: Number(data.cantidad_baja),
            nombre_bien: current_siembra_material_vegetal.nombre_bien,
            codigo_bien: current_siembra_material_vegetal.codigo_bien,
            observaciones: data.observaciones,
            unidad_medida: current_siembra_material_vegetal.unidad_medida,
            consec_cuaren_por_lote_etapa:
              data.consec_cuaren_por_lote_etapa ?? null,
          };
          if (bien === undefined) {
            set_aux_insumos([...aux_insumos, new_bien]);
            const restante =
              (current_siembra_material_vegetal.saldo_disponible_registro ??
                0) - (new_bien.cantidad_baja ?? 0);
            dispatch(
              set_current_siembra_material_vegetal({
                ...current_siembra_material_vegetal,
                saldo_disponible_registro: restante,
              })
            );
            reset_mortalidad({
              id_bien: current_siembra_material_vegetal?.id_bien,
              cantidad_baja: null,
              observaciones: null,
            });
          } else {
            if (action === 'editar') {
              const aux_items: IObjItemMortalidad[] = [];
              aux_insumos.forEach((option) => {
                if (
                  option.id_bien === current_siembra_material_vegetal.id_bien
                ) {
                  aux_items.push(new_bien);
                } else {
                  aux_items.push(option);
                }
              });
              set_aux_insumos(aux_items);
              const restante =
                (current_siembra_material_vegetal.saldo_disponible_registro ??
                  0) - (new_bien.cantidad_baja ?? 0);
              dispatch(
                set_current_siembra_material_vegetal({
                  ...current_siembra_material_vegetal,
                  saldo_disponible_registro: restante,
                })
              );
              reset_mortalidad({
                id_bien: current_siembra_material_vegetal?.id_bien,
                cantidad_baja: null,
                observaciones: null,
              });
              set_action('agregar');
            } else {
              control_error('El bien ya fue agregado');
            }
          }
        } else {
          control_error(
            'La cantidad asignada debe ser maximo ' +
              String(current_siembra_material_vegetal.saldo_disponible_registro)
          );
        }
      } else {
        control_error('Codigo de bien no coincide con el seleccionado');
      }
    } else {
      control_error('Debe seleccionar el bien');
    }
  };

  const edit_bien_mortalidad = (item: IObjItemMortalidad): void => {
    set_action('editar');
    const bien: IObjSiembraMV | undefined = siembras_material_vegetal.find(
      (p: IObjSiembraMV) => p.id_bien === item.id_bien
    );
    const item_bien = aux_insumos.find((p) => p.id_bien === item.id_bien);
    reset_mortalidad(item_bien);
    const aux_items: IObjItemMortalidad[] = [];
    aux_insumos.forEach((option) => {
      if (option.id_bien !== item.id_bien) {
        aux_items.push(option);
      }
    });
    //  console.log('')(bien);
    if (bien !== undefined) {
      dispatch(set_current_siembra_material_vegetal(bien));
    }
    set_aux_insumos(aux_items);
  };

  const delete_bien_mortalidad = (item: IObjItemMortalidad): void => {
    const bien: IObjSiembraMV | undefined = siembras_material_vegetal.find(
      (p: IObjSiembraMV) => p.id_bien === item.id_bien
    );
    //  console.log('')(bien);

    if (bien !== undefined) {
      dispatch(set_current_siembra_material_vegetal(bien));
    }
    reset_mortalidad({
      id_bien: bien?.id_bien,
      cantidad_baja: null,
      observaciones: null,
    });
    const aux_items: IObjItemMortalidad[] = [];
    aux_insumos.forEach((option) => {
      if (option.id_bien !== item.id_bien) {
        aux_items.push(option);
      }
    });
    set_aux_insumos(aux_items);
  };

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
          button_submit_disabled={false}
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
                required_rule: { rule: true, message: 'Codigo bien requerido' },
              },
              label: 'Codigo bien',
              type: 'number',
              disabled: current_mortalidad.id_baja !== null,
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
          form_inputs_list={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_mortalidad,
              control_name: 'cantidad_baja',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe ingresar cantidad',
                },
                min_rule: {
                  rule: 0.01,
                  message: 'La cantidad debe ser mayor a 0',
                },
                max_rule: {
                  rule: current_siembra_material_vegetal.saldo_disponible_registro,
                  message:
                    'La cqantidad no debe ser mayor que ' +
                    String(
                      current_siembra_material_vegetal.saldo_disponible_registro
                    ),
                },
              },
              label: 'Cantidad Usada',
              type: 'text',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_bien,
              control_name: 'saldo_disponible_registro',
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
              md: 2,
              control_form: control_bien,
              control_name: 'unidad_medida',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Debe seleccionar un bien',
                },
              },
              label: 'Unidad',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
              control_form: control_mortalidad,
              control_name: 'observaciones',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Observación requerida' },
              },
              label: 'Observacion',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
          ]}
          title_list="Plantas a dar de baja"
          list={aux_insumos}
          add_item_list={handle_submit_mortalidad(on_submit_mortalidad)}
          add_list_button_label={action}
          columns_list={columns_bienes_mortalidad}
          row_list_id={'id_bien'}
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
