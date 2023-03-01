import React, { type Dispatch, type SetStateAction } from 'react';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_organigrams_service } from '../store/thunks/organigramThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks/hooks';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
  nombre: string;
  version: string;
  descripcion: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearItemOrganigramaModal = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [organigrama_data, set_organigrama_data] = React.useState<FormValues>({
    nombre: '',
    version: '',
    descripcion: '',
  });

  const handle_data_organigram = (e: {
    target: { name: any; value: any };
  }): void => {
    set_organigrama_data({
      ...organigrama_data,
      [e.target.name]: e.target.value,
    });
  };

  const handle_submit = (e: { preventDefault: () => void }): void => {
    e.preventDefault();
    void dispatch(add_organigrams_service(organigrama_data, navigate));
    console.log(organigrama_data);
  };

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  return (
    <>
      <Dialog
        maxWidth="xs"
        open={is_modal_active}
        onClose={handle_close_crear_organigrama}
      >
        <Box component="form" onSubmit={handle_submit}>
          <DialogTitle>Crear organigrama</DialogTitle>
          <Divider />
          <DialogContent sx={{ mb: '0px' }}>
            <TextField
              required
              autoFocus
              fullWidth
              type="text"
              name="nombre"
              margin="dense"
              size="small"
              label="Nombre"
              onChange={handle_data_organigram}
            />
            <TextField
              autoFocus
              margin="dense"
              name="version"
              label="Versión"
              required
              type="text"
              fullWidth
              size="small"
              onChange={handle_data_organigram}
            />
            <TextField
              autoFocus
              margin="dense"
              name="descripcion"
              label="Descripción"
              required
              type="text"
              fullWidth
              size="small"
              onChange={handle_data_organigram}
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="outlined"
                onClick={handle_close_crear_organigrama}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
              >
                GUARDAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearItemOrganigramaModal;
