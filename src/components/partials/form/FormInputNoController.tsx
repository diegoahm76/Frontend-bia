import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

interface IProps {
    xs: number;
    md: number;
    value_input: string | number | null;
    on_change_function: any;
    on_blur_function?: any;
    label: string;
    type: string;
    disabled: boolean;
    multiline_text?: boolean;
    rows_text?: number
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormInputNoController = ({
    xs,
    md,
    value_input,
    on_change_function,
    on_blur_function,
    label,
    type,
    disabled,
    multiline_text,
    rows_text
}: IProps) => {

    return (
        <Grid item xs={xs} md={md}>

            <TextField
                margin="dense"
                fullWidth
                size="small"
                label={label}
                variant="outlined"
                type={type}
                disabled={disabled}
                value={value_input}
                multiline={multiline_text ?? false}
                rows={rows_text ?? 1}
                onChange={on_change_function}
                onBlur={on_blur_function}
            />

        </Grid>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default FormInputNoController;