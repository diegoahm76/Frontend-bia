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


    //* funciones de reseteo de los useForm
    reset_all,
  };


}
