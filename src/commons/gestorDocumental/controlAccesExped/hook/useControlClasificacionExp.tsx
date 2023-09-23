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


  //* use form para la configuración de los permisos
  const {
    control: control_configuracion_clasificacion,
    reset: reset_configuracion_clasificacion,
    watch: watch_configuracion_clasificacion,
  } = useForm({
    defaultValues: {
      id_unidad_organizacional: null,
    },
  })


  return {
    control_busqueda_ccd,
    reset_busqueda_ccd,
    watch_busqueda_ccd,
  }

}
