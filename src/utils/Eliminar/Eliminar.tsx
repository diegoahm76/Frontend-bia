/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import type React from 'react';
import Swal from 'sweetalert2';
import { control_error, control_success } from '../../helpers';
import DeleteIcon from '@mui/icons-material/Delete';
import './styles.css';
import { LoadingButton } from '@mui/lab';

interface DeleteButtonProps {
  id: number;
  confirmationMessage?: string;
  successMessage?: string;
  Disabled: boolean;
  deleteFunction: (id: number) => Promise<void>;
  fetchDataFunction: (id: number) => Promise<void>;
}

export const ButtonEliminar: React.FC<DeleteButtonProps> = ({
  id,
  confirmationMessage = '¿Estás seguro de eliminar este elemento?',
  successMessage = 'El elemento se eliminó correctamente',
  Disabled = false,
  deleteFunction,
  fetchDataFunction,
}) => {
  const confirmar_eliminar = (idToDelete: number): void => {
    void Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: confirmationMessage,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteFunction(idToDelete);
          await fetchDataFunction(idToDelete);
          control_success(successMessage);
        } catch (error: any) {
          control_error(error.response?.data?.detail || 'Error al eliminar.');
        }
      }
    });
  };

  return (
    <LoadingButton
      size="small"
      onClick={() => {
        confirmar_eliminar(id);
      }}
      loadingPosition="start"
      startIcon={<DeleteIcon />}
      variant="outlined"
      loading={false}
      disabled={Disabled}
      color="error"
    >
      Eliminar
    </LoadingButton>
  );
};
