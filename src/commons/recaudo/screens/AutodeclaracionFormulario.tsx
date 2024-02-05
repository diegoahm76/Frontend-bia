/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
import 'leaflet/dist/leaflet.css';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { api } from '../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../components/Title';
import { AuthSlice } from '../../auth/interfaces';
import { control_error } from '../alertas/store/thunks/alertas';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { control_success } from '../../recursoHidrico/requets/Request';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import { FormControl, Grid, TextField, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';

interface FuenteAbastecimiento {
    tipo: string | any;
    numero: number | any;
    nombreFuente: string | any;
    caudalConcesionado: string | any;
    sistemaMedicionAguaCaptada: string | any;
    cordenadaX: number | any;
    cordenadaY: number | any;
}

interface CoordenadasSitioCaptacion {
    cordenadaX: number | null;
    cordenadaY: number | null;
}
 
interface FactoresUtilizacion {
    numeroBovinos: number | null;
    numeroPorcinos: number | null;
    numeroUsuarios: number | null;
    numeroHectareas: number | null;
    consumoNumeroUsuarios: number | null;
    consumoNumeroBovinos: any;
    consumoNumeroPorcinos: any;
    consumoNumeroHectareas: any;
}
interface Campo {
    nombre: string;
    valor: any;  // 'any' se usa aquí para permitir cualquier tipo, puedes ajustarlo según tus necesidades
}
interface CaptacionMensualAgua {
    mes: number | any;
    tiempoUso: number | any;
    periodoUso: string | any;
    caudalUtilizado: number | any;
    volumenAguaCaptada: number | any;
}

interface FormData {
    cc: number | null;
    nit: number | null;
    fax: string;
    telefono: string;
    otrotipo: string;
    direccion: string;
    municipio: string;
    expediente: number | null;
    codigoCIIU: number | null;
    razonSocial: string;
    tipoUsuario: string;
    numConcesion: number | null;
    fechaCreacion: string;
    actividadEconomica: string;
    nombreRepresentanteLegal: string;
    factoresUtilizacion: FactoresUtilizacion;
    captacionesMensualesAgua: CaptacionMensualAgua[];
    // coordenadasSitioCaptacion: CoordenadasSitioCaptacion;
    informacionFuentesAbastecimiento: FuenteAbastecimiento[];
}

export const AutodeclaracionFormulario: React.FC = () => {
    const { userinfo: { telefono_celular } } = useSelector((state: AuthSlice) => state.auth);
    const [opengeneradordireccioness, setopengeneradordireccioness] = useState(false);
    const [
        ,
        // direccionGeneradaActiva
        set_direccion_generada_activaa,
    ] = useState(false);
    const [
        direccion_generada
        ,
        setdireccion_generadaa,
    ] = useState('');

    const [type_directionn,
        // set_type_direction
    ] = useState('');

    const initialFormData: FormData = {
        nit: null,
        cc: null,
        fax: "",
        municipio: "",
        numConcesion: null,
        tipoUsuario: "",
        otrotipo: "",
        razonSocial: "",
        nombreRepresentanteLegal: "",
        actividadEconomica: "",
        telefono: `${telefono_celular}`,
        codigoCIIU: null,
        direccion: ``,
        expediente: null,
        fechaCreacion: "",
        informacionFuentesAbastecimiento: [],

        factoresUtilizacion: {
            numeroUsuarios: null,
            numeroBovinos: null,
            numeroPorcinos: null,
            numeroHectareas: null,
            consumoNumeroUsuarios: null,
            consumoNumeroBovinos: null,
            consumoNumeroPorcinos: null,
            consumoNumeroHectareas: null,
        },
        captacionesMensualesAgua: []
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);
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
    }, []);

    const crearFormulario = async () => {
        try {
            const url = "/recaudo/formulario/crear_formulario/";
            const res = await api.post(url, formData);
            // Manejar la respuesta aquí, por ejemplo, mostrar un mensaje de éxito
            console.log('Formulario creado con éxito', res.data);
            control_success("Formulario creado con éxito")
            setFormData(initialFormData);
        } catch (error: any) {
            // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
            console.error('Error al crear el formulario', error);
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
        const mesYaExiste = formData.captacionesMensualesAgua.some(captacion => captacion.mes === currentCaptacion.mes);
        const campoFaltante = verificarDatosCaptacion();
        if (campoFaltante) {
            control_error(`Falta agregar dato: ${campoFaltante}`);
            return;
        }

        const camposRequeridos = {
            periodoUso: 'Periodo de Uso',
            tiempoUso: 'Tiempo de Uso',
            caudalUtilizado: 'Caudal Utilizado',
            volumenAguaCaptada: 'Volumen de Agua Captada',
            mes: 'Mes'
        };


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
                                value={formData.tipoUsuario}
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

                    {/* <Button variant="contained" onClick={crearFormulario}>
                        Crear
                    </Button> */}


                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Razón social"
                            name="razonSocial"
                            onChange={handleInputChange}

                            value={formData.razonSocial}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="Nit"
                            name="nit"
                            value={formData.nit}
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
                            value={formData.nombreRepresentanteLegal}
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
                            value={formData.cc}
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
                            value={formData.actividadEconomica}
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
                            value={formData.telefono}
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
                            value={formData.fax}
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
                            value={formData.codigoCIIU}
                            onChange={handleInputChange}

                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <FormControl variant="standard" size="small" fullWidth>
                            <InputLabel >Municipio</InputLabel>
                            <Select
                                name="municipio"
                                label="municipio"
                                value={formData.municipio}
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
                            value={formData.expediente}
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
                            value={formData.numConcesion}
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
                            value={formData.direccion}
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
                        value={formData.coordenadasSitioCaptacion.cordenadaX}
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
                        value={formData.coordenadasSitioCaptacion.cordenadaY}
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
                        rows={formData.informacionFuentesAbastecimiento.map((row, index) => ({ ...row, id: index }))}
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
                        value={formData.factoresUtilizacion.numeroUsuarios}
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
                        value={formData.factoresUtilizacion.consumoNumeroUsuarios}
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
                <Grid item xs={12} sm={4}>

                </Grid>


                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Número  de bovinos "
                        name="numeroBovinos"
                        value={formData.factoresUtilizacion.numeroBovinos}
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
                        value={formData.factoresUtilizacion.consumoNumeroBovinos}
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

                <Grid item xs={12} sm={4}>

                </Grid>

                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="standard"
                        label="Número de Porcinos "
                        name="numeroPorcinos"
                        value={formData.factoresUtilizacion.numeroPorcinos}
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
                        value={formData.factoresUtilizacion.consumoNumeroPorcinos}
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
                        value={formData.factoresUtilizacion.numeroHectareas}
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
                        value={formData.factoresUtilizacion.consumoNumeroHectareas}
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
                        rows={formData.captacionesMensualesAgua.map((row, index) => ({ ...row, id: index }))}
                        getRowId={(row) => row.id}
                    />
                </Grid>
                {/* 
                    <Grid item >


                        Yo, _____________________________________ identificado con C.C. No. __________________ de _________________ en calidad de representante legal de _____________________________, en cumplimiento de lo estipulado en el decreto 155/04, en el artículo 6 me permito presentar el reporte de agua captada durante el periodo. Declaro que tengo a disposición de CORMACARENA los registros sustento de los resultados presentados.

                        Nota: Este formulario deberá ser regresado a la autoridad ambiental en un plazo máximo de 15 días calendario contados a partir del vencimiento del período de cobro de acuerdo con la Resolución PS-GJ 1.2.6.21.0293 del 08 de abril de 2021. «POR MEDIO DE LA CUAL SE FIJAN LAS CONDICIONES PARA EL COBRO DE LA TASA POR UTILIZACION DE AGUA EN EL AREA JURISDICCION DEL DEPARTAMENTO DEL META Y SE DICTAN OTRAS
                        DISPOSICIONES».

                        FIRMA_____________________________C.C__________________DE_____________________

                        Para uso exclusivo de la Corporación

                        Radicado de Cormacarena No. ____________________________ del _________________


                        Anexos:
                        Certificado de calibración - Mantenimiento
                        Bitácoras – Registros de consumo

                    </Grid>
 */}


                {/* 


                    <Grid item xs={12} sm={4}>
                        <TextField
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label=" Nombre de usuario"
                            name="Nombre de usuario "
                            value={nombre_de_usuario}
                            onChange={handleInputChange}

                        />
                    </Grid> 
                    <Grid item xs={12} sm={4}>
                        <TextField
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            disabled
                            fullWidth
                            size="small"
                            variant="standard"
                            label="nombre_unidad_organizacional"
                            name="nombre_unidad_organizacional"
                            value={nombre_unidad_organizacional}
                            onChange={handleInputChange}

                        />
                    </Grid> */}
                {/* <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            onChange={handleInputChange} 
                            variant="standard"
                            label="fechaCreacion"
                            name="fechaCreacion"
                            value={formData.fechaCreacion}
                        />
                    </Grid>  
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="otrotipo"
                            name="otrotipo"
                            value={formData.otrotipo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                  
 */}





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
                        startIcon={<SaveIcon />} onClick={crearFormulario}>
                        Crear
                    </Button>

                </Grid>



                {/* 
                <Grid item xs={12} marginLeft={3} sm={3}>
                    <FormControl  variant="standard" size="small" fullWidth>
                        <InputLabel id="municipio-select-label">municipio</InputLabel>
                        <Select
                            labelId="municipio-select-label"
                            id="municipio-select"
                            value={formData.municipio_v}
                            label="municipio"
                            onChange={handleInputChange}
                            name="municipio_v"
                        >
                            {municipios_v.map((municipio) => (
                                <MenuItem key={municipio[0]} value={municipio[0]}>
                                    {municipio[1]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid> */}




            </Grid>


        </>
    );
};