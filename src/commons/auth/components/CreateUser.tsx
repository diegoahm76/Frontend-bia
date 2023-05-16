import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import type { PropsRegister } from '../../../interfaces/globalModels';
import { Title } from '../../../components/Title';
import { LoadingButton } from '@mui/lab';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { use_register_persona_n } from '../hooks/registerPersonaNaturalHook';
import { use_register } from '../hooks/registerHook';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CreateUser: React.FC<PropsRegister> = ({
  register,
  tipo_documento,
  handleSubmit,
  errors,
  watch,
  setValue,
  getValues,
}: PropsRegister) => {
  const {
    show_password,
    error_password,
    message_error_password,
    handle_click_show_password,
  } = use_register_persona_n({ watch, setValue, getValues });

  const { on_submit, is_saving } = use_register();

  const submit = handleSubmit((e) => {
    void on_submit(e);
  });

  return (
    <form
      onSubmit={(e) => {
        void submit(e);
      }}
    >
      <Grid container spacing={2} px={2}>
        <Grid item xs={12}>
          <Alert severity="info">
            <Typography>
              Hemos encontrado que aun no tienes datos de acceso, por favor,
              registra tus datos de acceso
            </Typography>
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Title
            title={`Datos persona ${
              tipo_documento === 'N' ? 'natural' : 'jurídica'
            }`}
          />
        </Grid>

        {tipo_documento === 'N' ? (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Primer nombre"
                disabled
                {...register('primer_nombre')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Segundo nombre"
                disabled
                {...register('segundo_nombre')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Primer apellido"
                disabled
                {...register('primer_apellido')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                size="small"
                label="Segundo apellido"
                disabled
                {...register('segundo_apellido')}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Razón social"
                disabled
                {...register('razon_social')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Nombre comercial"
                disabled
                {...register('nombre_comercial')}
              />
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Title title="Datos de acceso" />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography>
            La contraseña debe cumplir con las siguientes reglas
          </Typography>
          <ul>
            <li>Debe contener mínimo 8 caracteres</li>
            <li>Debe contener 1 caracter en mayúscula</li>
            <li>Debe contener 1 caracter numérico</li>
            <li>Debe contener 1 caracter simbólico (*,-,_,%...)</li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Nombre de usuario"
            error={errors.nombre_de_usuario?.type === 'required'}
            helperText={
              errors.nombre_de_usuario?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
            {...register('nombre_de_usuario', {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl
            size="small"
            fullWidth
            onCopy={(e: any) => e.preventDefault()}
            error={errors.password?.type === 'required' || error_password}
          >
            <InputLabel htmlFor="password">Contraseña *</InputLabel>
            <OutlinedInput
              required
              id="password"
              type={show_password ? 'text' : 'password'}
              error={errors.password?.type === 'required'}
              {...register('password', {
                required: true,
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handle_click_show_password}
                    edge="end"
                  >
                    {show_password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Contraseña"
            />
            {errors.password?.type === 'required' ? (
              <FormHelperText>Este campo es obligatorio</FormHelperText>
            ) : error_password ? (
              <FormHelperText>{}</FormHelperText>
            ) : (
              ''
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl
            size="small"
            fullWidth
            onCopy={(e: any) => e.preventDefault()}
            error={
              errors.confirmar_password?.type === 'required' || error_password
            }
          >
            <InputLabel htmlFor="repita-password">
              Repita la contraseña *
            </InputLabel>
            <OutlinedInput
              required
              id="repita-password"
              type={show_password ? 'text' : 'password'}
              error={errors.confirmar_password?.type === 'required'}
              {...register('confirmar_password', {
                required: true,
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handle_click_show_password}
                    edge="end"
                  >
                    {show_password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Repita la contraseña"
            />
            {errors.confirmar_password?.type === 'required' ? (
              <FormHelperText>Este campo es obligatorio</FormHelperText>
            ) : error_password ? (
              <FormHelperText>{message_error_password}</FormHelperText>
            ) : (
              ''
            )}
          </FormControl>
        </Grid>

        {/* BOTONES */}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="contained"
              color="warning"
              sx={{
                textAlign: 'center',
                color: '#ffff',
              }}
              href="#/auth/login"
            >
              <Typography sx={{ color: 'black' }}>Salir</Typography>
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="success"
              loading={is_saving}
              disabled={is_saving}
            >
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
