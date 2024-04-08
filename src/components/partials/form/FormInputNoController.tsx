import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

interface IProps {
    xs: number;
    md: number;
    value_input?: string | number | null;
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
    on_change_function,
    label,
    type,
    disabled,
}: IProps) => {
    const handle_file_input_change:any = (e: any) => {
        //  console.log('')(e.target.files[0].name)
        on_change_function(e.target.files!=null?e.target.files[0].name:"");
      };

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
                onChange={handle_file_input_change}
            />

        </Grid>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default FormInputNoController;