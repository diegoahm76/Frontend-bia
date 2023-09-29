/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { AccionesLoad } from '../components/final/screen/Acciones.load';
import { Parte1Screen } from '../components/parte1/screen/Parte1Screen';
import { validacionInicialCCD } from '../toolkit/thunks/ccdOrganigrama.service';
import { useNavigate } from 'react-router-dom';
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

  useEffect(() => {
    console.log('se realiza ingreso al módulo');
    void validacionInicialCCD(navigate);
  }, []);

  return (
    <>
      {/* Parte 1 */}
      {/* busqueda de cdd's para homologación y puesta de ccd y organigrama */}
      <Parte1Screen />
      {/* Parte 2 */}
      {/* Parte 3 */}
      {/* Acciones */}
      <AccionesLoad />
    </>
  );
};
