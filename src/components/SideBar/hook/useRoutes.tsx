/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { useNavigate } from 'react-router-dom';

export const useRoutes = (): any => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const handle_click_delegar_super = () =>
    navigate('/app/seguridad/delegacion_superusuario');

  const handle_datos_acceso = () => navigate('/app/usuario/datos_acceso');

  const handle_datos_personales = () =>
    navigate('/app/usuario/datos_personales');

  const handle_autorizacion_notificacion = () =>
    navigate('/app/usuario/autorizacion_notificacion');

  const handleBiaGpt = () => navigate('/app/usuario/chat/bia_gpt');


  return {
    handle_click_delegar_super,
    handle_datos_acceso,
    handle_datos_personales,
    handle_autorizacion_notificacion,
    handleBiaGpt,
  };
};
