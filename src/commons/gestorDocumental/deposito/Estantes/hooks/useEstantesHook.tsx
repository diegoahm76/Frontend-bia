/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataContext } from '../context/context';
import { post_estante, put_mover_estante } from '../services/services';
import type { PostEstantes, PutMoverEstantes } from '../types/types';
import { control_error, control_success } from '../../../../../helpers';
import type { ValueProps } from '../../../../recursoHidrico/Instrumentos/interfaces/interface';

export const useEstantesHook = (): any => {
  // * context

  // use form estantes
  const {
    control: control_estantes,
    watch: watch_estantes,
    register: register_estantes,
    handleSubmit: handleSubmit_estantes,
    setValue: set_value_estantes,
    reset: reset_estantes,
    formState: { errors: errors_estantes },
  } = useForm({
    defaultValues: {
      identificacion_por_deposito: '',
      orden: '',
      nuevo_orden: '',
    },
  });

  // use form mover estantes
  const {
    control: control_mover_estantes,
    watch: watch_mover_estantes,
    register: register_mover_estantes,
    handleSubmit: handleSubmit_mover_estantes,
    setValue: set_value_mover_estantes,
    reset: reset_mover_estantes,
    formState: { errors: errors_mover_estantes },
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

  const data_watch_mover_estantes = watch_mover_estantes();
  const data_watch_estantes = watch_estantes();

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
    set_value_mover_estantes('identificacion_por_entidad_destino', {
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
    if (data_watch_estantes?.identificacion_por_deposito) {
      set_identificacion_deposito(
        data_watch_estantes?.identificacion_por_deposito
      );
    }
  }, [data_watch_estantes?.identificacion_por_deposito]);

  // ? onsumit

  const [is_saving_estante, set_is_saving_estante] = useState(false);
  const [is_saving_mover_estante, set_is_saving_mover_estante] =
    useState(false);

  const onsubmit_estantes = handleSubmit_estantes(async (data) => {
    try {
      set_is_saving_estante(true);
      if (id_deposito) {
        const data_estantes: PostEstantes = {
          id_deposito,
          identificacion_por_deposito: identificacion_deposito,
        };
        await post_estante(data_estantes);
        await fetch_data_estantes_depositos();
        control_success('Se creó estante correctamente');
        reset_estantes();
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    } finally {
      set_is_saving_estante(false);
    }
  });

  const onsubmit_mover_estantes = handleSubmit_mover_estantes(async (data) => {
    try {
      set_is_saving_mover_estante(true);
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
      set_is_saving_mover_estante(false);
    }
  });
  return {
    // use form bandejas
    control_estantes,
    watch_estantes,
    register_estantes,
    handleSubmit_estantes,
    set_value_estantes,
    reset_estantes,
    errors_estantes,
    data_watch_estantes,

    // use form mover estantes
    control_mover_estantes,
    watch_mover_estantes,
    register_mover_estantes,
    handleSubmit_mover_estantes,
    set_value_mover_estantes,
    reset_mover_estantes,
    errors_mover_estantes,
    data_watch_mover_estantes,

    // select
    selectedItem,
    setSelectedItem,
    handleSelectChange,

    // * dialog mover estantes
    open_dialog,
    handle_click_open,
    handle_close,

    // * onsumit
    onsubmit_estantes,
    onsubmit_mover_estantes,
    //  * saving
    is_saving_estante,
    is_saving_mover_estante,
  };
};
