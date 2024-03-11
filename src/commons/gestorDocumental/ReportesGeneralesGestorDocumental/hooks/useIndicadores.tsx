/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { useForm } from 'react-hook-form'

export const useIndicadores = () => {

  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    control: controlBusquedaGeneradoraReporte,
    handleSubmit: handleSubmitBusquedaGeneradoraReporte,
    reset: resetBusquedaGeneradoraReporte,
    watch: watchBusquedaGeneradoraReporte,
  } = useForm({
    defaultValues: {
      fecha_inicio: '',
      fecha_fin: '',
      sede: 'TODAS',
      numero_expediente: 'TODOS',
      grupos: 'TODOS',
      seccion_subseccion: '',
      serie_subserie: '',
      grupo: '',
    },
  });

  return {
    controlBusquedaGeneradoraReporte,
    handleSubmitBusquedaGeneradoraReporte,
    resetBusquedaGeneradoraReporte,
    watchBusquedaGeneradoraReporte,
  }


}
