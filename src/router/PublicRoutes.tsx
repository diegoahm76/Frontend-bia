import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { type AuthSlice } from '../commons/auth/interfaces';

interface Props {
  children: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PublicRoutes: React.FC<Props> = ({ children }: Props) => {
  const { status } = useSelector((state: AuthSlice) => state.auth);

  return status === 'not-authenticated' || status === 'checking' ? (
    children
  ) : (
    <Navigate to={'/app/home'} />
  );
};
