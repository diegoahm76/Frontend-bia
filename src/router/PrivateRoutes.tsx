import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { type AuthSlice } from '../commons/auth/interfaces';

interface Props {
  children: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PrivateRoutes: React.FC<Props> = ({ children }: Props) => {
  const { status } = useSelector((state: AuthSlice) => state.auth);

  return status === 'authenticated' ? (
    children
  ) : (
    <Navigate to={'/auth/login'} />
  );
};
