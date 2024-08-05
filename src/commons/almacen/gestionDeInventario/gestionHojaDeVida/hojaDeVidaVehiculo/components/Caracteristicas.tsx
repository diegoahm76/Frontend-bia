import { Grid, } from '@mui/material';
import BuscarModelo from "../../../../../../components/partials/getModels/BuscarModelo";
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
import { set_current_cv_vehicle, set_current_vehicles, set_vehicles } from '../store/slices/indexCvVehiculo';
import { useEffect, useState } from 'react';
import { baseURL } from '../../../../../../api/axios';

interface IProps {
    title: string;
    control_vehicle: any;
    get_values: any;
    file: any;
    set_file: any;
    watch?: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const EspecificacionesVehicle = ({
    title,
    control_vehicle,
    get_values,
    file,
    set_file,
    watch
}: IProps) => {
    const url_base = baseURL.replace("/api/", "");

    const { vehicles, current_cv_vehicle, current_vehicle } = useAppSelector((state) => state.cve);
    const { marcas } = useAppSelector((state) => state.cv);
    const dispatch = useAppDispatch();
    const [selected_image_aux, set_selected_image_aux] = useState<any>(null);
    const [is_circulacion, set_is_circulacion] = useState<boolean>(false);
    const [file_name, set_file_name] = useState<string>("");

    useEffect(() => {
        if (get_values("en_circulacion") === "true") {
            set_is_circulacion(true)
        }else{
            set_is_circulacion(false)
        }
    }, [watch("en_circulacion")])


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
                // if(current_cv_vehicle?.id_hoja_de_vida){
                //     dispatch(set_current_cv_vehicle({
                //         ...current_cv_vehicle,
                //         id_marca: get_values("id_marca"),
                //         estado: get_values("estado"),
                //         color: get_values("color"),
                //         // doc_identificador_nro: get_values("doc_identificador_nro"),
                //         cod_tipo_vehiculo: get_values("cod_tipo_vehiculo"),
                //         tiene_platon: get_values("tiene_platon"),
                //         capacidad_pasajeros: get_values("capacidad_pasajeros"),
                //         linea: get_values("linea"),
                //         tipo_combustible: get_values("tipo_combustible"),
                //         // es_arrendado: get_values("es_arrendado"),
                //         ultimo_kilometraje: get_values("ultimo_kilometraje"),
                //         fecha_ultimo_kilometraje: get_values("fecha_ultimo_kilometraje"),
                //         fecha_adquisicion: get_values("fecha_adquisicion"),
                //         fecha_vigencia_garantia: get_values("fecha_vigencia_garantia"),
                //         numero_motor: get_values("numero_motor"),
                //         numero_chasis: get_values("numero_chasis"),
                //         cilindraje: get_values("cilindraje"),
                //         transmision: get_values("transmision"),
                //         dimension_llantas: get_values("dimension_llantas"),
                //         capacidad_extintor: get_values("capacidad_extintor"),
                //         tarjeta_operacion: get_values("tarjeta_operacion"),
                //         observaciones_adicionales: get_values("observaciones_adicionales"),
                //         es_agendable: get_values("es_agendable"),
                //         en_circulacion: get_values("en_circulacion"),
                //         fecha_circulacion: get_values("fecha_circulacion"),
                //         id_articulo: get_values("id_articulo"),
                //         id_vehiculo_arrendado: get_values("id_vehiculo_arrendado"),
                //         id_proveedor: get_values("id_proveedor"),
                //         tipo_vehiculo: get_values("tipo_vehiculo"),
                //         ruta_imagen_foto: file
                //     }))
                // }
            }
        }
    }, [file]);


    useEffect(() => {
        if (current_cv_vehicle?.id_hoja_de_vida) {
            if (current_cv_vehicle.ruta_imagen_foto !== null) {
                const file = current_cv_vehicle.ruta_imagen_foto
                //  console.log('')(file)
                if (!(typeof file === "string")) {
                    if ('name' in file) {
                        set_file_name(String(file.name))

                    }
                } else {
                    set_file_name(String(current_cv_vehicle.ruta_imagen_foto))
                    set_selected_image_aux(`${url_base}${current_cv_vehicle.ruta_imagen_foto}`);
                }

            }else{
                set_selected_image_aux(null);
                set_file_name("");
            }
        }else{
            set_selected_image_aux(null);
            set_file_name("");
        }
    }, [current_cv_vehicle]);


    return (
        <>
            <Grid
                container
                direction="row"
                padding={2}
                borderRadius={2}

            >
                <BuscarModelo
                    set_current_model={set_current_vehicles}
                    row_id={"id_bien"}
                    models={vehicles}
                    set_models={set_vehicles}
                    show_search_button={false}
                    form_inputs={[
                        {
                            datum_type: "title",
                            title_label: "Especificaciones"
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
                            datum_type: "select_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: "id_marca",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Marca",
                            disabled: false,
                            helper_text: "",
                            select_options: marcas,
                            option_label: "nombre",
                            option_key: "id_marca"
                        },

                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: "doc_identificador_nro",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Placa",
                            type: "text",
                            disabled: true,
                            helper_text: ""
                        },
                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: "cod_tipo_vehiculo",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Tipo de vehículo",
                            disabled: false,
                            helper_text: "",
                            select_options: [{ label: "Carro", value: "C" }, { label: "Moto", value: "M" }],
                            option_label: "label",
                            option_key: "value",
                        },
                        {
                            datum_type: "input_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: "ultimo_kilometraje",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Último Kilometraje",
                            type: "text",
                            disabled: false,
                            helper_text: ""
                        },
                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: 'fecha_ultimo_kilometraje',
                            default_value: '',
                            rules: {

                            },
                            label: 'Fecha de último kilometraje',
                            disabled: false,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: "es_agendable",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Es agendable",
                            disabled: false,
                            helper_text: "",
                            select_options: [{ label: "SI", value: "true" }, { label: "NO", value: "false" }],
                            option_label: "label",
                            option_key: "value",
                        },
                        /*{
                            datum_type: "select_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: "es_arrendado",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Es arrendado",
                            disabled: false,
                            helper_text: "",
                            select_options: [{ label: "SI", value: "true" }, { label: "NO", value: "false" }],
                            option_label: "label",
                            option_key: "value",
                        },*/
                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: 'fecha_adquisicion',
                            default_value: '',
                            rules: {

                            },
                            label: 'Fecha de adquisición',
                            disabled: false,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },
                        {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: 'fecha_vigencia_garantia',
                            default_value: '',
                            rules: {

                            },
                            label: 'Fecha de vigencia de garantia',
                            disabled: false,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },

                        {
                            datum_type: "select_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: "en_circulacion",
                            default_value: "",
                            rules: { required_rule: { rule: true, message: "requerido" } },
                            label: "Vehículo en circulación",
                            disabled: false,
                            helper_text: "",
                            select_options: [{ label: "SI", value: "true" }, { label: "NO", value: "false" }],
                            option_label: "label",
                            option_key: "value",
                        },
                        is_circulacion && {
                            datum_type: 'date_picker_controller',
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: 'fecha_circulacion',
                            default_value: '',
                            rules: {

                            },
                            label: 'Fecha de circulación',
                            disabled: false,
                            helper_text: '',
                            format: 'YYYY-MM-DD',
                        },
                        {
                            datum_type: "input_file_controller",
                            xs: 12,
                            md: 4,
                            control_form: control_vehicle,
                            control_name: "ruta_imagen_foto",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "Archivo requerido" } },
                            label: "Imagen Vehículo",
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
                            control_form: control_vehicle,
                            control_name: "codigo_bien",
                            default_value: "",
                            rules: { required_rule: { rule: false, message: "requerido" } },
                            label: "Código",
                            type: "number",
                            disabled: false,
                            helper_text: "",
                        }
                    ]} get_filters_models={[]} columns_model={[]} />
            </Grid>
        </>
    );
}

// eslint-disable-next-line no-restricted-syntax
export default EspecificacionesVehicle;
