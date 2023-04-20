import { Route, Routes } from 'react-router-dom';
import { ObligacionesUsuario } from '../screens/ObligacionesUsuario';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FacilidadPagoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='registro' element={<ObligacionesUsuario />} />
    </Routes>
  )
}
