/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from 'react-hook-form';
import { reset_states, setCurrentSerieSubserie, setListaSeriesSubseries, set_busqueda_ccds_action, set_ccd_current_busqueda_action, set_current_unidad_organizacional_action, set_permisos_unidades_actuales_action, set_permisos_unidades_actuales_externas_action, set_restricciones_para_todas_las_unidades_organizacionales_action, set_restricciones_para_unidades_diferentes_al_a_seccion_o_subseccion_actual_responsable_action, set_unidades_organizacionales_action } from '../toolkit/slice/PSDSlice';
import { useAppDispatch } from '../../../../hooks';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

export const usePSD = (): any => {

  //* const navigate declaration
  const navigate = useNavigate();

  // ! dispatch declaration
  const dispatch = useAppDispatch();

  // ! ------- definicion de los respectivos useForm a usar ----------
  const {
    control: control_search_ccd_psd,
    // handleSubmit,
    // formState: { errors },
    watch: watch_search_ccd_psd,
    reset: reset_search_ccd_psd
  } = useForm({
    defaultValues: {
      nombre: '',
      version: ''
    }
  });

  const values_watch_search_ccd_psd = watch_search_ccd_psd();

  // ? use form para el select de la seccion o subsección necesaria

  //* useForm
  const {
    control: control_seleccionar_seccion_control,
    watch: seleccionar_seccion_watch,
    reset: seleccionar_seccion_reset
  } = useForm({
    defaultValues: {
      //* se debe revisar porque valor se hace la busqueda de la respectiva serie o subserie asociadas a la unidad organizacional del ccd
      id_cdd_unidad_organizacional: ''
    }
  });

  // ? ejecución del watch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const values_watch_seleccionar_seccion = seleccionar_seccion_watch();

  // ? use form para el select de elección de series - subseries
  //* useForm
  const {
    control: seleccionar_serie_subserie_control,
    watch: seleccionar_serie_subseire_watch,
    reset: seleccionar_serie_subserie_reset
  } = useForm({
    defaultValues: {
      //* se debe revisar porque valor se hace la busqueda de la respectiva serie o subserie asociadas a la unidad organizacional del ccd
      id_unidad_organizacional: ''
    }
  });

  // ? ejecución del watch
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const values_watch_seleccionar_serie_subserie = seleccionar_serie_subseire_watch();

  //! --------- funciones de reseteo de los useForm -------------
  const reset_all = (): void => {
    void Swal.fire({
      title: '¿Está seguro de limpiar todos los campos?, la información no se guardará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, limpiar',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Limpiado!',
          'Todos los campos han sido limpiados.',
          'success',
        );
    reset_search_ccd_psd({
      nombre: '',
      version: ''
    });
    seleccionar_seccion_reset({
      id_cdd_unidad_organizacional: ''
    });
    seleccionar_serie_subserie_reset({
      id_unidad_organizacional: ''
    });
    dispatch(reset_states());
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Información conservada.',
          'info'
        );
      }
    });
  };


 const getOutModule = () => {

    void Swal.fire({
      title: '¿Está seguro de salir del módulo?, la información no se guardará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, salir',
      cancelButtonText: 'No, cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Salida!',
          'Ha salido del módulo.',
          'success',
        );
        reset_search_ccd_psd({
          nombre: '',
          version: ''
        });
        seleccionar_seccion_reset({
          id_cdd_unidad_organizacional: ''
        });
        seleccionar_serie_subserie_reset({
          id_unidad_organizacional: ''
        });
        dispatch(reset_states());

      navigate("/app/home", { replace: true });
  }

  else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelado',
      'Información conservada, puede continuar.',
      'info'
    );
  }
});
  };


  //* retorno
  return {
    //* valores de los useForm
    control_search_ccd_psd,
    values_watch_search_ccd_psd,
    reset_search_ccd_psd,

    //* use forma seleccionar seccion o subseccion
    control_seleccionar_seccion_control,
    values_watch_seleccionar_seccion,
    seleccionar_seccion_reset,

    //* use form seleccionar serie subserie
    seleccionar_serie_subserie_control,
    values_watch_seleccionar_serie_subserie,
    seleccionar_serie_subserie_reset,

    //* funciones de reseteo de los useForm
    reset_all,


    //* funcion de salida del modulo
   getOutModule
  };
};
