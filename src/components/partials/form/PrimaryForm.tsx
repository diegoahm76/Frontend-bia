import Grid from '@mui/material/Grid';
import { Box, Stack } from '@mui/material';
import FormInputController from './FormInputController';
import FormInputNoController from './FormInputNoController';
import FormSelectController from './FormSelectController';
import FormButton from './FormButton';
import { Title } from '../../Title';
import FormInputFileController from './FormInputFileController';
import FormDatePickerController from './FormDatePickerController';
import ImageUploader from './ImageUploader';
import FormDateTimePickerController from './FormDateTimePickerController';
import FormDateRangePickerController from './FormDateRangePickerController';

interface IProps {
  on_submit_form: any;
  form_inputs: any[];
  button_submit_label: string;
  button_submit_icon_class: any;
  show_button?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const PrimaryForm = ({
  on_submit_form,
  form_inputs,
  button_submit_label,
  button_submit_icon_class,
  show_button,
}: IProps) => {
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
          default_value={form_input.default_value}
          rules={form_input.rules}
          label={form_input.label}
          type={form_input.type}
          disabled={form_input.disabled}
          helper_text={form_input.helper_text}
          multiline_text={form_input.multiline_text}
          rows_text={form_input.rows_text}
          on_blur_function={form_input.on_blur_function}
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
          multiline_text={form_input.multiline_text}
          rows_text={form_input.rows_text}
          on_blur_function={form_input.on_blur_function}
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
          value_file={form_input.value_file ?? null}
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
          min_date={form_input.min_date ?? null}
          max_date={form_input.max_date ?? null}
          format={form_input.format ?? null}
        />
      );
    } else if (form_input.datum_type === 'date_picker_time_controller') {
      return (
        <FormDateTimePickerController
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
          min_date={form_input.min_date ?? null}
          max_date={form_input.max_date ?? null}
          format={form_input.format ?? null}
        />
      );
    } else if (form_input.datum_type === 'date_picker_range_controller') {
      return (
        <FormDateRangePickerController
          xs={form_input.xs}
          md={form_input.md}
          control_form={form_input.control_form}
          control_name={form_input.control_name}
          default_value={form_input.default_value}
          rules={form_input.rules}
          label_start={form_input.label_start}
          label_end={form_input.label_end}
          disabled={form_input.disabled}
          helper_text={form_input.helper_text}
          hidden_text={form_input.hidden_text ?? null}
          min_date={form_input.min_date ?? null}
          max_date={form_input.max_date ?? null}
          format={form_input.format ?? null}
        />
      );
    } else if (form_input.datum_type === 'image_uploader') {
      return (
        <ImageUploader
          xs={form_input.xs}
          md={form_input.md}
          margin={form_input.margin}
          selected_image={form_input.selected_imagen}
          width_image={form_input.width_image}
          height_image={form_input.height_image}
        />
      );
    }
  };

  return (
    <Box
      component="form"
      sx={{ width: '100%' }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={on_submit_form}
      margin={2}
    >
      <Grid container spacing={2}>
        {form_inputs.map((option, index) => (
          <TypeDatum key={index} form_input={option} />
        ))}
      </Grid>
      {(show_button ?? true) && (
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <FormButton
            variant_button="contained"
            on_click_function={null}
            icon_class={button_submit_icon_class}
            label={button_submit_label}
            type_button="submit"
          />
        </Stack>
      )}
    </Box>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default PrimaryForm;
