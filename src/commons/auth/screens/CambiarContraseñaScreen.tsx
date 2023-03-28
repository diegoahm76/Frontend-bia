import { CambiarContraseña } from '../components/CambiarContraseñaForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CambiarContraseñaScreen: React.FC = () => {
  return (
    <AuthLayout>
      <CambiarContraseña />
    </AuthLayout>
  );
};
