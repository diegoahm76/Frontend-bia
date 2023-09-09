/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import FormInputFileController from '../../../components/partials/form/FormInputFileController';
import FormDatePickerController from '../../../components/partials/form/FormDatePickerController';
import FormInputController from '../../../components/partials/form/FormInputController';
import FormInputNoController from '../../../components/partials/form/FormInputNoController';
import FormSelectController from '../../../components/partials/form/FormSelectController';
import FormButton from '../../../components/partials/form/FormButton';
import { useEffect, useState } from 'react';
import Block from '@mui/icons-material/Block';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';
import { Title } from '../../../components/Title';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../auth/interfaces';
import { get_person_anula_service } from '../produccion/store/thunks/produccionThunks';
import { useAppDispatch, useAppSelector } from '../../../hooks';

interface IProps {
  action: string | null;
  button_icon_class?: any;
  button_disabled?: boolean | null;
  modal_title: string | null;
  modal_inputs: any[];
  button_submit_label?: string | null;
  button_submit_disabled?: boolean | null;
  button_submit_icon_class?: any;
  button_submit_action?: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const UndoDelete = ({
  action,
  button_icon_class,
  button_disabled,
  modal_title,
  modal_inputs,
  button_submit_disabled,
  button_submit_label,
  button_submit_icon_class,
  button_submit_action,
}: IProps) => {
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(false);
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);
  const { persona_anula } = useAppSelector((state) => state.produccion);

  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(get_person_anula_service(userinfo.id_persona));
  }, []);

  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
  const TypeDatum: any = (input: any) => {
    const form_input = input.form_input;
    if (form_input.datum_type === 'input_controller') {
      return (
        <FormInputController
          xs={form_input.xs}
          md={form_input.md}
          control_form={form_input.control_form}
          control_name={form_input.control_name}
          default_value={
            'person' in form_input
              ? form_input.person === true
                ? persona_anula.nombre_completo
                : form_input.default_value
              : form_input.default_value
          }
          rules={form_input.rules}
          label={form_input.label}
          type={form_input.type}
          disabled={form_input.disabled}
          helper_text={form_input.helper_text}
          multiline_text={form_input.multiline_text ?? false}
          rows_text={form_input.rows_text ?? 1}
          on_blur_function={form_input.on_blur_function ?? null}
          set_value={form_input.set_value ?? null}
          hidden_text={form_input.hidden_text ?? null}
        />
      );
    } else if (form_input.datum_type === 'input_no_controller') {
      return (
        <FormInputNoController
          xs={form_input.xs}
          md={form_input.md}
          value_input={form_input.value_input}
          on_change_function={form_input.on_change_function}
          label={form_input.label}
          type={form_input.type}
          disabled={form_input.disabled}
          multiline_text={form_input.multiline_text ?? false}
          rows_text={form_input.rows_text ?? 1}
          on_blur_function={form_input.on_blur_function ?? null}
        />
      );
    } else if (form_input.datum_type === 'select_controller') {
      return (
        <FormSelectController
          xs={form_input.xs}
          md={form_input.md}
          control_form={form_input.control_form}
          control_name={form_input.control_name}
          default_value={form_input.default_value}
          rules={form_input.rules}
          label={form_input.label}
          disabled={form_input.disabled}
          helper_text={form_input.helper_text}
          select_options={form_input.select_options}
          option_label={form_input.option_label}
          option_key={form_input.option_key}
          multiple={form_input.multiple ?? false}
          hidden_text={form_input.hidden_text ?? null}
        />
      );
    } else if (form_input.datum_type === 'title') {
      return <Title title={form_input.title_label}></Title>;
    } else if (form_input.datum_type === 'input_file_controller') {
      return (
        <FormInputFileController
          xs={form_input.xs}
          md={form_input.md}
          control_form={form_input.control_form}
          control_name={form_input.control_name}
          default_value={form_input.default_value}
          rules={form_input.rules}
          label={form_input.label}
          disabled={form_input.disabled}
          helper_text={form_input.helper_text}
          set_value={form_input.set_value ?? null}
          hidden_text={form_input.hidden_text ?? null}
          file_name={form_input.file_name ?? null}
        />
      );
    } else if (form_input.datum_type === 'date_picker_controller') {
      return (
        <FormDatePickerController
          xs={form_input.xs}
          md={form_input.md}
          control_form={form_input.control_form}
          control_name={form_input.control_name}
          default_value={form_input.default_value}
          rules={form_input.rules}
          label={form_input.label}
          disabled={form_input.disabled}
          helper_text={form_input.helper_text}
          hidden_text={form_input.hidden_text ?? null}
          min_date={form_input.min_date ?? ''}
          max_date={form_input.max_date ?? ''}
          format={'YYYY-MM-DD'}
        />
      );
    }
  };

  const handle_open_select_model = (): void => {
    set_select_model_is_active(true);
  };
  const handle_close_select_model = (): void => {
    set_select_model_is_active(false);
  };

  return (
    <>
      <FormButton
        variant_button="outlined"
        on_click_function={handle_open_select_model}
        icon_class={button_icon_class ?? <CloseIcon />}
        label={action ?? 'Eliminar'}
        type_button="button"
        disabled={button_disabled ?? false}
      />

      <Dialog
        fullWidth
        maxWidth="xl"
        open={select_model_is_active}
        onClose={handle_close_select_model}
      >
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title={`${modal_title} `} />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          {modal_inputs.length > 0 && (
            <Grid container spacing={2} direction="row">
              {modal_inputs.map((option, index) => (
                <TypeDatum key={index} form_input={option} />
              ))}
            </Grid>
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              color='error'
              variant='contained'
              onClick={handle_close_select_model}
              startIcon={<CloseIcon />}
            >
              CANCELAR
            </Button>

            <Button
              variant="contained"
              onClick={button_submit_action}
              startIcon={button_submit_icon_class ?? <Block />}
              disabled={button_submit_disabled ?? false}
            >
              {button_submit_label}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default UndoDelete;
