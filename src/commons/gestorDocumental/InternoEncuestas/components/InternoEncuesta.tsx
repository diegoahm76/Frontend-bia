/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from "react";
import { useEffect, useState } from "react";
import { Title } from "../../../../components";
import SaveIcon from '@mui/icons-material/Save';
import ReplyIcon from '@mui/icons-material/Reply';
import { api, baseURL } from "../../../../api/axios";
import { initialFormData } from "../interfaces/types";
import { TablaEncuestaInterno } from "./InternoEncuestas";
import { Button, FormControl, Grid, TextField } from "@mui/material";
import { control_error, control_success } from "../../../../helpers";
import { ButtonSalir } from "../../../../components/Salir/ButtonSalir";
import { RadioGroup, FormControlLabel, Radio, Typography, } from "@mui/material";
import { FormLabel, InputLabel, MenuItem, Select, SelectChangeEvent, } from "@mui/material";
import { fetch_data_dptos_encuestas, fetch_data_municipio_encuestas, fetch_data_pais_encuestas } from "../../Encuesta/services/encuestas.service";
import { Departamento, EncuestaDetalle, Municipios, Paises, RangoEdad, Sexo, TipoDocumento, UsuarioRegistrado, miEstilo } from "../../Encuesta/interfaces/types";

export const EncuestaInterno: React.FC = () => {

 
    const [selectedEncuestaId, setSelectedEncuestaId] = useState<number | null>(null);
    const [formData, setFormData] = useState(initialFormData);
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | SelectChangeEvent<string>
    ) => {
        const target = event.target as HTMLInputElement;
        const { name, value } = target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };
    const preguntas = [];
    const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(""));

    const [paises, setpaises] = useState<Paises[]>([]);
    useEffect(() => {

        void fetch_data_pais_encuestas({
            setpaises,
            baseURL,
        });
    }, []);
    const [link, set_link] = useState('');
    const [selected_pais, setselected_pais] = useState('');

    useEffect(() => {
        set_link(`${baseURL}listas/departamentos/?pais=${selected_pais}`);
    }, [selected_pais]);

    ///////////////// Departamentos de encuestas 
    const [departamentos, set_departamentos] = useState<Departamento[]>([]);
    const [selected_departamento, setselected_departamento] = useState('');
    useEffect(() => {
        void fetch_data_dptos_encuestas({
            url: link,
            callbackState: set_departamentos
        });
    }, [link]);


    /////////////////////// Municipios de encuestas 
    const [municipios, setmunicipios] = useState<Municipios[]>([]);
    useEffect(() => {
        void fetch_data_municipio_encuestas({
            baseURL,
            setmunicipios,
            selected_departamento,
        });
    }, [selected_departamento]);

    const [loading, setLoading] = useState<boolean>(true);

    
    const [encuestaData, setEncuestaData] = useState<EncuestaDetalle['data'] | null>(null);
    const fetchEncuestaDetalle = async (): Promise<void> => {
        try {
            const url = `/gestor/encuestas/encabezado_encuesta/get/detalle/${selectedEncuestaId}/`;
            const res = await api.get<EncuestaDetalle>(url); // Asumiendo que ya tienes configurada una instancia de axios llamada "api"
            setEncuestaData(res.data.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchEncuestaDetalle();
    }, [selectedEncuestaId]);

    const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
    const handleRespuestaChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSelectedOptions = [...selectedOptions];
        const selectedOptionId = encuestaData?.preguntas[index].opciones_rta.find(
            opcion => opcion.opcion_rta === event.target.value
        )?.id_opcion_rta;

        if (selectedOptionId) {
            newSelectedOptions[index] = selectedOptionId;
            setSelectedOptions(newSelectedOptions);
        }
    };
    const isFieldRequired = (fieldValue: string | number | undefined): boolean => {
        return !(fieldValue === undefined || fieldValue === "" || fieldValue === null);
    }
    const fieldAliases: Record<string, string> = {
        id_tipo_documento_usuario: "tipo documento",
        nro_documento_id: "número de identificación",
        nombre_completo: "nombre completo",
        cod_sexo: "sexo",
        rango_edad: "rango de edad",
        id_pais_para_extranjero: "país ",
    };

    const validateFormData = (): boolean => {
        if (formData.tipo_usuario === "R" || formData.tipo_usuario === "I") {
            const requiredFields = ["id_tipo_documento_usuario", "nro_documento_id", "nombre_completo", "cod_sexo", "rango_edad", "id_pais_para_extranjero",];
            for (const field of requiredFields) {
                const fieldName = fieldAliases[field] || field;
                if (!isFieldRequired((formData as any)[field])) {
                    control_error(`El campo ${fieldName} es obligatorio`);
                    return false;
                }
            }
        }
        return true;
    };
    useEffect(() => {
        void fetchUsuarioRegistrado().then((response) => {
            setUsuarioData(response); // Establece los datos del usuario obtenidos de la respuesta
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    const sendEncuestaResponse = async (): Promise<void> => {
        if (!validateFormData()) {
            return; // Si la validación falla, no continuamos con el envío
        }
        if (selectedEncuestaId == null) {
            console.error("No se ha seleccionado ninguna encuesta.");
            return;
        }
        const dataToSend = {
            ...formData,
            id_encuesta: selectedEncuestaId, // Aquí asignamos el valor de selectedEncuestaId a id_encuesta
            ids_opciones_preguntas_encuesta: selectedOptions.map(optionId => ({
                id_opcion_pregunta_encuesta: optionId
            }))
        };
        try {
            const response = await api.post("/gestor/encuestas/datos_encuestas_resueltas/create/", dataToSend);
            if (response.data.success) {
                //  console.log('')("Encuesta enviada exitosamente.");
                control_success("Encuesta diligenciada exitosamente ");
                setSelectedEncuestaId(null);

            } else {
                //  console.log('')(response.data.detail);
            }
        } catch (error: any) {
            console.error("Error al enviar la encuesta:", error);
            control_error(error.response.data.detail);
        }
    };
    // Estado para el rango de edad
    const [rangoEdad, setRangoEdad] = useState<RangoEdad[]>([]);
    // Efecto para cargar los datos del rango de edad
    useEffect(() => {
        const fetchRangoEdad = async (): Promise<void> => {
            try {
                const url = "/gestor/choices/rango-edad/";
                const res = await api.get<RangoEdad[]>(url); // Asumiendo que la API devuelve un arreglo directamente
                setRangoEdad(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRangoEdad();
    }, []);
    const [tiposDocumento, setTiposDocumento] = useState<TipoDocumento[]>([]);
    useEffect(() => {
        const fetchTiposDocumento = async (): Promise<void> => {
            try {
                const url = "/personas/tipos-documento/get-list/";
                const res = await api.get<TipoDocumento[]>(url); // Asumiendo que la API devuelve un arreglo directamente
                setTiposDocumento(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTiposDocumento();
    }, []);
    // Tipo para el sexo


    // Estado para el sexo
    // Efecto para cargar los datos del sexo
    const [sexos, setSexos] = useState<Sexo[]>([]);

     const fetchSexo = async (): Promise<void> => {
            try {
                const url = "/listas/sexo/";
                const res = await api.get<{ data: Sexo[] }>(url);
                setSexos(res.data.data);
            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        fetchSexo();
    }, []);
    const [usuarioData, setUsuarioData] = useState<UsuarioRegistrado | null>(null);
    const fetchUsuarioRegistrado = async (): Promise<any> => {
        try {
            const url = "/gestor/encuestas/usuario_registrado/get/";
            const res = await api.get<{ data: UsuarioRegistrado }>(url);
            return res?.data?.data

        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {

        fetchUsuarioRegistrado();
    }, []);
    useEffect(() => {
        if (usuarioData) {
            setFormData({
                ...formData,
                email: usuarioData.email,
                cod_sexo: usuarioData.cod_sexo,
                telefono: usuarioData.telefono,
                rango_edad: usuarioData.rango_edad,
                nombre_completo: usuarioData.nombre_completo,
                nro_documento_id: usuarioData.nro_documento_id,
                id_pais_para_extranjero: usuarioData.id_pais_para_extranjero,
                id_municipio_para_nacional: usuarioData.id_municipio_para_nacional,
                id_tipo_documento_usuario: usuarioData.id_tipo_documento_usuario,
            });
        }
    }, [usuarioData]);
    const handleTipoUsuarioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //  console.log('')(event.target.value)
        const value = event.target.value;
        if (value === "A") {
            setFormData({
                ...initialFormData,
                tipo_usuario: value,

            });
            return;
        }
        if (value === "R") {
            setFormData({
                ...formData,
                tipo_usuario: value, // Establece el nuevo valor de "tipo_usuario"
            });
            void fetchUsuarioRegistrado().then((response) => {
                setUsuarioData(response); // Establece los datos del usuario obtenidos de la respuesta
            }).catch((error) => {
                console.error(error);
            });

            return;
        }

        else {
            setFormData({ ...initialFormData, tipo_usuario: value });
        }
    };

    return (
        <>


            {/* <TablaEncuestaAsignada selectedEncuestaId={selectedEncuestaId} setSelectedEncuestaId={setSelectedEncuestaId}/> */}

            {selectedEncuestaId ? (
                // <h1>miguel</h1>
                <>
                    <Grid container
                        spacing={2} m={2} p={2}
                        sx={miEstilo}
                    >
                        {/* <img style={{ width: 45 }} src="../image/botones/logoCormaca.png" alt="XLS Button" /> */}
                        <Title title="Encuesta satisfacción al usuario" />
                        {/* <Grid item xs={12} marginTop={1} sm={12}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Tipo de Usuario</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="tipo_usuario"
                                    value={formData.tipo_usuario}
                                    onChange={handleTipoUsuarioChange}
                                >
                                    <FormControlLabel value="I" control={<Radio />} label="Identificado" />
                                    <FormControlLabel value="A" control={<Radio />} label="Anonimo" />
                                    <FormControlLabel value="R" control={<Radio />} label="Registrado" />
                                </RadioGroup>
                            </FormControl>
                        </Grid> */}

                    </Grid>

                    {formData.tipo_usuario && (
                        <Grid container
                            spacing={2} m={2} p={2}
                            sx={miEstilo}
                        >
                            <Title title="Datos de usuario " />

                            <Grid item xs={12} sm={4}>
                                <FormControl required size="small" fullWidth>
                                    <InputLabel >Tipo de Documento</InputLabel>
                                    <Select
                                        label="Tipo de Documento"
                                        name="id_tipo_documento_usuario"
                                        disabled value={formData.id_tipo_documento_usuario}
                                        onChange={handleInputChange}
                                    >
                                        {tiposDocumento.map((tipoDoc) => (
                                            <MenuItem key={tipoDoc.cod_tipo_documento} value={tipoDoc.cod_tipo_documento}>
                                                {tipoDoc.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled
                                    value={formData.nro_documento_id}
                                    label="Numero identificación "
                                    onChange={handleInputChange}
                                    name="nro_documento_id"
                                    variant="outlined"
                                    size="small"
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled
                                    value={formData.nombre_completo}
                                    onChange={handleInputChange}
                                    label="Nombre completo"
                                    name="nombre_completo"
                                    variant="outlined"
                                    required
                                    size="small"
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <FormControl required size="small" fullWidth>
                                    <InputLabel >Sexo</InputLabel>
                                    <Select
                                        label="Sexo"
                                        name="cod_sexo"
                                        value={formData.cod_sexo}
                                        onChange={handleInputChange}
                                        disabled
                                    >
                                        {sexos.map((sexo) => (
                                            <MenuItem key={sexo.value} value={sexo.value}>
                                                {sexo.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={4}>
                                <FormControl required size="small" fullWidth>
                                    <InputLabel >Rango de Edad</InputLabel>
                                    <Select
                                        label="Rango de Edad"
                                        name="rango_edad"
                                        value={formData.rango_edad}
                                        onChange={handleInputChange}
                                        disabled
                                    >
                                        {rangoEdad.map((rango) => (
                                            <MenuItem key={rango.value} value={rango.value}>
                                                {rango.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled
                                    onChange={handleInputChange}
                                    value={formData.email}
                                    variant="outlined"
                                    label="Email"
                                    size="small"
                                    name="email"
                                    fullWidth
                                />
                            </Grid> <Grid item xs={12} sm={4}>
                                <TextField
                                    disabled
                                    onChange={handleInputChange}
                                    value={formData.telefono}
                                    variant="outlined"
                                    label="Telefono"
                                    name="telefono"
                                    size="small"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl required size="small" fullWidth>
                                    <InputLabel >pais</InputLabel>
                                    <Select
                                        label="país"
                                        name="id_pais_para_extranjero"
                                        value={formData.id_pais_para_extranjero}
                                        disabled
                                        onChange={(event) => {
                                            const selectedValue = event.target.value as string;
                                            setselected_pais(selectedValue);
                                            handleInputChange(event);
                                        }}
                                    >
                                        {paises.map((Paises) => (
                                            <MenuItem key={Paises.value} value={Paises.value}>
                                                {Paises.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={4}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel >Departamento</InputLabel>
                                    <Select
                                        label="Departamento"

                                        onChange={(event) => {
                                            const selectedValue = event.target.value as string;
                                            setselected_departamento(selectedValue);
                                        }}
                                        disabled

                                    >
                                        {departamentos.map((departamento) => (
                                            <MenuItem key={departamento.value} value={departamento.value}>
                                                {departamento.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <FormControl size="small" fullWidth>
                                    <InputLabel >Municipio</InputLabel>
                                    <Select
                                        value={formData.id_municipio_para_nacional}
                                        name="id_municipio_para_nacional"
                                        inputProps={{ shrink: true }}
                                        onChange={handleInputChange}
                                        label="Municipio"
                                        disabled
                                    >
                                        {municipios.map((municipio) => (
                                            <MenuItem key={municipio.value} value={municipio.value}>
                                                {municipio.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                    {formData.tipo_usuario && (
                        <>
                            {loading ? (
                                <p>Cargando...</p>
                            ) : (
                                encuestaData?.preguntas.map((pregunta, index) => (
                                    <Grid
                                        key={pregunta.id_pregunta_encuesta}
                                        container
                                        spacing={2}
                                        m={2}
                                        p={2}
                                        sx={{
                                            boxShadow: '0px 3px 6px #042F4A26',
                                            borderLeft: '6px solid blue',
                                            background: '#FAFAFA',
                                            borderRadius: '15px',
                                            position: 'relative',
                                            m: '10px 0 20px 0',
                                            mb: '20px',
                                            p: '20px',
                                        }}
                                    > <img
                                            src="../image/botones/logoCormaca.png"
                                            alt="Marca de agua"
                                            style={{
                                                position: 'absolute',
                                                top: '60%',
                                                left: '50%',
                                                width: '40%',
                                                height: '40%',
                                                opacity: '0.5',  // Ajusta la opacidad según tu preferencia
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                        />
                                        <Grid item xs={12}>
                                            <h2>{pregunta.redaccion_pregunta}</h2>
                                        </Grid>
                                        <Typography variant="h6" gutterBottom></Typography>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                aria-label={`respuesta${index + 1}`}
                                                name={`respuesta${index + 1}`}
                                                value={respuestas[index]}
                                                onChange={handleRespuestaChange(index)}
                                            >
                                                {pregunta.opciones_rta.map((opcion, opcionIndex) => (
                                                    <FormControlLabel
                                                        key={opcion.id_opcion_rta}
                                                        value={opcion.opcion_rta}
                                                        control={<Radio />}
                                                        label={opcion.opcion_rta}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                ))
                            )}
                        </>
                    )}
                    {formData.tipo_usuario && (

                        <Grid container
                            spacing={2} m={2} p={2}
                            sx={miEstilo}
                        >
                            <Grid item xs={12} sm={1.2}>
                                <Button onClick={sendEncuestaResponse} startIcon={<SaveIcon />} color='success' fullWidth variant="contained"    >
                                    guardar
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={1.2}>
                                {/* <ButtonSalir /> */}
                                <Button variant="contained" color='error' fullWidth onClick={() => {
                                    setSelectedEncuestaId(null);
                                }} startIcon={<ReplyIcon />}>
                                    Regresar
                                </Button>
                            </Grid>
                            {/* <h1>{selectedEncuestaId}</h1> */}

                        </Grid>
                    )}
                </>

            ) : (
                <TablaEncuestaInterno selectedEncuestaId={selectedEncuestaId} setSelectedEncuestaId={setSelectedEncuestaId} />


            )}



        </>
    );
};