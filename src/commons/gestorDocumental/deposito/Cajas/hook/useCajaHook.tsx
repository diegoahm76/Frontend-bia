/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../../helpers';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import { DataContext } from '../../Estantes/context/context';
import type { IPutOrdenCaja, PostCajas } from '../types/types';
import { post_caja, put_caja, put_mover_caja } from '../services/services';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import {
  set_current_cajas,
  set_current_mode_estantes,
} from '../../store/slice/indexDeposito';

export const useCajaHook = (): any => {
  // * context

  // use form estantes
  const {
    control: control_cajas,
    watch: watch_cajas,
    register: register_cajas,
    handleSubmit: handleSubmit_cajas,
    setValue: set_value_cajas,
    reset: reset_cajas,
    formState: { errors: errors_cajas },
  } = useForm({
    defaultValues: {
      identificacion_por_bandeja: '',
      orden: '',
      nuevo_orden: '',
    },
  });

  // use form mover cajas
  const {
    control: control_mover_cajas,
    watch: watch_mover_cajas,
    register: register_mover_cajas,
    handleSubmit: handleSubmit_mover_cajas,
    setValue: set_value_mover_cajas,
    reset: reset_mover_cajas,
    formState: { errors: errors_mover_cajas },
  } = useForm({
    defaultValues: {
      deposito_actual: '',
      estante_actual: '',
      bandeja_actual: '',
      caja_actual: '',

      deposito_destino: {
        item: '',
        value: '',
        label: '',
      },
      estante_destino: {
        value: '',
        label: '',
      },
      bandeja_destino: {
        value: '',
        label: '',
      },
    },
  });

  const data_watch_mover_cajas = watch_mover_cajas();
  const data_watch_cajas = watch_cajas();

  const { cajas } = useAppSelector((state) => state.deposito);
  const dispatch = useAppDispatch();

  const {
    depositos_selected_mover_estante,
    estantes_selected,
    identificacion_caja,
    nuevo_orden,
    orden,
    set_id_bandeja,
    set_rows_cajas,
    set_rows_bandejas,
    set_rows_carpetas,
    set_orden,
    set_nuevo_orden,
    set_identificacion_caja,
    set_id_deposito,
    set_id_estante,
    fetch_data_caja_bandeja,
    fetch_data_orden_cajas,
  } = useContext(DataContext);

  const [open_dialog, set_open_dialog] = useState(false);
  const [is_habilita_cambiar_orden_cajas, set_is_habilita_cambiar_orden_cajas] =
    useState(false);
  const [is_habilita_nuevo_orden, set_is_habilita_nuevo_orden] =
    useState(false);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
  };

  const [selectedItem, setSelectedItem] = useState<ValueProps | null>(null);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type?: string
  ): void => {
    const selectedValue = event.target.value;
    const selectedOption = depositos_selected_mover_estante.find(
      (option) => option.value === selectedValue
    );
    const selectedOptionEstante = estantes_selected.find(
      (option) => option.value === selectedValue
    );
    setSelectedItem(selectedOption ?? null);
    if (type === 'deposito') {
      const id_deposito = selectedOption?.item?.id_deposito;
      set_id_deposito(id_deposito);
    }
    if (type === 'estante') {
      set_id_estante(selectedOptionEstante?.item?.id_estante_deposito);
    }
  };

  // ? onsumit

  const [is_saving_cajas, set_is_saving_cajas] = useState(false);
  const [is_saving_mover_cajas, set_is_saving_mover_cajas] = useState(false);

  const onsubmit_cajas = handleSubmit_cajas(async (data) => {
    try {
      set_is_saving_cajas(true);
      //  console.log('')(identificacion_caja, 'identificacion_caja');
      const id_bandeja: number = cajas?.id_bandeja as number;
      if (id_bandeja) {
        const data_caja: PostCajas = {
          id_bandeja_estante: id_bandeja,
          identificacion_por_bandeja: identificacion_caja,
        };
        await post_caja(data_caja);
        await fetch_data_caja_bandeja();
        await fetch_data_orden_cajas()
        control_success('Se creó caja correctamente');
        dispatch(
          set_current_mode_estantes({
            ver: false,
            crear: false,
            editar: false,
          })
        );
        reset_cajas();
        set_identificacion_caja('');
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving_cajas(false);
    }
  });

  const limpiar_formulario_mover_cajas = (): void => {
    reset_mover_cajas();
    setSelectedItem(null);
  };

  const onsubmit_update_cajas = handleSubmit_cajas(async (data) => {
    try {
      //  console.log('')(identificacion_caja, 'identificacion_caja');
      //  console.log('')(orden, 'orden');
      //  console.log('')(nuevo_orden, 'nuevo_orden');
      set_is_saving_cajas(true);

      if (!nuevo_orden && !orden) {
        control_error(
          'Hubo un error, intente nuevamente, si el error persiste comuníquese con el administrador'
        );
        return;
      }

      const data_caja: IPutOrdenCaja = {
        identificacion_por_bandeja: identificacion_caja,
        orden_ubicacion_por_bandeja: Number(nuevo_orden ?? orden),
      };
      await put_caja(cajas.id_caja as number, data_caja);
      await fetch_data_caja_bandeja();
      control_success('Se actualizó la caja correctamente');
      dispatch(
        set_current_mode_estantes({
          ver: false,
          crear: false,
          editar: false,
        })
      );
      reset_cajas();
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving_cajas(false);
    }
  });

  const limpiar_formulario_cajas = (): void => {
    set_id_bandeja(null);
    reset_cajas({
      identificacion_por_bandeja: '',
      orden: '',
      nuevo_orden: '',
    });
    dispatch(
      set_current_mode_estantes({
        ver: false,
        crear: false,
        editar: false,
      })
    );
    reset_mover_cajas({
      deposito_actual: '',
      estante_actual: '',
      bandeja_actual: '',
      caja_actual: '',
      deposito_destino: {
        item: '',
        value: '',
        label: '',
      },
      estante_destino: {
        value: '',
        label: '',
      },
      bandeja_destino: {
        value: '',
        label: '',
      },
    });
    dispatch(
      set_current_cajas({
        identificacion_deposito: null,
        id_deposito: null,
        identificacion_estante: '',
        id_estante: null,
        identificacion_bandeja: '',
        id_bandeja: null,
        identificacion_caja: '',
        id_caja: null,
        orden_caja: null,
      })
    );
    set_identificacion_caja('');
    set_orden(null);
    set_nuevo_orden(null);
    setSelectedItem(null);
    set_rows_bandejas([]);
    set_rows_cajas([]);
    set_rows_carpetas([]);
  };

  const onsubmit_mover_cajas = handleSubmit_mover_cajas(async (data) => {
    try {
      //  console.log('')(data.bandeja_destino, 'bandeja_destino');
      //  console.log('')(data.estante_destino, 'estante_destino');
      //  console.log('')(data.deposito_destino, 'deposito_destino');

      const data_mover_caja: any = {
        identificacion_bandeja_destino: data.bandeja_destino,
        identificacion_estante_destino: data.estante_destino,
        identificacion_deposito_destino: data.deposito_destino,
      };
      await put_mover_caja(cajas?.id_caja as number, data_mover_caja);
      await fetch_data_caja_bandeja();
      control_success('Se movió caja correctamente');
      handle_close();
      limpiar_formulario_mover_cajas();
      dispatch(
        set_current_mode_estantes({
          ver: false,
          crear: false,
          editar: false,
        })
      );
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving_mover_cajas(false);
    }
  });
  return {
    control_cajas,
    watch_cajas,
    register_cajas,
    handleSubmit_cajas,
    set_value_cajas,
    reset_cajas,
    errors_cajas,
    data_watch_cajas,

    control_mover_cajas,
    watch_mover_cajas,
    register_mover_cajas,
    handleSubmit_mover_cajas,
    set_value_mover_cajas,
    reset_mover_cajas,
    errors_mover_cajas,
    data_watch_mover_cajas,

    set_identificacion_caja,

    // select
    selectedItem,
    setSelectedItem,
    handleSelectChange,
    set_nuevo_orden,

    // * dialog mover cajas
    open_dialog,
    handle_click_open,
    handle_close,

    // * onsumit
    onsubmit_cajas,
    onsubmit_mover_cajas,
    onsubmit_update_cajas,
    limpiar_formulario_cajas,
    //  * saving
    is_saving_cajas,
    is_saving_mover_cajas,

    // * habilitar campos orden
    is_habilita_cambiar_orden_cajas,
    set_is_habilita_cambiar_orden_cajas,
    is_habilita_nuevo_orden,
    set_is_habilita_nuevo_orden,
  };
};
