import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { type GridColDef } from '@mui/x-data-grid';
import { type IObjBien, type IObjBienBaja } from '../interfaces/vivero';
import {
  set_current_insumo,
  set_insumos,
  set_bienes_bajas,
} from '../store/slice/viveroSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  get_bienes_service,
  control_error,
  get_good_code_baja_service,
} from '../store/thunks/gestorViveroThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBajasBienes = () => {
  const {
    control: control_bien,
    reset: reset_bien,
    getValues: get_values_bien,
  } = useForm<IObjBien>();
  const {
    control: control_baja,
    handleSubmit: handle_submit_baja,
    reset: reset_baja,
  } = useForm<IObjBienBaja>();

  const [action, set_action] = useState<string>('agregar');
  const [aux_insumos, set_aux_insumos] = useState<IObjBienBaja[]>([]);
  const {
    insumos,
    current_nursery,
    current_insumo,
    bienes_bajas,
    current_genera_baja,
  } = useAppSelector((state) => state.nursery);

  const dispatch = useAppDispatch();
  const fecha_actual = new Date();
  const fecha_baja = new Date(current_genera_baja.fecha_baja ?? '');
  const diferencia_ms = fecha_actual.getTime() - fecha_baja.getTime();
  const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
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
      field: 'cod_tipo_elemento_vivero',
      headerName: 'Tipo de bien',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === 'IN'
            ? 'Insumo'
            : params.value === 'MV'
            ? 'Semilla'
            : 'Herramienta'}
        </div>
      ),
    },
    {
      field: 'saldo_disponible',
      headerName: 'Saldo disponible',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const columns_bienes_baja: GridColDef[] = [
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
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'cod_tipo_elemento_vivero',
      headerName: 'Tipo de bien',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === 'IN'
            ? 'Insumo'
            : params.value === 'MV'
            ? 'Semilla'
            : 'Herramienta'}
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
          {/* <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                edit_bien_baja(params.row);
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
          </Tooltip> */}

          <Tooltip title="Borrar">
            <IconButton
              onClick={() => {
                delete_bien_baja(params.row);
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
      const nombre = get_values_bien('nombre') ?? '';
      const tipo_bien = get_values_bien('cod_tipo_elemento_vivero') ?? '';
      void dispatch(
        get_bienes_service(id_vivero, tipo_bien, codigo_bien, nombre)
      );
    }
  };

  const search_bien: any = async () => {
    const id_vivero = current_nursery.id_vivero;
    if (id_vivero !== null && id_vivero !== undefined) {
      const codigo = get_values_bien('codigo_bien') ?? '';
      void dispatch(get_good_code_baja_service(id_vivero, codigo));
    }
  };

  useEffect(() => {
    // const id_vivero = current_nursery.id_vivero
    // if (id_vivero !== null && id_vivero !== undefined) {
    //     void dispatch(get_goods_service(id_vivero));
    // }
    set_action('agregar');
  }, [current_nursery]);

  useEffect(() => {
    set_aux_insumos(bienes_bajas);
  }, [bienes_bajas]);

  useEffect(() => {
    dispatch(set_bienes_bajas(aux_insumos));
  }, [aux_insumos]);

  useEffect(() => {
    reset_bien(current_insumo);
    set_action('agregar');
  }, [current_insumo]);

  const on_submit_baja = (data: IObjBienBaja): void => {
    if (current_insumo.id_bien !== null) {
      if (get_values_bien('codigo_bien') === current_insumo.codigo_bien) {
        const bien: IObjBienBaja | undefined = aux_insumos.find(
          (p) => p.id_bien === current_insumo.id_bien
        );

        if (
          (data.cantidad_baja ?? 0) <= (current_insumo.saldo_disponible ?? 0)
        ) {
          const new_bien: IObjBienBaja = {
            id_item_baja_viveros: data.id_item_baja_viveros ?? null,
            id_baja: current_genera_baja.id_baja ?? null,
            id_bien: current_insumo.id_bien,
            cantidad_baja: Number(data.cantidad_baja),
            nombre: current_insumo.nombre,
            codigo_bien: current_insumo.codigo_bien,
            observaciones: data.observaciones,
            tipo_bien: current_insumo.tipo_bien,
            cod_tipo_elemento_vivero: current_insumo.cod_tipo_elemento_vivero,
          };
          if (bien === undefined) {
            set_aux_insumos([...aux_insumos, new_bien]);
            const restante =
              (current_insumo.saldo_disponible ?? 0) -
              (new_bien.cantidad_baja ?? 0);
            dispatch(
              set_current_insumo({
                ...current_insumo,
                saldo_disponible: restante,
              })
            );
            reset_baja({
              id_bien: current_insumo?.id_bien,
              cantidad_baja: null,
              observaciones: null,
            });
          } else {
            if (action === 'editar') {
              const aux_items: IObjBienBaja[] = [];
              aux_insumos.forEach((option) => {
                if (option.id_bien === current_insumo.id_bien) {
                  aux_items.push(new_bien);
                } else {
                  aux_items.push(option);
                }
              });
              set_aux_insumos(aux_items);
              const restante =
                (current_insumo.saldo_disponible ?? 0) -
                (new_bien.cantidad_baja ?? 0);
              dispatch(
                set_current_insumo({
                  ...current_insumo,
                  saldo_disponible: restante,
                })
              );
              reset_baja({
                id_bien: current_insumo?.id_bien,
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
            'La cantidad asignada debe ser máximo ' +
              String(current_insumo.saldo_disponible)
          );
        }
      } else {
        control_error('Código de bien no coincide con el seleccionado');
      }
    } else {
      control_error('Debe seleccionar el bien');
    }
  };

  // const edit_bien_baja = (item: IObjBienBaja): void => {
  //   set_action('editar');
  //   const bien: IObjBien | undefined = insumos.find(
  //     (p: IObjBien) => p.id_bien === item.id_bien
  //   );
  //   reset_baja(item);
  //   const aux_items: IObjBienBaja[] = [];
  //   aux_insumos.forEach((option) => {
  //     if (option.id_bien !== item.id_bien) {
  //       aux_items.push(option);
  //     }
  //   });
  //   if (bien !== undefined) {
  //     const restante =
  //       (bien.saldo_disponible ?? 0) + (item?.cantidad_baja ?? 0);
  //     if (item.id_item_baja_viveros !== null) {
  //       dispatch(set_current_insumo({ ...bien, saldo_disponible: restante }));
  //     } else {
  //       dispatch(set_current_insumo(bien));
  //     }
  //   }
  //   set_aux_insumos(aux_items);
  // };

  const delete_bien_baja = (item: IObjBienBaja): void => {
    const bien: IObjBien | undefined = insumos.find(
      (p: IObjBien) => p.id_bien === item.id_bien
    );
    if (bien !== undefined) {
      const restante =
        (bien.saldo_disponible ?? 0) + (item?.cantidad_baja ?? 0);
      if (item.id_item_baja_viveros !== null) {
        dispatch(set_current_insumo({ ...bien, saldo_disponible: restante }));
      } else {
        dispatch(set_current_insumo(bien));
      }
    }
    reset_baja({
      ...item,
      id_item_baja_viveros: null,
      id_bien: bien?.id_bien,
      cantidad_baja: null,
      observaciones: null,
    });
    const aux_items: IObjBienBaja[] = [];
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
          set_current_model={set_current_insumo}
          row_id={'id_bien'}
          columns_model={columns_bienes}
          models={insumos}
          get_filters_models={get_bienes}
          set_models={set_insumos}
          button_submit_disabled={current_nursery.id_vivero === null}
          button_submit_label="Buscar insumo"
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Seleccionar insumo',
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
              type: 'text',
              disabled: false,
              helper_text: '',
              on_blur_function: search_bien,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 6,
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
          ]}
          form_inputs_list={[
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 3,
              control_form: control_baja,
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
                  rule: current_insumo.saldo_disponible,
                  message:
                    'La cqantidad no debe ser mayor que ' +
                    String(current_insumo.saldo_disponible),
                },
              },
              label: 'Cantidad a bajar',
              type: 'text',
              disabled: diferencia_dias > 2,
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
              md: 4,
              control_form: control_baja,
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
          title_list="Bienes a dar de baja"
          list={aux_insumos}
          add_item_list={handle_submit_baja(on_submit_baja)}
          add_list_button_label={action}
          columns_list={columns_bienes_baja}
          row_list_id={'id_bien'}
          modal_select_model_title="Buscar bien"
          modal_form_filters={[
            {
              datum_type: 'select_controller',
              xs: 12,
              md: 2,
              control_form: control_bien,
              control_name: 'cod_tipo_elemento_vivero',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Seleccione tipo de bien',
                },
              },
              label: 'Tipo de bien',
              disabled: false,
              helper_text: 'Debe seleccionar campo',
              select_options: [
                { label: 'Insumo', value: 'IN' },
                { label: 'Herramienta', value: 'HE' },
                { label: 'Semilla', value: 'MV' },
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
      </Grid>
    </>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBajasBienes;
