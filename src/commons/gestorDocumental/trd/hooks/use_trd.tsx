/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  initial_state_create_trd,
  initial_state_format_documental_type,
  initial_state_searched_trd
} from './utils/constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { get_finished_ccd_service } from '../toolkit/CCDResources/thunks/getFinishedCcdThunks';
import {
  get_catalogo_series_subseries_unidad_organizacional,
  get_catalogo_trd_action,
  get_data_format_documental_type,
  // get_data_format_documental_type,
  get_data_format_documental_type_current,
  get_trd_current,
  get_trds
} from '../toolkit/TRDResources/slice/TRDResourcesSlice';

export const use_trd = (): any => {
  const dispatch: any = useAppDispatch();

  // eslint-disable-next-line no-empty-pattern
  const { trd_current /* data_format_documental_type_current */ /* trds */ } =
    useAppSelector((state: any) => state.trd_slice);

  // eslint-disable-next-line no-empty-pattern
  const { ccd_finished } = useAppSelector(
    (state: any) => state.finished_ccd_slice
  );

  //! useForm that I will use in different components

  // ? form for search trd  --------------------->
  const {
    handleSubmit: handle_submit_searched_trd_modal,
    //! control series y subseries para catalogo de unidad organizacional
    control: control_searched_trd_modal,
    watch: watch_searched_trd_modal,
    reset: reset_searched_trd_modal,
    formState: { errors: errors_searched_trd_modal }
  } = useForm({ defaultValues: initial_state_searched_trd });
  const form_data_searched_trd_modal = watch_searched_trd_modal();

  // ? form for create trd --------------------->

  const {
    // handleSubmit: handle_submit_create_trd_modal,
    control: control_create_trd_modal,
    watch: watch_create_trd_modal,
    reset: reset_create_trd_modal

    // formState: { errors: errors_create_trd_modal }
  } = useForm({ defaultValues: initial_state_create_trd });
  const data_create_trd_modal = watch_create_trd_modal();

  // ? form (create, edit, delete or deactivate) format documental type --------------------->
  const {
    // handleSubmit: handle_submit_searched_trd_modal,
    //! control series y subseries para catalogo de unidad organizacional
    control: control_format_documental_type,
    watch: watch_format_documental_type,
    reset: reset_format_documental_type,
    formState: { errors: errors_format_documental_type }
  } = useForm({ defaultValues: initial_state_format_documental_type });
  const data_format_documental_type_watch_form = watch_format_documental_type();
  // //  console.log('')(data_format_documental_type_watch_form, 'data_format_documental_type_watch_form');

  // ? tipologias documentales ---------------------> (search), (administrar)
  const {
    control: controlBusquedaTipologiasDocumentales,
    // handleSubmit: handleSubmitBusquedaTipologiasDocumentales,
    // formState: { errors },
    reset: resetBusquedaTipologiasDocumentales,
    watch: watchBusquedaTipologiasDocumentales
  } = useForm({
    defaultValues: {
      nombre: '',
      activo: true,
      cod_tipo_medio_doc: '',
      control_tamagno_max:true,
      formatos: []
    },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });
  const form_data_searched_tipologia_documental =
    watchBusquedaTipologiasDocumentales();
  /* //  console.log('')(
    form_data_searched_tipologia_documental,
    'form_data_searched_tipologia_documental'
  ); */

  // ? administracion de TRD

  const {
    control: control_administrar_trd,
    // handleSubmit: handleSubmitBusquedaTipologiasDocumentales,
    // formState: { errors },
    reset: reset_administrar_trd,
    watch: watch_administrar_trd
  } = useForm({
    defaultValues: {
      cod_disposicion_final: '',
      digitalizacion_dis_final: true,
      tiempo_retencion_ag: '',
      tiempo_retencion_ac: '',
      descripcion_procedimiento: '',
      justificacion_cambio: '',
      tipologias: [],
      ruta_archivo_cambio: ''
    },
    mode: 'onBlur',
    reValidateMode: 'onChange'
  });
  const form_data_administrar_trd = watch_administrar_trd();
  // //  console.log('')(form_data_administrar_trd, 'form_data_administrar_trd');

  //* -------------------------------------------------------------------------->
  //! useStates that I will use in different components --------------------->

  // ? list of finished ccd --------------------->
  const [list_finished_ccd, set_list_finished_ccd] = useState<any[]>([
    {
      label: '',
      value: 0
    }
  ]);
  // ? list of formats by documental type --------------------->
  const [list_format_documental_type, set_list_format_documental_type] =
    useState<any[]>([
      {
        label: '',
        value: 0
      }
    ]);

  // ? button to change between create or edit documental type format ------------------->
  // ? button that manage the name (state (save or update))
  const [title_button, set_title_button] = useState('Guardar');

  // ? button to change between create or edit typologies ----------------->
  const [
    title_button_administrar_tipologias,
    set_title_button_administrar_tipologias
  ] = useState('Guardar');

  // ? manage tipolgies asociated to trd --------------------->
  //* necccesary states

  //* -------------------------------------------------------------------------->
  //! useEffects that I will use in different components --------------------->

  // ? get list of finished ccd to list--------------------->
  useEffect(() => {
    void dispatch(get_finished_ccd_service()).then((res: any) => {
      set_list_finished_ccd(
        res
          .filter((cdd: any) => cdd.usado === false)
          .map((item: any) => {
            return {
              item,
              label: `V. ${item.version} - ${item.nombre} `,
              value: item.id_ccd
            };
          })
      );
    });
  }, [trd_current]);

  // ? try to edit trd --------------------->
  useEffect(() => {
    // //  console.log('')(data_create_trd_modal, 'data_create_trd');
    // //  console.log('')(trd_current, 'trd_current');
    if (trd_current !== null) {
      const result_name = ccd_finished.filter((item: any) => {
        return item.id_ccd === trd_current.id_ccd;
      });
      // //  console.log('')('result_name', result_name);
      const obj: any = {
        id_ccd: {
          label: result_name[0].nombre,
          value: result_name[0].id_ccd
        },
        nombre: trd_current.nombre,
        version: trd_current.version,
        id_trd: trd_current.id_trd
      };
      // //  console.log('')(obj, 'obj');
      reset_create_trd_modal(obj);
    }
  }, [trd_current]);

  //! reset functions that I will use in different components --------------------->

  // ? reset all trd data --------------------->
  const reset_all_trd = (): void => {
    //* reset trd list
    dispatch(get_trds([]));
    dispatch(get_catalogo_trd_action([]));
    dispatch(get_trd_current(null));
    dispatch(get_catalogo_series_subseries_unidad_organizacional([]));
    //* reset form
    reset_searched_trd_modal({
      nombre: '',
      version: ''
    });
    reset_create_trd_modal({
      id_ccd: 0,
      nombre: '',
      version: ''
    });
  };

  // ? reset create or edit format documental type data --------------------->
  const reset_all_format_documental_type_modal = (): void => {
    //* reset form
    dispatch(get_data_format_documental_type_current(null));
    dispatch(get_data_format_documental_type([]));
    reset_format_documental_type({
      'cod-tipo-medio': {
        label: '',
        value: 0,
        'cod-tipo-medio': ''
      },
      nombre: '',
      activo: true,tamagno_max_mb:0,control_tamagno_max:false
    });

    set_title_button('Guardar');
  };

  return {
    // ? searched_trd_modal - name and version of trd --------------------------------------------->
    handle_submit_searched_trd_modal,
    control_searched_trd_modal,
    watch_searched_trd_modal,
    reset_searched_trd_modal,
    errors_searched_trd_modal,
    form_data_searched_trd_modal,

    // ? create_trd_modal - ccd, name and version of trd --------------------------------------------->
    control_create_trd_modal,
    // handle_submit_create_trd_modal,
    data_create_trd_modal,

    // ? format_documental_type of trd --------------------------------------------->
    control_format_documental_type,
    watch_format_documental_type,
    reset_format_documental_type, //* basic reset to manage edit data
    reset_all_format_documental_type_modal, //* reset functions data format documental type
    errors_format_documental_type,
    data_format_documental_type_watch_form,

    //! plain states
    set_title_button, //* (save or edit state)
    title_button, //* (save or edit state)

    title_button_administrar_tipologias,
    set_title_button_administrar_tipologias,

    // ? administrar o buscar tipologias documentales --------------------------------------------->
    controlBusquedaTipologiasDocumentales,
    form_data_searched_tipologia_documental,
    resetBusquedaTipologiasDocumentales,

    // ? administrar trd --------------------------------------------->
    control_administrar_trd,
    form_data_administrar_trd,
    reset_administrar_trd,

    // ? reset functions data trd --------------------------------------------->
    reset_all_trd,
    reset_create_trd_modal,

    // ? list of finished ccd --------------------------------------------->
    list_finished_ccd,
    // ? list of formats by documental type --------------------------------------------->
    set_list_format_documental_type,
    list_format_documental_type,

    // ? tipologias documentales --------------------------------------------->
    // ? tipologias documentales --------------------------------------------->
  };
};
