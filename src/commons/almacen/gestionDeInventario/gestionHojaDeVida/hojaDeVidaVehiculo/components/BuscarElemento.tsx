import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { get_cv_vehicle_id, get_vehicles_all_service } from '../store/thunks/cvVehiclesThunks';
import { set_current_cv_vehicle, set_current_vehicles, set_vehicles } from '../store/slices/indexCvVehiculo';
import type { IVehicles } from '../interfaces/CvVehiculo';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const SeleccionarVehiculo = () => {

    const { control: control_vehicle, reset: reset_vehicle, getValues: get_values } = useForm<IVehicles>();
    const { vehicles, current_cv_vehicle, current_vehicle } = useAppSelector((state) => state.cve);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(set_current_cv_vehicle({
            ...current_cv_vehicle,
            id_articulo: current_vehicle.id_bien,
            nombre: current_vehicle.nombre,
            codigo_bien: current_vehicle.codigo_bien,
            id_marca: current_vehicle.id_marca
        }))
        reset_vehicle(current_vehicle);
        if (current_vehicle.id_bien !== null) {
            void dispatch(get_cv_vehicle_id(current_vehicle.id_bien))
        }

    }, [current_vehicle]);

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
        {
            field: 'marca',
            headerName: 'Marca',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value || 'N/A'}
                </div>
            ),

        },
        {
            field: 'doc_identificador_nro',
            headerName: 'Placa serial',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value || 'N/A'}
                </div>
            ),

        },
        {
            field: 'estado',
            headerName: 'Estado vehículo',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value || 'N/A'}
                </div>
            ),

        },
        {
            field: 'tipo_bien',
            headerName: 'Tipo de bien',
            width: 200, flex: 1,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value || 'N/A'}
                </div>
            ),

        },

    ];
    const filter_vehicle: any = (async () => {
        void dispatch(get_vehicles_all_service())
    })


    const search_vehicle: any = (async () => {
        const cv_vehicle = get_values("id_bien")
        if (cv_vehicle !== null) {
            void dispatch(get_vehicles_all_service())
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
                    set_current_model={set_current_vehicles}
                    row_id={"id_bien"}
                    columns_model={columns_solicitudes}
                    models={vehicles}
                    set_models={set_vehicles}
                    button_submit_label='Buscar Vehículos'
                    form_inputs={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: {},
                            label: "Código",
                            type: "number",
                            disabled: true,
                            helper_text: "",
                            on_blur_function: search_vehicle
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_vehicle,
                            control_name: "nombre",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Nombre",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                    ]}
                    modal_select_model_title='Buscar Vehículos'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_vehicle,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Código",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]} get_filters_models={filter_vehicle} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default SeleccionarVehiculo;
