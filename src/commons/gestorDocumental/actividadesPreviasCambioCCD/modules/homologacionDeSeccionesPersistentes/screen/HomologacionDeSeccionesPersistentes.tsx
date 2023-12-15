/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { AccionesLoad } from '../components/final/screen/Acciones.load';
import { Parte1Screen } from '../components/parte1/screen/Parte1Screen';
import { validacionInicialCCD } from '../toolkit/thunks/ccdOrganigrama.service';
import { useNavigate } from 'react-router-dom';
import { SelSeccionesPerScreen } from '../components/parte2/screen/SelSeccionesPerScreen';
import { SelSerDocPersistentesScreen } from '../components/parte3/screen/SelSerDocPersistentesScreen';
import { useAppDispatch } from '../../../../../../hooks';
import { reset_states } from '../toolkit/slice/HomologacionesSeriesSlice';
/**
 * Componente principal módulo de homologación de secciones persistentes
 * @returns JSX.Element,
 * El módulo se dividirá en 4 secciones:
 *
 *  ANTES DE COMENZAR EL MÓDULO SE DEBEN HACER DOS COMPROBACIONES:
 * 1. QUE haya un ccd actual
 * 2. QUE haya un ccd diferente al actual que no haya salido de producción
 *
 *
 * - 1. Búsqueda y selección de ccd
 * - 2. Selección secciones persistentes
 * - 3. Selección de series documentales persistentes del CCD
 * - 4. Acciones : Salir, guardar, limpiar
 */
export const HomologacionDeSeccionesPersistentes = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();
  //* dispatch declaration
  const dispatch = useAppDispatch();

  useEffect(() => {
    void validacionInicialCCD(navigate);

    // ? revisar si se debe hacer el reinicio de los estados para evitar los errores de superposición de datos
    dispatch(reset_states());
  }, []);

  return (
    <>
      {/* Parte 1 */}
      {/* busqueda de cdd's para homologación y puesta de ccd y organigrama */}
      <Parte1Screen />
      {/* Parte 2 */}
      {/* Selección de secciones persistentes */}
      <SelSeccionesPerScreen />
      {/* Parte 3 */}
      {/* Selección de series documentales persistentes del CCD */}
      <SelSerDocPersistentesScreen />
      {/* Acciones */}
      <AccionesLoad />
    </>
  );
};
