import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import { Button, FormControl, FormHelperText, Input } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    file_name: string | null;
    set_value?: any;
    hidden_text?: boolean | null,
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormInputFileController = ({
    xs,
    md,
    control_form,
    control_name,
    rules,
    label,
    disabled,
    helper_text,
    default_value,
    file_name,
    set_value,
    hidden_text
}: IProps) => {

    const handle_file_input_change = (e: any): void => {
        set_value(e.target.files != null ? e.target.files[0] : "");
    };
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
                            <Button 
                            fullWidth
                            size="small"
                            variant="outlined" 
                            startIcon={<CloudUploadIcon />}
                            >
                                {file_name!==""?file_name:label}
                            <Input
                                type="file"
                                disabled={disabled}
                                style={{ opacity: 0, width: 100 }}
                                onChange={handle_file_input_change}
                                error={!(error == null)}
                            />
                            </Button>
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
export default FormInputFileController;