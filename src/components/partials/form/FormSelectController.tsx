/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { v4 as uuid } from "uuid";

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
    multiple?: boolean|null;
    hidden_text?: boolean | null;
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
    hidden_text
}: IProps) => {
    const id_select = String(uuid())

    return (
        
        <>
        {(!(hidden_text ?? false)) &&
            
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
                    <FormControl fullWidth>
                        <InputLabel id={id_select}>{label ?? ""}</InputLabel>
                        <Select
                            labelId={id_select}
                            multiple={multiple ?? false}
                            margin="dense"
                            fullWidth
                            size="small"
                            label={label ?? ""}
                            variant="outlined"
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            error={!(error == null)}


                        >
                            {/* <MenuItem value="">
                                <em>None</em>
                            </MenuItem> */}
                            {select_options.map((option: any) => (
                                <MenuItem key={option[option_key]} value={option[option_key]}>
                                    {option[option_label]}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText
                         error= {!(error == null)}>
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
export default FormSelectController;