/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type FC, useEffect } from 'react';
import { ContextUnidadxEntidad } from '../context/ContextUnidadxEntidad';
import { ModalHistoricoTraslados } from '../components/ModalHistoricoTraslado/screen/ModalHistoricoTraslados';
import { useNavigate } from 'react-router-dom';

export const ScreenUxE: FC = (): JSX.Element => {
  // const [T026TieneResgistro, setT026TieneResgistro] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    if (true) {
      navigate(
        '/app/transversal/procesos/traslado_masivo_unidad_organizacional/validaciones/'
      );
    }
  }, []); //* se deja inicialmente cada vez que entre al modulo, pero se debe determinar que condición para que los datos entre cambio de modulo se limpien y así haya un correcto funcionaiento de la aplicación sin datos almacenados en el cache para que fluya el código

  const { handleModalHistoricos } = useContext(ContextUnidadxEntidad);

  return (
    <div>
      <button
        onClick={() => {
          handleModalHistoricos();
        }}
      >
        Open Modal historivos
      </button>

      <ModalHistoricoTraslados />
    </div>
  );
};
