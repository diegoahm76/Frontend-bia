import { type Dispatch, type SetStateAction } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface IProps {
  open_notification_modal: boolean;
  set_open_notification_modal: Dispatch<SetStateAction<boolean>>;
  notification_info: {
    type: string;
    message: string;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NotificationModal = ({ open_notification_modal, set_open_notification_modal, notification_info }: IProps): JSX.Element => {

  const handle_close = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    set_open_notification_modal(false);
  };

  const get_icon = (type: string): JSX.Element => {
    if (type === 'info') {
      return <InfoIcon color='info' fontSize='large' />;
    }
    if (type === 'warning') {
      return <WarningIcon color='warning' fontSize='large' />;
    }
    if (type === 'error') {
      return <ErrorIcon color='error' fontSize='large' />;
    }
    if (type === 'success') {
      return <CheckCircleIcon color='success' fontSize='large' />;
    }

    return <></>;
  };

  const get_title_name = (type: string): string => {
    if (type === 'info') {
      return 'INFORMACIÓN';
    }
    if (type === 'warning') {
      return 'ADVERTENCIA';
    }
    if (type === 'error') {
      return 'ERROR';
    }
    if (type === 'success') {
      return 'ÉXITO';
    }
    return '';
  };

  const get_title = (type: string): JSX.Element => {
    return (
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          fontSize: '1.7em',
        }}
      >
        {get_icon(type)} {get_title_name(type)}
      </DialogTitle>
    );
  };

  return (
    <Dialog
      open={open_notification_modal}
      onClose={set_open_notification_modal}
      fullWidth={true}
      maxWidth='xs'
    >
      {get_title(notification_info.type)}
      <DialogContent dividers>
        <DialogContentText
          sx={{
            fontSize: '1.2em',
          }}
        >
          {notification_info.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='contained' color='primary' onClick={handle_close}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};