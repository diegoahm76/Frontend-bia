/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react'
import { AccionesLoad } from '../components/final/screen/Acciones.load'
import { Parte1Screen } from '../components/parte1/screen/Parte1Screen'
/**
 * Componente principal módulo de homologación de secciones persistentes
 * @returns JSX.Element,
 * El módulo se dividirá en 4 secciones:
 * - 1. Búsqueda y selección de ccd
 * - 2. Selección secciones persistentes
 * - 3. Selección de series documentales persistentes del CCD
 * - 4. Acciones : Salir, guardar, limpiar
 */
export const HomologacionDeSeccionesPersistentes = (): JSX.Element => {
  return (
   <>
    {/* Parte 1 */}
    {/* busqueda de cdd's para homologación y puesta de ccd y organigrama */}
    <Parte1Screen/>
    {/* Parte 2 */}
    {/* Parte 3 */}
    {/* Acciones */}
    <AccionesLoad/>
   </>
  )
}
