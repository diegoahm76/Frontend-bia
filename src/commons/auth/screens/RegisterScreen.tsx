import { RegisterForm } from '../components/RegisterForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterScreen: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm uso_interno={true} />
    </AuthLayout>
  );
};
