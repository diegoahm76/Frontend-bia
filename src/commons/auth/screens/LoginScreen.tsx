// import logo_bia from '.../../../assets/logos/logo_bia.png';
import { LoginForm } from '../components/LoginForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const LoginScreen: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
