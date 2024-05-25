import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  TextField,
  type TextFieldProps,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface IRuleMessage {
  rule: any;
  message: string | null;
}

interface IRules {
  required_rule?: IRuleMessage;
  min_rule?: IRuleMessage;
  max_rule?: IRuleMessage;
}
interface IProps {
  xs: number;
  md: number;
  margin?: number;
  control_form: any;
  control_name: string;
  default_value: any | null;
  rules: IRules;
  label_start: string;
  label_end: string;
  disabled: boolean;
  helper_text: string;
  hidden_text?: boolean | null;
  min_date?: string | null;
  max_date?: string | null;
  format?: string | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormDateRangePickerController = ({
  xs,
  md,
  control_form,
  control_name,
  rules,
  label_start,
  label_end,
  disabled,
  helper_text,
  default_value,
  hidden_text,
  min_date,
  max_date,
  format,
  margin,
}: IProps) => {
  const min = new Date(min_date ?? '');
  const max = new Date(max_date ?? '');
  return (
    <>
      {!(hidden_text ?? false) && (
        <Grid item xs={xs} md={md} margin={margin ?? 0}>
          <Controller
            name={control_name}
            control={control_form}
            defaultValue={default_value}
            rules={{
              validate: (value) => {
                if (rules.required_rule?.rule) {
                  if (
                    value === null ||
                    value[0] === null ||
                    value[1] === null
                  ) {
                    return 'Debes seleccionar un rango de fechas';
                  }
                }
                if (value[0] > value[1]) {
                  return 'La fecha de inicio debe ser anterior a la fecha de fin';
                }
                return true;
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid container  spacing={2}>
                    <Grid item xs={6} md={6}>
                      <DatePicker
                        disabled={disabled}
                        label={label_start}
                        value={value[0]}
                        onChange={(date) => {
                          onChange([date, value[1]]);
                        }}
                        inputFormat={format ?? 'YYYY/MM/DD'}
                        minDate={(min_date ?? '') === '' ? null : min}
                        maxDate={value[1]}
                        renderInput={(
                          params: JSX.IntrinsicAttributes & TextFieldProps
                        ) => (
                          <TextField
                            fullWidth
                            margin="dense"
                            size="small"
                            variant="outlined"
                            disabled={disabled}
                            error={!(error == null)}
                            {...params}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <DatePicker
                        disabled={disabled}
                        label={label_end}
                        value={value[1]}
                        onChange={(date) => {
                          onChange([value[0], date]);
                        }}
                        inputFormat={format ?? 'YYYY/MM/DD'}
                        minDate={value[0]}
                        maxDate={(max_date ?? '') === '' ? null : max}
                        renderInput={(
                          params: JSX.IntrinsicAttributes & TextFieldProps
                        ) => (
                          <TextField
                            fullWidth
                            margin="dense"
                            size="small"
                            variant="outlined"
                            disabled={disabled}
                            error={!(error == null)}
                            {...params}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>
                <FormHelperText error={!(error == null)}>
                  {error != null ? rules.required_rule?.message : helper_text}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormDateRangePickerController;
