/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { EditarParametros, Parametros } from '../interfaces/interfaces';
import { editar_parametros } from '../Request/request';
import { control_error, control_success } from '../../../../helpers';
import { tipo_parametro_choices } from '../../Instrumentos/components/ResultadoLaboratorio/utils/choices/choices';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  data: Parametros;
  get_data: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizarParametro: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  data,
  get_data,
}) => {
  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    watch,
    setValue: set_value,
    formState: { errors },
  } = useForm<EditarParametros>({
    defaultValues: {
      nombre: '',
      activo: false,
      cod_tipo_parametro: '',
      unidad_de_medida: '',
    },
  });

  const [is_loading, set_is_loading] = useState(false);

  const {
    // nombre,
    activo,
    cod_tipo_parametro: tipo_parametro_value,
  } = watch();

  useEffect(() => {
    setTimeout(() => {
      set_value('nombre', data?.nombre);
      set_value('activo', data?.activo);
      set_value('cod_tipo_parametro', data?.cod_tipo_parametro);
      set_value('unidad_de_medida', data?.unidad_de_medida);
    }, 100);
  }, [data, reset]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = async (datos: EditarParametros): Promise<any> => {
    try {
      set_is_loading(true);
      await editar_parametros(data.id_parametro, datos);
      set_is_modal_active(false);
      control_success('Parametro actualizado correctamente');
      void get_data();
      reset();
      set_is_loading(false);
    } catch (error: any) {
      set_is_loading(false);
      control_error(error.response.data.detail);
    }
  };

  return (
    <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl">
      <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
      <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title="Editar Parametro" />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Tipo parámetro"
                select
                fullWidth
                size="small"
                value={tipo_parametro_value}
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

            <Grid item xs={12}>
              <FormControl component="fieldset" variant="standard">
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('activo', {})}
                      checked={activo}
                      onChange={(e) => {
                        // onchange(e.target.checked)
                        set_value('activo', e.target.checked);
                      }}
                    />
                  }
                  label={activo ? 'Activo' : 'Inactivo'}
                />
              </FormControl>
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
            disabled={is_loading}
            color="success"
            type="submit"
            startIcon={<SaveIcon />}
          >
            ACTUALIZAR
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
