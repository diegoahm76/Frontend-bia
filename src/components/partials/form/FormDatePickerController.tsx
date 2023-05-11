import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, TextField, type TextFieldProps } from '@mui/material';
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
    control_form: any;
    control_name: string;
    default_value: string | number | null;
    rules: IRules;
    label: string;
    disabled: boolean;
    helper_text: string;
    hidden_text?: boolean | null;
    min_date?: string | null;
    max_date?: string | null;
    format?: string | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormDatePickerController = ({
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
    min_date,
    max_date,
    format
}: IProps) => {
    const min = new Date(min_date ?? "");
    const max = new Date(max_date ?? "");
    return (
        <>
            {(!(hidden_text ?? false)) &&
                <Grid item xs={xs} md={md}>
                    <Controller
                        name={control_name}
                        control={control_form}
                        defaultValue={default_value}
                        rules={{ required: rules.required_rule?.rule, min: rules.min_rule?.rule, max: rules.max_rule?.rule }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => (
                            <FormControl fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label={label}
                                        value={value}
                                        onChange={onChange}
                                        inputFormat={format ?? "DD/MM/YYYY"}
                                        minDate={((min_date ?? "") === "") ? null : min}
                                        maxDate={((max_date ?? "") === "") ? null : max}
                                        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
                                            <TextField
                                                fullWidth
                                                margin="dense"
                                                size="small"
                                                variant="outlined"
                                                disabled={disabled}
                                                {...params}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                                <FormHelperText
                                    error={!(error == null)}>
                                    {(error != null)
                                        ? rules.required_rule?.message
                                        : helper_text}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </Grid>
            }
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default FormDatePickerController;