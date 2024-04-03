import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import FormButton from '../../../../components/partials/form/FormButton';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  type IObjTransferGoods,
  type IObjNursery,
  type IObjTransfer,
} from '../interfaces/distribucion';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import {
  add_transfer_service,
  get_person_id_service,
  get_transfer_goods_service,
  edit_traslado_service,
  annul_transfer_service,
  get_nurseries_service,
  control_error,
  get_goods_aux_service,
} from '../store/thunks/distribucionThunks';
import SeleccionarTraslado from '../componentes/SeleccionarTraslado';
import SeleccionarBienTraslado from '../componentes/SeleccionarBienTraslado';
import {
  initial_state_current_nursery,
  reset_state,
  set_destination_nursery,
  set_origin_nursery,
} from '../store/slice/distribucionSlice';
import AnularEliminar from '../../componentes/AnularEliminar';
import Limpiar from '../../componentes/Limpiar';
import Block from '@mui/icons-material/Block';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import SearchIcon from '@mui/icons-material/Search';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function TrasladoScreen(): JSX.Element {
  const {
    current_transfer,
    transfer_person,
    nurseries,
    transfer_goods,
    origin_nursery,
  } = useAppSelector((state) => state.distribucion);
  const {
    control: control_traslado,
    handleSubmit: handle_submit,
    reset: reset_traslado,
    getValues: get_values,
    setValue: set_values,
    watch,
  } = useForm<IObjTransfer>();
  const dispatch = useAppDispatch();
  const [action, set_action] = useState<string>('Crear');
  const [aux_nurseries_origin, set_aux_nurseries_origin] = useState<
    IObjNursery[]
  >([]);
  const [aux_nurseries_destination, set_aux_nurseries_destination] = useState<
    IObjNursery[]
  >([]);
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const [open_search_modal, set_open_search_modal] = useState<boolean>(false);
  const handle_open_select_model = (): void => {
    set_open_search_modal(true);
  };
  const initial_values = (): void => {
    void dispatch(get_nurseries_service());
    void dispatch(get_person_id_service(userinfo.id_persona));
  };

  useEffect(() => {
    reset_traslado({
      ...current_transfer,
      id_persona_traslada: transfer_person?.id_persona,
      persona_traslada: transfer_person?.nombre_completo,
    });
  }, [transfer_person]);

  useEffect(() => {
    set_aux_nurseries_origin(nurseries);
    set_aux_nurseries_destination(nurseries);
  }, [nurseries]);

  useEffect(() => {
    if (current_transfer.id_traslado !== null) {
      void dispatch(
        get_transfer_goods_service(Number(current_transfer.id_traslado))
      );
      void dispatch(
        get_person_id_service(Number(current_transfer.id_persona_traslada ?? 0))
      );
      set_action('editar');
    } else {
      set_action('crear');
    }
    reset_traslado(current_transfer);
  }, [current_transfer]);

  useEffect(() => {
    if (watch('id_vivero_origen') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero_origen')
      );
      if (vivero !== undefined) {
        dispatch(set_origin_nursery(vivero));
        dispatch(set_destination_nursery(vivero));
        void dispatch(get_goods_aux_service(String(vivero.id_vivero)));
        if (vivero.id_vivero === get_values('id_vivero_destino')) {
          set_values('id_vivero_destino', null);
        }
        const indice = nurseries.findIndex(function (objeto) {
          return objeto.id_vivero === vivero.id_vivero;
        });
        if (indice !== -1) {
          const aux_items: IObjNursery[] = [...nurseries];
          aux_items.splice(indice, 1);
          set_aux_nurseries_destination(aux_items);
        }
      } else {
        dispatch(set_origin_nursery(initial_state_current_nursery));
      }
    } else {
      dispatch(set_origin_nursery(initial_state_current_nursery));
    }
  }, [watch('id_vivero_origen')]);

  useEffect(() => {
    if (watch('id_vivero_destino') !== null) {
      const vivero: IObjNursery | undefined = nurseries.find(
        (p: IObjNursery) => p.id_vivero === watch('id_vivero_destino')
      );
      if (vivero !== undefined) {
        if (vivero.id_vivero === get_values('id_vivero_origen')) {
          set_values('id_vivero_origen', null);
        }
        const indice = nurseries.findIndex(function (objeto) {
          return objeto.id_vivero === vivero.id_vivero;
        });
        if (indice !== -1) {
          const aux_items: IObjNursery[] = [...nurseries];
          aux_items.splice(indice, 1);
          set_aux_nurseries_origin(aux_items);
        }
      }
    }
  }, [watch('id_vivero_destino')]);

  const on_submit = (data: IObjTransfer): void => {
    const form_data: any = new FormData();
    if (
      current_transfer.id_traslado !== null &&
      current_transfer.id_traslado !== undefined
    ) {
      const fecha_actual = new Date();
      const fecha_traslado = new Date(data.fecha_traslado ?? '');
      const diferencia_ms = fecha_actual.getTime() - fecha_traslado.getTime();
      const diferencia_dias = Math.ceil(diferencia_ms / (1000 * 60 * 60 * 24));
      if (diferencia_dias <= 30) {
        set_action('editar');
        const aux_items: IObjTransferGoods[] = [];
        transfer_goods.forEach((element, index) => {
          aux_items.push({ ...element, nro_posicion: index });
        });
        form_data.append('info_traslado', JSON.stringify({ ...data }));
        form_data.append('items_traslado', JSON.stringify(aux_items));
        form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
        void dispatch(edit_traslado_service(form_data));
      } else {
        control_error(
          'Solo se pueden editar traslados hasta 30 dias despues de la fecha de traslado'
        );
      }
    } else {
      //  console.log('')('crear');
      set_action('crear');
      const fecha = new Date(data.fecha_traslado ?? '').toISOString();

      const data_edit = {
        ...data,
        fecha_traslado: fecha.slice(0, 10) + ' ' + fecha.slice(11, 19),
      };
      const aux_items: IObjTransferGoods[] = [];
      transfer_goods.forEach((element, index) => {
        aux_items.push({ ...element, nro_posicion: index });
      });
      form_data.append('info_traslado', JSON.stringify({ ...data_edit }));
      form_data.append('items_traslado', JSON.stringify(aux_items));
      form_data.append('ruta_archivo_soporte', data.ruta_archivo_soporte);
      void dispatch(add_transfer_service(form_data));
    }
  };

  const on_submit_annul = (data: IObjTransfer): void => {
    if (
      current_transfer.id_traslado !== null &&
      current_transfer.id_traslado !== undefined
    ) {
      void dispatch(annul_transfer_service(current_transfer.id_traslado, data));
    }
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
          <Title title="Traslado entre viveros"></Title>
        </Grid>

        <SeleccionarTraslado
          control_traslado={control_traslado}
          get_values={get_values}
          origin_nursery_list={aux_nurseries_origin}
          destination_nursery_list={aux_nurseries_destination}
          open_modal={open_search_modal}
          set_open_modal={set_open_search_modal}
        />
        <SeleccionarBienTraslado />

        <Grid container direction="row" padding={2} spacing={2}>
          {!(current_transfer.traslado_anulado === true) && (
            <Grid item xs={12} md={3}>
              <FormButton
                variant_button="contained"
                on_click_function={handle_submit(on_submit)}
                icon_class={<SaveIcon />}
                // label={action}
                label={'guardar' ?? action}
                type_button="button"
              />
            </Grid>
          )}
          <Grid item xs={12} md={3}>
            <FormButton
              variant_button="contained"
              on_click_function={handle_open_select_model}
              icon_class={<SearchIcon />}
              label={'Buscar traslado'}
              type_button="button"
              disabled={origin_nursery.id_vivero === null}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Limpiar
              dispatch={dispatch}
              reset_state={reset_state}
              set_initial_values={initial_values}
              variant_button={'outlined'}
            />
          </Grid>
          {current_transfer.id_traslado !== null && (
            <Grid item xs={12} md={3}>
              <AnularEliminar
                action={
                  current_transfer.traslado_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular'
                }
                button_icon_class={<Block />}
                button_disabled={false}
                modal_title={
                  current_transfer.traslado_anulado === true
                    ? 'Detalle anulación'
                    : 'Anular traslado'
                }
                button_submit_label={'Anular'}
                button_submit_disabled={current_transfer.traslado_anulado}
                button_submit_icon_class={<Block />}
                button_submit_action={handle_submit(on_submit_annul)}
                modal_inputs={[
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 3,
                    control_form: control_traslado,
                    control_name: 'nro_traslado',
                    default_value: current_transfer.nro_traslado,
                    rules: {
                      required_rule: { rule: false, message: 'Requerida' },
                    },
                    label: 'Número de traslado',
                    type: 'number',
                    disabled: current_transfer.id_traslado !== null,
                    helper_text:
                      current_transfer.nro_traslado === null
                        ? 'Ingrese para buscar traslado'
                        : '',
                  },
                  {
                    datum_type: 'input_controller',
                    person: true,
                    xs: 12,
                    md: 4,
                    control_form: control_traslado,
                    control_name: 'persona_anula',
                    default_value: '',
                    rules: {
                      required_rule: {
                        rule: true,
                        message: 'Debe seleccionar la personas que la creó',
                      },
                    },
                    label: 'Persona que anula',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'date_picker_controller',
                    xs: 12,
                    md: 4,
                    control_form: control_traslado,
                    control_name: 'fecha_anulado1',
                    default_value: new Date().toString(),
                    rules: {
                      required_rule: { rule: true, message: 'requerido' },
                    },
                    label: 'Fecha actual',
                    type: 'text',
                    disabled: true,
                    helper_text: '',
                  },
                  {
                    datum_type: 'input_controller',
                    xs: 12,
                    md: 12,
                    control_form: control_traslado,
                    control_name: 'justificacion_anulacion',
                    default_value: '',
                    rules: {
                      required_rule: {
                        rule: true,
                        message: 'Observación requerida',
                      },
                    },
                    label: 'Justificación',
                    type: 'text',
                    multiline_text: true,
                    rows_text: 4,
                    disabled: false,
                    helper_text: '',
                  },
                ]}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
