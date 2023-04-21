import { useEffect } from 'react';
import {
  Grid,
  type SelectChangeEvent,
  TextField,
  Typography,
  Skeleton,
  Alert,
  LinearProgress,
} from '@mui/material';
import { use_register } from '../hooks/registerHooks';
import { useForm } from 'react-hook-form';
import type { DataRegistePortal, keys_object } from '../interfaces';
import { RegisterPersonaNatural } from './RegisterPersonaNatural';
import { RegisterPersonaJuridica } from './RegisterPersonaJuridica';
import { CustomSelect } from '../../../components';

interface Props {
  uso_interno: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterForm: React.FC<Props> = ({ uso_interno }: Props) => {
  const {
    register,
    setValue: set_value,
    formState: { errors },
    watch,
  } = useForm<DataRegistePortal>();
  const {
    data_register,
    is_search,
    loading,
    tipo_documento_opt,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    has_user,
    set_data_register,
    set_numero_documento,
    set_tipo_documento,
    set_tipo_persona,
    validate_exits,
  } = use_register();
  const numero_documento = watch('numero_documento');

  // Consultamos si el usuario existe
  useEffect(() => {
    if (numero_documento !== undefined && numero_documento !== '') {
      set_numero_documento(numero_documento);
      void validate_exits(numero_documento);
    }
  }, [numero_documento]);

  useEffect(() => {
    if (watch('tipo_persona') !== undefined) {
      set_tipo_persona(watch('tipo_persona'));
    }
  }, [watch('tipo_persona')]);

  useEffect(() => {
    if (watch('tipo_documento') !== undefined) {
      set_tipo_documento(watch('tipo_documento'));
    }
  }, [watch('tipo_documento')]);

  useEffect(() => {
    if (tipo_persona === 'J') {
      set_value('tipo_documento', 'NT');
      set_tipo_documento('NT');
    } else {
      set_tipo_documento('');
    }
  }, [tipo_persona]);

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    set_data_register({
      ...data_register,
      [name]: value,
    });
    set_value(name as keys_object, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  return (
    <>
      {!uso_interno && (
        <Typography variant="h6" textAlign="center" pb={2}>
          Formulario registro
        </Typography>
      )}
      <Grid container spacing={2} p={2}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Tipo de persona *"
            name="tipo_persona"
            value={tipo_persona}
            options={tipo_persona_opt}
            loading={loading}
            disabled={false}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Tipo de documento *"
            name="tipo_documento"
            value={tipo_documento}
            options={tipo_documento_opt}
            loading={loading}
            disabled={(tipo_persona === '' || tipo_persona === 'J') ?? true}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={45} />
          ) : (
            <TextField
              fullWidth
              label="Número de documento *"
              type="number"
              size="small"
              disabled={tipo_persona === '' ?? true}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              error={errors.numero_documento?.type === 'required'}
              helperText={
                errors.numero_documento?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('numero_documento', {
                required: true,
              })}
              onChange={handle_change}
            />
          )}
        </Grid>
        {/* Muestra loading cuando esta buscando datos de la persona */}
        {is_search && (
          <Grid item xs={12}>
            <Grid container justifyContent="center" textAlign="center">
              <Alert icon={false} severity="info">
                <LinearProgress />
                <Typography>Buscando persona...</Typography>
              </Alert>
            </Grid>
          </Grid>
        )}
        {has_user && (
          <Grid item xs={12}>
            <Grid container justifyContent="center" textAlign="center">
              <Alert icon={false} severity="error">
                <Typography>
                  Lo sentimos, este documento ya tiene un usuario, puede iniciar
                  sesión con su usuario y contraseña, si ha olvidado sus datos
                  de acceso, dirigase al inicio de sesión y haga click en
                  ¿Olvidó su contraseña?
                </Typography>
              </Alert>
            </Grid>
          </Grid>
        )}
      </Grid>
      {tipo_persona === 'N' && (
        <RegisterPersonaNatural
          numero_documento={numero_documento}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          has_user={has_user}
        />
      )}
      {tipo_persona === 'J' && (
        <RegisterPersonaJuridica
          numero_documento={numero_documento}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          has_user={has_user}
        />
      )}
    </>
  );
};
