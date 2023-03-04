import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { type AuthSlice } from '../commons/auth/interfaces';
import { MainLayout } from '../layouts/MainLayout';

interface Props {
  children: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrivateRoutes: React.FC<Props> = ({ children }: Props) => {
  const { status } = useSelector((state: AuthSlice) => state.auth);

  return status === 'not-authenticated' ? (
    <MainLayout>{children}</MainLayout>
  ) : (
    <Navigate to={'/auth/login'} />
  );
};
