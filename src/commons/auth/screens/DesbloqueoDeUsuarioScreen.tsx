import { DesbloqueodeUsuario } from '../components/DesbloqueoDeUsuarioForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DesbloqueoDeUsuarioScreen: React.FC = () => {
  return (
    <AuthLayout>
      <DesbloqueodeUsuario />
    </AuthLayout>
  );
};
