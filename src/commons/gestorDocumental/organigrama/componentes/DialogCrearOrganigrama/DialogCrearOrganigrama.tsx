import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Button,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_organigrams_service } from '../../store/thunks/organigramThunks';
import { useAppDispatch } from '../../../../../hooks';
import type { FormValues, IProps } from './types/type';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogCrearOrganigrama = ({
  is_modal_active,
  set_is_modal_active,
  set_position_tab_organigrama,
}: IProps) => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_organigrama, handleSubmit: handle_submit } =
    useForm<FormValues>();

  const handle_close_crear_organigrama = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = (data: FormValues): void => {
    void dispatch(add_organigrams_service(data, set_position_tab_organigrama));
    handle_close_crear_organigrama();
  };

  return (
    <Dialog
      maxWidth="xs"
      open={is_modal_active}
      onClose={handle_close_crear_organigrama}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>
          Crear organigrama
          <IconButton
            aria-label="close"
            onClick={() => {
              set_is_modal_active(false);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Controller
            name="nombre"
            control={control_organigrama}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                // margin="dense"
                fullWidth
                size="small"
                label="Nombre"
                variant="outlined"
                value={value}
                inputProps={{
                  maxLength: 50
                }}
                onChange={(e) => {
                  if (e.target.value.length === 50)
                    control_warning('máximo 50 caracteres');

                  onChange(e.target.value);
                  // console.log(e.target.value);
                }}
                error={!(error == null)}
                helperText={
                  error != null
                    ? 'Es obligatorio ingresar un nombre'
                    : 'Ingrese nombre'
                }
              />
            )}
          />
          <Controller
            name="version"
            control={control_organigrama}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                // margin="dense"
                fullWidth
                size="small"
                label="Versión"
                variant="outlined"
                value={value}
                inputProps={{
                  maxLength: 10
                }}
                onChange={(e) => {
                  if (e.target.value.length === 10)
                    control_warning('máximo 10 caracteres');

                  onChange(e.target.value);
                  // console.log(e.target.value);
                }}
                error={!(error == null)}
                helperText={
                  error != null
                    ? 'Es obligatorio ingresar una versión'
                    : 'Ingrese versión'
                }
              />
            )}
          />
          <Controller
            name="descripcion"
            control={control_organigrama}
            defaultValue=""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                // margin="dense"
                fullWidth
                size="small"
                label="Descripción"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!(error == null)}
                helperText={
                  error != null
                    ? 'Es obligatorio ingresar una descripción'
                    : 'Ingrese descripción'
                }
              />
            )}
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
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              CREAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogCrearOrganigrama;
