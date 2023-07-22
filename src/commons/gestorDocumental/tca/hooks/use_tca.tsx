/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useForm } from "react-hook-form"

export const use_tca = () => {
  
  //! initial useForm - create and update tca

  const {
    control: control_create_update_tca,
    handleSubmit: handleSubmit_create_update_tca,
    formState: formState_create_update_tca,
    reset: reset_create_update_tca,
    watch: watch_create_update_tca,
  } = useForm()

  const watch_create_update_tca_value = watch_create_update_tca()


  return {

    // ? initial useForm - create and update tca
    control_create_update_tca,
    handleSubmit_create_update_tca,
    formState_create_update_tca,
    reset_create_update_tca,
    watch_create_update_tca_value
    

  }

}
