import { LoadingButton } from '@mui/lab';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DataContext } from '../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ButtonInstrumentos: React.FC = () => {
  const navigate = useNavigate();
  const { set_mode } = useContext(DataContext);
  const confirmar_ir_instruemntos = (): void => {
    void Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¡Desea ir a la ventana de gestión de instrumentos de Biblioteca?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/app/recurso_hidrico/instrumentos/instrumentos', {
          replace: true,
        });
      }
    });
  };

  return (
    <LoadingButton
      variant="contained"
      color="primary"
      onClick={() => {
        set_mode('register_instrumento');
        confirmar_ir_instruemntos();
      }}
    >
      Volver a instrumentos
    </LoadingButton>
  );
};
