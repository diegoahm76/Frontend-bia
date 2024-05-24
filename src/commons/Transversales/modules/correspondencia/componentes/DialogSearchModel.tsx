import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Controller } from 'react-hook-form';
import { Button, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import SeleccionarModeloDialogForm from '../../../../../components/partials/getModels/SeleccionarModeloDialogForm';
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
  disabled_button?: boolean | null;
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
  select_model_is_active?: boolean | null;
  set_select_model_is_active?: any;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DialogSearchModel = ({
  set_current_model,
  modal_select_model_title,
  modal_form_filters,
  set_models,
  button_origin_show,
  get_filters_models,
  models,
  columns_model,
  row_id,
  title_table_modal,
  button_add_selection_hidden,
  select_model_is_active,
  set_select_model_is_active,
}: IProps) => {
  return (
    <>
      <SeleccionarModeloDialogForm
        set_current_model={set_current_model}
        is_modal_active={select_model_is_active ?? false}
        set_is_modal_active={set_select_model_is_active}
        modal_title={modal_select_model_title}
        form_filters={modal_form_filters}
        set_models={set_models}
        button_origin_show={button_origin_show}
        get_filters_models={get_filters_models}
        models={models}
        columns_model={columns_model}
        row_id={row_id}
        title_table_modal={title_table_modal ?? 'Resultados de la búsqueda'}
        button_add_selection_hidden={button_add_selection_hidden ?? false}
      />
    </>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default DialogSearchModel;
