/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { initial_state_searched_trd } from './utils/constants';
import { useAppDispatch } from '../../../../hooks';
import { get_searched_list_trd } from '../toolkit/modalBusquedaTRD/slices/modalBusquedaTRDSlice';
import { get_finished_ccd_service } from '../toolkit/CCDResources/thunks/getFinishedCcdThunks';

export const use_trd = (): any => {
  const dispatch: any = useAppDispatch();

  //! useForm that I will use in different components

  // ? form for search trd
  const {
    handleSubmit: handle_submit_searched_trd_modal,
    //! control series y subseries para catalogo de unidad organizacional
    control: control_searched_trd_modal,
    watch: watch_searched_trd_modal,
    reset: reset_searched_trd_modal,
    formState: { errors: errors_searched_trd_modal }
  } = useForm({ defaultValues: initial_state_searched_trd });
  const form_data_searched_trd_modal = watch_searched_trd_modal();

  // ? form for create trd

  const {
    // handleSubmit: handle_submit_create_trd_modal,
    control: control_create_trd_modal,
    watch: watch_create_trd_modal,
    reset: reset_create_trd_modal,

    // formState: { errors: errors_create_trd_modal }
  } = useForm({
    defaultValues: {
      id_ccd: 0,
      nombre: '',
      version: ''
    }
  });
  const data_create_trd_modal = watch_create_trd_modal();

  //! useStates that I will use in different components

  // ? list of finished ccd
  const [list_finished_ccd, set_list_finished_ccd] = useState<any[]>([
    {
      label: '',
      value: 0
    }
  ]);
  //! useEffects that I will use in different components

  // ? get list of finished ccd
  useEffect(() => {
    void dispatch(get_finished_ccd_service()).then((res: any) => {
      // console.log(res);
      set_list_finished_ccd(
        res.map((item: any) => {
          return {
            item,
            label: `V.${item.version} - ${item.nombre} `,
            value: item.id_ccd
          };
        })
      );
    });
  }, []);

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

    // ? create_trd_modal - ccd, name and version
    control_create_trd_modal,
    // handle_submit_create_trd_modal,
    data_create_trd_modal,
    

    // ? reset functions
    reset_busqueda_trd,
    reset_create_trd_modal,
    // ? list of finished ccd
    list_finished_ccd
  };
};
