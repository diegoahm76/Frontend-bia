import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import { Button, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import SeleccionarModeloDialogForm from '../getModels/SeleccionarModeloDialogForm';
import { GridColDef } from '@mui/x-data-grid';
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
  margin?: number;
  marginTop?: number;
  control_form: any;
  control_name: string;
  default_value: string | number | null;
  rules: IRules;
  label: string;
  type: string;
  disabled: boolean;
  helper_text: string;
  multiline_text?: boolean;
  rows_text?: number;
  on_blur_function?: any;
  set_value?: any;
  hidden_text?: boolean | null;
  step_number?: string | null;
  on_click_function: any;
  icon_class: any;
  disabled_button?: boolean | null;
  modal_active_init?: boolean | null;
  open_search_modal?: boolean | null;
  set_open_search_modal?: any | null;
  set_current_model?: any;
  modal_select_model_title: string;
  modal_form_filters: any[];
  set_models: any;
  button_origin_show?: boolean | null;
  get_filters_models: any;
  models: any[];
  columns_model: GridColDef[] | null;
  row_id: string | number;
  title_table_modal?: string | null;
  button_add_selection_hidden?: boolean | null;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const FormInputSearchModelController = ({
  xs,
  md,
  control_form,
  control_name,
  rules,
  label,
  type,
  disabled,
  helper_text,
  default_value,
  multiline_text,
  rows_text,
  on_blur_function,
  set_value,
  hidden_text,
  marginTop,
  margin,
  step_number,
  on_click_function,
  icon_class,
  disabled_button,
  modal_active_init,
  open_search_modal,
  set_open_search_modal,
}: IProps) => {
  const [select_model_is_active, set_select_model_is_active] =
    useState<boolean>(open_search_modal ?? false);
  const input_props = type === 'number' ? { step: step_number ?? 0.00001 } : {};
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
      if (!select_model_is_active) {
        set_open_search_modal(select_model_is_active);
      }
    }
  }, [select_model_is_active]);

  useEffect(() => {
    if (open_search_modal !== select_model_is_active) {
      handle_open_select_model();
    }
  }, [open_search_modal]);

  const handle_open_select_model = (): void => {
    if (!select_model_is_active) {
      set_select_model_is_active(true);
    }
  };
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
          <Controller
            name={control_name}
            control={control_form}
            defaultValue={default_value}
            rules={{
              required: rules.required_rule?.rule,
              min: rules.min_rule?.rule,
              max: rules.max_rule?.rule,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="dense"
                fullWidth
                size="small"
                label={label}
                variant="outlined"
                type={type}
                disabled={disabled ?? false}
                value={value === null ? '' : value}
                multiline={multiline_text ?? false}
                rows={rows_text ?? 1}
                onChange={onChange}
                onBlur={on_blur_function}
                error={!(error == null)}
                helperText={
                  error != null
                    ? error.type === 'required'
                      ? rules.required_rule?.message
                      : error.type === 'min'
                      ? rules.min_rule?.message
                      : rules.max_rule?.message
                    : helper_text
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        color="primary"
                        onClick={on_click_function ?? null}
                        disabled={disabled_button ?? false}
                      >
                        {icon_class ?? <SearchIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
      )}
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default FormInputSearchModelController;
