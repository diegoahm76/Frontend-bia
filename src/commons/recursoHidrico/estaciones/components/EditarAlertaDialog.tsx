import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarAlertaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {

  const handle_close = (): void => {
    set_is_modal_active(false);
  }

  return (
    <Dialog open={is_modal_active} onClose={handle_close}>
      <DialogTitle>Crear Estación</DialogTitle>
      <DialogContent>
        <div>Aquí va el contenido del diálogo</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handle_close}>Cancelar</Button>
        <Button variant="contained" color="primary" onClick={handle_close}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
