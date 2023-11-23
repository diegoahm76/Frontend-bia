/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import type React from 'react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { crear_tipos } from '../../Request/request';
import type { ITipos } from '../../interfaces/interfaces';
import { control_error, control_success } from '../../../../../helpers';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../../../components';
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  get_datos: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarTipos: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  get_datos,
}) => {
  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [is_loading, set_is_loading] = useState(false);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const on_submit_tipos: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_is_loading(true);
      await crear_tipos(data as ITipos);
      set_is_modal_active(false);
      control_success('Tipo creado correctamente');
      await get_datos();
      reset();
      set_is_loading(false);
    } catch (error: any) {
      set_is_loading(false);
      control_error(
        error.response.data.detail ||
          'Algo salio mal, intenta de nuevo más tarde'
      );
    }
  };
  const limpiar_formulario = (): void => {
    reset();
  };

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
      fullWidth
      maxWidth="md"
    >
      {' '}
      <Box component="form" onSubmit={handleSubmit(on_submit_tipos)}>
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title="Crear Tipo" />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Nombre tipo"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('nombre_tipo', {
                  required: true,
                })}
                error={Boolean(errors.nombre_tipo)}
                helperText={
                  errors.nombre_tipo?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              handle_close();
              reset();
            }}
          >
            Cerrar
          </Button>{' '}
          <Button
            variant="outlined"
            color="warning"
            startIcon={<CleanIcon />}
            onClick={limpiar_formulario}
          >
            Limpiar
          </Button>
          <Button
            variant="contained"
            disabled={is_loading}
            color="success"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
