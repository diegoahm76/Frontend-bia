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

  return {
    control_busqueda_ccd,
    reset_busqueda_ccd,
    watch_busqueda_ccd,

    //* seleccion de la seccion o subseccion
    control_seleccionar_seccion_control,
    seleccionar_seccion_watch,
    seleccionar_seccion_reset,
    //* seleccion de la serie o subserie
    seleccionar_serie_subserie_control,
    seleccionar_serie_subseire_watch,
    seleccionar_serie_subserie_reset,
  }

}
