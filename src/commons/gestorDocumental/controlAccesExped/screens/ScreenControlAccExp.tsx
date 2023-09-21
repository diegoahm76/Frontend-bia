/* eslint-disable @typescript-eslint/naming-convention */
import {type FC} from 'react'
import { Parte1CcdCtrlAccesoExp } from '../components/parte1/screen/Parte1CcdCtrlAccesoExp';
import { AutorizacionesGeneralesScreen } from '../components/parte3/screen/AutorizacionesGeneralesScreen';
import { BloqueAutorizacionCcdScreen } from '../components/parte4/screen/BloqueAutorizacionCcdScreen';
import { Acciones } from '../components/final/Acciones';



/**
 * Renders the screen for controlling access to expedited documents.
 * @returns JSX.Element representing the screen.
 * 1. Primera parte - busqueda y selección de ccd que coinciden con los criterios de busqueda
 * 2.
 * parte # 3 - Autorizaciones generales
 * final - acciones (limpiar campos, guardar, salir del módulo)
 */
export const ScreenControlAccExp: FC<any> = (): JSX.Element => {
  return (
    <>
    {/* parte # 1*/}
    <Parte1CcdCtrlAccesoExp />
    {/* parte # 2*/}

    {/* parte # 3*/}
    <AutorizacionesGeneralesScreen/>
    {/* parte # 4*/}
    <BloqueAutorizacionCcdScreen/>
    {/* final */}
    <Acciones/>
    </>
  );
}
