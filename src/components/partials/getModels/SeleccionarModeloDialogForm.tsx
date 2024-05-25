/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useState, type Dispatch, type SetStateAction } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Button,
  Divider,
  Grid,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Title } from '../../Title';
import CloseIcon from '@mui/icons-material/Close';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FormInputController from '../form/FormInputController';
import FormInputNoController from '../form/FormInputNoController';
import FormSelectController from '../form/FormSelectController';
import FormButton from '../form/FormButton';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import FormInputFileController from '../form/FormInputFileController';
import FormDatePickerController from '../form/FormDatePickerController';
import { v4 as uuid } from 'uuid';
import ButtonGroup from '@mui/material/ButtonGroup';
import { download_xls } from '../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../documentos-descargar/PDF_descargar';
import ImageUploader from '../form/ImageUploader';
import FormDateTimePickerController from '../form/FormDateTimePickerController';
import FormDateRangePickerController from '../form/FormDateRangePickerController';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import FormCheckboxController from '../form/FormCheckboxController';
import FormButtonGrid from '../form/FormButtonGrid';
import FormKeywords from '../form/FormKeywords';
import { setCurrentPersonaRespuestaUsuario } from '../../../commons/gestorDocumental/TramitesOServicios/respuestaRequerimientoOpa/toolkit/slice/ResRequerimientoOpaSlice';
interface IProps {
  set_models: any;
  form_filters: any[];
  modal_title: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  get_filters_models: any;
  models: any[];
  columns_model: GridColDef[] | null;
  row_id: string | number;
  set_current_model: any;
  title_table_modal?: string | null;
  button_add_selection_hidden?: boolean | null;
  button_origin_show?: boolean | null;
  search_model_function?: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarModeloDialogForm = ({
  is_modal_active,
  set_is_modal_active,
  form_filters,
  modal_title,
  set_models,
  get_filters_models,
  models,
  columns_model,
  row_id,
  set_current_model,
  title_table_modal,
  button_add_selection_hidden,
  button_origin_show,
  search_model_function,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [selected_row, set_selected_row] = useState([]);

  const { currentPersonaRespuestaUsuario } = useAppSelector((state) => state.ResRequerimientoOpaSlice);

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

  const handle_close_select_model = (): void => {
    set_is_modal_active(false);
  };

  const handle_selection_change = (selection: any): void => {
    set_selected_row(selection);
  };

  const select_model = (): void => {
    const model = models.find((p) => p[row_id] === selected_row[0]);
    if (model !== undefined) {
      dispatch(set_current_model(model));
      console.log('model', model);
      dispatch(setCurrentPersonaRespuestaUsuario({
        ...currentPersonaRespuestaUsuario,
        ...model,
      } as any));
      set_models([]);
      handle_close_select_model();
    }
  };
  const search_models = (): void => {
    search_model_function();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_select_model}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          borderColor: '#dddddd',

          margin: 4,
        }}
      >
        {/* <Title title={ modal_title  ?? 'Resultados de la busqueda'} ></Title>
        
            <Divider /> */}

        <DialogContent sx={{ mb: '0px' }}>
          {form_filters.length > 0 && (
            <Grid
              container
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mb: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
                marginTop: '10px',
                marginLeft: '-6px',
              }}
              spacing={2}
              direction="row"
            >
              <Title title={modal_title ?? 'Resultados de la busqueda'}></Title>
              {form_filters.map((option, index) => (
                <TypeDatum key={index} form_input={option} />
              ))}
              <Grid item xs={12} md={2}>
                <FormButton
                  variant_button="contained"
                  on_click_function={get_filters_models}
                  icon_class={<SearchIcon />}
                  label="BUSCAR"
                  type_button="button"
                />
              </Grid>
            </Grid>
          )}
          {/* {models.length > 0 && */}
          <Grid
            container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',

              boxShadow: '0px 3px 6px #042F4A26',
              marginLeft: '-6px',
            }}
            spacing={2}
            justifyContent="center"
            direction="row"
            marginTop={2}
          >
            <Box sx={{ width: '100%' }}>
              <Title
                title={title_table_modal ?? 'Resultados de la busqueda'}
              ></Title>
              <Grid
                container
                justifyContent="flex-end"
                sx={{ marginTop: '6px' }}
              >
                <ButtonGroup style={{ margin: 7 }}>
                  {download_xls({
                    nurseries: models,
                    columns: columns_model == null ? [] : columns_model,
                  })}
                  {download_pdf({
                    nurseries: models,
                    columns: columns_model == null ? [] : columns_model,
                    title: title_table_modal,
                  })}
                </ButtonGroup>
              </Grid>

              <DataGrid
                onSelectionModelChange={handle_selection_change}
                density="compact"
                autoHeight
                rows={models ?? []}
                columns={columns_model ?? []}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) =>
                  row[row_id ?? uuid()] === null
                    ? uuid()
                    : row[row_id ?? uuid()]
                }
                selectionModel={selected_row}
              />
            </Box>
          </Grid>
          {/* } */}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handle_close_select_model}
              startIcon={<CloseIcon />}
            >
              CANCELAR
            </Button>
            {!(button_add_selection_hidden ?? false) && (
              <Button
                variant="contained"
                onClick={select_model}
                startIcon={<PlaylistAddCheckIcon />}
              >
                Agregar seleccion
              </Button>
            )}
            {(button_origin_show ?? false) && (
              <Button
                variant="contained"
                onClick={search_models}
                startIcon={<AltRouteIcon />}
              >
                Otros orígenes
              </Button>
            )}
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarModeloDialogForm;
