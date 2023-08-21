/* eslint-disable @typescript-eslint/naming-convention */
// import { useContext, useEffect } from 'react';
/* import { consultarTablaTemporal } from '../toolkit/UxE_thunks/UxE_thunks';
import { ContextUnidadxEntidad } from '../context/ContextUnidadxEntidad';
import { useNavigate } from 'react-router-dom';
import { navigateToRoute } from '../toolkit/UxE_thunks/chooseUrlThunks';
import { useAppDispatch } from '../../../../../../../hooks'; */
import { useForm } from 'react-hook-form';

export const use_u_x_entidad = (): any => {
  //* ------- REDUX ------- *//
  // const dispatch = useAppDispatch();

  //* ------- LLAMADO AL CONTEXT ------- *//
  // const { setloadingConsultaT026 } = useContext(ContextUnidadxEntidad);

  //* ------- NAVEGACION ------- *//
  // const navigate = useNavigate();

  /*  useEffect(() => {
    console.log('use_u_x_entidad');
    void consultarTablaTemporal(setloadingConsultaT026).then((res: any) => {
      console.log('use_u_x_entidad');
      console.log(res);
      //* deberé asignar los valores que traiga esa T026 para asi tomar otra decision y asignar algunos valores a los formularios

      dispatch<any>(navigateToRoute(res?.success, navigate));
    });
  }, []); */

  // ! -------------------------- USE FORM NECESARIOS PARA EL FUNCIONAMIENTO DE LA APP -------------------------- //

  const {
    control: control_opciones_traslado,
    handleSubmit: handleSubmit_opciones_traslado,
    reset: reset_opciones_traslado,
    watch: watch_opciones_traslado
  } = useForm({
    defaultValues: {
      opciones_traslado: {
        value: '',
        label: ''
      }
    }
  });

  const values_watch_opciones_traslado = watch_opciones_traslado();

  return {
    //* ------ elementos para el control de las opciones de traslado masivo ------ *//
    control_opciones_traslado,
    handleSubmit_opciones_traslado,
    reset_opciones_traslado,
    values_watch_opciones_traslado
  };
};
