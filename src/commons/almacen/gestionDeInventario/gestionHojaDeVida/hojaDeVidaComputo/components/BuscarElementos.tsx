import { Chip, Grid, } from '@mui/material';
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
            minWidth: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'nombre',
            headerName: 'Nombre',
            minWidth: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'cod_tipo_activo',
            headerName: 'Tipo Activo',
            minWidth: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.row.cod_tipo_activo == 'Com' ? 'Computador' : 'N/A'}
                </div>
            ),

        },
        {
            field: 'marca',
            headerName: 'Marca',
            minWidth: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value || 'N/A'}
                </div>
            ),

        },
        {
            field: 'doc_identificador_nro',
            headerName: 'Serial',
            minWidth: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.row.doc_identificador_nro}
                </div>
            ),

        },
        {
            field: 'tiene_hoja_vida',
            headerName: 'Tiene hoja de vida',
            minWidth: 200, flex: 1,
            renderCell: (params) => {
                return params.row.tiene_hoja_vida === true ? (
                    <Chip size="small" label="SI" color="success" variant="outlined" />
                ) : (
                    <Chip size="small" label="NO" color="error" variant="outlined" />
                );
            },
        },
        {
            field: 'tipo_bien',
            headerName: 'Tipo de bien',
            minWidth: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value || 'N/A'}
                </div>
            ),

        },
        {
            field: 'nro_elemento_bien',
            headerName: 'Consecutivo de bien',
            minWidth: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value || 'N/A'}
                </div>
            ),

        },
        {
            field: 'estado',
            headerName: 'Estado',
            minWidth: 120, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.row.estado}
                </div>
            ),

        },

    ];
    const filter_computer: any = (async () => {
        const placa_serial = get_values("doc_identificador_nro");
        const nombre = get_values("nombre");
        void dispatch(get_computers_all_service(nombre, placa_serial))
    })

    const search_computer: any = (async () => {
        const cv_computer = get_values("id_bien")
        if (cv_computer !== null) {
            void dispatch(get_computers_all_service())
        }
    })

    const clear_fields: any = (async () => {
        reset_computo({
            doc_identificador_nro: "",
            nombre: ""
        });
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
                            md: 5,
                            control_form: control_computo,
                            control_name: "nombre",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Nombre",
                            type: "text",
                            disabled: true,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_computo,
                            control_name: "doc_identificador_nro",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Serial",
                            type: "text",
                            disabled: true,
                            helper_text: "",
                        },
                    ]}
                    modal_select_model_title='Buscar Computadores'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_computo,
                            control_name: "nombre",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Nombre",
                            type: "text",
                            disabled: false,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_computo,
                            control_name: "doc_identificador_nro",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Serial",
                            type: "text",
                            disabled: false,
                            helper_text: "",
                        },
                    ]} get_filters_models={filter_computer} clear_fields={clear_fields}/>
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarComputer;
