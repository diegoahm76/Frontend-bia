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
  ListItemIcon,
} from '@mui/material';
import {
  close_dialog_representado,
  set_authenticated,
  set_representado,
} from '../store';
import { type AuthSlice } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogRepresentantes: React.FC = () => {
  const dispatch = useDispatch();
  const { dialog_representante } = useSelector(
    (state: AuthSlice) => state.auth
  );

  const select_representado = (value: string): void => {
    dispatch(set_representado(value));
    dispatch(set_authenticated());
    // dispatch(close_dialog_representado());
  };

  return (
    <>
      {/* Dialog para selección de entorno */}
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
        </List>
      </Dialog>
    </>
  );
};
