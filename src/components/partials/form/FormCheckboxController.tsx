import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
} from '@mui/material';
import { useEffect, useState } from 'react';

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
  default_value: boolean | null;
  rules: IRules;
  label: string;
  disabled: boolean;
  helper_text: string;
  hidden_text?: boolean | null;
  set_checked?: any;
  checked?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormCheckboxController = ({
  xs,
  md,
  control_form,
  control_name,
  rules,
  label,
  disabled,
  helper_text,
  default_value,
  hidden_text,
  marginTop,
  margin,
  checked,
  set_checked,
}: IProps) => {
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
          {set_checked !== null ? (
            <Controller
              name={control_name}
              control={control_form}
              defaultValue={default_value ?? false}
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormControlLabel
                    label={label}
                    control={
                      <Checkbox
                        {...field}
                        defaultChecked={default_value ?? false}
                        color="primary" // Puedes cambiar el color si lo deseas
                        disabled={disabled}
                        onChange={(e) => {
                          set_checked(e.target.checked);
                        }}
                      />
                    }
                  />
                </FormControl>
              )}
            />
          ) : (
            <Controller
              name={control_name}
              control={control_form}
              defaultValue={default_value ?? false}
              render={({ field }) => (
                <FormControl fullWidth>
                  <FormControlLabel
                    label={label}
                    control={
                      <Checkbox
                        {...field}
                        defaultChecked={default_value ?? false}
                        color="primary" // Puedes cambiar el color si lo deseas
                        disabled={disabled}
                      />
                    }
                  />
                </FormControl>
              )}
            />
          )}
        </Grid>
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormCheckboxController;
