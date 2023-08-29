/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  MenuItem,
  TextField,
} from '@mui/material';
import type React from 'react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { crear_parametros } from '../Request/request';
import type { Parametros } from '../interfaces/interfaces';
import { control_error, control_success } from '../../../../helpers';
import { tipo_parametro_choices } from '../../Instrumentos/components/ResultadoLaboratorio/utils/choices/choices';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  get_datos: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarParametro: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  get_datos,
}) => {

  const {
    register,
    reset,
    watch,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm();


  const [is_loading, set_is_loading] = useState(false);


  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const tipo_patametro_value = watch('cod_tipo_parametro')

  const on_submit_cargo: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_is_loading(true);
      await crear_parametros(data as Parametros);
      set_is_modal_active(false);
      control_success('Parametro creado correctamente');
      await get_datos();
      reset();
      set_is_loading(false);
    } catch (error: any) {
      set_is_loading(false);
      control_error(error.response.data.detail);
    }
  };

  return (
    <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl">
      <Box component="form" onSubmit={handleSubmit(on_submit_cargo)}>
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title="Registro de parametros de laboratorio" />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Tipo parámetro"
                select
                fullWidth
                size="small"
                value={tipo_patametro_value}
                margin="dense"
                disabled={false}
                {...register('cod_tipo_parametro', { required: true })}
                error={!!errors?.cod_tipo_parametro}
                helperText={
                  errors?.cod_tipo_parametro?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              >
                {tipo_parametro_choices.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('nombre', {
                  required: true,
                })}
                error={!!errors.nombre}
                helperText={
                  errors.nombre?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Unidad de medida"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('unidad_de_medida', {
                  required: true,
                })}
                error={!!errors.unidad_de_medida}
                helperText={
                  errors.unidad_de_medida?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handle_close();
              reset();
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            disabled={is_loading}
            color="success"
            type="submit"
          >
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
