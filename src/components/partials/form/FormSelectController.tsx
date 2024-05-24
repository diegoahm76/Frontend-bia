/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';

interface IRuleMessage {
  rule: any;
  message: string | null;
}

interface IRules {
  required_rule?: IRuleMessage;
}
interface IProps {
  xs: number;
  md: number;
  margin?: number;
  control_form: any;
  control_name: string;
  default_value: string | number | null;
  rules: IRules;
  label: string;
  disabled: boolean;
  helper_text: string;
  select_options: any;
  option_key: string | number;
  option_label: string | number;
  multiple?: boolean | null;
  hidden_text?: boolean | null;
  marginTop?: number;
  auto_focus?: boolean | null;
  on_change_function?: any;
  none_option?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormSelectController = ({
  xs,
  md,
  control_form,
  control_name,
  rules,
  label,
  disabled,
  helper_text,
  default_value,
  select_options,
  option_label,
  option_key,
  multiple,
  hidden_text,
  margin,
  marginTop,
  auto_focus,
  on_change_function,
  none_option,
}: IProps) => {
  const id_select = String(uuid());
  const [options, set_options] = useState<any[]>([]);
  useEffect(() => {
    set_options(select_options);
  }, [select_options]);

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
          {multiple ?? false ? (
            <Controller
              name={control_name}
              control={control_form}
              defaultValue={default_value}
              rules={{ required: rules.required_rule?.rule }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth>
                  <InputLabel id={id_select}>{label ?? ''}</InputLabel>
                  <Select
                    name={control_name}
                    labelId={id_select}
                    multiple={multiple ?? false}
                    margin="dense"
                    fullWidth
                    size="small"
                    label={label ?? ''}
                    variant="outlined"
                    disabled={disabled}
                    value={value === null ? [] : value}
                    onChange={onChange}
                    error={
                      !(error == null) ||
                      ((auto_focus ?? false) &&
                        (value === null || value === ''))
                    }
                  >
                    {options.map((option: any) => (
                      <MenuItem
                        key={option[option_key]}
                        value={option[option_key]}
                      >
                        {option[option_label]}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    error={
                      !(error == null) ||
                      ((auto_focus ?? false) &&
                        (value === null || value === ''))
                    }
                  >
                    {!(error == null) ||
                    ((auto_focus ?? false) && (value === null || value === ''))
                      ? rules.required_rule?.message
                      : value === '' && helper_text}
                  </FormHelperText>
                </FormControl>
              )}
            />
          ) : (
            <Controller
              name={control_name}
              control={control_form}
              defaultValue={default_value}
              rules={{ required: rules.required_rule?.rule }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormControl fullWidth>
                  <InputLabel id={id_select}>{label ?? ''}</InputLabel>
                  <Select
                    name={control_name}
                    labelId={id_select}
                    multiple={multiple ?? false}
                    margin="dense"
                    fullWidth
                    size="small"
                    label={label ?? ''}
                    variant="outlined"
                    disabled={disabled}
                    value={
                      value === null ? (multiple ?? false ? [] : '') : value
                    }
                    onChange={(e) => {
                      onChange(e);
                      {
                        (on_change_function ?? null) !== null &&
                          on_change_function(
                            options.find(
                              (option: any) =>
                                option[option_key] === e.target.value
                            ),
                            e.target.name
                          );
                      }
                    }}
                    error={
                      !(error == null) ||
                      ((auto_focus ?? false) &&
                        (value === null || value === ''))
                    }
                  >
                    {(!(multiple ?? false) || (none_option ?? true)) && (
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                    )}
                    {options.map((option: any) => (
                      <MenuItem
                        key={option[option_key]}
                        value={option[option_key]}
                      >
                        {option[option_label]}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText
                    error={
                      !(error == null) ||
                      ((auto_focus ?? false) &&
                        (value === null || value === ''))
                    }
                  >
                    {!(error == null) ||
                    ((auto_focus ?? false) && (value === null || value === ''))
                      ? rules.required_rule?.message
                      : value === '' && helper_text}
                  </FormHelperText>
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
export default FormSelectController;
