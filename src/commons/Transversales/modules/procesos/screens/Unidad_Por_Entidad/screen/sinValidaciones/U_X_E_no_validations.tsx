/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC } from 'react';
import { ContextUnidadxEntidad } from '../../context/ContextUnidadxEntidad';
import { useNavigate } from 'react-router-dom';
import { use_u_x_entidad } from '../../hooks/use_u_x_entidad';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { ProceoARealizar } from '../../Atoms/ProcesoARealizar/ProcesoARealizar';
// import { use_u_x_entidad } from '../hooks/use_u_x_entidad';
// import { consultarTablaTemporal } from '../toolkit/UxE_thunks/UxE_thunks';

export const U_X_E_no_validations: FC = (): JSX.Element => {
  // const [T026TieneResgistro, setT026TieneResgistro] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hookInicial = use_u_x_entidad();

  //* context declarations
  const { loadingConsultaT026 } = useContext(ContextUnidadxEntidad);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  if (loadingConsultaT026) {
    return <Loader />;
  }

  return (
    <>
      <ProceoARealizar />
    </>
  );
};
