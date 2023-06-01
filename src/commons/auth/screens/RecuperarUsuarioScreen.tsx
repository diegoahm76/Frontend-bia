import { RecuperarUsuarioForm } from '../components/RecuperarUsuarioForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecuperarUsuario: React.FC = () => {
  return (
    <AuthLayout>
      <RecuperarUsuarioForm />
    </AuthLayout>
  );
};
