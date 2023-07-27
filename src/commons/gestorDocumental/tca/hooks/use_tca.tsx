/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useForm } from 'react-hook-form';
import { default_values_create_update_tca } from './utils/defaultValuesUseForm/defaultValuesUseForm';

export const use_tca = () => {
  //!  create and update tca --------------------------------------->
  const {
    control: control_create_update_tca,
    handleSubmit: handleSubmit_create_update_tca,
    formState: formState_create_update_tca,
    reset: reset_create_update_tca,
    watch: watch_create_update_tca
  } = useForm({
    defaultValues: default_values_create_update_tca,
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });

  const watch_create_update_tca_value = watch_create_update_tca();
  // console.log('watch_create_update_tca_value', watch_create_update_tca_value);

  // ! search tca --------------------------------------->
  const {
    control: control_search_tca,
    handleSubmit: handleSubmit_search_tca,
    formState: formState_search_tca,
    reset: reset_search_tca,
    watch: watch_search_tca
  } = useForm({
    defaultValues: {
      nombre: '',
      version: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });
  const watch_search_tca_value = watch_search_tca();
  console.log('watch_search_tca_value', watch_search_tca_value);

  return {
    // ? useForm - create and update tca
    control_create_update_tca,
    handleSubmit_create_update_tca,
    formState_create_update_tca,
    reset_create_update_tca,
    watch_create_update_tca_value,

    // ? useForm - search tca
    control_search_tca,
    handleSubmit_search_tca,
    formState_search_tca,
    reset_search_tca,
    watch_search_tca_value,
  };
};
