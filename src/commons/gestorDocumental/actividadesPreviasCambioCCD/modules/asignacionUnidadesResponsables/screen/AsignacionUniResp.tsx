/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AccionesLoad } from '../components/final/screen/Acciones.load';
import { Parte1Screen } from '../components/parte1/screen/Parte1ScreenAsignacionUnResp';
import { validacionInicialCcdAsignacionUnidadesResp } from '../toolkit/thunks/busquedaOrgCcd.service';
import { Parte2Screen } from '../components/parte2/screen/Parte2Screen';
import { ListadoAsigScreen } from '../components/parte3/screen/ListadoAsigScreen';
import { resetStateUniResp } from '../toolkit/slice/types/AsignacionUniResp';
import { useAppDispatch } from '../../../../../../hooks';
/**
 * Pantalla principal módulo asignación unidades responsables
 * @returns JSX.Element
 */
export const AsignacionUnidadesResponsables = (): JSX.Element => {
  //* navigate declaration
  const navigate = useNavigate();
  //* dispatch declaration
  const dispatch = useAppDispatch()

  useEffect(() => {
    /*
    se realizan dos validaciones iniciales:
    1. Que haya un ccd actual
    2. Que haya un ccd diferente al actual que no haya salido de producción
    */
    void validacionInicialCcdAsignacionUnidadesResp(navigate);
    // ? revisar si se debe hacer el reinicio de los estados para evitar los errores de superposición de datos
    dispatch(resetStateUniResp());
  }, []);

  return (
    <>
      {/* Parte 1 */}
      {/* busqueda de cdd's para homologación y puesta de ccd y organigrama, y de grid de secciones que persistirán en un nuevo CCD */}
      {/* Secciones que persisterán en CCD nuevo*/}
      <Parte1Screen />
      {/* Parte 2 */}
      <>
        {/* Selección de series responsables del ccd nuevo sobre las series
        documentales de secciones del CCD actual */}
        <Parte2Screen />
      </>
      {/* Parte 3 */}
      {/* Listado de asignaciones */}
      <ListadoAsigScreen />
      {/* Acciones */}
      <AccionesLoad />
    </>
  );
};
