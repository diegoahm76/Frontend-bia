import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
} from '@mui/material';
import type { PropsSelect } from '../interfaces/globalModels';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CustomSelect = ({
  options,
  label,
  name,
  value,
  loading,
  disabled = false,
  required = false,
  onChange,
  errors,
  register,
}: PropsSelect): JSX.Element => {
  return (
    <FormControl
      fullWidth
      size="small"
      error={errors[name]?.type === 'required'}
      disabled={disabled}
    >
      {loading ? (
        <Skeleton variant="rectangular" width="100%" height={42} />
      ) : (
        <>
          <InputLabel id={`label_${name}`}>{label}</InputLabel>
          <Select
            labelId={`label_${name}`}
            label={label}
            fullWidth
            value={value}
            {...register(name, {
              required,
            })}
            onChange={onChange}
          >
            <MenuItem value={''}>
              <em>Seleccionar opción</em>
            </MenuItem>
            {options.length > 0 &&
              options.map((e, k: number) => {
                return (
                  <MenuItem value={e.value} key={k}>
                    {e.label}
                  </MenuItem>
                );
              })}
          </Select>
          {errors[name]?.type === 'required' && (
            <FormHelperText>Campo Requerido</FormHelperText>
          )}
        </>
      )}
    </FormControl>
  );
};
