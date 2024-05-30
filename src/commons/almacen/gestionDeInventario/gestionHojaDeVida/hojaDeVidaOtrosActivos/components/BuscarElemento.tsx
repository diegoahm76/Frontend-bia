import { Chip, Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_cv_others_id, get_others_all_service } from '../store/thunks/cvOtrosActivosThunks';
import { set_current_cv_others, set_current_others, set_others } from '../store/slices/indexCvOtrosActivos';
import type { IcvOthers } from '../interfaces/CvOtrosActivos';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarOtros = () => {
    const { control: control_other, reset: reset_other, getValues: get_values } = useForm<IcvOthers>();
    const { others, current_other, current_cv_other } = useAppSelector((state) => state.cvo);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(set_current_cv_others({
            ...current_cv_other,
            nombre: current_other.nombre,
            codigo_bien: current_other.codigo_bien,
            id_marca: current_other.id_marca,
            id_articulo: current_other.id_bien


        }))
        reset_other(current_other);
        if (current_other.id_bien !== null) {
            void dispatch(get_cv_others_id(current_other.id_bien))
        }

    }, [current_other]);
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
                    {params.row.cod_tipo_activo == 'OAc' ? 'Otros Activos' : 'N/A'}
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
    const filter_other: any = (async () => {
        const placa_serial = get_values("doc_identificador_nro");
        const nombre = get_values("nombre");
        void dispatch(get_others_all_service(nombre, placa_serial))
    })


    const search_other: any = (async () => {
        const cv_other = get_values("id_bien")
        const placa_serial = get_values("doc_identificador_nro");
        const nombre = get_values("nombre");
        if (cv_other !== null) {
        void dispatch(get_others_all_service(nombre, placa_serial))
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
                    set_current_model={set_current_others}
                    row_id={"id_bien"}
                    columns_model={columns_solicitudes}
                    models={others}
                    set_models={set_others}
                    button_submit_label='Buscar Otros Activos'
                    form_inputs={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_other,
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
                            control_form: control_other,
                            control_name: "doc_identificador_nro",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Serial",
                            type: "text",
                            disabled: false,
                            helper_text: "",
                        },
                    ]}
                    modal_select_model_title='Buscar Otros Activos'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_other,
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
                            control_form: control_other,
                            control_name: "doc_identificador_nro",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Serial",
                            type: "text",
                            disabled: false,
                            helper_text: "",
                        },
                    ]} get_filters_models={filter_other} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarOtros;
