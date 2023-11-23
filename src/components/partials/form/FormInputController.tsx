import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';

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
  marginTop?: number;
  control_form: any;
  control_name: string;
  default_value: string | number | null;
  rules: IRules;
  label: string;
  type: string;
  disabled: boolean;
  helper_text: string;
  multiline_text?: boolean;
  rows_text?: number;
  on_blur_function?: any;
  set_value?: any;
  hidden_text?: boolean | null;
  step_number?: string | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormInputController = ({
  xs,
  md,
  control_form,
  control_name,
  rules,
  label,
  type,
  disabled,
  helper_text,
  default_value,
  multiline_text,
  rows_text,
  on_blur_function,
  set_value,
  hidden_text,
  marginTop,
  margin,
  step_number,
}: IProps) => {
  const input_props = type === 'number' ? { step: step_number ?? 0.00001 } : {};
  return (
    <>
      {!(hidden_text ?? false) && (
        <Grid
          item
          xs={xs}
          md={md}
          margin={margin ?? 0}
          marginTop={marginTop ?? 0}
        >
          {type !== 'number' ? (
            <Controller
              name={control_name}
              control={control_form}
              defaultValue={default_value}
              rules={{
                required: rules.required_rule?.rule,
                min: rules.min_rule?.rule,
                max: rules.max_rule?.rule,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label={label}
                  variant="outlined"
                  type={type}
                  disabled={disabled}
                  value={value === null ? '' : value}
                  multiline={multiline_text ?? false}
                  rows={rows_text ?? 1}
                  onChange={onChange}
                  onBlur={on_blur_function}
                  error={!(error == null)}
                  helperText={
                    error != null
                      ? error.type === 'required'
                        ? rules.required_rule?.message
                        : error.type === 'min'
                        ? rules.min_rule?.message
                        : rules.max_rule?.message
                      : helper_text
                  }
                />
              )}
            />
          ) : (
            <Controller
              name={control_name}
              control={control_form}
              defaultValue={default_value}
              rules={{
                required: rules.required_rule?.rule,
                min: rules.min_rule?.rule,
                max: rules.max_rule?.rule,
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  margin="dense"
                  fullWidth
                  size="small"
                  label={label}
                  variant="outlined"
                  type={type}
                  disabled={disabled}
                  inputProps={input_props}
                  value={value === null ? '' : value}
                  multiline={multiline_text ?? false}
                  rows={rows_text ?? 1}
                  onChange={onChange}
                  onBlur={on_blur_function}
                  error={!(error == null)}
                  helperText={
                    error != null
                      ? error.type === 'required'
                        ? rules.required_rule?.message
                        : error.type === 'min'
                        ? rules.min_rule?.message
                        : rules.max_rule?.message
                      : helper_text
                  }
                />
              )}
            />
          )}
        </Grid>
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormInputController;
