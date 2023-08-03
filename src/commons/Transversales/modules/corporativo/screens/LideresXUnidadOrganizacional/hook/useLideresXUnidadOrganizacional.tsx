/* eslint-disable @typescript-eslint/naming-convention */
// import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
// import { get_organigrama_actual_lideres_screen_service } from '../toolkit/LideresThunks/OrganigramaLideresThunks';
// import { useAppDispatch } from '../../../../../../../hooks';

interface LideresXUnidadOrganizacional {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export const useLideresXUnidadOrganizacional = ():
  | LideresXUnidadOrganizacional
  | any => {

    //* dispatch
   //  const dispatch = useAppDispatch();


  // ! -------- USE FORM DECLARATIONS -------- ! //

  const {
    control: control_organigrama_lideres_por_unidad,
    // handleSubmit: handleSubmit_organigrama_lideres_por_unidad,
    //  formState: formState_organigrama_lideres_por_unidad,
    reset: reset_organigrama_lideres_por_unidad,
    watch: watch_organigrama_lideres_por_unidad
  } = useForm<LideresXUnidadOrganizacional | any>({
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      descripcion: '',
      fecha_puesta_produccion: '',
      actual: false
    }
  });
  const watch_organigrama_lideres_por_unidad_value =
    watch_organigrama_lideres_por_unidad();
  // console.log(watch_organigrama_lideres_por_unidad_value); */

  // ! ----------- USE EFFECTS THAT I'LL USE IN COMPONENTS ----------- ! //


  return {
    // ? -------- USE FORM DECLARATIONS -------- ? //

    //* 1 . organigrama lideres por unidad
    control_organigrama_lideres_por_unidad,
    watch_organigrama_lideres_por_unidad,
    reset_organigrama_lideres_por_unidad,
    watch_organigrama_lideres_por_unidad_value
  };
};
