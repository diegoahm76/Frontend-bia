import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { type Dispatch, type SetStateAction } from "react";
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

interface IProps {
  open_requisitos_modal: boolean;
  set_open_requisitos_modal: Dispatch<SetStateAction<boolean>>;
  requisitos: string;
  mover_estado_actual: () => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RequisitosModal = ({ open_requisitos_modal, set_open_requisitos_modal, requisitos, mover_estado_actual }: IProps): JSX.Element => {

  const handle_close = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    set_open_requisitos_modal(false);
  };

  return (
    <Dialog
      open={open_requisitos_modal}
      onClose={set_open_requisitos_modal}
      fullWidth={true}
      maxWidth='sm'
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: '1.7em',
        }}
      >
        <WarningIcon color="warning" sx={{ mr: '5px' }} /> ¿Está seguro de mover el estado actual?
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          sx={{
            fontSize: '1.2em',
          }}
        >
          Requisitos:
          <br />
          {requisitos}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant='outlined'
          startIcon={<CloseIcon />}
          onClick={handle_close}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CheckIcon />}
          onClick={(event) => {
            mover_estado_actual();
            handle_close(event);
          }}
        >
          Mover
        </Button>
      </DialogActions>
    </Dialog>
  );
};