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
import type { keys_object } from '../../interfaces';
import { RegisterPersonaNatural } from '../RegisterPersonaNatural/RegisterPersonaNatural';
import { RegisterPersonaJuridica } from '../RegisterPersonaJuridica/RegisterPersonaJuridica';
import { CustomSelect } from '../../../../components';
import { LoadingButton } from '@mui/lab';
import { CreateUser } from '../CreateUser/CreateUser';
import { use_register } from '../../hooks/registerHook';

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
    tipo_persona_opt,
    no_has_user,
    get_values,
    handle_submit,
    register,
    set_value,
    validate_exits,
    watch,
  } = use_register();

  const numero_documento = watch('numero_documento') ?? '';
  const tipo_documento = watch('tipo_documento') ?? '';
  const tipo_persona = watch('tipo_persona') ?? '';

  useEffect(() => {
    if (tipo_persona === 'J') {
      set_value('tipo_documento', 'NT');
    } else {
      set_value('tipo_documento', '');
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

  const on_submit = handle_submit((e) => {
    void validate_exits(e);
  });

  return (
    <>
      {!uso_interno && (
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
      {tipo_persona === 'N' && is_avaiable && !no_has_user && (
        <RegisterPersonaNatural
          numero_documento={numero_documento}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          errors={errors}
          handleSubmit={handle_submit}
          isValid={is_valid}
          register={register}
          setValue={set_value}
          getValues={get_values}
          watch={watch}
        />
      )}
      {no_has_user && (
        <CreateUser
          errors={errors}
          handleSubmit={handle_submit}
          isValid={is_valid}
          register={register}
          numero_documento=""
          setValue={set_value}
          watch={watch}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          getValues={get_values}
        />
      )}
      {tipo_persona === 'J' && is_avaiable && !no_has_user && (
        <RegisterPersonaJuridica
          numero_documento={numero_documento}
          tipo_persona={tipo_persona}
          tipo_documento={tipo_documento}
          errors={errors}
          handleSubmit={handle_submit}
          isValid={is_valid}
          register={register}
          setValue={set_value}
          getValues={get_values}
          watch={watch}
        />
      )}
    </>
  );
};
