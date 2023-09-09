import FormButton from '../../../components/partials/form/FormButton';
import { useEffect } from 'react';
import CleanIcon from '@mui/icons-material/CleaningServices';

interface IProps {
  dispatch: any;
  reset_state: any;
  set_initial_values?: any;
  button_label?: string | null;
  button_disabled?: boolean | null;
  button_icon_class?: any;
  variant_button?: any;
  button_clean_show?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Clean = ({
  dispatch,
  reset_state,
  set_initial_values,
  button_disabled,
  button_label,
  button_icon_class,
  variant_button,
  button_clean_show,
}: IProps) => {
  const handle_reset = (): void => {
    dispatch(reset_state());
    set_initial_values();
  };

  useEffect(() => {
    return () => {
      dispatch(reset_state());
    };
  }, [dispatch]);

  return (
    <>
      {(button_clean_show ?? true) && (
        <FormButton
          variant_button={variant_button ?? 'outlined'}
          on_click_function={handle_reset}
          icon_class={button_icon_class ?? <CleanIcon />}
          label={button_label ?? 'Limpiar'}
          type_button="button"
          disabled={button_disabled ?? false}
          // color_button="success"
        />
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default Clean;
