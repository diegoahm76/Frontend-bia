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
import FormInputController from "../form/FormInputController";
import FormInputNoController from "../form/FormInputNoController";
import FormSelectController from "../form/FormSelectController";
import FormButton from "../form/FormButton";
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch } from '../../../hooks';
import FormInputFileController from '../form/FormInputFileController';
import FormDatePickerController from '../form/FormDatePickerController';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Dowlade_Xls } from '../../../documentos-descargar/XLS_descargar';
import { Dowlade_Pdf } from '../../../documentos-descargar/PDF_descargar';
interface IProps {
    set_models: any;
    form_filters: any[];
    modal_title: string;
    is_modal_active: boolean;
    set_is_modal_active: Dispatch<SetStateAction<boolean>>;
    get_filters_models: any;
    models: any[]
    columns_model: GridColDef[];
    row_id: string | number;
    set_current_model: any;
    title_table_modal?: string | null;
    button_add_selection_hidden?: boolean | null;

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
    button_add_selection_hidden
}: IProps) => {
    const dispatch = useAppDispatch();
    const [selected_row, set_selected_row] = useState([]);

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

    const handle_close_select_model = (): void => {
        set_is_modal_active(false);
    };

    const handle_selection_change = (selection: any): void => {
        set_selected_row(selection);
    };

    const select_model = (): void => {
        const model = models.find((p) => p[row_id] === selected_row[0])
        if (model !== undefined) {
            dispatch(set_current_model(model));
            set_models([])
            handle_close_select_model();
        }
    };
    const button_style = {
        color: 'white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '10px'
    };

    const handle_clickxls = (): void => { Dowlade_Xls({ nurseries: models, columns: columns_model }); };
    const handle_clickpdf = (): void => { Dowlade_Pdf({ nurseries: models, columns: columns_model }); };

    return (  
        <Dialog
            fullWidth
            maxWidth="xl"
            open={is_modal_active}
            onClose={handle_close_select_model}>

          <Box sx={{
               
                backgroundColor: 'white',
                borderColor: "#dddddd",
               
                margin: 4
            }}>
           
            <Title title={ modal_title  ?? 'Resultados de la busqueda'} ></Title>
        
            <Divider />




    


            <DialogContent sx={{ mb: '0px' }}>
                {form_filters.length > 0 &&
                <Grid container spacing={2} direction="row">
                    {form_filters.map((option, index) => (
                        <TypeDatum key={index} form_input={option} />
                    ))}
                    <Grid
                        item
                        xs={12}
                        md={2}
                    >
                        <FormButton
                            variant_button="contained"
                            on_click_function={get_filters_models}
                            icon_class={<SearchIcon />}
                            label="BUSCAR"
                            type_button="button"
                        />
                    </Grid>
                </Grid>
                }
                {models.length > 0 &&
                    <Grid container spacing={2} justifyContent="center" direction="row" marginTop={2}>
                        <Box sx={{ width: '100%' }}>
                            <Title title={title_table_modal ?? 'Resultados de la busqueda'} ></Title>



                            <ButtonGroup style={{ margin: 7 }}  >
                                    <Button style={{ ...button_style, backgroundColor: '#335B1E' }} onClick={handle_clickxls}>
                                    <i className="pi pi-file-excel"></i>
                                </Button>

                                    <Button style={{ ...button_style, backgroundColor: 'red' }} onClick={handle_clickpdf}>
                                    <i className="pi pi-file-pdf"></i>
                                </Button>

                            </ButtonGroup>




                            <DataGrid
                                onSelectionModelChange={handle_selection_change}
                                density="compact"
                                autoHeight
                                rows={models}
                                columns={columns_model}
                                pageSize={10}
                                rowsPerPageOptions={[10]}
                                experimentalFeatures={{ newEditingApi: true }}
                                getRowId={(row) => row[row_id]}
                                selectionModel={selected_row}
                            />
                        </Box>
                    </Grid>
                }
            </DialogContent>
            <Divider />
            <DialogActions>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ mr: '15px', mb: '10px', mt: '10px' }}
                >
                    <Button
                        variant="outlined"
                        onClick={handle_close_select_model}
                        startIcon={<CloseIcon />}
                    >
                        CANCELAR
                    </Button>
                    {!(button_add_selection_hidden ?? false)  && 
                        <Button
                            variant="contained"
                            onClick={select_model}
                            startIcon={<PlaylistAddCheckIcon />}
                        >
                            Agregar seleccion
                        </Button>
                    }
                </Stack>
            </DialogActions>
             </Box> 
        </Dialog>
   );
};

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarModeloDialogForm;
