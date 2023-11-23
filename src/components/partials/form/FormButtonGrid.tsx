import { Button, Grid } from '@mui/material';
import { type OverridableStringUnion } from '@mui/types';

interface IProps {
  xs: number;
  md: number;
  margin?: number;
  marginTop?: number;
  hidden_text?: boolean | null;
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
  > | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormButtonGrid = ({
  on_click_function,
  icon_class,
  label,
  variant_button,
  type_button,
  disabled,
  style_button,
  color_button,
  xs,
  md,
  margin,
  marginTop,
  hidden_text,
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
          <Button
            color={
              label === 'GUARDAR' || label === 'guardar' || label === 'Guardar'
                ? 'success'
                : color_button ?? 'primary'
            }
            fullWidth
            variant={variant_button}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={on_click_function ?? null}
            startIcon={icon_class ?? null}
            type={type_button ?? 'button'}
            style={style_button}
            disabled={disabled ?? false}
          >
            {label}
          </Button>
        </Grid>
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormButtonGrid;
