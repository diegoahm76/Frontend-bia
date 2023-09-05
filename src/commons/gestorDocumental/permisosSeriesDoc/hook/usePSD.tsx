/* eslint-disable @typescript-eslint/naming-convention */

import { useForm } from "react-hook-form";

export const usePSD = (): any => {
  
  // ! definicion de los respectivos useForm a usar
  const {
    control: control_search_ccd_psd,
    // handleSubmit,
    // formState: { errors },
    watch: watch_search_ccd_psd,
    reset: reset_search_ccd_psd
  } = useForm({
    defaultValues: {
      nombre_ccd: '',
      version: ''
    }
  });

  const values_watch_search_ccd_psd = watch_search_ccd_psd();


  //* retorno
  return {
    //* valores de los useForm
    control_search_ccd_psd,
    values_watch_search_ccd_psd,
    reset_search_ccd_psd
  };


}
