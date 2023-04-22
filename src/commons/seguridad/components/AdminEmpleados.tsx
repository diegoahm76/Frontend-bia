import { Grid, TextField, Button, CircularProgress, type SelectChangeEvent, Skeleton, Box } from "@mui/material";
import { CustomSelect } from "../../../components";
import type { DataRegistePortal } from "../../auth/interfaces";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { use_register } from "../../auth/hooks/registerHooks";
import SearchIcon from '@mui/icons-material/Search';
import { BuscadorPersona } from "../../../components/BuscadorPersona";
// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdminEmpleados(): JSX.Element {
  const {
    data_register,
    loading,
    tipo_documento_opt,
    tipo_documento,
    set_tipo_persona,
    set_numero_documento,
    validate_exits,
    set_data_register,
    set_tipo_documento
  } = use_register();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<DataRegistePortal>();

  const set_value_form = (name: string, value: string): void => {
    set_data_register({
      ...data_register,
      [name]: value,
    });
  };

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

  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} spacing={2}>
          <Box mb={2} style={{ marginTop: '0px' }}>
            <CustomSelect
              onChange={on_change}
              label="Tipo de documento *"
              name="tipo_documento"
              value={tipo_documento}
              options={tipo_documento_opt}
              loading={loading}
              disabled={false}
              required={false}
              errors={errors}
              register={register}
            />
          </Box>
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={45} />
          ) : (
            <TextField
              fullWidth
              label="Número de documento *"
              type="number"
              size="small"
              disabled={false}
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
          <Box mb={7} style={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              className="search-button text-capitalize rounded-pill"
              startIcon={
                loading
                  ? <CircularProgress size={15} key={1} className="align-middle ml-1" />
                  : <SearchIcon />
              }
              aria-label="Buscar "
              size="large"
            >
              Consultar
              {loading ? '' : ""}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
