import { useForm } from 'react-hook-form';
import { initial_state_searched_trd } from './utils/constants';
import { useAppDispatch } from '../../../../hooks';
import { get_searched_list_trd } from '../toolkit/modalBusquedaTRD/slices/modalBusquedaTRDSlice';

export const use_trd = (): any => {
  const dispatch: any = useAppDispatch();
  const {
    handleSubmit: handle_submit_searched_trd_modal,
    //! control series y subseries para catalogo de unidad organizacional
    control: control_searched_trd_modal,
    watch: watch_searched_trd_modal,
    reset: reset_searched_trd_modal,
    formState: { errors: errors_searched_trd_modal }
  } = useForm({ defaultValues: initial_state_searched_trd });
  const form_data_searched_trd_modal = watch_searched_trd_modal();



  const reset_busqueda_trd = (): void => {
    reset_searched_trd_modal();
    dispatch(get_searched_list_trd([]));
  };

  return {
    // ? searched_trd_modal - name and version
    handle_submit_searched_trd_modal,
    control_searched_trd_modal,
    watch_searched_trd_modal,
    reset_searched_trd_modal,
    errors_searched_trd_modal,
    form_data_searched_trd_modal,


    // ? reset functions
    reset_busqueda_trd,
  };
};
