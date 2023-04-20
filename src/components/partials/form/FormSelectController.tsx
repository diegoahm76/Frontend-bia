import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import { MenuItem } from '@mui/material';

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
    option_key
}: IProps) => {

    return (
        <Grid item xs={xs} md={md}>
            <Controller
                name={control_name}
                control={control_form}
                defaultValue={default_value}
                rules={{ required: rules.required_rule?.rule }}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                }) => (
                    <TextField
                        select
                        margin="dense"
                        fullWidth
                        size="small"
                        label={label}
                        variant="outlined"
                        disabled={disabled}
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                            (error != null)
                                ? (error.type === "required")
                                    ? rules.required_rule?.message
                                    : ""
                                : helper_text
                        }
                    >
                        {select_options.map((option: any) => (
                            <MenuItem key={option[option_key]} value={option[option_key]}>
                                {option[option_label]}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />
        </Grid>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default FormSelectController;