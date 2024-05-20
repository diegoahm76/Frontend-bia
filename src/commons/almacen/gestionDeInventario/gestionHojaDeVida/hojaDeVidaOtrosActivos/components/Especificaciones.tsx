import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';

import { set_current_cv_others, set_current_others, set_others } from '../store/slices/indexCvOtrosActivos';
import { get_others_all_service } from '../store/thunks/cvOtrosActivosThunks';
import { useEffect, useState } from 'react';



interface IProps {
    title: string;
    control_other: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EspecificacionesOtros = ({
    title,
    control_other,
    get_values
}: IProps) => {


    const { others, current_cv_other } = useAppSelector((state) => state.cvo);
    const { marcas } = useAppSelector((state) => state.cv);
    const dispatch = useAppDispatch();
    const [file_name, set_file_name] = useState<string>("");
    const [selected_image_aux, set_selected_image_aux] = useState<any>(null);
    const [file, set_file] = useState<any>(null);
    const filter_other: any = (async () => {
        const cv_computer = get_values("id_bien")
        if (cv_computer !== null) {
            void dispatch(get_others_all_service())
        }
    })


    useEffect(() => {
        if (file !== null) {
            const reader = new FileReader();
            reader.onload = () => {
                set_selected_image_aux(reader.result);
            };
            reader.readAsDataURL(file);
            if ('name' in file) {
                //  console.log('')(file.name)
                set_file_name(file.name)
                dispatch(set_current_cv_others({
                    ...current_cv_other,
                    id_marca: get_values("id_marca"),
                    especificaciones_tecnicas: get_values("especificaciones_tecnicas"),
                    caracteristicas_fisicas: get_values("caracteristicas_fisicas"),
                    observaciones_adicionales: get_values("observaciones_adicionales"),
                    ruta_imagen_foto: file
                }))

            }
        }
    }, [file]);

    useEffect(() => {
        if (current_cv_other.id_hoja_de_vida
            !== null) {
            if (current_cv_other.ruta_imagen_foto !== null) {
                const file = current_cv_other.ruta_imagen_foto
                //  console.log('')(file)
                if (!(typeof file === "string")) {
                    if ('name' in file) {
                        set_file_name(String(file.name))

                    }
                } else {
                    set_file_name(String(current_cv_other.ruta_imagen_foto))
                    set_selected_image_aux(current_cv_other.ruta_imagen_foto);
                }

            }
        }
    }, [current_cv_other]);



    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}

            >
                <BuscarModelo
                    set_current_model={set_current_others}
                    row_id={"id_bien"}
                    models={others}
                    set_models={set_others}
                    show_search_button={false}
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: title ?? "hh"
                        },
                        {
                            datum_type: "image_uploader",
                            xs: 12,
                            md: 12,
                            selected_image: selected_image_aux,
                            width_image: '150px',
                            height_image: 'auto',
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_other,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: {},
                            label: "Codigo bien",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_other,
                            control_name: "id_marca",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Marcas",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: marcas,
                            option_label: "nombre",
                            option_key: "id_marca"
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_other,
                            control_name: "doc_identificador_nro",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Serie",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_file_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_other,
                            control_name: "ruta_imagen_foto",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "Archivo requerido" } },
                            label: "Imagen equipo",
                            disabled: false,
                            helper_text: "",
                            set_value: set_file,
                            file_name,
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 12,
                            control_form: control_other,
                            control_name: "caracteristicas_fisicas",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Especificaciones técnicas",
                            multiline_text: true,
                            rows_text: 4,
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                    ]}
                    modal_select_model_title='Buscar Computadores'
                    modal_form_filters={[
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 2,
                            control_form: control_other,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Código",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]} get_filters_models={filter_other} columns_model={[]} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default EspecificacionesOtros;
