/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/naming-convention */
import { /* useContext */ type FC, lazy } from 'react';
// import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
// import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
// import { Loader } from '../../../../../../../../utils/Loader/Loader';

import { useAppSelector } from '../../../../../../../../hooks';
import { ActualANuevo } from '../../Atoms/ActualANuevo/ActualANuevo';

const ProcesoARealizar = lazy(async () => {
  const module = await import('../../Atoms/ProcesoARealizar/ProcesoARealizar');
  return { default: module.ProcesoARealizar };
});

const CleanData = lazy(async () => {
  const module = await import('../../components/CleanData/CleanData');
  return { default: module.CleanData };
});

export const U_X_E_Screen: FC = (): JSX.Element => {
  const { controlModoTrasladoUnidadXEntidad } = useAppSelector(
    (state) => state.u_x_e_slice
  );

  return (
    <>
      {/*  hay dos posibles escenarios, se van a dividir los componentes o cambiar funcionamiento dependiendo el escenario que se está presentando  */}

      {/*  componente presente en ambos escenarios */}
      <ProcesoARealizar />


      {/*
        caso # 1:
        1.1 modo_entrada_sin_validacion_organigrama_actual_a_nuevo
        1.2. en este opción también se puede ingresar de manera por default cuando cuando existan algunas validaciones
      */}

      {controlModoTrasladoUnidadXEntidad ===
        'modo_entrada_con_validacion_organigrama_actual_a_nuevo' ? (
        <ActualANuevo/>
      ): null}

      {controlModoTrasladoUnidadXEntidad ===
        'modo_entrada_con_validacion_organigrama_anterior_a_actual' && (
        <div>modo_entrada_con_validacion_organigrma_ANTERIOR_a_nuevo</div>
      )}

      {/* cleand all data for the app, algunos de los valores deben aparecer dependiendo el funcionamiento de la app */}
      <CleanData />
    </>
  );
};
