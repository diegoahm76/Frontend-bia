
import {RecuperarContraseña} from '../components/RecuperarContraseñaForm';
import { AuthLayout } from '../layouts/AuthLayout';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RecuperarContraseñaScreen: React.FC = () => {
  return (
    <AuthLayout>
      < RecuperarContraseña/>
    </AuthLayout>
  );
};
