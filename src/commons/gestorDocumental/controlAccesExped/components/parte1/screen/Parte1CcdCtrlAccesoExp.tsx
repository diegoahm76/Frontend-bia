/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { BusquedaCcdControlAccesoExpedientes } from '../BusquedaCCDPSD/BusquedaCcdControlAccesoExpedientes'
import { DialogBusquedaCcdControlAccesoExp } from '../DialogBusquedaCCD/DialogBusquedaCCD'

export const Parte1CcdCtrlAccesoExp = (): JSX.Element => {
  return (
    <>
    {/* input text de nombre y versión de ccd y botón de búsqueda para abrir el componente de modal declarado abajo */}
    <BusquedaCcdControlAccesoExpedientes/>



    {/* modal de búsqueda y selección de CCD */}
    <DialogBusquedaCcdControlAccesoExp />
     {/* modal de búsqueda y selección de CCD */}
    </>
  )
}
