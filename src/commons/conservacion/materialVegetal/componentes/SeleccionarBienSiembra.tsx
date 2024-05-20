import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import {
  type IObjGoods,
  type IObjPlantingGoods,
} from '../interfaces/materialvegetal';
import {
  set_planting_goods,
  set_current_good,
} from '../store/slice/materialvegetalSlice';
import {
  control_error,
  get_good_code_siembra_service,
  get_goods_service,
} from '../store/thunks/materialvegetalThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// const initial_state_item: IObjPlantingGoods = {
//     id_item_despacho_entrante: null,
//     id_siembra: null,
//     id_bien: null,
//     cantidad_entrante: null,
//     cantidad_distribuida: null,
//     codigo_bien: null,
//     nombre_bien: "",
//     cantidad_restante: null,
// }

// const initial_state_distribucion: IObjPlantingGoods = {
//     id_vivero: null,
//     cantidad_asignada: null,
// }

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienSiembra = () => {
  const {
    control: control_bien,
    reset: reset_bien,
    getValues: get_values_bien,
  } = useForm<IObjGoods>();
  const {
    control: control_siembra,
    handleSubmit: handle_submit_siembra,
    reset: reset_siembra,
  } = useForm<IObjPlantingGoods>();
  const [aux_planting_goods, set_aux_planting_goods] = useState<
    IObjPlantingGoods[]
  >([]);

  const [action, set_action] = useState<string>('agregar');

  const {
    current_planting,
    goods,
    planting_goods,
    current_nursery,
    current_good,
  } = useAppSelector((state) => state.material_vegetal);
  const dispatch = useAppDispatch();

  const columns_bienes: GridColDef[] = [
    {
      field: 'codigo_bien',
      headerName: 'Código',
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
      field: 'tipo_bien',
      headerName: 'Tipo',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_entrante',
      headerName: 'Cantidad entrante',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad_disponible_bien',
      headerName: 'Cantidad disponible',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'unidad_disponible',
      headerName: 'Unidad',
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
      field: 'tipo_bien',
      headerName: 'Tipo',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cantidad',
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
      headerName: 'Observación',
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
                edit_bien_siembra(params.row);
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
                delete_bien_siembra(params.row);
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
      const tipo_bien = get_values_bien('tipo_bien') ?? '';
      void dispatch(
        get_goods_service(id_vivero, codigo_bien, nombre, tipo_bien)
      );
    }
  };

  const search_bien: any = async () => {
    const id_vivero = current_nursery.id_vivero;
    if (id_vivero !== null && id_vivero !== undefined) {
      const codigo = get_values_bien('codigo_bien') ?? '';
      void dispatch(get_good_code_siembra_service(id_vivero, codigo));
    }
  };

  useEffect(() => {
    set_action('agregar');
  }, [current_nursery]);

  useEffect(() => {
    set_aux_planting_goods(planting_goods);
  }, [planting_goods]);

  useEffect(() => {
    dispatch(set_planting_goods(aux_planting_goods));
  }, [aux_planting_goods]);

  useEffect(() => {
    reset_bien(current_good);
    set_action('agregar');
  }, [current_good]);

  const on_submit_siembra = (data: IObjPlantingGoods): void => {
    if (
      current_good.tipo_bien === 'Mezcla'
        ? current_good.id_mezcla !== null
        : current_good.id_bien !== null
    ) {
      if (get_values_bien('codigo_bien') === current_good.codigo_bien) {
        const bien: IObjPlantingGoods | undefined = aux_planting_goods.find(
          (p) =>
            current_good.tipo_bien === 'Mezcla'
              ? p.id_mezcla_consumida === current_good.id_mezcla
              : p.id_bien_consumido === current_good.id_bien
        );

        if (
          (data.cantidad ?? 0) <= (current_good.cantidad_disponible_bien ?? 0)
        ) {
          const bien_semilla: IObjPlantingGoods | undefined =
            aux_planting_goods.find((p) => p.tipo_bien === 'Semillas');
          const new_bien: IObjPlantingGoods = {
            id_consumo_siembra: data.id_consumo_siembra ?? null,
            id_siembra: current_planting.id_siembra,
            id_bien_consumido: current_good.id_bien,
            cantidad: Number(data.cantidad),
            observaciones: data.observaciones,
            id_mezcla_consumida: current_good.id_mezcla ?? null,
            tipo_bien: current_good.tipo_bien,
            codigo_bien: current_good.codigo_bien,
            nombre_bien: current_good.nombre_bien,
          };
          if (bien === undefined) {
            if (bien_semilla === undefined) {
              set_aux_planting_goods([...aux_planting_goods, new_bien]);
              const restante =
                (current_good.cantidad_disponible_bien ?? 0) -
                (new_bien.cantidad ?? 0);
              dispatch(
                set_current_good({
                  ...current_good,
                  cantidad_disponible_bien: restante,
                })
              );
            } else {
              control_error('Solo se puede agregar un bien de tipo semilla');
            }
          } else {
            if (action === 'editar') {
              const aux_items: IObjPlantingGoods[] = [];
              aux_planting_goods.forEach((option) => {
                if (option.id_bien_consumido === current_good.id_bien) {
                  aux_items.push(new_bien);
                } else {
                  aux_items.push(option);
                }
              });
              set_aux_planting_goods(aux_items);
              const restante =
                (current_good.cantidad_disponible_bien ?? 0) -
                (new_bien.cantidad ?? 0);
              dispatch(
                set_current_good({
                  ...current_good,
                  cantidad_disponible_bien: restante,
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
            String(current_good.cantidad_disponible_bien)
          );
        }
      } else {
        control_error('Código de bien no coincide con el seleccionado');
      }
    } else {
      control_error('Debe seleccionar el bien');
    }
  };

  const edit_bien_siembra = (item: IObjPlantingGoods): void => {
    set_action('editar');
    const bien: IObjGoods | undefined = goods.find((p: IObjGoods) =>
      item.tipo_bien === 'Mezcla'
        ? p.id_mezcla === item.id_mezcla_consumida
        : p.id_bien === item.id_bien_consumido
    );
    //  console.log('')(bien, item);

    reset_siembra(item);
    const aux_items: IObjPlantingGoods[] = [];
    aux_planting_goods.forEach((option) => {
      if (option.id_bien_consumido !== item.id_bien_consumido) {
        aux_items.push(option);
      }
    });
    if (bien !== undefined) {
      //  console.log('')(item);
      const restante =
        (bien.cantidad_disponible_bien ?? 0) + (item?.cantidad ?? 0);
      if (item.id_consumo_siembra !== null) {
        dispatch(
          set_current_good({ ...bien, cantidad_disponible_bien: restante })
        );
      } else {
        dispatch(set_current_good(bien));
      }
    }
    set_aux_planting_goods(aux_items);
  };

  const delete_bien_siembra = (item: IObjPlantingGoods): void => {
    const bien: IObjGoods | undefined = goods.find((p: IObjGoods) =>
      item.tipo_bien === 'Mezcla'
        ? p.id_mezcla === item.id_mezcla_consumida
        : p.id_bien === item.id_bien_consumido
    );
    reset_siembra({
      ...item,
      id_bien_consumido: null,
      cantidad: null,
      id_consumo_siembra: null,
      id_mezcla_consumida: null,
      observaciones: null,
    });

    if (bien !== undefined) {
      const restante =
        (bien.cantidad_disponible_bien ?? 0) + (item?.cantidad ?? 0);
      if (item.id_consumo_siembra !== null) {
        dispatch(
          set_current_good({ ...bien, cantidad_disponible_bien: restante })
        );
      } else {
        dispatch(set_current_good(bien));
      }
    }
    const aux_items: IObjPlantingGoods[] = [];
    aux_planting_goods.forEach((option) => {
      if (option.id_bien_consumido !== item.id_bien_consumido) {
        aux_items.push(option);
      }
    });
    set_aux_planting_goods(aux_items);
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
          set_models={set_planting_goods}
          button_submit_label="Buscar bien"
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
                required_rule: {
                  rule: true,
                  message: 'Código del bien requerido',
                },
              },
              label: 'Código bien',
              type: 'number',
              disabled: false,
              helper_text: '',
              hidden_text: current_good.tipo_bien === 'Mezcla',
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
              control_name: 'cantidad_disponible_bien',
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
          ]}
          form_inputs_list={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_siembra,
              control_name: 'cantidad',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Ingrese cantidad' },
                min_rule: {
                  rule: 0.01,
                  message: 'Cantidad debe ser mayor que 0',
                },
                max_rule: {
                  rule: current_good.cantidad_disponible_bien,
                  message:
                    'La cantidad disponible es ' +
                    String(current_good.cantidad_disponible_bien) +
                    '',
                },
              },
              label: 'Cantidad',
              type: 'number',
              disabled: false,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 2,
              control_form: control_bien,
              control_name: 'unidad_disponible',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Debe seleccionar bien' },
              },
              label: 'Unidad',
              type: 'text',
              disabled: true,
              helper_text: '',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_siembra,
              control_name: 'observaciones',
              default_value: '',
              rules: {
                required_rule: { rule: true, message: 'Observación requerida' },
              },
              label: 'Observación',
              type: 'text',
              multiline_text: true,
              rows_text: 4,
              disabled: false,
              helper_text: '',
            },
          ]}
          title_list="Bienes consumidos"
          list={aux_planting_goods}
          add_item_list={handle_submit_siembra(on_submit_siembra)}
          add_list_button_label={'agregar'}
          columns_list={columns_bienes_siembra}
          row_list_id={'id_consumo_siembra'}
          modal_select_model_title="Buscar bien"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 3,
              control_form: control_bien,
              control_name: 'tipo_bien',
              default_value: '',
              rules: {},
              label: 'Tipo de bien',
              disabled: false,
              helper_text: '',
              select_options: [
                { label: 'Semillas', value: 'MV' },
                { label: 'Insumos', value: 'IN' },
                { label: 'Mezclas', value: 'MZ' },
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
              label: 'Código bien',
              type: 'number',
              disabled: get_values_bien('tipo_bien') === 'MZ',
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
          ]}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienSiembra;
