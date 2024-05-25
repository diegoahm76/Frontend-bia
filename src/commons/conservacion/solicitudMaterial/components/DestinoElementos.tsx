import { Grid } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react';
import { type IList } from '../../../../interfaces/globalModels';
import { api } from '../../../../api/axios';
import { type GridColDef } from '@mui/x-data-grid';
import BuscarModelo from '../../../../components/partials/getModels/BuscarModelo';
import { get_solicitud_service } from '../store/thunks/solicitudViveroThunks';
import { set_current_solicitud, set_solicitudes } from '../store/slices/indexSolicitud';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
// eslint-disable-next-line @typescript-eslint/no-unused-vars




interface IProps {
    title?: string;
    control_solicitud: any;
    get_values: any

}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const DestinoSolicitud = ({
    title,
    control_solicitud,
    get_values
}: IProps) => {



    const { solicitudes } = useAppSelector((state: { solicitud_vivero: any; }) => state.solicitud_vivero);

    const [municipalities, set_municipalities] = useState<IList[]>([]);
    const text_choise_adapter: any = (dataArray: string[]) => {
        const data_new_format: IList[] = dataArray.map((dataOld) => ({
            label: dataOld[1],
            value: dataOld[0],
        }));
        return data_new_format;
    };
    useEffect(() => {
        const get_selects_options: any = async () => {
            try {
                const { data: municipalities_no_format } = await api.get(
                    'choices/municipios/'
                );

                const municipalities_format: IList[] = text_choise_adapter(
                    municipalities_no_format
                );

                set_municipalities(municipalities_format);
            } catch (err) {
                //  console.log('')(err);
            }
        };

        void get_selects_options();
    }, []);


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
                            datum_type: "title",
                            title_label: title ?? "hh"
                        },

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "con_municipio_destino",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Municipio",
                            disabled: false,
                            helper_text: "Debe seleccionar campo",
                            select_options: municipalities,
                            option_label: "label",
                            option_key: "value",


                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "nombre_predio_destino",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "Requerido" } },
                            label: "Nombre del predio",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_solicitud,
                            control_name: "direccion_destino",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Requerido" } },
                            label: "Dirección del predio",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud,
                            control_name: "coordenadas_destino_lat",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Requerido" } },
                            label: "Latitud",
                            type: "number",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_solicitud,
                            control_name: "coordenadas_destino_lon",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "Requerido" } },
                            label: "Lóngitud",
                            type: "number",
                            disabled: false,
                            helper_text: ""
                        },
                    ]}
                    modal_select_model_title='Buscar solicitud'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_solicitud,
                            control_name: "id_solicitud_consumibles",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "Requerido" } },
                            label: "Número de solicitud",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]}
                />
            </Grid>
        </>
    );
}


// eslint-disable-next-line no-restricted-syntax
export default DestinoSolicitud;


