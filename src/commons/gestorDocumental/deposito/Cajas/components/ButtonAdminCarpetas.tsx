/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ButtonAdminCarpetas: React.FC = () => {
  const navigate = useNavigate();

  const confirmar_admin_bandeja = (): void => {
    void Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro de ir a la ventana de administración de carpetas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(
          '/app/gestor_documental/configuracion_datos_basicos/archivo/administrar_carpetas',
          {
            replace: true,
          }
        );
      }
    });
  };

  return (
    <LoadingButton
      variant="outlined"
      color="warning"
      onClick={confirmar_admin_bandeja}
    >
      Administrar bandejas
    </LoadingButton>
  );
};
