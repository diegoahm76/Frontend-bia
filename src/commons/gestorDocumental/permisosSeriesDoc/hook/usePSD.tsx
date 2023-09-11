/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from "react-hook-form";

export const usePSD = (): any => {
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





  // ? use form para el select de elección de series - subseries
    //* useForm
    const {
      control: seleccionar_serie_subserie_control,
      watch: seleccionar_serie_subseire_watch
      // reset: seleccionar_seccion_reset
    } = useForm({
      defaultValues: {
        //* se debe revisar porque valor se hace la busqueda de la respectiva serie o subserie asociadas a la unidad organizacional del ccd
        id_serie_subserie: ''
      }
    });
  
    // ? ejecución del watch
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const values_watch_seleccionar_seccion = seleccionar_serie_subseire_watch();




  //! --------- funciones de reseteo de los useForm -------------
  const reset_all = (): void => {
    reset_search_ccd_psd({
      nombre: '',
      version: ''
    });
  };

  //* retorno
  return {
    //* valores de los useForm
    control_search_ccd_psd,
    values_watch_search_ccd_psd,
    reset_search_ccd_psd,

    //* use form seleccionar serie subserie
    seleccionar_serie_subserie_control,
    values_watch_seleccionar_seccion,

    //* funciones de reseteo de los useForm
    reset_all,
  };


}
