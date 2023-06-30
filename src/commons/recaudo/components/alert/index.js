/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import { Snackbar, Alert } from '@mui/material';

export function TransitionAlerts(props) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.setNotifications({ open: false, message: '' });
  };

  const severity = props.configNotify.type;

  return (
    <Snackbar
      open={props.configNotify.open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert severity={severity} onClose={handleClose}>
        {props.configNotify.message ?? ''}
      </Alert>
    </Snackbar>
  );
}