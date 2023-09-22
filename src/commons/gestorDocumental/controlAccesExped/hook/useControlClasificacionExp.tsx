/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { useForm } from 'react-hook-form'

export const useControlClasificacionExp = (): any => {
  
  // ! use form necesarios para la búsqueda de los ccd
  const {
    control: control_busqueda_ccd,
    reset: reset_busqueda_ccd,
    watch: watch_busqueda_ccd,
  } = useForm({
    defaultValues: {
      nombre: '',
      version: '',
    },
  })



  return {
    control_busqueda_ccd,
    reset_busqueda_ccd,
    watch_busqueda_ccd,
  }

}
