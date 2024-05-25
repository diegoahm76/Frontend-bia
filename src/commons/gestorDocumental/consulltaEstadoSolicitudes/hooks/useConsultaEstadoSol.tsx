/* eslint-disable @typescript-eslint/naming-convention */
import { useForm } from 'react-hook-form';
import { control } from 'leaflet';

const useConsultaEstadoSol = () => {
  const {
    control: control_consulta_estado_sol,
    watch: watch_consulta_estado_sol,
    reset: reset_consulta_estado_sol,
  } = useForm();

  const EXE_CONSULTA_ESTADO_SOL = watch_consulta_estado_sol();

  return {
    control_consulta_estado_sol,
    reset_consulta_estado_sol,
    EXE_CONSULTA_ESTADO_SOL,
  };
};


export {
  useConsultaEstadoSol,
}