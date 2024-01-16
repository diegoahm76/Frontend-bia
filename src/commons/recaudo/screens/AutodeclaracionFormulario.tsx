/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// eslint-disable-next-line @typescript-eslint/naming-convention
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { FormControl, Grid, TextField, InputLabel, MenuItem, Select, SelectChangeEvent, Button } from '@mui/material';
import { Title } from '../../../components/Title';
import { useSelector } from 'react-redux';
import { AuthSlice } from '../../auth/interfaces';
import { api } from '../../../api/axios';
import SaveIcon from '@mui/icons-material/Save';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AddIcon from '@mui/icons-material/Add';
import { control_error } from '../alertas/store/thunks/alertas';
import { control_success } from '../../recursoHidrico/requets/Request';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';

interface FuenteAbastecimiento {
    tipo: string | null;
    numero: number | null;
    nombreFuente: string | null;
    caudalConcesionado: string | null;
    sistemaMedicionAguaCaptada: string | null;
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
}

interface CaptacionMensualAgua {
    mes: number | null;
    tiempoUso: number | null;
    periodoUso: string | null;
    caudalUtilizado: number | null;
    volumenAguaCaptada: number | null;
}

interface FormData {
    cc: number| null;
    nit: number| null;
    fax: string;
    telefono: string;
    otrotipo: string;
    direccion: string;
    municipio: string;
    expediente: number| null;
    codigoCIIU: number| null;
    razonSocial: string;
    tipoUsuario: string;
    numConcesion: number| null;
    fechaCreacion: string;
    actividadEconomica: string;
    nombreRepresentanteLegal: string;
    factoresUtilizacion: FactoresUtilizacion;
    captacionesMensualesAgua: CaptacionMensualAgua[];
    coordenadasSitioCaptacion: CoordenadasSitioCaptacion;
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
        tipoUsuario: "EMPRESARIAL",
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
        coordenadasSitioCaptacion: {
            cordenadaX: null,
            cordenadaY: null,
        },
        factoresUtilizacion: {
            numeroUsuarios: null,
            numeroBovinos: null,
            numeroPorcinos: null,
            numeroHectareas: null,
            consumoNumeroUsuarios: null,
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

        } catch (error: any) {
            // Manejar el error aquí, por ejemplo, mostrar un mensaje de error
            console.error('Error al crear el formulario', error);
            control_error(error.response.data.detail);

        }
    };

    const [currentCaptacion, setCurrentCaptacion] = useState({
        periodoUso: "",
        tiempoUso: 0,
        caudalUtilizado: 0,
        volumenAguaCaptada: 0,
        mes: 1
    });

    const handleCurrentCaptacionChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setCurrentCaptacion(prevState => ({ ...prevState, [name]: value }));
    };

    const agregarCaptacion = () => {
        setFormData(prevState => ({
            ...prevState,
            captacionesMensualesAgua: [...prevState.captacionesMensualesAgua, currentCaptacion]
        }));
        setCurrentCaptacion({
            periodoUso: "",
            tiempoUso: 0,
            caudalUtilizado: 0,
            volumenAguaCaptada: 0,
            mes: 1
        });
    };


    const [currentFuente, setCurrentFuente] = useState({
        numero: 0,
        tipo: "",
        nombreFuente: "",
        caudalConcesionado: "",
        sistemaMedicionAguaCaptada: ""
    });
    const handleCurrentFuenteChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        setCurrentFuente(prevState => ({ ...prevState, [name]: value }));
    };
    const agregarFuente = () => {
        setFormData(prevState => ({
            ...prevState,
            informacionFuentesAbastecimiento: [...prevState.informacionFuentesAbastecimiento, currentFuente]
        }));
        // Reiniciar currentFuente
        setCurrentFuente({
            numero: 0,
            tipo: "",
            nombreFuente: "",
            caudalConcesionado: "",
            sistemaMedicionAguaCaptada: ""
        });
    };
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
                        variant="standard"
                        label="Número"
                        name="numero"
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
                        label="nombreFuente"
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
                        label="caudalConcesionado"
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
                        label="sistemaMedicionAguaCaptada"
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
                </Grid>
                <Grid item xs={12} sm={4}>
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
                </Grid>






                <Grid item >
                    <Button color='success'
                        variant='contained'
                        startIcon={<AddIcon />} onClick={agregarFuente}>
                        Agregar Fuente
                    </Button>
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
                        label="numeroUsuarios "
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
                        label="numeroBovinos "
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
                        label="numeroPorcinos "
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
                        label="numeroHectareas "
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
                            label="consumoNumeroUsuarios "
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
                <>
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
                            label="tiempo de Uso"
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
                            label="caudalUtilizado"
                            value={currentCaptacion.caudalUtilizado}
                            onChange={handleCurrentCaptacionChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="standard"
                            label="volumenAguaCaptada"
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
                    <Grid item >
                        <Button color='success'
                            variant='contained'
                            startIcon={<AddIcon />} onClick={agregarCaptacion}>
                            Agregar Captación
                        </Button>

                    </Grid>



                </>
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