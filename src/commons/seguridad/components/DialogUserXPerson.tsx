import type { Dispatch, SetStateAction } from 'react';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import type { UsersXPerson } from '../interfaces';

interface Props {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  users_x_person: UsersXPerson[];
  OnIdUser: (id_user: number) => void;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogUserXPerson = ({
  is_modal_active,
  set_is_modal_active,
  users_x_person,
  OnIdUser,
}: Props) => {
  const handle_close_busqueda_avanzada = (): void => {
    set_is_modal_active(false);
  };

  return (
    <Dialog onClose={handle_close_busqueda_avanzada} open={is_modal_active}>
      <DialogTitle
        textAlign="center"
        fontSize={14}
        bgcolor={'primary.main'}
        color="#FFFF"
        variant="subtitle1"
        sx={{ padding: '10px' }}
      >
        Seleccione usuario a editar
      </DialogTitle>
      <List sx={{ padding: 2 }}>
        <ListItem disableGutters>
          {users_x_person.map((user, index) => (
            <>
              <ListItemButton
                key={index}
                autoFocus
                onClick={() => {
                  OnIdUser(user.id_usuario);
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.nombre_de_usuario} />
              </ListItemButton>
            </>
          ))}
        </ListItem>
      </List>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogUserXPerson;
