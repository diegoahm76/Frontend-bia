/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useForm } from 'react-hook-form';
import { default_values_busqueda_tca, default_values_create_update_tca } from './utils/defaultValuesUseForm/defaultValuesUseForm';
import { useEffect, useState } from 'react';
import { getTRDsUsados } from '../components/MainScreenComponents/view/TRDSUsados/services/TRDUsados.service';
import { useAppSelector } from '../../../../hooks';

export const use_tca = () => {
  // ? useSelector declaration
  const { tca_current } = useAppSelector((state) => state.tca_slice);

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
    defaultValues: default_values_busqueda_tca,
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });
  const watch_search_tca_value = watch_search_tca();
  // console.log('watch_search_tca_value', watch_search_tca_value);

  //* -------------------------------------------------------------------------->
  //! useStates that I will use in different components --------------------->

  // ? button that manage the name (state (save or update))
  const [title_button_create_edit_tca, set_title_button_create_edit_tca] =
    useState('Guardar');

  // ? list of finished ccd --------------------->
  const [list_non_used_trds, set_list_non_used_trds] = useState<any[]>([
    {
      label: '',
      value: 0
    }
  ]);

  //* -------------------------------------------------------------------------->
  //! useEffects that I will use in different components --------------------->

  // ? get list of finished ccd to list--------------------->
  useEffect(() => {
    void getTRDsUsados().then((res: any[]) => {
      // * console.log('res', res);
      set_list_non_used_trds(
        res
          .filter((trd) => trd.usado === false)
          .map((item: any) => {
            return {
              item,
              label: `V. ${item.version} - ${item.nombre} `,
              value: item.id_trd
            };
          })
      );
    });
  }, [tca_current]);

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

    // ? non used trds
    set_list_non_used_trds,
    list_non_used_trds,

    // ? button that manage the name (state (save or update))
    set_title_button_create_edit_tca,
    title_button_create_edit_tca
  };
};
