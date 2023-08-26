import { Button } from '@mui/material';
import { type OverridableStringUnion } from '@mui/types';

interface IProps {
  on_click_function: any;
  icon_class: any;
  label: string;
  variant_button: any;
  type_button: any;
  disabled?: boolean | null;
  style_button?: any;
  color_button?: OverridableStringUnion<
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning'
  >;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormButton = ({
  on_click_function,
  icon_class,
  label,
  variant_button,
  type_button,
  disabled,
  style_button,
  color_button,
}: IProps) => {
  return (
    <Button
      color={color_button ?? 'success'}
      fullWidth
      variant={variant_button}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={on_click_function}
      startIcon={icon_class}
      type={type_button}
      style={style_button}
      disabled={disabled ?? false}
    >
      {label}
    </Button>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormButton;
