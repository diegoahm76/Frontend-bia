import { useState } from 'react';
import { Grid, TextField, Typography, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { CustomSelect } from '../../../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../../../components/DialogGeneradorDeDirecciones';
import type { PropsRegister } from '../../../../../interfaces/globalModels';
import { use_register_persona_n } from '../../../../auth/hooks/registerPersonaNaturalHook';
import type { PropsElement } from '../../../../auth/interfaces/authModels';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DatosResidencia: (props: PropsElement) => JSX.Element = ({
  errors,
  watch,
  setValue: set_value,
  getValues,
  register,
  handleBack,
  typeDirection,
}: PropsElement) => {
  const {
    paises_options,
    dpts_residencia_opt,
    ciudades_residencia_opt,
    municipio_residencia,
    pais_residencia,
    departamento_residencia,
    on_change,
  } = use_register_persona_n({ watch, setValue: set_value, getValues });
  const direccion = watch('direccion_residencia') ?? '';
  const generate_direction = (): void => {
    if (typeDirection !== undefined) {
      typeDirection('residencia');
    }
  };
  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="País de residencia *"
            name="pais_residencia"
            value={pais_residencia}
            options={paises_options}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        {pais_residencia === 'CO' && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                onChange={on_change}
                label="Departamento *"
                name="departamento_residencia"
                value={departamento_residencia}
                options={dpts_residencia_opt}
                required={true}
                errors={errors}
                register={register}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                onChange={on_change}
                label="Ciudad *"
                name="municipio_residencia"
                value={municipio_residencia}
                options={ciudades_residencia_opt}
                disabled={departamento_residencia === '' ?? true}
                required={true}
                errors={errors}
                register={register}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                size="small"
                label="Direccion *"
                disabled
                fullWidth
                error={errors.direccion_residencia?.type === 'required'}
                helperText={
                  errors.direccion_residencia?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
                {...register('direccion_residencia', {
                  required: true,
                })}
                value={direccion}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" onClick={generate_direction}>
                Generar dirección
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                type="textarea"
                rows="3"
                label="Complemento dirección"
                {...register('direccion_residencia_ref')}
              />
            </Grid>
          </>
        )}

        {/* BOTONES */}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                color: '#ffff',
              }}
              href="#/auth/login"
            >
              <Typography sx={{ color: 'white' }}>Inicio</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleBack}>
              Volver
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              Continuar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModuloDireccion: React.FC<PropsRegister> = ({
  register,
  handleSubmit: handle_submit,
  setValue: set_value,
  errors,
  isValid: is_valid,
  watch,
  getValues,
 }: PropsRegister) => {
  const { is_modal_active, on_submit, set_value_direction, open_modal } =
    use_register_persona_n({ watch, setValue: set_value, getValues });

  const [type_direction, set_type_direction] = useState('');
  const [active_step, set_active_step] = useState(0);

  const send_data = handle_submit((e) => {
    if (active_step === 5 && is_valid) {
      void on_submit(e);
    } else {
      handle_next();
    }
  });

  // Paso siguiente del stepper
  const handle_next = (): void => {
    if (active_step !== 5) {
      set_active_step((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Paso anterior del stepper
  const handle_back = (): void => {
    set_active_step((prevActiveStep) => prevActiveStep - 1);
  };

  const on_direction = (type: string): void => {
    set_type_direction(type);
    open_modal(true);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          void send_data(e);
        }}
      >
        <DatosResidencia
          errors={errors}
          getValues={getValues}
          register={register}
          setValue={set_value}
          watch={watch}
          handleBack={handle_back}
          typeDirection={on_direction}
        />
      </form>
      <DialogGeneradorDeDirecciones
        open={is_modal_active}
        openDialog={open_modal}
        onChange={set_value_direction}
        type={type_direction}
      />
    </>
  );
};
