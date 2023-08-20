/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect } from 'react';
import { consultarTablaTemporal } from '../toolkit/UxE_thunks/UxE_thunks';
import { ContextUnidadxEntidad } from '../context/ContextUnidadxEntidad';
import { useNavigate } from 'react-router-dom';
import { navigateToRoute } from '../toolkit/UxE_thunks/chooseUrlThunks';
import { useAppDispatch } from '../../../../../../../hooks';

export const use_u_x_entidad = (): any => {

  //* ------- REDUX ------- *//
  const dispatch = useAppDispatch();

  //* ------- LLAMADO AL CONTEXT ------- *//
  const { setloadingConsultaT026 } = useContext(ContextUnidadxEntidad);

  //* ------- NAVEGACION ------- *//
  const navigate = useNavigate();

  useEffect(() => {
    console.log('use_u_x_entidad');
    void consultarTablaTemporal(setloadingConsultaT026).then((res: any) => {
      console.log('use_u_x_entidad');
      console.log(res);
      //* deberé asignar los valores que traiga esa T026 para asi tomar otra decision y asignar algunos valores a los formularios


      dispatch<any>(navigateToRoute(res?.success, navigate));
    });
  }, []);

  return {};
};
