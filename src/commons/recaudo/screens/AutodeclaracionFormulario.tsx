

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/naming-convention
// eslint-disable-next-line @typescript-eslint/no-var-requires
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import 'leaflet/dist/leaflet.css';
import { useSelector } from 'react-redux';
import { api } from '../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../components/Title';
import IconButton from '@mui/material/IconButton';
import { AuthSlice } from '../../auth/interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_error } from '../alertas/store/thunks/alertas';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import { control_success } from '../../recursoHidrico/requets/Request';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import { FormControl, Grid, TextField, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material';


export interface Persona {
    id_persona: number;
    tipo_usuario: string;
    primer_nombre: string;
    numero_documento: any;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
};

interface FactoresUtilizacion {
    numeroBovinos: any;
    numeroPorcinos: any;
    numeroUsuarios: any;
    numeroHectareas: any;
    consumoNumeroBovinos: any;
    consumoNumeroUsuarios: any;
    consumoNumeroPorcinos: any;
    consumoNumeroHectareas: any;
}
interface Campo {
    nombre: string;
    valor: any;
}
interface CaptacionMensualAgua {
    mes: number | any;
    tiempoUso: number | any;
    periodoUso: string | any;
    caudalUtilizado: number | any;
    volumenAguaCaptada: number | any;
}
interface FuenteAbastecimiento {
    tipo: any;
    numero: any;
    cordenadaX: any;
    cordenadaY: any;
    nombreFuente: any;
    caudalConcesionado: any;
    sistemaMedicionAguaCaptada: any;
}

interface Data {
    cc: any;
    nit: any;
    fax: string;
    expediente: any;
    codigoCIIU: any;
    otrotipo: string;
    telefono: string;
    direccion: string;
    numConcesion: any;
    municipio: string;
    razonSocial: string;
    tipoUsuario: string;
    fechaCreacion: string;
    id_archivo_sistema: any;
    actividadEconomica: string;
    nombreRepresentanteLegal: string;
    factoresUtilizacion: FactoresUtilizacion;
    captacionesMensualesAgua: CaptacionMensualAgua[];
    informacionFuentesAbastecimiento: FuenteAbastecimiento[];
}


