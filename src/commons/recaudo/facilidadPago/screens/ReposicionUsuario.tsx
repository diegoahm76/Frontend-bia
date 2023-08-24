import { Title } from '../../../../components/Title';
import { RegistroReposicionUsuario } from '../componentes/RegistroReposicionUsuario';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ReposicionUsuario: React.FC = () => {

  return (
    <>
      <Title title='Recurso de Reposición - Usuario Externo'/>
      <RegistroReposicionUsuario />
    </>
  )
}
