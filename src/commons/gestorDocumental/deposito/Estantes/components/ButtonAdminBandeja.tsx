import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ButtonAdminBandeja: React.FC = () => {
  const navigate = useNavigate();

  const confirmar_admin_bandeja = (): void => {
    void Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro?, al salir de la página puede perder información.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/app/gestor_documental/archivo/bandejas', {
          replace: true,
        });
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