export const AutodeclaracionFormulario: React.FC = () => {

    const { userinfo: { telefono_celular } } = useSelector((state: AuthSlice) => state.auth);

    const initialFormData: Data = {
        nit: null,
        cc: null,
        fax: ``,
        otrotipo: ``,
        municipio: ``,
        direccion: ``,
        razonSocial: ``,
        tipoUsuario: ``,
        codigoCIIU: null,
        expediente: null,
        fechaCreacion: ``,
        numConcesion: null,
        actividadEconomica: ``,
        id_archivo_sistema: null,
        nombreRepresentanteLegal: ``,
        telefono: `${telefono_celular}`,
        informacionFuentesAbastecimiento: [],
        factoresUtilizacion: {
            numeroUsuarios: null,
            numeroBovinos: null,
            numeroPorcinos: null,
            numeroHectareas: null,
            consumoNumeroBovinos: null,
            consumoNumeroPorcinos: null,
            consumoNumeroUsuarios: null,
            consumoNumeroHectareas: null,
        },
        captacionesMensualesAgua: []
    };
    const [formmmm, set_form] = useState<{ archivo: null | any }>({ archivo: null });
    const [Data, setFormData] = useState<Data>(initialFormData);

    const [opengeneradordireccioness, setopengeneradordireccioness] = useState(false);
    const [persona, set_persona] = useState<Persona | undefined>();

    useEffect(() => {
        if (persona?.primer_nombre) {
            setFormData(prevState => ({
                ...prevState,
                nombreRepresentanteLegal: persona.primer_nombre,
                cc: persona.numero_documento,
            }));
        }
    }, [persona]);


    const [
        ,
        // direccionGeneradaActiva
        set_direccion_generada_activaa,
    ] = useState(false);
    const [direccion_generada, setdireccion_generadaa,] = useState('');

    const [type_directionn, set_type_direction] = useState('');


    console.log("data", Data)
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const set_value_direction = (direccion_notificacion: any): void => {
        setdireccion_generadaa(direccion_notificacion);
        set_direccion_generada_activaa(true);
        setFormData(prevState => ({
            ...prevState,
            direccion: direccion_notificacion, // Establece la dirección igual a direccion_notificacion
        }));
    };
    const [municipios, setMunicipios] = useState<Array<[string, string]>>([]);
    const [municipios_v, setMunicipios_v] = useState<Array<[string, string]>>([]);

    const fetchDepartamentos = async () => {
        try {
            const url = "/choices/municipios/";
            const res = await api.get(url);
            const departamentosData: Array<[string, string]> = res.data;
            setMunicipios(departamentosData);
            setMunicipios_v(departamentosData);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchDepartamentos();
    }, [])
    const crearFormulario = async () => {
        try {
            const url = "/recaudo/formulario/crear_formulario/";
            const res = await api.post(url, Data);
            console.log('Formulario creado con éxito', res.data);
            control_success("Formulario creado con éxito")
            setFormData(initialFormData);
        } catch (error: any) {
            console.error('Error al crear el formulario', error);
            control_error(error.response.data.detail);
        }
    };
    const fetch_Crear_archivo_digital = async () => {
        try {
            const url = `/recaudo/formulario/crear_formulario/`;
            const formData = new FormData();

            formData.append('nit', `${Data.nit}`);
            formData.append('cc', ` ${Data.cc}`);
            formData.append('fax', ` ${Data.fax}`);
            formData.append('telefono', `${Data.telefono}`);
            formData.append('otrotipo', `${Data.otrotipo}`);
            formData.append('direccion', `${Data.direccion}`);
            formData.append('municipio', `${Data.municipio}`);
            formData.append('codigoCIIU', `${Data.codigoCIIU}`);
            formData.append('expediente', `${Data.expediente}`);
            formData.append('razonSocial', `${Data.razonSocial}`);
            formData.append('tipoUsuario', `${Data.tipoUsuario}`);
            formData.append('numConcesion', `${Data.numConcesion}`);
            formData.append('actividadEconomica', `${Data.actividadEconomica}`);
            formData.append('nombreRepresentanteLegal', `${Data.nombreRepresentanteLegal}`);

            // Agregar los campos de factoresUtilizacion al objeto FormData
            formData.append('factoresUtilizacion', JSON.stringify({
                "numeroBovinos": `${Data.factoresUtilizacion.numeroBovinos}`,
                "numeroPorcinos": `${Data.factoresUtilizacion.numeroPorcinos}`,
                "numeroUsuarios": `${Data.factoresUtilizacion.numeroUsuarios}`,
                "numeroHectareas": `${Data.factoresUtilizacion.numeroHectareas}`,
                "consumoNumeroBovinos": `${Data.factoresUtilizacion.consumoNumeroBovinos}`,
                "consumoNumeroPorcinos": `${Data.factoresUtilizacion.consumoNumeroPorcinos}`,
                "consumoNumeroUsuarios": `${Data.factoresUtilizacion.consumoNumeroUsuarios}`,
                "consumoNumeroHectareas": `${Data.factoresUtilizacion.consumoNumeroHectareas}`,
            }));

            // Agregar las captacionesMensualesAgua al objeto FormData
            formData.append('captacionesMensualesAgua', JSON.stringify(Data.captacionesMensualesAgua.map((row, index) => ({ ...row, id: index }))
            ));

            // Agregar las informacionFuentesAbastecimiento al objeto FormData
            formData.append('informacionFuentesAbastecimiento', JSON.stringify(Data.informacionFuentesAbastecimiento.map((row, index) => ({ ...row, id: index }))));
            // formData.append('id_archivo_sistema', formmmm.archivo as File);
            if (formmmm.archivo) {
                formData.append('id_archivo_sistema', formmmm.archivo);
            }

            // Realizar la solicitud POST
            const res = await api.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data) {
                // La solicitud fue exitosa
                control_success("se creo correctamente");
            } else {
                // La solicitud falló
                console.error('Error en la solicitud:', res.statusText);
            }
        } catch (error: any) {
            control_error(error.response.data.detail);
        }
    };



    const [currentCaptacion, setCurrentCaptacion] = useState({
        periodoUso: "",
        tiempoUso: "",
        caudalUtilizado: "",
        volumenAguaCaptada: "",
        mes: ""
    });

    const handleCurrentCaptacionChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setCurrentCaptacion(prevState => ({ ...prevState, [name]: value }));
    };

    const verificarDatosCaptacion = () => {
        const campos = [
            { nombre: 'periodo de Uso', valor: currentCaptacion.periodoUso },
            { nombre: 'Tiempo de Uso', valor: currentCaptacion.tiempoUso },
            { nombre: 'Caudal utilizado', valor: currentCaptacion.caudalUtilizado },
            { nombre: 'Volumen de agua captada', valor: currentCaptacion.volumenAguaCaptada },
            { nombre: 'Mes', valor: currentCaptacion.mes },
        ];

        for (let campo of campos) {
            if (campo.valor === null || campo.valor === '') {
                return campo.nombre;
            }
        }
        return null;
    };

    const agregarCaptacion = () => {
        // Verificar si el mes ya existe en los datos
        const mesYaExiste = Data.captacionesMensualesAgua.some(captacion => captacion.mes === currentCaptacion.mes);
        const campoFaltante = verificarDatosCaptacion();
        if (campoFaltante) {
            control_error(`Falta agregar dato: ${campoFaltante}`);
            return;
        }
        if (mesYaExiste) {
            // Mostrar una alerta si el mes ya fue agregado
            control_error("Mes ya agregado ");

        }
        else {
            // Proceder a agregar la captación si el mes no existe
            setFormData(prevState => ({
                ...prevState,
                captacionesMensualesAgua: [...prevState.captacionesMensualesAgua, currentCaptacion]
            }));

            // Reiniciar el estado de currentCaptacion
            setCurrentCaptacion({
                periodoUso: "",
                caudalUtilizado: "",
                tiempoUso: "",
                volumenAguaCaptada: "",
                mes: ""
            });
        }
    };
    const eliminarcaptacion = (id: number) => {
        setFormData(prevState => ({
            ...prevState,
            captacionesMensualesAgua: prevState.captacionesMensualesAgua.filter((item, index) => index !== id)
        }));
    };
    const columnas_captacion = [
        { field: 'periodoUso', headerName: 'Periodo de uso', width: 220 },
        { field: 'tiempoUso', headerName: 'Tiempo de uso', width: 220 },
        { field: 'caudalUtilizado', headerName: 'Caudal utilizado', width: 220 },
        { field: 'volumenAguaCaptada', headerName: 'Volumen de agua Captada', width: 220 },
        { field: 'mes', headerName: 'Mes', width: 210 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            sortable: false,
            width: 150,
            renderCell: (params: { id: any; }) => {
                return (
                    <IconButton color='error' onClick={() => eliminarcaptacion(params.id)}>
                        <DeleteForeverIcon />
                    </IconButton>
                );
            }
        },
    ];
    //fuente 

    const [currentFuente, setCurrentFuente] = useState({
        numero: "",
        tipo: "",
        nombreFuente: "",
        caudalConcesionado: "",
        sistemaMedicionAguaCaptada: "",
        cordenadaX: "",
        cordenadaY: "",
    });
    const handleCurrentFuenteChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setCurrentFuente(prevState => ({ ...prevState, [name]: value }));
    };

    const verificarDatosFuente = () => {
        const campos: Campo[] = [
            { nombre: 'Numero', valor: currentFuente.numero },
            { nombre: 'Tipo', valor: currentFuente.tipo },
            { nombre: 'Nombre de fuente', valor: currentFuente.nombreFuente },
            { nombre: 'Caudal concesionado', valor: currentFuente.caudalConcesionado },
            { nombre: 'Sistema de medicion de agua captada', valor: currentFuente.sistemaMedicionAguaCaptada },
            { nombre: 'Cordenada X', valor: currentFuente.cordenadaX },
            { nombre: 'Cordenada Y', valor: currentFuente.cordenadaY },
        ];

        for (let campo of campos) {
            if (campo.valor === null || campo.valor === '' || (typeof campo.valor === 'number' && isNaN(campo.valor))) {
                return campo.nombre;
            }
        }
        return null;
    };

    const agregarFuente = () => {
        const campoFaltante = verificarDatosFuente();
        if (campoFaltante) {
            control_error(`Falta agregar dato: ${campoFaltante}`);
            return;
        }
        setFormData(prevState => ({
            ...prevState,
            informacionFuentesAbastecimiento: [...prevState.informacionFuentesAbastecimiento, currentFuente]

        }));
        setCurrentFuente({
            numero: "",
            tipo: "",
            nombreFuente: "",
            caudalConcesionado: "",
            sistemaMedicionAguaCaptada: "",
            cordenadaX: "",
            cordenadaY: "",

        });
    };
    const eliminarFuente = (id: number) => {
        setFormData(prevState => ({
            ...prevState,
            informacionFuentesAbastecimiento: prevState.informacionFuentesAbastecimiento.filter((item, index) => index !== id)
        }));
    };
    const columnas = [
        { field: 'numero', headerName: 'Número', width: 220 },
        { field: 'tipo', headerName: 'Tipo', width: 220 },
        { field: 'nombreFuente', headerName: 'Nombre de la Fuente', width: 220 },
        { field: 'caudalConcesionado', headerName: 'Caudal Concesionado', width: 220 },
        { field: 'cordenadaX', headerName: 'CordenadaX  ', width: 220 },
        { field: 'cordenadaY', headerName: 'CordenadaY', width: 220 },

        { field: 'sistemaMedicionAguaCaptada', headerName: 'Sistema de Medición', width: 220 },
        {
            field: 'acciones',
            headerName: 'Acciones',
            sortable: false,
            width: 150,
            renderCell: (params: { id: any; }) => {
                return (
                    <IconButton color='error' onClick={() => eliminarFuente(params.id)}>
                        <DeleteForeverIcon />
                    </IconButton>
                );
            }
        },
    ];

    ///

    const on_result = async (info_persona: Persona): Promise<void> => { set_persona(info_persona); }





    const [fileExtension, setFileExtension] = useState<string | null>(null);
    const [file_nombre, set_file_nombre] = useState<string | null>(null);





    const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const fileInput = event.target;
        if (fileInput?.files?.length) {
            const fileName = fileInput.files[0].name;
            const selectedFile = fileInput.files[0];


            // Verificar si selectedFile no es null antes de asignarlo a set_form

            set_form({ archivo: selectedFile });

            const extension = fileName.split('.').pop();
            if (extension) {
                setFileExtension(extension);
                set_file_nombre(fileName);
            } else {
                console.error('No se pudo determinar la extensión del archivo.');
                setFileExtension('Desconocido');
                set_file_nombre('Desconocido');
            }
        } else {
            console.warn('Ningún archivo seleccionado.');
            setFileExtension(null);
            set_file_nombre(null);
        }
    };
    const handleRemoveFile = () => {
        // Limpia la selección actual del archivo
        set_form({

            archivo: null,
        });
        setFileExtension(null);
        set_file_nombre(null);
    };

    return (
        <>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Title title="Formulario auto declaración  " />
                <Grid item xs={12}>
                    <BuscadorPersona
                        onResult={(data) => {
                            void on_result(data);
                        }}
                    />
                </Grid>
                {/* {persona?.primer_nombre} */}
            </Grid>
            {/* 222
            {direccion_generada} */}
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Title title="Información general del usuario" />
                <Grid container item xs={12} spacing={2} marginTop={2}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small" variant="standard">
                            <InputLabel>Tipo de Usuario</InputLabel>
                            <Select
                                label="Tipo de Usuario"
                                name="tipoUsuario"
                                onChange={handleInputChange}
                                value={Data.tipoUsuario}
                            >
                                <MenuItem value="EMPRESARIAL">Empresarial</MenuItem>
                                <MenuItem value="DOMESTICO">Doméstico</MenuItem>
                                <MenuItem value="MUNICIPAL">Municipal</MenuItem>
                                <MenuItem value="COMERCIAL">Comercial</MenuItem>
                                <MenuItem value="ESP">E.S.P</MenuItem>
                                <MenuItem value="OTRO">Otro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Razón social"
                            name="razonSocial"
                            onChange={handleInputChange}

                            value={Data.razonSocial}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Nit"
                            name="nit"
                            value={Data.nit}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Nombre representante legal "
                            name="nombreRepresentanteLegal"
                            value={Data.nombreRepresentanteLegal}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="CC"
                            name="cc"
                            value={Data.cc}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Actividad económica"
                            name="actividadEconomica"
                            value={Data.actividadEconomica}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Teléfono"
                            name="telefono"
                            value={Data.telefono}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Fax"
                            name="fax"
                            value={Data.fax}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Código CIIU"
                            name="codigoCIIU"
                            value={Data.codigoCIIU}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="standard" size="small" fullWidth>
                            <InputLabel >Municipio</InputLabel>
                            <Select
                                name="municipio"
                                label="municipio"
                                value={Data.municipio}
                                onChange={handleInputChange}
                                labelId="municipio-select-label"
                            >
                                {municipios.map((municipio) => (
                                    <MenuItem key={municipio[0]} value={municipio[0]}>
                                        {municipio[1]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Expediente "
                            name="expediente"
                            variant="standard"
                            value={Data.expediente}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="N Concesión"
                            name="numConcesion"
                            value={Data.numConcesion}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            disabled
                            size="small"
                            onChange={handleInputChange}
                            variant="standard"
                            label="Dirección"
                            name="direccion"
                            value={Data.direccion}
                        />
                    </Grid>


                    <DialogGeneradorDeDirecciones
                        open={opengeneradordireccioness}
                        openDialog={setopengeneradordireccioness}
                        onChange={set_value_direction}
                        type={type_directionn}
                    />
                    <Grid item xs={4}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setopengeneradordireccioness(true);
                            }}
                        >
                            Generar dirección
                        </Button>
                    </Grid>






                    <Grid item xs={12} sm={4}>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Title title="Información de fuentes de abastecimiento.  " />
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        name="numero"
                        label="Número"
                        variant="standard"
                        value={currentFuente.numero}
                        onChange={handleCurrentFuenteChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Tipo"
                        name="tipo"
                        value={currentFuente.tipo}
                        onChange={handleCurrentFuenteChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Nombre de fuente"
                        name="nombreFuente"
                        value={currentFuente.nombreFuente}
                        onChange={handleCurrentFuenteChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Caudal concesionado"
                        name="caudalConcesionado"
                        value={currentFuente.caudalConcesionado}
                        onChange={handleCurrentFuenteChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Sistema de medicion de agua captada"
                        name="sistemaMedicionAguaCaptada"
                        value={currentFuente.sistemaMedicionAguaCaptada}
                        onChange={handleCurrentFuenteChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Cordenada X"
                        name="cordenadaX"
                        value={currentFuente.cordenadaX}
                        onChange={handleCurrentFuenteChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Cordenada Y"
                        name="cordenadaY"
                        value={currentFuente.cordenadaY}
                        onChange={handleCurrentFuenteChange}
                    />
                </Grid>
                {/* <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Coordenada X"
                        name="cordenadaX"
                        value={Data.coordenadasSitioCaptacion.cordenadaX}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                coordenadasSitioCaptacion: {
                                    ...prevState.coordenadasSitioCaptacion,
                                    cordenadaX: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid> */}
                {/* <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Coordenada Y"
                        name="cordenadaY"
                        value={Data.coordenadasSitioCaptacion.cordenadaY}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                coordenadasSitioCaptacion: {
                                    ...prevState.coordenadasSitioCaptacion,
                                    cordenadaY: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid> */}






                <Grid item >
                    <Button color='success'
                        variant='contained'
                        startIcon={<AddIcon />}
                        onClick={agregarFuente}>
                        Agregar Fuente
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} marginTop={2}  >
                    <DataGrid
                        autoHeight
                        pageSize={10}
                        columns={columnas}
                        density="compact"
                        rowsPerPageOptions={[10]}
                        rows={Data.informacionFuentesAbastecimiento.map((row, index) => ({ ...row, id: index }))}
                        getRowId={(row) => row.id}
                    />

                </Grid>
            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Title title=" Factores de utilización " />
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Número  de Usuarios "
                        name="numeroUsuarios"
                        value={Data.factoresUtilizacion.numeroUsuarios}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                factoresUtilizacion: {
                                    ...prevState.factoresUtilizacion,
                                    numeroUsuarios: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label=" consumo de Usuarios (lt/hab-dia) "
                        name="consumoNumeroUsuarios"
                        value={Data.factoresUtilizacion.consumoNumeroUsuarios}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                factoresUtilizacion: {
                                    ...prevState.factoresUtilizacion,
                                    consumoNumeroUsuarios: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>       </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Número  de bovinos "
                        name="numeroBovinos"
                        value={Data.factoresUtilizacion.numeroBovinos}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                factoresUtilizacion: {
                                    ...prevState.factoresUtilizacion,
                                    numeroBovinos: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label=" consumo de bovinos (lt/hab-dia) "
                        name="consumoNumeroBovinos "
                        value={Data.factoresUtilizacion.consumoNumeroBovinos}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                factoresUtilizacion: {
                                    ...prevState.factoresUtilizacion,
                                    consumoNumeroBovinos: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>  </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Número de Porcinos "
                        name="numeroPorcinos"
                        value={Data.factoresUtilizacion.numeroPorcinos}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                factoresUtilizacion: {
                                    ...prevState.factoresUtilizacion,
                                    numeroPorcinos: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label=" consumo de porcinos (lt/hab-dia) "
                        name="consumoNumeroPorcinos"
                        value={Data.factoresUtilizacion.consumoNumeroPorcinos}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                factoresUtilizacion: {
                                    ...prevState.factoresUtilizacion,
                                    consumoNumeroPorcinos: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Número hectáreas "
                        name="numeroHectareas"
                        value={Data.factoresUtilizacion.numeroHectareas}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                factoresUtilizacion: {
                                    ...prevState.factoresUtilizacion,
                                    numeroHectareas: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label=" consumo de hectareas (lt/hab-dia) "
                        name="consumoNumeroHectareas"
                        value={Data.factoresUtilizacion.consumoNumeroHectareas}
                        onChange={(event) => {
                            setFormData(prevState => ({
                                ...prevState,
                                factoresUtilizacion: {
                                    ...prevState.factoresUtilizacion,
                                    consumoNumeroHectareas: parseFloat(event.target.value) || 0
                                }
                            }));
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >
                <Title title=" Captación mensual de agua" />
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        name="periodoUso"
                        variant="standard"
                        label="Periodo de Uso"
                        value={currentCaptacion.periodoUso}
                        onChange={handleCurrentCaptacionChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        name="tiempoUso"
                        variant="standard"
                        label="Tiempo de Uso"
                        value={currentCaptacion.tiempoUso}
                        onChange={handleCurrentCaptacionChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        name="caudalUtilizado"
                        label="Caudal utilizado"
                        value={currentCaptacion.caudalUtilizado}
                        onChange={handleCurrentCaptacionChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Volumen de agua captada"
                        name="volumenAguaCaptada"
                        value={currentCaptacion.volumenAguaCaptada}
                        onChange={handleCurrentCaptacionChange}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <FormControl fullWidth size="small" variant="standard">
                        <InputLabel>Mes</InputLabel>
                        <Select
                            label="Mes"
                            name="mes"
                            value={currentCaptacion.mes}
                            onChange={handleCurrentCaptacionChange}
                        >
                            <MenuItem value={1}>Enero</MenuItem>
                            <MenuItem value={2}>Febrero</MenuItem>
                            <MenuItem value={3}>Marzo</MenuItem>
                            <MenuItem value={4}>Abril</MenuItem>
                            <MenuItem value={5}>Mayo</MenuItem>
                            <MenuItem value={6}>Junio</MenuItem>
                            <MenuItem value={7}>Julio</MenuItem>
                            <MenuItem value={8}>Agosto</MenuItem>
                            <MenuItem value={9}>Septiembre</MenuItem>
                            <MenuItem value={10}>Octubre</MenuItem>
                            <MenuItem value={11}>Noviembre</MenuItem>
                            <MenuItem value={12}>Diciembre</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item >
                    <Button color='success'
                        variant='contained'
                        startIcon={<AddIcon />} onClick={agregarCaptacion}>
                        Agregar Captación
                    </Button>
                </Grid>

                <Grid item xs={12} sm={12} marginTop={2} >
                    <DataGrid
                        autoHeight
                        pageSize={10}
                        columns={columnas_captacion}
                        density="compact"
                        rowsPerPageOptions={[10]}
                        rows={Data.captacionesMensualesAgua.map((row, index) => ({ ...row, id: index }))}
                        getRowId={(row) => row.id}
                    />
                </Grid>
            </Grid>
            <Grid container
                item xs={12} marginLeft={2} marginRight={2} spacing={2} marginTop={3}
                sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    background: '#FAFAFA',
                    boxShadow: '0px 3px 6px #042F4A26',
                    p: '20px', m: '10px 0 20px 0', mb: '20px',
                }}
            >

                <Grid item >
                    <Button color='success'
                        variant='contained'
                        startIcon={<SaveIcon />} onClick={fetch_Crear_archivo_digital}>
                        guardar
                    </Button>

                </Grid>

                <Grid
                    item
                //   container
                //   style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 50 }}
                >

                    <Button
                        // style={{ marginTop: 10, width: 180 }}
                        fullWidth
                        component="label"
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        htmlFor="file-upload"
                    >
                        {formmmm.archivo ? (
                            <>
                                Quitar
                                <IconButton
                                    size="small"
                                    onClick={handleRemoveFile}
                                    sx={{ marginLeft: '8px' }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </>
                        ) : (
                            'Seleccionar Documento'
                        )}
                        <VisuallyHiddenInput
                            type="file"
                            id="file-upload"
                            onChange={handleFileChange}
                        />
                    </Button>

                </Grid>
            </Grid>


        </>
    );
};
