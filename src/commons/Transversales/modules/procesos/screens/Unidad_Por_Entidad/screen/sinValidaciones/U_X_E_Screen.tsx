/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
// import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { ProcesoARealizar } from '../../Atoms/ProcesoARealizar/ProcesoARealizar';
import { CleanData } from '../../components/CleanData/CleanData';

export const U_X_E_Screen: FC = (): JSX.Element => {
  //* context declarations
  const { loadingConsultaT026 } = useContext(ContextUnidadxEntidad);


  if (loadingConsultaT026) {
    return <Loader />;
  }

  return (
    <>
      {/*  hay dos posibles escenarios, se van a dividir los componentes o cambiar funcionamiento dependiendo el escenario que se está presentando  */}

      {/*  componente presente en ambos escenarios */}
      <ProcesoARealizar />

      {/* cleand all data for the app, algunos de los valores deben aparecer dependiendo el funcionamiento de la app */}
      <CleanData />
    </>
  );
};
