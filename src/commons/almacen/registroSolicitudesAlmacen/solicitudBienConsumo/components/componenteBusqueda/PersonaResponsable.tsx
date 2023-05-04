import { useEffect, useState } from 'react';

import { api } from '../../../../../../api/axios';
import { type Persona } from "../../../../../../interfaces/globalModels";
import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import { type ToastContent, toast } from 'react-toastify';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';

interface IList {
    value: string | number;
    label: string | number;
}
const initial_options: IList[] = [
    {
        label: '',
        value: '',
    },
];
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const PersonaResponsable = () => {

    const { control: control_persona, reset: reset_persona, getValues: get_values } = useForm<Persona>();
    const [document_type, set_document_type] = useState<IList[]>(initial_options);
    const [personas, set_personas] = useState<Persona[]>([]);

    const columns_personas: GridColDef[] = [
        { field: 'id_persona', headerName: 'ID', width: 20 },
        {
            field: 'numero_documento',
            headerName: 'Número de documento',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_completo',
            headerName: 'Nombre',
            width: 300,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

        {
            field: 'razon_social',
            headerName: 'Razón social',
            width: 250,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },
        {
            field: 'nombre_comercial',
            headerName: 'Nombre comercial',
            width: 200,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        }
    ];

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
                const { data: document_type_no_format } = await api.get(
                    'choices/tipo-documento/'
                );

                const document_type_format: IList[] = text_choise_adapter(
                    document_type_no_format
                );
                set_document_type(document_type_format);

            } catch (err) {
                console.log(err);
            }
        };
        void get_selects_options();
    }, []);

    const search_person: any = (async () => {
        const document = get_values("numero_documento") ?? ""
        const type = get_values("tipo_documento") ?? ""
        try {
            const { data: persona_data } = await api.get(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `personas/get-personas-by-document/${type}/${document}/`
            );
            if ("data" in persona_data) {
                reset_persona(persona_data.data)
                control_success("Se selecciono la persona ")

            } else {
                control_error(persona_data.detail)
            }
        } catch (err) {
            console.log(err);
        }
    })
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const control_success = (message: ToastContent) =>
        toast.success(message, {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
        });

    const get_personas: any = (async () => {
        const document = get_values("numero_documento") ?? ""
        const type = get_values("tipo_documento") ?? ""
        const comercial_name = get_values("nombre_comercial") ?? ""
        const primer_nombre = get_values("primer_nombre") ?? ""
        const primer_apellido = get_values("primer_apellido") ?? ""
        const razon_social = get_values("razon_social") ?? ""

        try {
            const { data: persona_data } = await api.get(
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `personas/get-personas-filters/?tipo_documento=${type}&numero_documento=${document}&primer_nombre=${primer_nombre}&primer_apellido=${primer_apellido}&razon_social=${razon_social}&nombre_comercial=${comercial_name}`
            );
            if ("data" in persona_data) {
                if (persona_data.data.length > 0) {
                    set_personas(persona_data.data)
                    control_success("Se encontraron personas")
                } else {
                    control_error("No se encontraron personas")
                    set_personas([])
                }
            }
        } catch (err) {
            console.log(err);
        }
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
                    row_id={"id_persona"}
                    columns_model={columns_personas}
                    models={personas}
                    get_filters_models={get_personas}
                    set_models={set_personas}
                    reset_values={reset_persona}
                    button_submit_label='BUSCAR'
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: "Seleccione persona"

                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_persona,
                            control_name: "tipo_documento",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Tipo documento",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: document_type,
                            option_label: "label",
                            option_key: "value",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_persona,
                            control_name: "numero_documento",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Número de documento",
                            type: "number",
                            disabled: get_values("tipo_documento") === null || get_values("tipo_documento") === undefined,
                            helper_text: "Digite para buscar",
                            on_blur_function: search_person
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 5,
                            control_form: control_persona,
                            control_name: "nombre_completo",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Nombre",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },

                    ]}
                    modal_select_model_title='Buscar persona'
                    modal_form_filters={[
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_persona,
                            control_name: "tipo_documento",
                            default_value: "",
                            rules: {},
                            label: "Tipo documento",
                            disabled: false,
                            helper_text: "",
                            select_options: document_type,
                            option_label: "label",
                            option_key: "value",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_persona,
                            control_name: "numero_documento",
                            default_value: "",
                            rules: {},
                            label: "Número de documento",
                            type: "number",
                            disabled: get_values("tipo_documento") === null || get_values("tipo_documento") === undefined,
                            helper_text: "",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_persona,
                            control_name: "primer_nombre",
                            default_value: "",
                            rules: {},
                            label: "Primer nombre",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_persona,
                            control_name: "primer_apellido",
                            default_value: "",
                            rules: {},
                            label: "Primer Apellido",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 5,
                            control_form: control_persona,
                            control_name: "razon_social",
                            default_value: "",
                            rules: {},
                            label: "Razon social",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 5,
                            control_form: control_persona,
                            control_name: "nombre_comercial",
                            default_value: "",
                            rules: {},
                            label: "Nombre comercial",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                    ]}
                />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default PersonaResponsable;