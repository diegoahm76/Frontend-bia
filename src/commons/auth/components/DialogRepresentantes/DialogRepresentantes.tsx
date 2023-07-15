/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  DialogTitle,
  Typography,
  ListItemIcon
} from '@mui/material';
import {
  close_dialog_representado,
  set_authenticated,
  set_representado
} from '../../store';
import { type AuthSlice } from '../../interfaces';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogRepresentantes: React.FC = () => {
  const dispatch = useDispatch();
  const { dialog_representante, representante_legal } = useSelector(
    (state: AuthSlice) => state.auth
  );

  const select_representado = (value: string): void => {
    dispatch(set_representado(value));
    dispatch(set_authenticated());
    // dispatch(close_dialog_representado());
  };

  return (
    <>
      <Dialog
        open={dialog_representante}
        onClose={() => dispatch(close_dialog_representado())}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          textAlign="center"
          fontSize={14}
          bgcolor={'#042F4A'}
          color="#FFFF"
          variant="subtitle1"
          sx={{ padding: '10px' }}
        >
          <Typography>Seleccione a quien representará</Typography>
        </DialogTitle>
        <List>
          {representante_legal.length > 0 ? (
            <>
              <ListItem disableGutters alignItems="center">
                <ListItemButton
                  autoFocus
                  onClick={() => {
                    select_representado('Nombre propio');
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nombre propio" />
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters alignItems="center">
                <ListItemButton
                  autoFocus
                  onClick={() => {
                    select_representado('Nombre propio');
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="En representación de una empresa" />
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters alignItems="center">
                <ListItemButton
                  autoFocus
                  onClick={() => {
                    select_representado('Nombre propio');
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="En representación de una persona" />
                </ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem disableGutters alignItems="center">
                <ListItemButton
                  autoFocus
                  onClick={() => {
                    select_representado('Nombre propio');
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="Nombre propio" />
                </ListItemButton>
              </ListItem>
              <ListItem disableGutters alignItems="center">
                <ListItemButton
                  autoFocus
                  onClick={() => {
                    select_representado('Nombre propio');
                  }}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="En representación de una persona" />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Dialog>
    </>
  );
};
*/

import PersonIcon from '@mui/icons-material/Person';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  DialogTitle,
  Typography,
  ListItemIcon
} from '@mui/material';
import {
  close_dialog_representado,
  set_authenticated,
  set_representado
} from '../../store';
import { type AuthSlice } from '../../interfaces';

export const DialogRepresentantes: React.FC = () => {
  const dispatch = useDispatch();
  const { dialog_representante, representante_legal } = useSelector(
    (state: AuthSlice) => state.auth
  );

  const options = [
    { label: 'Nombre propio', value: 'Nombre propio' },
    { label: 'En representación de una empresa', value: 'Nombre propio' },
    { label: 'En representación de una persona', value: 'Nombre propio' }
  ];

  const select_representado = (value: string): void => {
    dispatch(set_representado(value));
    dispatch(set_authenticated());
  };

  return (
    <Dialog
      open={dialog_representante}
      onClose={() => dispatch(close_dialog_representado())}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle
        textAlign="center"
        fontSize={14}
        bgcolor={'#042F4A'}
        color="#FFFF"
        variant="subtitle1"
        sx={{ padding: '10px' }}
      >
        <Typography>Seleccione a quien representará</Typography>
      </DialogTitle>
      <List>
        {representante_legal.length > 0
          ? options.map((option) => (
              <ListItem key={option.label} disableGutters alignItems="center">
                <ListItemButton
                  autoFocus
                  onClick={() => select_representado(option.value)}
                >
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={option.label} />
                </ListItemButton>
              </ListItem>
            ))
          : options
              .filter(
                (option) => option.label !== 'En representación de una empresa'
              )
              .map((option) => (
                <ListItem key={option.label} disableGutters alignItems="center">
                  <ListItemButton
                    autoFocus
                    onClick={() => select_representado(option.value)}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary={option.label} />
                  </ListItemButton>
                </ListItem>
              ))}
      </List>
    </Dialog>
  );
};
