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
    watch: watch_organigrama_lideres_por_unidad,
  } = useForm<LideresXUnidadOrganizacional | any>({
    mode: 'onChange',
    defaultValues: {
      nombre: '',
      version: '',
      actual: false,
      descripcion: '',
      fecha_puesta_produccion: '',
    } as any,
  });
  const watch_organigrama_lideres_por_unidad_value =
    watch_organigrama_lideres_por_unidad();
  //  //  console.log('')(watch_organigrama_lideres_por_unidad_value);

  // * -------------- USE FORM SELECCIONAR LIDERES PART -------------- * //

  // ? -------- USE FORM DECLARATIONS -------- ? //

  const {
    control: control_seleccionar_lideres,
    reset: reset_seleccionar_lideres,
    watch: watch_seleccionar_lideres,
  } = useForm({
    defaultValues: {
      tipo_documento: '',
      numero_documento: '',
      nombre_persona: '',
      id_persona: '',
      observaciones_asignacion: '',
      id_unidad_organizacional: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      unidad: '',
    } as any,
  });

  const watch_seleccionar_lideres_value = watch_seleccionar_lideres();
  // //  console.log('')(watch_seleccionar_lideres_value);

  // ? use Form to search leader asignations by organizational unit

  // ! ----------- USE EFFECTS THAT I'LL USE IN COMPONENTS ----------- ! //

  // ? ----- use effect after select searched organigramas to put the data into the main inputs ----- ! //

  return {
    // ? -------- USE FORM DECLARATIONS -------- ? //

    //* 1 . organigrama lideres por unidad
    control_organigrama_lideres_por_unidad,
    watch_organigrama_lideres_por_unidad,
    reset_organigrama_lideres_por_unidad,
    watch_organigrama_lideres_por_unidad_value,

    //* 2 . seleccionar lideres
    control_seleccionar_lideres,
    watch_seleccionar_lideres_value,
    reset_seleccionar_lideres,
  };
};
