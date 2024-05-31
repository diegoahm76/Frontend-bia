import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { set_computers, set_current_computer, set_current_cv_computer } from '../store/slices/indexCvComputo';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../../../../api/axios';



interface IProps {
    title: string;
    control_computo: any;
    get_values: any
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const Especificaciones = ({
    title,
    control_computo,
    get_values
}: IProps) => {
    const url_base = baseURL.replace("/api/", "");

    const { computers, marcas, current_cv_computer, current_computer } = useAppSelector((state) => state.cv);
    const [file, set_file] = useState<any>(null);
    const [selected_image_aux, set_selected_image_aux] = useState<any>(null);
    const [file_name, set_file_name] = useState<string>("");
    const dispatch = useAppDispatch();


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

                //TODO: Cambiar para actualizar la imágen
                if(current_cv_computer?.id_hoja_de_vida){
                    dispatch(set_current_cv_computer({
                        ...current_cv_computer,
                        id_marca: get_values("id_marca"),
                        estado: get_values("estado"),
                        color: get_values("color"),
                        tipo_de_equipo: get_values("tipo_de_equipo"),
                        capacidad_almacenamiento: get_values("capacidad_almacenamiento"),
                        procesador: get_values("procesador"),
                        memoria_ram: get_values("memoria_ram"),
                        tipo_almacenamiento: get_values("tipo_almacenamiento"),
                        suite_ofimatica: get_values("suite_ofimatica"),
                        antivirus: get_values("antivirus"),
                        otras_aplicaciones: get_values("otras_aplicaciones"),
                        ruta_imagen_foto: file
                    }))
                }
            }
        }
    }, [file]);

    useEffect(() => {
        if (current_cv_computer?.id_hoja_de_vida) {
            if (current_cv_computer.ruta_imagen_foto !== null) {
                const file = current_cv_computer.ruta_imagen_foto
                //  console.log('')(file)
                if (!(typeof file === "string")) {
                    if ('name' in file) {
                        set_file_name(String(file.name))

                    }
                } else {
                    set_file_name(String(current_cv_computer.ruta_imagen_foto))
                    set_selected_image_aux(`${url_base}${current_cv_computer.ruta_imagen_foto}`);
                }

            }else{
                set_selected_image_aux(null);
                set_file_name("");
            }
        }
    }, [current_cv_computer]);


    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}

            >
                <BuscarModelo
                    set_current_model={set_current_computer}
                    row_id={"id_bien"}
                    models={computers}
                    set_models={set_computers}
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
                            control_form: control_computo,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: {},
                            label: "Codigo bien",
                            type: "number",
                            disabled: true,
                            helper_text: "",
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
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
                            control_form: control_computo,
                            control_name: "doc_identificador_nro",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Serial",
                            type: "text",
                            disabled: current_cv_computer?.doc_identificador_nro || current_computer?.doc_identificador_nro,
                            helper_text: ""
                        },

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "estado",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Estado del equipo",
                            disabled: false,
                            helper_text: "debe seleccionar campo",
                            select_options: [{ label: "Óptimo", value: "O" }, { label: "Defectuoso", value: "D" }, { label: "Averiado", value: "A" }],
                            option_label: "label",
                            option_key: "label",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "color",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Color",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 3,
                            control_form: control_computo,
                            control_name: "tipo_de_equipo",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Tipo de equipo",
                            type: "text",
                            disabled: false,
                            helper_text: "Portatil, Tablet, All-in-on"
                        },
                        {
                            datum_type: "input_file_controller",
                            xs: 12,
                            md: 6,
                            control_form: control_computo,
                            control_name: "ruta_imagen_foto",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "Archivo requerido" } },
                            label: "Imagen equipo",
                            disabled: false,
                            helper_text: "",
                            set_value: set_file,
                            file_name,
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
                    ]} get_filters_models={undefined} columns_model={[]} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default Especificaciones;
