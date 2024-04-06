import { useEffect, useState } from 'react';

import { api } from '../../../../../../api/axios';

import { useForm } from 'react-hook-form';
import { Grid } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../../../auth/interfaces';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import { type IObjFuncionario } from '../../interfaces/solicitudBienConsumo';
import { get_funcionario_document_service, get_funcionario_service, get_person_id_service } from '../../store/solicitudBienConsumoThunks';
import { set_current_funcionario, set_funcionarios } from '../../store/slices/indexSolicitudBienesConsumo';

interface IProps {
    title?: string;
    get_values_solicitud: any;
}
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
const PersonaResponsableVivero = ({
    title,
    get_values_solicitud

}: IProps) => {

    const dispatch = useAppDispatch();

    const { userinfo } = useSelector((state: AuthSlice) => state.auth);
    const { control: control_persona, reset: reset_persona, getValues: get_values } = useForm<IObjFuncionario>();
    const { funcionarios, current_funcionario } = useAppSelector((state) => state.solic_consumo);

    const [document_type, set_document_type] = useState<IList[]>(initial_options);


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
            headerName: 'Nombre Completo',
            width: 300,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>

            ),
        },

        {
            field: 'nombre_unidad_organizacional_actual',
            headerName: 'Unidad organizacional actual',
            width: 250,
            renderCell: (params) => (
                <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </div>
            ),
        },

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
                //  console.log('')(err);
            }
        };
        void get_selects_options();
        void dispatch(get_person_id_service(userinfo.id_persona))

    }, []);

    useEffect(() => {
        reset_persona(current_funcionario)

    }, [current_funcionario]);

    const search_person: any = (async () => {
        const document = get_values("numero_documento") ?? ""
        const type = get_values("tipo_documento") ?? ""
        void dispatch(get_funcionario_document_service(type, document, get_values_solicitud("id_unidad_para_la_que_solicita")))

    })
    const get_funcionarios: any = (async () => {
        //  console.log('')(get_values_solicitud("numero_documento"))
        const document = get_values("numero_documento") ?? ""
        const type = get_values("tipo_documento") ?? ""
        const primer_nombre = get_values("primer_nombre") ?? ""
        const primer_apellido = get_values("primer_apellido") ?? ""
        if (get_values_solicitud("id_unidad_para_la_que_solicita") !== undefined) {
            void dispatch(get_funcionario_service(type, document, primer_nombre, primer_apellido, get_values_solicitud("id_unidad_para_la_que_solicita")))

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

                    set_current_model={set_current_funcionario}
                    row_id={"id_persona"}
                    columns_model={columns_personas}
                    models={funcionarios}
                    get_filters_models={get_funcionarios}
                    set_models={set_funcionarios}
                    show_search_button={false}
                    reset_values={reset_persona}
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: title ?? "Funcionario responsable"

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
                            md: 3,
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
                            md: 3,
                            control_form: control_persona,
                            control_name: "nombre_completo",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Nombre",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_persona,
                            control_name: "nombre_unidad_organizacional_actual",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Nombre unidad organizacional",
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


                    ]}
                />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default PersonaResponsableVivero;