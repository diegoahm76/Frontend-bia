import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import BussinessIcon from '@mui/icons-material/Business';
import {
  Avatar,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { type AuthSlice } from '../interfaces/authModels';
import { useDispatch, useSelector } from 'react-redux';
import { DialogRepresentantes } from './DialogRepresentantes';
import {
  change_entorno,
  close_dialog_entorno,
  get_persmisions_user,
  logout,
  open_dialog_representado,
  set_authenticated,
} from '../store';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogEntorno: React.FC = () => {
  const { open_dialog, userinfo } = useSelector(
    (state: AuthSlice) => state.auth
  );

  const dispatch = useDispatch();

  const handle_close = (): void => {
    dispatch(close_dialog_entorno());
    dispatch(logout(''));
  };

  const set_entorno = (value: string): void => {
    dispatch(change_entorno(value));
    dispatch(get_persmisions_user(userinfo.id_usuario, value));

    if (value === 'C') {
      dispatch(open_dialog_representado());
    } else {
      dispatch(set_authenticated());
    }
  };

  return (
    <Dialog onClose={handle_close} open={open_dialog}>
      <DialogTitle
        textAlign="center"
        fontSize={14}
        bgcolor={'primary.main'}
        color="#FFFF"
        variant="subtitle1"
        sx={{ padding: '10px' }}
      >
        Seleccione el entorno a usar
      </DialogTitle>
      <List sx={{ padding: 2 }}>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => {
              set_entorno('C');
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Ciudadano" />
          </ListItemButton>
          <ListItemButton
            autoFocus
            onClick={() => {
              set_entorno('L');
            }}
          >
            <ListItemAvatar>
              <Avatar>
                <BussinessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Laboral" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* Dialog Representados */}
      <DialogRepresentantes />
    </Dialog>
  );
};
