/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { control } from 'leaflet';
import { useForm } from 'react-hook-form';

export const useAsignacionesResp = () => {
  //* useForm declarations

  const {
    control: control_asignaciones_resp,
    reset: reset_asignaciones_resp,
    watch: watch_asignaciones_resp,
  } = useForm()


  return {
    control_asignaciones_resp,
    reset_asignaciones_resp,
    watch_asignaciones_resp,
  }
}
