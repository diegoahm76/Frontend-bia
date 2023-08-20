/* eslint-disable @typescript-eslint/naming-convention */
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import { useContext } from 'react';
import { Loader } from '../../../../../../../../utils/Loader/Loader';

export const U_X_E_si_validaciones = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hookInicial = use_u_x_entidad();

  const { loadingConsultaT026 } = useContext(ContextUnidadxEntidad);

  if (loadingConsultaT026) {
    return <Loader />;
  }

  return <div>Validacionesssssss</div>;
};
