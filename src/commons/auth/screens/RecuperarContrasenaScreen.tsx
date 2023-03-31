import { RecuperarContrasena } from '../components/RecuperarContrasenaForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecuperarContrasenaScreen: React.FC = () => {
  return (
    <AuthLayout>
      <RecuperarContrasena />
    </AuthLayout>
  );
};
