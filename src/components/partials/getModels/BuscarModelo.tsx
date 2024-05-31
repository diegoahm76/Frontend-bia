import Grid from '@mui/material/Grid';
import FormInputController from '../form/FormInputController';
import FormInputNoController from '../form/FormInputNoController';
import FormSelectController from '../form/FormSelectController';
import FormButton from '../form/FormButton';
import { Title } from '../../Title';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import SeleccionarModeloDialogForm from './SeleccionarModeloDialogForm';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Box, ButtonGroup, Divider } from '@mui/material';
import { v4 as uuid } from 'uuid';
import FormInputFileController from '../form/FormInputFileController';
import FormDatePickerController from '../form/FormDatePickerController';
import ImageUploader from '../form/ImageUploader';
import FormDateRangePickerController from '../form/FormDateRangePickerController';
import FormDateTimePickerController from '../form/FormDateTimePickerController';
import { download_pdf } from '../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../documentos-descargar/XLS_descargar';
import FormCheckboxController from '../form/FormCheckboxController';
import FormButtonGrid from '../form/FormButtonGrid';
import { Subtitle } from '../../Subtitle';
import { SubtitleOtros } from '../../SubtitleOtros';
import FormKeywords from '../form/FormKeywords';

interface IProps {
  form_inputs: any[];
  button_submit_label?: string;
  modal_select_model_title: string;
  modal_form_filters: any[];
  set_models: any;
  reset_values?: any;
  get_filters_models: any;
  models: any[];
  columns_model: GridColDef[] | null;
  row_id: string | number;
  set_current_model?: any;
  form_inputs_list?: any[];
  add_item_list?: any;
  title_list?: string;
  list?: any[];
  columns_list?: GridColDef[];
  row_list_id?: string | number;
  add_list_button_label?: string | null;
  show_inputs?: boolean;
  title_table_modal?: string | null;
  button_submit_disabled?: boolean | null;
  button_add_selection_hidden?: boolean | null;
  md_button?: number | null;
  button_icon_class?: any;
  button_origin_show?: boolean | null;
  show_search_button?: boolean | null;
  show_button_table?: boolean | null;
  modal_active_init?: boolean | null;
  open_search_modal?: boolean | null;
  set_open_search_modal?: any | null;
  border_show?: boolean | null;
  clear_fields?: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarModelo = ({
  form_inputs,
  button_submit_label,
  modal_select_model_title,
  modal_form_filters,
  set_models,
  // reset_values,
  get_filters_models,
  clear_fields,
  models,
  columns_model,
  row_id,
  set_current_model,
  form_inputs_list,
  add_item_list,
  title_list,
  list,
  columns_list,
  row_list_id,
  add_list_button_label,
  show_inputs,
  title_table_modal,
  button_submit_disabled,
  button_add_selection_hidden,
  md_button,
  button_icon_class,
  show_search_button,
  button_origin_show,
  show_button_table,
  modal_active_init,
  open_search_modal,
  set_open_search_modal,
  border_show,
}: IProps) => {
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
  const TypeDatum: any = (input: any) => {
    const form_input = input.form_input;
    if (form_input?.datum_type === 'input_controller') {
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
  useEffect(() => {
    if (modal_active_init !== null && modal_active_init !== undefined) {
      set_select_model_is_active(modal_active_init);
    }
  }, [modal_active_init]);
  useEffect(() => {
    if (modal_active_init !== null && modal_active_init !== undefined) {
      set_select_model_is_active(modal_active_init);
    }
  }, []);

  useEffect(() => {
    if (set_open_search_modal !== null && set_open_search_modal !== undefined) {
      set_open_search_modal(select_model_is_active);
    }
  }, [select_model_is_active]);

  useEffect(() => {
    if (open_search_modal === true) {
      handle_open_select_model();
    }
  }, [open_search_modal]);

  const handle_open_select_model = (): void => {
    set_select_model_is_active(true);
  };

  return (
    <Grid
      container
      direction="row"
      spacing={border_show ?? true ? 2 : 0}
      border={border_show ?? true ? 1 : 0}
      borderColor="lightgray"
      padding={border_show ?? true ? 2 : 0}
      borderRadius={border_show ?? true ? 2 : 0}
    >
      {(show_inputs ?? true) && (
        <>
          {form_inputs.map((option, index) => (
            <TypeDatum key={index} form_input={option} />
          ))}
          {(show_search_button ?? true) && (
            <Grid item xs={12} md={md_button ?? 3}>
              <FormButton
                variant_button="contained"
                on_click_function={handle_open_select_model}
                icon_class={button_icon_class ?? <SearchIcon />}
                label={button_submit_label ?? 'BUSCAR'}
                type_button="button"
                disabled={button_submit_disabled ?? false}
              />
            </Grid>
          )}
        </>
      )}
      <Divider />
      {form_inputs_list !== undefined && (
        <Grid
          container
          direction="row"
          padding={2}
          spacing={2}
          marginTop={2}
          borderTop={1}
          borderColor="lightgray"
        >
          {(show_inputs ?? true) && (
            <>
              {form_inputs_list?.map((option, index) => (
                <TypeDatum key={index} form_input={option} />
              ))}
              <Grid item xs={12} md={3}>
                {(show_button_table ?? true) && (
                  <FormButton
                    variant_button="contained"
                    on_click_function={add_item_list}
                    icon_class={<PlaylistAddCheckIcon />}
                    label={add_list_button_label ?? 'AGREGAR'}
                    type_button="button"
                  />
                )}
              </Grid>
            </>
          )}

          <Grid
            container
            spacing={2}
            justifyContent="center"
            direction="row"
            marginTop={2}
          >
            <Box sx={{ width: '80%' }}>
              <Grid item xs={12} md={12} marginTop={-2}>
                <Title title={title_list ?? ''}></Title>
              </Grid>
              <Grid item xs={12} md={12} marginTop={2}>
                <ButtonGroup
                  style={{
                    margin: 7,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {download_xls({
                    nurseries: list as any[],
                    columns: columns_list as any[],
                  })}
                  {download_pdf({
                    nurseries: list,
                    columns: columns_list,
                    title: title_list,
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={list ?? []}
                  columns={columns_list ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) =>
                    row[row_list_id ?? uuid()] === null
                      ? uuid()
                      : row[row_list_id ?? uuid()]
                  }
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      )}
      <SeleccionarModeloDialogForm
        set_current_model={set_current_model}
        is_modal_active={select_model_is_active}
        set_is_modal_active={set_select_model_is_active}
        modal_title={modal_select_model_title}
        form_filters={modal_form_filters}
        set_models={set_models}
        button_origin_show={button_origin_show}
        get_filters_models={get_filters_models}
        clear_fields={clear_fields}
        models={models}
        columns_model={columns_model}
        row_id={row_id}
        title_table_modal={title_table_modal ?? 'Resultados de la búsqueda'}
        button_add_selection_hidden={button_add_selection_hidden ?? false}
      />
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default BuscarModelo;
