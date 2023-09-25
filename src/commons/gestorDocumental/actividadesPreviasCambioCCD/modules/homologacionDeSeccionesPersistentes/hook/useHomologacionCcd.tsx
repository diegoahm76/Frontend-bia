/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { useForm } from 'react-hook-form'

export const useHomologacionCcd = () => {
  // gestor/ccd/get-homologacion-busqueda/
  // ? use form declarations

  const {
    control: control_busqueda_ccd_hologacion,
    reset: reset_busqueda_ccd_hologacion,
    watch: watch_busqueda_ccd_hologacion,
  } = useForm({})

  return {
    //*
  }
}
