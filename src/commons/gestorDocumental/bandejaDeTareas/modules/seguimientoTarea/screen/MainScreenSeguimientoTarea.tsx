/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from 'react';
import { useAppSelector } from '../../../../../../hooks';
import { InfoTareaSeguimiento } from '../components/infoTareaSeguimiento/InfoTareaSeguimiento';
import { SeguimientoReasignacionTar } from '../components/seguimientoTareaHistory/SeguimientoReasignacionTar';
import { useNavigate } from 'react-router-dom';
import { SeguimientoRespuestaTarea } from '../components/seguimientoRespuestaTarea/SeguimientoRespuestaTarea';

export const MainScreenSeguimientoTarea = (): JSX.Element => {
  //* redux states
  const currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = useAppSelector(
    (state) =>
      state.BandejaTareasSlice
        .currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas) {
      navigate('/app/gestor_documental/bandeja_tareas/');
    }
  }, [currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas]);

  return (
    <>
      {/*Información relacionada a la tareas que se le hace seguimiento*/}
      <InfoTareaSeguimiento />
      {/*Acciones finales para la tarea*/}
      <SeguimientoReasignacionTar />
      {/*respuesta de la tarea*/}
      <SeguimientoRespuestaTarea/>
    </>
  );
};
