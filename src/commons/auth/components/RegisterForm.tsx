import { useEffect } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Skeleton,
  Alert,
  LinearProgress,
  type SelectChangeEvent,
} from '@mui/material';
import { use_register } from '../hooks/registerHooks';
import type { keys_object } from '../interfaces';
import { RegisterPersonaNatural } from './RegisterPersonaNatural';
// import { RegisterPersonaJuridica } from './RegisterPersonaJuridica';
import { CustomSelect } from '../../../components';
import { LoadingButton } from '@mui/lab';

interface Props {
  uso_interno: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterForm: React.FC<Props> = ({ uso_interno }: Props) => {
  const {
    errors,
    message_error,
    is_error,
    is_avaiable,
    is_search,
    is_valid,
    loading,
    tipo_documento_opt,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    handle_submit,
    register,
    set_numero_documento,
    set_tipo_documento,
    set_tipo_persona,
    set_value,
    validate_exits,
    watch,
  } = use_register();

  const numero_documento = watch('numero_documento');

  // Consultamos si el usuario existe
  useEffect(() => {
    if (numero_documento !== undefined && numero_documento !== '') {
      set_numero_documento(numero_documento);
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
    set_value(name as keys_object, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_submit = handle_submit(() => {
    void validate_exits(numero_documento);
  });

  return (
    <>
      {uso_interno && (
        <Typography variant="h6" textAlign="center" pb={2}>
          Formulario registro
        </Typography>
      )}
      <form
        onSubmit={(e) => {
          void on_submit(e);
        }}
      >
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
                disabled={tipo_persona === '' || tipo_documento === ''}
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
              />
            )}
          </Grid>
          <Grid item xs={12} container justifyContent="end">
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={is_search}
              disabled={is_search}
            >
              Buscar
            </LoadingButton>
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
          {is_error && (
            <Grid item xs={12}>
              <Grid container justifyContent="center" textAlign="center">
                <Alert icon={false} severity="error">
                  <Typography>{message_error}</Typography>
                </Alert>
              </Grid>
            </Grid>
          )}
        </Grid>
      </form>
      {tipo_persona === 'N' && is_avaiable && (
        <RegisterPersonaNatural
          numero_documento={numero_documento}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          errors={errors}
          handleSubmit={handle_submit}
          isValid={is_valid}
          register={register}
          setValue={set_value}
          watch={watch}
        />
      )}
      {/* {tipo_persona === 'J' && (
        <RegisterPersonaJuridica
          numero_documento={numero_documento}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          has_user={has_user}
        />
      )} */}
    </>
  );
};
