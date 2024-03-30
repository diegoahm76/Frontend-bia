import { useSelector } from 'react-redux';
import { Pantalla } from '../portada/Pantalla';
import { AuthSlice } from '../../auth/interfaces/authModels';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HomeScreen: React.FC = () => {
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  console.log(userinfo);
  return <Pantalla />;
};
