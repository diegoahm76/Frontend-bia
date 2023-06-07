import { Route, Routes } from 'react-router-dom';
import { Notificaciones } from '../screens/Notificaciones';
import { RecepcionFisica } from '../screens/RecepcionFisica';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<Notificaciones />} />
      <Route path='/recepcion' element={<RecepcionFisica />} />
    </Routes>
  )
}
