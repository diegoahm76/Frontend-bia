import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ClearIcon from '@mui/icons-material/Clear';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const ButtonSalir: React.FC = () => {
  const navigate = useNavigate();

  const confirmar_salir = (): void => {
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
        navigate('/app/home');
      }
    });
  };

  return (
    <LoadingButton
      variant="contained"
      color="error"
      fullWidth
      onClick={confirmar_salir}
      startIcon={<ClearIcon />}
    >
      Salir
    </LoadingButton>
  );
};