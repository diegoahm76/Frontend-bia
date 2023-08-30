/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { control_error, control_success } from '../../../../../helpers';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';
import { DataContext } from '../../Estantes/context/context';
import type{ PostEstantes, PutMoverEstantes } from '../../Estantes/types/types';
import { post_estante, put_mover_estante } from '../../Estantes/services/services';

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
      identificacion_estante: '',
      deposito_actual: '',

      identificacion_por_entidad_destino: {
        value: '',
        label: '',
      },
      // nombre_deposito_destino: '',
    },
  });

  const data_watch_mover_cajas = watch_mover_cajas();
  const data_watch_cajas = watch_cajas();

  const {
    id_deposito,
    identificacion_deposito,
    depositos_selected_mover_estante,
    set_identificacion_deposito,
    fetch_data_estantes_depositos,
  } = useContext(DataContext);

  const [open_dialog, set_open_dialog] = useState(false);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const handle_close = (): void => {
    set_open_dialog(false);
    set_value_mover_cajas('identificacion_por_entidad_destino', {
      value: '',
      label: '',
    });
  };

  const [selectedItem, setSelectedItem] = useState<ValueProps | null>(null);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const selectedValue = event.target.value;
    const selectedOption = depositos_selected_mover_estante.find(
      (option) => option.value === selectedValue
    );
    setSelectedItem(selectedOption ?? null);
    console.log(
      'Valor cambiado:',
      selectedOption ? selectedOption.label : '',
      selectedValue
    );
  };

  useEffect(() => {
    if (data_watch_cajas?.identificacion_por_bandeja) {
      set_identificacion_deposito(
        data_watch_cajas?.identificacion_por_bandeja
      );
    }
  }, [data_watch_cajas?.identificacion_por_bandeja]);

  // ? onsumit

  const [is_saving_cajas, set_is_saving_cajas] = useState(false);
  const [is_saving_mover_cajas, set_is_saving_mover_cajas] =
    useState(false);

  const onsubmit_cajas = handleSubmit_cajas(async (data) => {
    try {
      set_is_saving_cajas(true);
      if (id_deposito) {
        const data_estantes: PostEstantes = {
          id_deposito,
          identificacion_por_deposito: identificacion_deposito,
        };
        await post_estante(data_estantes);
        await fetch_data_estantes_depositos();
        control_success('Se creó estante correctamente');
        reset_cajas();
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving_cajas(false);
    }
  });

  const onsubmit_mover_cajas = handleSubmit_mover_cajas(async (data) => {
    try {
      set_is_saving_mover_cajas(true);
      if (selectedItem) {
        const data_estantes: PutMoverEstantes = {
          identificacion_por_entidad_destino: selectedItem.value as string,
          nombre_deposito_destino: selectedItem.label,
        };
        const identificacion = data?.identificacion_estante ?? '';
        await put_mover_estante(identificacion, data_estantes);
        await fetch_data_estantes_depositos();
        control_success('Se movió estante correctamente');
        handle_close();
      }
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

    // select
    selectedItem,
    setSelectedItem,
    handleSelectChange,

    // * dialog mover cajas
    open_dialog,
    handle_click_open,
    handle_close,

    // * onsumit
    onsubmit_cajas,
    onsubmit_mover_cajas,
    //  * saving
    is_saving_cajas,
    is_saving_mover_cajas,
  };
};
