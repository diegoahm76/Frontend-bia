import { CambiarContrasena } from '../components/CambiarContrasenaForm/CambiarContrasenaForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CambiarContrasenaScreen: React.FC = () => {
  return (
    <AuthLayout>
      <CambiarContrasena />
    </AuthLayout>
  );
};
