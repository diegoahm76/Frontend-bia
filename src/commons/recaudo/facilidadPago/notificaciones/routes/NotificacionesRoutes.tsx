import { Route, Routes } from 'react-router-dom';
import { Notificaciones } from '../screens/Notificaciones';
import { RecepcionFisica } from '../screens/RecepcionFisica';
import { CreacionNotificacion } from '../screens/CreacionNotificacion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificacionesRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/*' element={<Notificaciones />} />
      <Route path='/recepcion' element={<RecepcionFisica />} />
      <Route path='/creacion' element={<CreacionNotificacion />} />
    </Routes>
  )
}
