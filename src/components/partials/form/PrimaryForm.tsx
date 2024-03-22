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
import FormCheckboxController from './FormCheckboxController';
import FormButtonGrid from './FormButtonGrid';
import FormKeywords from './FormKeywords';

interface IProps {
  on_submit_form: any;
  form_inputs: any[];
  button_submit_label: string;
  button_submit_icon_class: any;
  button_submit_type?: any | null;
  button_submit_function?: any | null;
  show_button?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const PrimaryForm = ({
  on_submit_form,
  form_inputs,
  button_submit_label,
  button_submit_icon_class,
  show_button,
  button_submit_type,
  button_submit_function,
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
          multiline_text={form_input.multiline_text ?? false}
          rows_text={form_input.rows_text ?? 1}
          on_blur_function={form_input.on_blur_function ?? null}
          set_value={form_input.set_value ?? null}
          hidden_text={form_input.hidden_text ?? null}
          step_number={form_input.step_number ?? null}
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
          auto_focus={form_input.auto_focus ?? false}
          on_change_function={form_input.on_change_function ?? null}
          none_option={form_input.none_option ?? null}
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
          margin={form_input.margin ?? null}
        />
      );
    } else if (form_input.datum_type === 'image_uploader') {
      return (
        <ImageUploader
          xs={form_input.xs}
          md={form_input.md}
          margin={form_input.margin}
          selected_image={form_input.selected_image}
          width_image={form_input.width_image}
          height_image={form_input.height_image}
        />
      );
    } else if (form_input.datum_type === 'checkbox_controller') {
      return (
        <FormCheckboxController
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
          margin={form_input.margin ?? null}
          marginTop={form_input.marginTop ?? null}
          checked={form_input.checked ?? null}
          set_checked={form_input.set_checked ?? null}
        />
      );
    } else if (form_input.datum_type === 'button') {
      return (
        <FormButtonGrid
          xs={form_input.xs}
          md={form_input.md}
          label={form_input.label}
          disabled={form_input.disabled}
          hidden_text={form_input.hidden_text ?? null}
          margin={form_input.margin ?? null}
          marginTop={form_input.marginTop ?? null}
          on_click_function={form_input.on_click_function ?? null}
          icon_class={form_input.icon_class ?? null}
          variant_button={form_input.variant_button ?? null}
          type_button={form_input.type_button ?? null}
          style_button={form_input.style_button ?? null}
          color_button={form_input.color_button ?? null}
        />
      );
    } else if (form_input.datum_type === 'keywords') {
      return (
        <FormKeywords
          initial_values={form_input.initial_values}
          hidden_text={form_input.hidden_text}
          character_separator={form_input.character_separator}
          set_form={form_input.set_form}
          keywords={form_input.keywords ?? null}
          disabled={form_input.disabled ?? null}
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
          <Grid item xs={12} md={3} margin={0} marginTop={0}>
            <FormButton
              variant_button="contained"
              on_click_function={button_submit_function ?? null}
              icon_class={button_submit_icon_class}
              label={button_submit_label}
              type_button={button_submit_type ?? 'submit'}
            />
          </Grid>
        </Stack>
      )}
    </Box>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default PrimaryForm;
