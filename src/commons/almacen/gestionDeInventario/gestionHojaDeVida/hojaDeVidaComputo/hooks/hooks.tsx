
import { toast, type ToastContent } from 'react-toastify';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
import  { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {api} from '../../../../../../api/axios';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/hooks';
import {create_cv_computers_service, get_cv_computers_service, get_cv_maintenance_service} from "../store/thunks/cvComputoThunks"
import { type IcvComputersForm,  type IList } from "../../hojaDeVidaComputo/interfaces/CvComputo";


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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const use_cv_computers = () => {

    // Dispatch instance
    const dispatch = useAppDispatch();
    
  
    // Navigation
    const navigate = useNavigate();

    // Redux State Extraction
    const { cv_computers } = useAppSelector((state) => state.cv);

    // Local State
    const initial_options: IList[] = [{
        label: "",
        value: 0,
    }]
    const [articulo_encontrado, set_articulo_encontrado] = useState<boolean>(false);
    const [otras_aplicaciones, set_otras_aplicaciones] = useState<boolean>(false);
    const [otras_perisfericos, set_otras_perisfericos] = useState<boolean>(false);
    const [busqueda_articulo_modal_open, set_busqueda_articulo_modal_open] = useState<boolean>(false);
    const [list_mark, set_list_mark] = useState<IList[]>(initial_options);
    const [file, set_file] = useState(null);

    // Estado Inicial de Hojas de Vida de Computadores
    const initial_state: IcvComputersForm = {
        antivirus: '',
        capacidad_almacenamiento: '',
        color: '',
        id_articulo: 0,
        memoria_ram: '',
        observaciones_adicionales: '',
        otras_aplicaciones: '',
        procesador: '',
        ruta_imagen_foto: '',
        sistema_operativo: '',
        suite_ofimatica: '',
        tipo_almacenamiento: '',
        tipo_de_equipo: '',

        cod_tipo_bien: 0,
        codigo_bien: '',
        doc_identificador_nro: '',
        estado: '',
        id_bien: 0,
        marca: { label: '', value: 0 },
        nombre: '',
    }


    // useForm Hojas de Vida de Computadores
    const {
        register,
        handleSubmit: handle_submit,
        control,
        reset,
        watch,
        formState: { errors },

    } = useForm<IcvComputersForm>({ defaultValues: initial_state });
    const data_cv_computers = watch();

   

    // useEffect para consultar  options
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const get_selects_options = async () => {
            try {
                const { data: list_mark_data } = await api.get("/almacen/marcas/get-list/");

                set_list_mark(list_mark_data.map((item: { nombre: any; id_marca: any; }) => ({ label: item.nombre, value: item.id_marca, isDisabled: true })));
                // setOptionAgrupacionD(agrupacionDocumentalFormat.map(item => ({ ...item, isDisabled: false })));
            } catch (err) {
                console.log(err);
            }
        };
        void get_selects_options();
    }, []);

    // useEffect para consultar Mantenimiento
    useEffect(() => {
        if (cv_computers && !cv_computers.tiene_hoja_vida) dispatch(get_cv_maintenance_service(cv_computers.id_bien));
    }, [cv_computers]);

    // ueeEffect para obtener el articulo
    useEffect(() => {
        if (cv_computers && !cv_computers.tiene_hoja_vida) {
            const data = {
                ...cv_computers,
                marca: { label: cv_computers.marca, value: cv_computers.id_marca },
                nombre: cv_computers.nombre,
                cod_tipo_bien: cv_computers.cod_tipo_bien,
                codigo_bien: cv_computers.codigo_bien,
                doc_identificador_nro: cv_computers.doc_identificador_nro,
                estado: cv_computers.estado,
                id_articulo: cv_computers.id_bien,
            };
            reset(data);
        } else if (cv_computers) {
            control_success('El bien ya tiene oja de vida');
            reset(initial_state);
            set_file(null);
        }
    }, [cv_computers]);

    // ueeEffect para cambiar el estado de articuloEncontrado
    useEffect(() => {
        if (cv_computers && !cv_computers.tiene_hoja_vida) {
            set_articulo_encontrado(true);
        } else {
            set_articulo_encontrado(false);
        }
    }, [cv_computers]);

    // submit Hojas de Vida de Computadores
    const on_submit: SubmitHandler<IcvComputersForm> = () => {
        create_cv();
    };

    // Funcion para crear hoja de vida de computadores
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const create_cv = () => {
        const form_data: any = new FormData();
        form_data.append('sistema_operativo', data_cv_computers.sistema_operativo);
        form_data.append('suite_ofimatica', data_cv_computers.suite_ofimatica);
        form_data.append('antivirus', data_cv_computers.antivirus);
        form_data.append('color', data_cv_computers.color);
        form_data.append('tipo_de_equipo', data_cv_computers.tipo_de_equipo);
        form_data.append('tipo_almacenamiento', data_cv_computers.tipo_almacenamiento);
        form_data.append('capacidad_almacenamiento', data_cv_computers.capacidad_almacenamiento);
        form_data.append('procesador', data_cv_computers.procesador);
        form_data.append('memoria_ram', data_cv_computers.memoria_ram);
        form_data.append('observaciones_adicionales', data_cv_computers.observaciones_adicionales);
        form_data.append('otras_aplicaciones', data_cv_computers.otras_aplicaciones);
        form_data.append('id_articulo', data_cv_computers.id_bien.toString());
        form_data.append('ruta_imagen_foto', file === null ? '' : file);

        void dispatch(create_cv_computers_service(form_data, navigate));

    };

    //  Cargue de archivos de imagen
    // const handle_upload = ({ target }) => {
    //     if (target.files.length > 0) set_file(target.files[0])
    // };

    // Funcion para navegar a la pantalla de historico de articulos
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const screen_historico_articulo = () => {
        navigate("/dashboard/almacen/reportes/reporte-historico-activo");
    };

    // Funcion para navegar a la pantalla de programar mantenimiento
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const screen_programar_mantnimiento = () => {
        navigate(
            "/dashboard/almacen/gestion-de-inventario/programacion-mantenimiento"
        );
    };

    // Funcion para Buscar Articulo
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handled_search = () => {
        dispatch(get_cv_computers_service(data_cv_computers.doc_identificador_nro));
    };

    // Columnas de la tabla de Mantenimientos
    const column_defs_maintenance = [
        { headerName: "Estado", field: "estado", minWidth: 150 },
        { headerName: "Fecha", field: "fecha", minWidth: 150 },
        { headerName: "Responsable", field: "responsable", minWidth: 150 },
        { headerName: "Tipo", field: "tipo", minWidth: 150 },
        { headerName: "Descripción", field: "tipo_descripcion", minWidth: 150 },
    ];
    // Columnas de la tabla de Asignaciones
    const column_defs2 = [
        { headerName: "Número", field: "NU", minWidth: 150 },
        { headerName: "Responsable", field: "RE", minWidth: 150 },
        { headerName: "Grupo", field: "GR", minWidth: 150 },
        { headerName: "Fecha inicial", field: "FEIN", minWidth: 150 },
        { headerName: "Fecha final", field: "FEFI", minWidth: 150 },
        { headerName: "Tipo", field: "TI", minWidth: 150 },
    ];

    // Columnas de la tabla de articulos
    const column_defs_articles = [
        { headerName: "Nombre", field: "nombre", minWidth: 180 },
        { headerName: "Serial", field: "doc_identificador_nro", minWidth: 150 },
        { headerName: "Tipo Activo", field: "cod_tipo_activo", minWidth: 120 },
        { headerName: "Estado", field: "estado", minWidth: 120 },
        { headerName: "Codigo", field: "codigo_bien", minWidth: 150 },
        { headerName: "Acción", field: "editar", minWidth: 100, maxWidth: 100, 
        renderCell: (params: any) => (
                <div className="d-flex gap-1">
                    <button
                        type="button"
                        style={{ border: "none", background: "none" }}
                        onClick={() => {
                            dispatch(get_cv_computers_service(params.data.doc_identificador_nro));
                            set_busqueda_articulo_modal_open(false);
                        }}
                        title="Seleccionar"
                    >
                        <i className="fa-solid fa-circle-check fs-3"></i>
                    </button>
                </div>
            ),
        },
    ];

    // Datos de la tabla de asignaciones
    const asignacion_prestamos = [
        {
            NU: "01",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
        {
            NU: "02",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
        {
            NU: "03",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
        {
            NU: "04",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
        {
            NU: "05",
            RE: "Gina Hernandez",
            GR: "Administración",
            FEIN: "19/05/2020",
            FEFI: "13/08/2020",
            TI: "Asignacion",
        },
    ];

    return {
        // States
        column_defs_maintenance,
        column_defs2,
        column_defs_articles,
        asignacion_prestamos,
        articulo_encontrado,
        otras_aplicaciones,
        busqueda_articulo_modal_open,
        list_mark,
        otras_perisfericos,
        control,
        initial_state,
        file,
        errors,
        // Edita States
        set_articulo_encontrado,
        set_otras_aplicaciones,
        set_otras_perisfericos,
        set_file,
        // Functions
        screen_historico_articulo,
        screen_programar_mantnimiento,
        handled_search,
        on_submit,
        register,
        handle_submit,
        reset,
      //  handle_upload
    };
}

// eslint-disable-next-line no-restricted-syntax
export default use_cv_computers;