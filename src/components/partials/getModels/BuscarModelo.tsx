
import Grid from '@mui/material/Grid';
import FormInputController from "../form/FormInputController";
import FormInputNoController from "../form/FormInputNoController";
import FormSelectController from "../form/FormSelectController";
import FormButton from "../form/FormButton";
import { Title} from '../../Title';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import SeleccionarModeloDialogForm from "./SeleccionarModeloDialogForm";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Box, Divider } from '@mui/material';
import { v4 as uuid } from 'uuid';
import FormInputFileController from '../form/FormInputFileController';
import FormDatePickerController from '../form/FormDatePickerController';


interface IProps {
    form_inputs: any[];
    button_submit_label: string;
    modal_select_model_title: string;
    modal_form_filters: any[];
    set_models: any;
    reset_values?: any;
    get_filters_models: any;
    models: any[];
    columns_model: GridColDef[];
    row_id: string | number;
    set_current_model?: any;
    form_inputs_list?: any[];
    add_item_list?: any;
    title_list?: string;
    list?: any[];
    columns_list?: GridColDef[];
    row_list_id?: string |number;
    add_list_button_label?:string|null;
    show_inputs?: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const BuscarModelo = ({
    form_inputs,
    button_submit_label,
    modal_select_model_title,
    modal_form_filters,
    set_models,
    reset_values,
    get_filters_models,
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
    show_inputs
}: IProps) => {
    const [select_model_is_active, set_select_model_is_active] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
    const TypeDatum: any = (input: any) => {
        const form_input = input.form_input
        if (form_input.datum_type === "input_controller") {
            return <FormInputController
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
            />;
        } else if (form_input.datum_type === "input_no_controller") {
            return <FormInputNoController
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
            />;
        } else if (form_input.datum_type === "select_controller") {
            return <FormSelectController
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
        } else if (form_input.datum_type === "title") {
            return <Title title={form_input.title_label}></Title>
        } else if (form_input.datum_type === "input_file_controller"){
            return <FormInputFileController
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
        />; 
        } else if (form_input.datum_type === "date_picker_controller"){
            return <FormDatePickerController
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
            min_date={form_input.min_date ?? ""}
            max_date={form_input.max_date ?? ""}
            format={form_input.max_date ?? null}
        />; 
        }
    }

    const handle_open_select_model = (): void => {
        set_select_model_is_active(true);
    };

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            border={1}
            borderColor="lightgray"
            padding={2}
            borderRadius={2}
        >
            {(show_inputs ?? true) &&
            <>
                {form_inputs.map((option, index) => (
                    <TypeDatum key={index} form_input={option} />
                ))}

                <Grid
                    item
                    xs={12}
                    md={3}
                >
                    <FormButton
                        variant_button="contained"
                        on_click_function={handle_open_select_model}
                        icon_class={<SearchIcon />}
                        label={button_submit_label ?? "BUSCAR"}
                        type_button="button"
                    />
                </Grid>
            </>
            }
            <Divider />
            {form_inputs_list !== undefined && 
                <Grid
                container
                direction="row"
                padding={2}
                spacing={2}
                marginTop={2}
                borderTop={1}
                borderColor="lightgray"
                >
                    {(show_inputs ?? true) &&
                    <>
                    {form_inputs_list?.map((option, index) => (

                        <TypeDatum key={index} form_input={option} />
                    ))}
                    <Grid
                        item
                        xs={12}
                        md={3}
                    >
                        <FormButton
                            variant_button="contained"
                            on_click_function={add_item_list}
                            icon_class={<PlaylistAddCheckIcon />}
                            label={add_list_button_label??"AGREGAR"}
                            type_button="button"
                        />
                    </Grid>
                    </>
                    }

                    <Grid container spacing={2} justifyContent="center" direction="row" marginTop={2}>
                        <Box sx={{ width: '80%' }}>
                            <Title title={title_list??""}></Title>
                            <DataGrid
                                density="compact"
                                autoHeight
                                rows={list??[]}
                                columns={columns_list??[]}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                experimentalFeatures={{ newEditingApi: true }}
                                getRowId={(row) => row[row_list_id??""] === null?uuid():row[row_list_id??""]}
                            />
                        </Box>
                    </Grid>
                </Grid>
            }
            <SeleccionarModeloDialogForm
                set_current_model={set_current_model}
                is_modal_active={select_model_is_active}
                set_is_modal_active={set_select_model_is_active}
                modal_title={modal_select_model_title}
                form_filters={modal_form_filters}
                set_models={set_models}
                get_filters_models={get_filters_models}
                models={models}
                columns_model={columns_model}
                row_id={row_id}
            />
        </Grid>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default BuscarModelo;