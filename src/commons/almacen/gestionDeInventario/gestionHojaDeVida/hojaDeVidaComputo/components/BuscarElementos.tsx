import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_computers_all_service, get_cv_computer_id } from '../store/thunks/cvComputoThunks';
import { set_current_cv_computer, set_computers, set_current_computer } from '../store/slices/indexCvComputo';
import { useEffect } from 'react';
import type { IComputers } from '../interfaces/CvComputo';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarComputer = () => {
    const { control: control_computo, reset: reset_computo, getValues: get_values } = useForm<IComputers>();
    const { computers, current_computer, current_cv_computer } = useAppSelector((state) => state.cv);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(set_current_cv_computer({
            ...current_cv_computer,
            id_articulo: current_computer.id_bien,
            nombre: current_computer.nombre,
            codigo_bien: current_computer.codigo_bien,
            id_marca: current_computer.id_marca
        }))
        reset_computo(current_computer);
        if (current_computer.id_bien !== null) {
            void dispatch(get_cv_computer_id(current_computer.id_bien))
        }

    }, [current_computer]);

    const columns_solicitudes: GridColDef[] = [
        {
            field: 'codigo_bien',
            headerName: 'Código',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'cod_tipo_activo',
            headerName: 'Tipo de bien',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },

    ];
    const filter_computer: any = (async () => {
        void dispatch(get_computers_all_service())

    })


    const search_computer: any = (async () => {
        const cv_computer = get_values("id_bien")
        if (cv_computer !== null) {
            void dispatch(get_computers_all_service())
        }
    })


    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}
                marginTop={2}

            >
                <BuscarModelo
                    set_current_model={set_current_computer}
                    row_id={"id_bien"}
                    columns_model={columns_solicitudes}
                    models={computers}
                    set_models={set_computers}
                    button_submit_label='Buscar Computadores'
                    form_inputs={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: {},
                            label: "Código",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                            on_blur_function: search_computer
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "nombre",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Nombre",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                    ]}
                    modal_select_model_title='Buscar Computadores'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_computo,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Código",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]} get_filters_models={filter_computer} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarComputer;
