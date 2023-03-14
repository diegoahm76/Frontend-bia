import {DesbloqueodeUsuario} from '../components/DesbloqueoDeUsuarioForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-redeclare, no-import-assign, @typescript-eslint/no-unused-vars
export const DesbloqueoDeUsuarioScreen: React.FC = () => {
  return (
    <AuthLayout>
    <DesbloqueodeUsuario/>
    </AuthLayout>
  );
};
