import { Grid } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { type GridColDef } from '@mui/x-data-grid';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { get_solicitud_service } from '../store/thunks/solicitudViveroThunks';
import { set_current_solicitud, set_solicitudes } from '../store/slices/indexSolicitud';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

interface IProps {

    control_solicitud_aprobada: any;
    get_values: any

}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Aprobacion = ({

    control_solicitud_aprobada,
    get_values
}: IProps) => {



    const { solicitudes } = useAppSelector((state: { solicitud_vivero: any; }) => state.solicitud_vivero);


    const dispatch = useAppDispatch();

    const columns_solicitudes: GridColDef[] = [
        { field: 'id_solicitud_consumibles', headerName: 'ID', width: 20 },
        {
            field: 'fecha_solicitud',
            headerName: 'Fecha de solicitud',
            width: 400,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },
        {
            field: 'persona_solicita',
            headerName: 'Observación',
            width: 350,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),

        },

    ];
    const get_solicitudes_filtro: any = (async () => {
        void dispatch(get_solicitud_service())
    })



    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}

            >
                <BuscarModelo
                    set_current_model={set_current_solicitud}
                    row_id={"id_vivero_solicitud"}
                    columns_model={columns_solicitudes}
                    models={solicitudes}
                    get_filters_models={get_solicitudes_filtro}
                    set_models={set_solicitudes}
                    show_search_button={false}
                    form_inputs={[

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_aprobada,
                            control_name: "estado_aprobacion_responsable",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Estado de aprobación",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: [{ label: "Aprobado", value: "A" }, { label: "Rechazado", value: "R" }],
                            option_label: "label",
                            option_key: "value",

                        },


                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_solicitud_aprobada,
                            control_name: "justificacion_aprobacion_responsable",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Justificación",
                            multiline_text: true,
                            rows_text: 4,
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },

                    ]}
                    modal_select_model_title='Buscar solicitud'
                    modal_form_filters={[
                        // {
                        //     datum_type: "input_controller",
                        //     xs: 12,
                        //     md: 12,
                        //     control_form: control_solicitud_aprobada,
                        //     control_name: "justificacion_aprobacion_responsable",
                        //     default_value: "",
                        //     rules: { required_rule: { rule: false, message: "requerido" } },
                        //     label: "Justificación",
                        //     type: "number",
                        //     disabled: false,
                        //     helper_text: "",
                        // }
                    ]}
                />
            </Grid>
        </>
    );
}


// eslint-disable-next-line no-restricted-syntax
export default Aprobacion;


