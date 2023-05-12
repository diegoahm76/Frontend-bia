import { Button } from '@mui/material';


interface IProps {
    on_click_function: any;
    icon_class: any;
    label: string;
    variant_button: any;
    type_button: any;
    disabled?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormButton = ({
    on_click_function,
    icon_class,
    label,
    variant_button,
    type_button,
    disabled
}: IProps) => {

    return (
        <Button
            fullWidth
            variant={variant_button}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={on_click_function}
            startIcon={icon_class}
            type={type_button}
            disabled={disabled??false}
        >
            {label}
        </Button>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default FormButton;