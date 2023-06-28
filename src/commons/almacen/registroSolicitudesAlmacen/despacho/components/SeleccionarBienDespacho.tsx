import { useForm } from 'react-hook-form';
import { Avatar, Grid, IconButton, Tooltip } from '@mui/material';
import BuscarModelo from '../../../../../components/partials/getModels/BuscarModelo';
import SeleccionarModeloDialogForm from '../../../../../components/partials/getModels/SeleccionarModeloDialogForm';
import { type GridColDef } from '@mui/x-data-grid';
import {
  type IObjBienDespacho,
  type IObjBienConsumo,
} from '../interfaces/despacho';
import {
  set_current_bien,
  set_bienes_despacho,
  set_bienes,
  initial_state_current_bien,
} from '../store/slices/indexDespacho';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useEffect, useState } from 'react';
import {
  control_error,
  get_bien_code_service,
} from '../store/thunks/despachoThunks';
import DeleteIcon from '@mui/icons-material/Delete';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarBienDespacho = () => {
  const {
    control: control_bien,
    reset: reset_bien,
    getValues: get_values_bien,
  } = useForm<IObjBienConsumo>();
  const {
    control: control_despacho,
    handleSubmit: handle_submit_despacho,
    reset: reset_despacho,
  } = useForm<IObjBienDespacho>();
  // const { bodega_seleccionada } = useAppSelector(
  //   (state: { bodegas: any }) => state.bodegas
  // );
  const [bienes_aux, set_bienes_aux] = useState<any>([]);
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(false);
  const [action, set_action] = useState<string>('agregar');
  const [aux_insumos, set_aux_insumos] = useState<IObjBienDespacho[]>([]);

  const {
    current_bien,
    bienes,
    current_despacho,
    bienes_despacho,
    bien_selected,
  } = useAppSelector((state) => state.despacho);
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
      field: 'cantidad_disponible',
      headerName: 'Cantidad disponible',
      width: 150,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
  ];

  const columns_bienes_despacho: GridColDef[] = [
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
      field: 'cantidad_despachada',
      headerName: 'Cantidad despachada',
      width: 140,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },

    {
      field: 'observacion_del_despacho',
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
          <Tooltip title="Borrar">
            <IconButton
            //   onClick={() => {
            //     delete_bien_despacho(params.row);
            //   }}
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

  //   const get_bienes: any = async () => {
  //     const codigo_bien = get_values_bien('codigo_bien') ?? '';
  //     const nombre = get_values_bien('nombre') ?? '';
  //     const agno = get_values_bien('agno_lote') ?? '';
  //     const nro = get_values_bien('nro_lote') ?? '';
  //     void dispatch(
  //       get_bienes_service(id_vivero, codigo_bien, nombre, agno, nro)
  //     );
  //   };

  const search_bien: any = async () => {
    try {
      const fecha = new Date(
        current_despacho.fecha_despacho ?? ''
      ).toISOString();
      const data = await dispatch(
        get_bien_code_service(
          bien_selected.codigo_bien ?? '',
          fecha.slice(0, 10) + ' ' + fecha.slice(11, 19)
        )
      );
      set_bienes_aux(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if ('success' in bienes) {
      if (bienes.success === true) {
        if ('data' in bienes) {
          if (bienes_aux.data.length > 1) {
            set_select_model_is_active(true);
          }
        }
      }
    }
  }, [bienes_aux]);

  useEffect(() => {
    reset_bien(current_bien);
    set_action('agregar');
  }, [current_bien]);

  useEffect(() => {
    if (current_bien.id_bien === null) {
      reset_bien(current_bien);
    }
  }, [current_despacho]);

  useEffect(() => {
    if (bien_selected.id_bien !== null) {
      console.log(bien_selected);
      dispatch(set_current_bien(initial_state_current_bien));
      search_bien();
    }
  }, [bien_selected]);

  useEffect(() => {
    set_aux_insumos(bienes_despacho);
  }, [bienes_despacho]);

  useEffect(() => {
    dispatch(set_bienes_despacho(aux_insumos));
  }, [aux_insumos]);

  const on_submit_despacho = (data: IObjBienDespacho): void => {
    if (current_bien.id_bien !== null) {
      if (get_values_bien('codigo_bien') === current_bien.codigo_bien) {
        const bien: IObjBienDespacho | undefined = aux_insumos.find(
          (p) => p.id_bien_solicitado === current_bien.id_bien
        );
        let asignada = 0;

        aux_insumos.forEach((option) => {
          if (option.id_bien_solicitado === bien?.id_bien_solicitado) {
            asignada = asignada + (option.cantidad_despachada ?? 0);
          }
        });
        asignada = asignada + (data.cantidad_despachada ?? 0);

        if (
          (data.cantidad_despachada ?? 0) <=
          (current_bien.cantidad_disponible ?? 0)
        ) {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          if (asignada <= (bien_selected.cantidad ?? 0)) {
            const new_bien: IObjBienDespacho = {
              id_inventario: current_bien.id_inventario ?? null,
              id_item_despacho_consumo: data.id_item_despacho_consumo ?? null,
              id_bien_despachado: current_bien.id_bien ?? null,
              id_bien_solicitado: current_bien.id_bien ?? null,
              id_bodega: current_bien.id_bodega ?? null,
              cantidad_despachada: Number(data.cantidad_despachada),
              cantidad_solicitada: Number(bien_selected.cantidad),
              nombre_bien: current_bien.nombre,
              codigo_bien: current_bien.codigo_bien,
              observacion: data.observacion,
              unidad_medida: current_bien.unidad_medida ?? null,
            };
            console.log(new_bien);
            if (bien === undefined) {
              set_aux_insumos([...aux_insumos, new_bien]);
              const restante =
                (current_bien.cantidad_disponible ?? 0) -
                (new_bien.cantidad_despachada ?? 0);
              dispatch(
                set_current_bien({
                  ...current_bien,
                  cantidad_disponible: restante,
                })
              );
              reset_despacho({
                id_bien_solicitado: current_bien?.id_bien,
                cantidad_despachada: null,
                observacion: null,
              });
            } else {
              if (action === 'editar') {
                const aux_items: IObjBienDespacho[] = [];
                aux_insumos.forEach((option) => {
                  if (option.id_bien_solicitado === current_bien.id_bien) {
                    aux_items.push(new_bien);
                  } else {
                    aux_items.push(option);
                  }
                });
                set_aux_insumos(aux_items);
                const restante =
                  (current_bien.cantidad_disponible ?? 0) -
                  (new_bien.cantidad_despachada ?? 0);
                dispatch(
                  set_current_bien({
                    ...current_bien,
                    cantidad_disponible: restante,
                  })
                );
                reset_despacho({
                  id_bien_solicitado: current_bien?.id_bien,
                  cantidad_despachada: null,
                  observacion: null,
                });
                set_action('agregar');
              } else {
                control_error('El bien ya fue agregado');
              }
            }
          } else {
            control_error(
              'La cantidad asignada debe ser maximo ' +
                String(bien_selected.cantidad)
            );
          }
        } else {
          control_error(
            'La cantidad asignada debe ser maximo ' +
              String(current_bien.cantidad_disponible)
          );
        }
      } else {
        control_error('Codigo de bien no coincide con el seleccionado');
      }
    } else {
      control_error('Debe seleccionar el bien');
    }
  };

  // const edit_bien_mortalidad = (item: IObjBienDespacho): void => {
  //     set_action("editar")
  //     const bien: IObjBien | undefined =bienes.find((p: IObjBien) => p.id_bien === item.id_bien)
  //     const item_bien = aux_insumos.find((p) => p.id_bien === item.id_bien)
  //     reset_despacho(item_bien)
  //     const aux_items: IObjBienDespacho[] = []
  //     aux_insumos.forEach((option) => {
  //         if (option.id_bien !== item.id_bien) {
  //             aux_items.push(option)
  //         }
  //     })
  //     console.log(bien)
  //     if(bien !== undefined){
  //         dispatch(set_current_bien(bien))
  //     }
  //     set_aux_insumos(aux_items)
  // };

  //   const delete_bien_despacho = (item: IObjBienDespacho): void => {
  //     let bien: IObjBien | undefined;
  //     if (item.cod_tipo_elemento_vivero === 'IN') {
  //       bien = bienes.find((p: IObjBien) => p.id_bien === item.id_bien);
  //     } else {
  //       bien = bienes.find(
  //         (p: IObjBien) =>
  //           p.id_bien === item.id_bien && p.nro_lote === item.nro_lote
  //       );
  //     }
  //     console.log(bien);

  //     if (bien !== undefined) {
  //       dispatch(set_current_bien(bien));
  //     }
  //     reset_despacho({
  //       id_bien: bien?.id_bien,
  //       cantidad_despachada: null,
  //       observacion_del_despacho: null,
  //     });
  //     const aux_items: IObjBienDespacho[] = [];
  //     aux_insumos.forEach((option) => {
  //       if (item.cod_tipo_elemento_vivero === 'IN') {
  //         if (option.id_bien !== item.id_bien) {
  //           aux_items.push(option);
  //         }
  //       } else {
  //         if (
  //           !(
  //             option.id_bien === item.id_bien && option.nro_lote === item.nro_lote
  //           )
  //         ) {
  //           aux_items.push(option);
  //         }
  //       }
  //     });
  //     set_aux_insumos(aux_items);
  //   };

  return (
    <>
      <Grid container direction="row" padding={2} borderRadius={2}>
        <BuscarModelo
          set_current_model={set_current_bien}
          row_id={'id_inventario'}
          columns_model={columns_bienes}
          models={bienes}
          get_filters_models={null}
          set_models={set_bienes}
          button_submit_label="Buscar bien"
          button_submit_disabled={false}
          show_search_button={false}
          form_inputs={[
            {
              datum_type: 'title',
              title_label: 'Seleccione bien',
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 5,
              control_form: control_bien,
              control_name: 'codigo_bien',
              default_value: '',
              rules: {
                required_rule: {
                  rule: true,
                  message: 'Codigo bien requerido',
                },
              },
              label: 'Codigo bien',
              type: 'number',
              disabled: current_despacho.id_despacho_consumo !== null,
              helper_text: '',
              on_blur_function: search_bien,
            },
            {
              datum_type: 'input_controller',
              xs: 12,
              md: 7,
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
              md: 2,
              control_form: control_despacho,
              control_name: 'cantidad_despachada',
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
                  rule: current_bien.cantidad_disponible,
                  message:
                    'La cqantidad no debe ser mayor que ' +
                    String(current_bien.cantidad_disponible),
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
              control_name: 'cantidad_disponible',
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
              control_form: control_despacho,
              control_name: 'observacion_del_despacho',
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
          title_list="Insumos despachados"
          list={aux_insumos}
          add_item_list={handle_submit_despacho(on_submit_despacho)}
          add_list_button_label={action}
          columns_list={columns_bienes_despacho}
          row_list_id={'id_inventario'}
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
          set_current_model={set_current_bien}
          is_modal_active={select_model_is_active}
          set_is_modal_active={set_select_model_is_active}
          modal_title={'Seleccionar lote de material vegetal'}
          form_filters={[]}
          set_models={set_bienes_aux}
          get_filters_models={null}
          models={bienes_aux}
          columns_model={columns_bienes}
          row_id={'id_inventario'}
          title_table_modal={'Resultados de la busqueda'}
        />
      </Grid>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarBienDespacho;
