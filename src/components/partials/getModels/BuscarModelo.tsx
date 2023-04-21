
import Grid from '@mui/material/Grid';
import FormInputController from "../form/FormInputController";
import FormInputNoController from "../form/FormInputNoController";
import FormSelectController from "../form/FormSelectController";
import FormButton from "../form/FormButton";
import { Title } from '../../Title';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import SeleccionarModeloDialogForm from "./SeleccionarModeloDialogForm";
import { type GridColDef } from '@mui/x-data-grid';

interface IProps {
    form_inputs: any[];
    button_submit_label: string;
    modal_select_model_title: string;
    modal_form_filters: any[];
    set_models: any;
    reset_values: any;
    get_filters_models: any;
    models: any[];
    columns_model: GridColDef[];
    row_id: string | number;
    set_current_model?: any;

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
    set_current_model
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
                multiline_text={form_input.multiline_text}
                rows_text={form_input.rows_text}
                on_blur_function={form_input.on_blur_function}
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
                multiline_text={form_input.multiline_text}
                rows_text={form_input.rows_text}
                on_blur_function={form_input.on_blur_function}
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
            />
        } else if (form_input.datum_type === "title") {
            return <Title title={form_input.title_label}></Title>

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
            <SeleccionarModeloDialogForm
                set_current_model= {set_current_model}
                is_modal_active={select_model_is_active}
                set_is_modal_active={set_select_model_is_active}
                modal_title={modal_select_model_title}
                form_filters={modal_form_filters}
                set_models={set_models}
                reset_values_filters={reset_values}
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